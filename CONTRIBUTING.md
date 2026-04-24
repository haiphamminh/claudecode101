# Contributing

Thanks for your interest in improving Claude Code 101. This is a static single-page site — no backend, no build step required for local dev.

## Local development

```bash
npx serve .
# or
python3 -m http.server 8000
# or
npm start
```

Open `http://localhost:8000` (or whatever port the server prints).

## Project layout

```
index.html              Main page (production is minified inline)
404.html                GitHub Pages fallback
manifest.json           PWA manifest
robots.txt, sitemap.xml SEO
favicon.svg             Brand icon (inline SVG, scales to any size)
og-image.svg            Social share card (1200x630)
css/styles.css          Animations, scrollbar, reduced-motion, print
js/main.js              i18n, copy-to-clipboard, scroll progress, nav observer
js/tailwind-config.js   Tailwind theme overrides
data/en.json, vi.json   i18n strings (keyed by data-i18n attribute)
data/comparison.json    AI coding tool feature matrix
.github/workflows/      GitHub Pages deploy
```

## How to contribute

1. **Typos, links, small fixes** — open a PR directly.
2. **Content additions** — open an issue first so we can align on scope.
3. **Translations** — new languages are welcome. Add `data/<locale>.json` with the same key set as `en.json`, then register it in the language switcher (`js/main.js`).
4. **Translations updates** — when you add or change an English string, mirror the change in `data/vi.json`.

### i18n keys

Translation strings are keyed by the `data-i18n` attribute on the element. Keys are namespaced by section (e.g., `hero.title_line1`, `faq.q1`). The values may contain HTML (`<strong>`, `<code>`, `<a>`) — keep them identical across locales.

When you add a new `data-i18n` element, add the matching key to **both** `data/en.json` and `data/vi.json`.

### Styling

We use Tailwind utilities inline. Only add to `css/styles.css` for things Tailwind can't express: animations, scrollbar, print, reduced-motion.

## Accessibility checklist (before merging)

- [ ] New interactive elements have keyboard focus states.
- [ ] Icon-only buttons have `aria-label`.
- [ ] Images / decorative SVGs have `alt` or `aria-hidden="true"`.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] Color contrast on text is at least 4.5:1.

## Build (production)

```bash
npm install
npm run build
```

Outputs minified `index.min.html`, `js/main.min.js`, `css/styles.min.css`. GitHub Pages currently deploys the source files directly — running `build` locally before a release is optional.

## Commit style

Short, imperative summary. Examples:

- `Fix mobile nav overlap on iOS Safari`
- `Add FAQ section about /fast mode`
- `Improve FR translation for setup section`
