# Claude Code 101

A comprehensive beginner's guide and setup manual for mastering Claude Code, agentic workflows, and MCP integrations from scratch.

## What's Inside

A single-page static website covering:

- **The Agentic Loop** -- How Claude Code autonomously explores, plans, and executes
- **Agents, Skills & Collaboration** -- Lead agents, subagents, and prompt-based skills
- **CLAUDE.md Context** -- Using project onboarding files to prevent AI-generated technical debt
- **Setup Guide** -- Step-by-step CLI installation and authentication
- **Build MCPs & Skills** -- Configuring MCP servers and creating custom skills
- **Orchestrator Pattern** -- Managing polyglot microservices across iOS, Android, Go, and .NET
- **Pro Tips** -- Context management, commit hygiene, and step-by-step prompting
- **Security** -- Sandboxing, human-in-the-loop, and zero data retention

## Preview Locally

No build step required. Open `index.html` directly or use any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

## Project Structure

```
index.html              # Single-page app (minified), Tailwind CSS via CDN
css/styles.css          # Terminal typing animations, radial gradients, scrollbar
js/tailwind-config.js   # Theme overrides (Inter/Fira Code fonts, slate/cyan palette)
js/main.js              # Copy-to-clipboard helper for code snippets
```

## Tech Stack

- [Tailwind CSS](https://tailwindcss.com/) via CDN -- utility-first styling
- [Inter](https://rsms.me/inter/) + [Fira Code](https://github.com/tonsky/FiraCode) -- body and monospace fonts
- CSS-only dropdown navigation (no JS framework)
- Minified with `html-minifier-terser`, `terser`, and `csso-cli`

## License

See [LICENSE](LICENSE) for details.
