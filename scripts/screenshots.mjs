import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4300/';
const OUT = resolve('screenshots');
const EDGE = process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE });
const problems = [];

async function openPage(width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
  page.on('response', (r) => {
    if (r.status() >= 400) problems.push(`HTTP ${r.status()} ${r.url()}`);
  });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
}

async function shot(name, width, height, { fullPage = true, prep, scrollTo } = {}) {
  const { context, page } = await openPage(width, height);
  if (scrollTo) {
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView(), scrollTo);
    await page.waitForTimeout(350);
  }
  if (prep) await prep(page);
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage });
  await context.close();
}

await shot('desktop-1440-light', 1440, 900);
await shot('desktop-1440-hero', 1440, 900, { fullPage: false });
await shot('desktop-1440-dark', 1440, 900, {
  prep: async (page) => {
    await page.click('.theme-toggle');
    await page.waitForTimeout(450);
  },
});
await shot('tablet-768', 768, 1024);
await shot('desktop-1440-work', 1440, 900, { fullPage: false, scrollTo: '#work' });
await shot('desktop-1440-contact', 1440, 900, { fullPage: false, scrollTo: '#contact' });
await shot('mobile-390', 390, 844);
await shot('mobile-390-hero', 390, 844, { fullPage: false });
await shot('mobile-390-menu', 390, 844, {
  fullPage: false,
  prep: async (page) => {
    await page.click('.menu-toggle');
    await page.waitForTimeout(600);
  },
});

await browser.close();
console.log(problems.length ? `Problems:\n${problems.join('\n')}` : 'No page errors or failed requests.');
