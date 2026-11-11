import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const ROOT = resolve('dist/portfolio-yasiru/browser');
const OUT = resolve('screenshots');
const PORT = Number(process.env.PORT ?? 4319);
const EDGE = process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const AXE = resolve('node_modules/axe-core/axe.min.js');

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(ROOT, urlPath);
    if (!existsSync(file) || urlPath.endsWith('/')) file = join(ROOT, 'index.html');
    if (!existsSync(file)) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE });
const results = [];
const problems = [];
const axeSource = await readFile(AXE, 'utf8');

for (const width of [390, 768, 1440]) {
  const height = width < 500 ? 844 : width < 900 ? 1024 : 900;
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({
      viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('pageerror', (e) => problems.push(`pageerror ${width}: ${e.message}`));
    page.on('response', (r) => { if (r.status() >= 400) problems.push(`HTTP ${r.status()} ${r.url()}`); });
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
    if (theme === 'dark') {
      await page.click('.theme-toggle');
      await page.waitForTimeout(400);
    }
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(async () =>
      await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      })
    );
    results.push({
      width, theme, violations: res.violations.length,
      detail: res.violations.map((v) => `${v.id} (${v.nodes.length})`),
    });
    await context.close();
  }
}

// Tap-target and layout checks in the rebuilt header at 390px.
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

const sizes = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  };
  return {
    theme: pick('.theme-toggle'),
    menu: pick('.menu-toggle'),
    brand: pick('.brand'),
    headerInner: pick('.header-inner'),
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  };
});

await page.screenshot({ path: join(OUT, 'mobile-390-header-v2.png'), fullPage: false });
await page.click('.menu-toggle');
await page.waitForTimeout(650);
const menuSizes = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('.mobile-link')].map((el) => {
    const r = el.getBoundingClientRect();
    return Math.round(r.height);
  });
  const close = document.querySelector('.menu-toggle').getBoundingClientRect();
  return { rows, close: { w: Math.round(close.width), h: Math.round(close.height) } };
});
await page.screenshot({ path: join(OUT, 'mobile-390-menu-v2.png'), fullPage: false });
await ctx.close();

await browser.close();
server.close();

console.log(JSON.stringify({ results, sizes, menuSizes, problems }, null, 2));
