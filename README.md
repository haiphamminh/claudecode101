# Claude Code 101

A comprehensive beginner's guide and setup manual for mastering Claude Code, agentic workflows, and MCP integrations from scratch.

Live: <https://haiphamminh.github.io/claudecode101/>

## What's Inside

A single-page static website covering:

- **The Agentic Loop** — How Claude Code autonomously explores, plans, and executes
- **Agents, Skills & Collaboration** — Lead agents, subagents, and prompt-based skills
- **CLAUDE.md Context** — Using project onboarding files to prevent AI-generated technical debt
- **Setup Guide** — Step-by-step CLI installation and authentication
- **Build MCPs & Skills** — Configuring MCP servers and creating custom skills
- **Advanced Configuration** — Hooks, permission modes, custom slash commands, worktrees, memory hierarchy
- **Orchestrator Pattern** — Managing polyglot microservices across iOS, Android, Go, and .NET
- **Pro Tips** — Context management, commit hygiene, and step-by-step prompting
- **Security** — Sandboxing, human-in-the-loop, and zero data retention
- **Tool Comparison** — Claude Code vs. GitHub Copilot, Cursor, Windsurf, Cline, Aider (live GitHub stats)
- **FAQ** — Common questions and troubleshooting tips

## Preview Locally

No build step required.

```bash
npm start
# or
npx serve .
# or
python3 -m http.server 8000
```

## Project Structure

```
index.html              Main page (minified for production)
404.html                GitHub Pages fallback page
manifest.json           PWA manifest
robots.txt              Crawler rules
sitemap.xml             Search engine index
favicon.svg             Brand icon
apple-touch-icon.svg    iOS home-screen icon
og-image.svg            Social share card (1200x630)
css/styles.css          Animations, scrollbar, print, prefers-reduced-motion
js/main.js              i18n, copy-to-clipboard, scroll progress, nav observer, copy toast
js/tailwind-config.js   Theme overrides (Inter/Fira Code, slate/cyan)
data/en.json, vi.json   i18n strings
data/comparison.json    AI coding tool feature matrix
```

## Build

```bash
npm install
npm run build
```

## Tech Stack

- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Inter](https://rsms.me/inter/) + [Fira Code](https://github.com/tonsky/FiraCode) fonts
- CSS-only dropdown navigation
- Minified with `html-minifier-terser`, `terser`, `csso-cli`
- JSON-LD structured data (`FAQPage`, `SoftwareApplication`, `WebSite`)
- PWA-ready (manifest + icons)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

See [LICENSE](LICENSE) for details.
