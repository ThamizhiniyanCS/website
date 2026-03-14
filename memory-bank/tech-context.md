# Tech Context

## Core Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | ^16.2.0-canary.98 | Framework (App Router, RSC, middleware) |
| react / react-dom | 19.2.3 | UI library |
| typescript | ^5.9.3 | Language |
| tailwindcss | ^4.2.1 | Styling (v4 with `@theme inline`, `@utility`) |
| gsap + @gsap/react | ^3.14.2 / ^2.1.2 | Animations (ScrollTrigger, SplitText, ScrambleText) |
| motion | ^12.36.0 | Framer Motion for simpler animations |
| lenis | ^1.3.18 | Smooth scrolling |
| next-mdx-remote-client | ^2.1.9 | RSC MDX rendering |
| @tanstack/react-query | ^5.90.21 | Client-side data fetching |
| zod | ^4.3.6 | Schema validation |
| @t3-oss/env-nextjs | ^0.13.10 | Env variable validation |
| fumadocs-core | ^16.6.17 | TOC types + MDX plugins |
| react-resizable-panels | ^3.0.6 | 3-panel content layout |
| shadcn | ^3.8.5 | UI component CLI |
| rehype-expressive-code | ^0.41.7 | Syntax highlighting in MDX |
| rehype-katex / remark-math | ^7.0.1 / ^6.0.0 | LaTeX math rendering |

## Development Setup

```bash
# Package manager: Bun (NOT npm/yarn/pnpm)
bun install
bun run dev        # Dev server at localhost:3000
bun run build      # Production build
bun run lint       # ESLint
bun run format     # Prettier
```

## Environment Variables (`env.ts`)

| Variable | Type | Default | Purpose |
|---|---|---|---|
| `NODE_ENV` | enum | `"development"` | Environment mode |
| `DOMAIN` | string | `"localhost:3000"` | Main domain for URL generation |
| `CDN_DOMAIN` | string | `"localhost:8000"` | CDN domain for content fetching |
| `OG_SECRET` | string | *(required)* | HMAC secret for OG image tokens |

## Build & Tooling Config

- **TypeScript**: strict mode, bundler module resolution, `@/*` path alias
- **ESLint**: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- **Prettier**: no semicolons, double quotes, trailing comma es5, Tailwind + import sorting plugins
- **PostCSS**: `@tailwindcss/postcss` plugin
- **shadcn/ui**: radix-vega style, zinc base color, CSS variables, lucide icons
- **Fumadocs CLI**: `cli.json` for fumadocs component generation

## Technical Constraints

1. **Next.js 16 canary** — Bleeding edge; some APIs may change. Always check `node_modules/next/dist/docs/`
2. **CDN dependency** — Content pages fail gracefully if CDN is unreachable (returns error components)
3. **Subdomain routing** — Requires wildcard DNS or hosts file entries for local development
4. **GSAP licensing** — GSAP plugins (SplitText, ScrambleText) require a GSAP license for production use
5. **No ISR on dynamic routes** — Currently using `cache: "force-cache"` + 24hr revalidation; no `generateStaticParams`

## MCP Servers

- `next-devtools`: `bunx next-devtools-mcp@latest` — Next.js dev tools integration
