# Yasiru Fonseka — Portfolio

A single-page Angular portfolio for Yasiru Fonseka, built from the CV content only.
Standalone components, TypeScript, SCSS. Light/dark theme, responsive from 390px up,
reveal-on-scroll, accessible mobile navigation.

> Status: **draft for review**. Nothing has been deployed or published.

## Requirements

- Node.js 18.13+ / 20 LTS (built and tested with Node 24.15 and Angular 17.3)
- npm 9+

## Run locally

```bash
npm install
npm start
```

Open http://localhost:4200/. `npm start` is `ng serve`; the dev server reloads on save.

## Build

```bash
npm run build
```

Output goes to `dist/portfolio-yasiru/browser/`. Serve it with any static host, e.g.
`npx http-server dist/portfolio-yasiru/browser -p 4300`.

## Screenshots

The `screenshots/` folder was generated with headless Microsoft Edge via Playwright:

```bash
npm run screenshots
```

The script expects `http://127.0.0.1:4300/` to be serving the production build, and Edge at
`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` (override with `EDGE_PATH`,
and the URL with `PORTFOLIO_URL`).

| File | What it shows |
| --- | --- |
| `desktop-1440-hero.png` | Hero, 1440 × 900 |
| `desktop-1440-light.png` | Full page, light theme |
| `desktop-1440-dark.png` | Full page, dark theme |
| `desktop-1440-work.png` | Selected work, 1440 × 900 |
| `desktop-1440-contact.png` | Contact section, 1440 × 900 |
| `tablet-768.png` | Full page, 768 × 1024 |
| `mobile-390.png` | Full page, 390 × 844 |
| `mobile-390-hero.png` | Hero, 390 × 844 |
| `mobile-390-menu.png` | Mobile menu open |
| `mobile-390-header-v2.png` | Header after the 44px tap-target fix, 390 px |
| `mobile-390-menu-v2.png` | Mobile menu open after the fix, 390 px |
| `mobile-500-header-v2.png` | Header at 500 px, mid breakpoint |

## Accessibility check

```bash
npm run build
node scripts/audit.mjs
```

Serves the production build on port 4319, runs axe-core (WCAG 2.0/2.1 A+AA) at 390, 768 and
1440 px in light and dark, prints tap-target sizes, and refreshes the `-v2` screenshots.

## Structure

```
src/
  index.html                  title, meta, fonts, no-flash theme bootstrap
  styles.scss                 design tokens, reset, shared primitives
  app/
    app.component.*           shell: skip link, header, sections, footer
    data/portfolio.ts         all CV-derived content in one typed file
    services/theme.service.ts light/dark theme + localStorage
    services/clock.service.ts Colombo local time
    directives/reveal.directive.ts  IntersectionObserver reveal (reduced-motion aware)
    components/
      header/                 sticky nav, theme toggle, mobile menu
      hero/                   oversized headline, stats, CTAs
      about/                  summary, focus, quick facts
      work/                   three project cards with stack tags + detail
      process/                five-step working process
      skills/                 grouped skill grid
      experience/             timeline
      education/              degrees + certifications
      contact/                email, phone, location, live time, copy button
      footer/                 links, local time, back to top
```

All copy lives in `src/app/data/portfolio.ts`; edit there rather than in templates.

## Accessibility

- One `h1`, section `h2`s, card `h3`s; no heading levels skipped.
- Skip link, visible `:focus-visible` outlines, keyboard-operable mobile menu (`Escape` closes,
  `aria-expanded` tracked, background scroll locked).
- Axe-core (WCAG 2.0/2.1 A + AA) reports **0 violations** at 390, 768 and 1440 px in both
  light and dark themes.
- Reveal animations are disabled under `prefers-reduced-motion: reduce`.
- No horizontal overflow at 390, 768, 1024 or 1440 px.

## Before publishing — TODOs

1. ~~**GitHub URL**~~ — added: `https://github.com/yasirufonseka` in `SOCIAL_LINKS`.
2. ~~**LinkedIn URL**~~ — added: `https://www.linkedin.com/in/yasiru-fonseka-3a7798287`.
3. **Project links** — the CV lists no live/demo/repository URLs, so none are linked. Add
   `url` fields to `PROJECTS` and a link in `work.component.html` if they exist.
4. **Contact photo** — no photo is used (none supplied). Add one to `src/assets/` and place it
   in the About section if wanted.
5. **Privacy** — the CV's two referees are deliberately not on the site. Do not add them
   without their consent.

## Notes

- Fonts: Space Grotesk + Inter from Google Fonts, with system fallbacks. For fully offline
  hosting, self-host the two font families and drop the `<link>` tags in `index.html`.
- Theme preference is stored in `localStorage` under `yf-theme`.
- Content is taken verbatim from the supplied CV; no metrics, testimonials, client names or
  project outcomes were invented.
