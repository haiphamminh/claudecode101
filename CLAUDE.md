# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git

- Default branch: `main`. Always work on and push to `main`.

## Project Overview

This is a static single-page website ("Claude Code 101") — a beginner's guide to Claude Code, agentic workflows, and MCP integrations. There is no build step, bundler, or backend.

## Development

To preview locally, open `index.html` in a browser or use any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

There are no tests, linters, or build commands.

## Architecture

- **`index.html`** — Single-page app with all content sections. Uses Tailwind CSS via CDN (`cdn.tailwindcss.com`). Minified for production.
- **`js/tailwind-config.js`** — Tailwind theme overrides (custom fonts Inter/Fira Code, extended slate and cyan color palette).
- **`js/main.js`** — Minimal JS: `copyCode()` clipboard helper for code snippet buttons.
- **`css/styles.css`** — Custom CSS for terminal typing animations (keyframe-based with staggered delays), radial gradient backgrounds, and scrollbar styling.
- Section order: Hero -> Agentic Loop -> Agents/Skills -> CLAUDE.md -> Setup -> MCPs/Skills -> Orchestrator -> Tips -> Security -> Footer
- Navigation groups: Fundamentals, Practice, Resources

## Conventions

- Styling is done via Tailwind utility classes inline in HTML. Custom CSS in `css/styles.css` is only for animations and effects that Tailwind can't express.
- The dark color scheme uses slate-950 (`#020617`) as the base background with cyan-400/500 as the accent color.
- Navigation uses CSS-only dropdown menus (group-hover pattern), no JS.
- Section IDs (`#loop`, `#collaboration`, `#claudemd`, `#setup`, `#extend-claude`, `#orchestrator`, `#tips`, `#security`) are used for smooth-scroll anchor navigation.
- All files are minified for production. JS via `terser`, CSS via `csso-cli`, HTML via `html-minifier-terser`.
