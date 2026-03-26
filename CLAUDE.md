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

Self-contained single file — all CSS, JS, and Tailwind config are inlined in `index.html`. No external asset files.

- **`index.html`** — Everything: Tailwind config, custom CSS (terminal animations, scrollbar, radial gradients), `copyCode()` JS helper, and all page sections. Uses Tailwind CSS via CDN (`cdn.tailwindcss.com`). The file is minified for production.
- Section order: Hero -> Agentic Loop -> Agents/Skills -> CLAUDE.md -> Setup -> MCPs/Skills -> Orchestrator -> Tips -> Security -> Footer
- Navigation groups: Fundamentals, Practice, Resources

## Conventions

- Styling is done via Tailwind utility classes inline in HTML. Inline `<style>` block is only for animations and effects that Tailwind can't express.
- The dark color scheme uses slate-950 (`#020617`) as the base background with cyan-400/500 as the accent color.
- Navigation uses CSS-only dropdown menus (group-hover pattern), no JS.
- Section IDs (`#loop`, `#collaboration`, `#claudemd`, `#setup`, `#extend-claude`, `#orchestrator`, `#tips`, `#security`) are used for smooth-scroll anchor navigation.
- When editing, work on the unminified source and re-minify with: `npx html-minifier-terser --collapse-whitespace --remove-comments --remove-redundant-attributes --minify-css true --minify-js true index.html -o index.min.html && mv index.min.html index.html`
