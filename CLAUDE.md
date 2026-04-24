# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git

- Default branch: `main`. Always work on and push to `main`.

## Project Overview

This is a static single-page website ("Claude Code 101") — a beginner's guide to Claude Code, agentic workflows, and MCP integrations. There is no build step, bundler, or backend.

## Development

```bash
npm start              # npx serve .
# or
python3 -m http.server 8000
```

Build (optional): `npm run build` — emits `index.min.html`, `js/main.min.js`, `css/styles.min.css`.

No tests. HTML/JS/CSS linting is opt-in via `npm run validate:html` and `npm run lint:links`.

## Architecture

- **`index.html`** — Single-page app. Tailwind CSS via CDN (`cdn.tailwindcss.com`). Minified for production. Contains JSON-LD (`WebSite`, `Organization`, `SoftwareApplication`, `FAQPage`), full OG/Twitter cards, canonical, hreflang.
- **`404.html`** — Branded fallback page served by GitHub Pages on unknown routes.
- **`manifest.json`, `robots.txt`, `sitemap.xml`** — PWA manifest + SEO.
- **`favicon.svg`, `apple-touch-icon.svg`, `og-image.svg`** — Brand assets (inline SVG, scale to any size).
- **`js/tailwind-config.js`** — Theme overrides (Inter/Fira Code, slate/cyan palette).
- **`js/main.js`** — i18n loader (with HTML sanitization, browser locale detection, `<html lang>` sync), copy-to-clipboard + toast, mobile menu toggle (keyboard Escape support), scroll progress, back-to-top, IntersectionObserver-based active nav (`aria-current`).
- **`css/styles.css`** — Animations, scrollbar, scroll progress, back-to-top, mobile menu, copy toast, focus-visible rings, `@media (prefers-reduced-motion)`, `@media print`.
- **`data/en.json`, `data/vi.json`** — i18n strings (keyed by `data-i18n`). Keys MUST match between locales.
- **`data/comparison.json`** — AI coding tool feature matrix.
- **`.github/workflows/pages.yml`** — GitHub Pages deploy on push to `main`.
- Section order: Hero → Agentic Loop → Agents/Skills → CLAUDE.md → Agent Anatomy → Workflow Lifecycle → Setup → MCPs/Skills → **Advanced Config** → Orchestrator → Tips → Security → Comparison → FAQ → Footer
- Navigation groups: Fundamentals, Practice, Resources

## Conventions

- Tailwind utility classes inline in HTML. Custom CSS in `css/styles.css` only for things Tailwind can't express (animations, scrollbar, print, reduced-motion).
- Dark color scheme: slate-950 (`#020617`) base, cyan-400/500 accents.
- Desktop dropdowns use CSS `group-hover` + `group:focus-within` (keyboard accessible). Mobile uses JS-toggled hamburger.
- Section IDs used for smooth-scroll anchor nav with `scroll-padding-top` offset: `#loop`, `#collaboration`, `#claudemd`, `#agent-architecture`, `#agentic-workflow`, `#setup`, `#extend-claude`, `#advanced`, `#orchestrator`, `#tips`, `#security`, `#comparison`, `#faq`.
- **i18n:** When adding a `data-i18n` element, add the key to BOTH `data/en.json` and `data/vi.json`. i18n values may contain HTML (`<strong>`, `<code>`, `<a>`) — they're sanitized in `main.js` (strips `<script>` and `on*=`).
- **A11y checklist:** icon-only buttons have `aria-label`; decorative SVGs have `aria-hidden="true"`; animations respect `prefers-reduced-motion`; keyboard focus uses `:focus-visible`.
- All production files are minified via `terser` (JS), `csso-cli` (CSS), `html-minifier-terser` (HTML).
