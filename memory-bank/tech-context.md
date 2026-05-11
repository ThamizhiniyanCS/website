# Tech Context

## Core Dependencies

| Package                    | Version          | Purpose                                                                          |
| -------------------------- | ---------------- | -------------------------------------------------------------------------------- |
| next                       | ^16.2.4          | Framework (App Router, RSC, middleware)                                          |
| react / react-dom          | 19.2.4           | UI library                                                                       |
| typescript                 | ^5.9.3           | Language                                                                         |
| tailwindcss                | ^4.2.4           | Styling (v4 with `@theme inline`, `@utility`)                                    |
| gsap + @gsap/react         | ^3.15.0 / ^2.1.2 | Animations (ScrollTrigger, SplitText, ScrambleText)                              |
| motion                     | ^12.38.0         | Framer Motion for simpler animations                                             |
| lenis                      | ^1.3.23          | Smooth scrolling                                                                 |
| next-mdx-remote-client     | ^2.1.10          | RSC MDX rendering                                                                |
| @tanstack/react-query      | ^5.99.2          | Client-side data fetching (sidebar)                                              |
| zod                        | ^4.3.6           | Schema validation                                                                |
| @t3-oss/env-nextjs         | ^0.13.11         | Env variable validation                                                          |
| fumadocs-core              | ^16.8.3          | TOC types, MDX plugins (remarkMdxFiles, remarkMdxMermaid), framework integration |
| react-resizable-panels     | ^3.0.6           | 3-panel content layout                                                           |
| shadcn                     | ^4.4.0           | UI component CLI                                                                 |
| rehype-expressive-code     | ^0.41.7          | Syntax highlighting (tokyo-night theme + line numbers)                           |
| rehype-katex / remark-math | ^7.0.1 / ^6.0.0  | LaTeX math rendering                                                             |
| cmdk                       | ^1.1.1           | Command palette / search UI                                                      |
| pagefind                   | ^1.5.2 (dev)     | Offline search index builder                                                     |
| zustand                    | ^5.0.12          | Lightweight state management (theme store)                                       |
| cheerio                    | ^1.2.0           | HTML parsing for link metadata extraction                                        |
| mermaid                    | ^11.14.0         | Mermaid diagram rendering in MDX                                                 |
| media-chrome               | ^4.19.0          | Video player UI (kibo-ui video-player)                                           |
| react-medium-image-zoom    | ^5.4.3           | Image zoom (kibo-ui image-zoom)                                                  |
| reading-time-estimator     | ^2.6.0           | Reading time calculation for MDX content                                         |
| radix-ui                   | ^1.4.3           | UI primitives (via shadcn)                                                       |
| @base-ui/react             | ^1.4.1           | Base UI components                                                               |

## Development Setup

```bash
# Package manager: Bun (NOT npm/yarn/pnpm)
bun install
bun run dev           # Dev server at localhost:3000
bun run build         # Production build
bun run build:search  # Build Pagefind search index from CDN content
bun run analyze       # Bundle analysis (ANALYZE=true next build)
bun run lint          # ESLint
bun run format        # Prettier
```

## Environment Variables (`env.ts`)

| Variable                   | Type   | Default                   | Purpose                           |
| -------------------------- | ------ | ------------------------- | --------------------------------- |
| `NODE_ENV`                 | enum   | `"development"`           | Environment mode                  |
| `NEXT_PUBLIC_DOMAIN`       | string | `"localhost:3000"`        | Main domain for URL generation    |
| `NEXT_PUBLIC_CDN_BASE_URL` | string | `"http://localhost:8000"` | CDN base URL for content fetching |
| `OG_SECRET`                | string | _(required)_              | HMAC secret for OG image tokens   |

Note: `NEXT_PUBLIC_DOMAIN` and `NEXT_PUBLIC_CDN_BASE_URL` are shared env variables (available in both server and client). `CDN_DOMAIN` was renamed to `NEXT_PUBLIC_CDN_BASE_URL` for client-side access.

## Build & Tooling Config

- **TypeScript**: strict mode, bundler module resolution, `@/*` path alias
- **ESLint**: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- **Prettier**: no semicolons, double quotes, trailing comma es5, Tailwind + import sorting plugins
- **PostCSS**: `@tailwindcss/postcss` plugin
- **shadcn/ui**: radix-vega style, zinc base color, CSS variables, lucide icons
- **Fumadocs CLI**: `cli.json` for fumadocs component generation
- **Next.js config**: `images.remotePatterns` for CDN and jsDelivr domains, uses `new URL()` pattern

## Technical Constraints

1. **Next.js 16 stable** — Uses `^16.2.4` (stable, not canary). Always check `node_modules/next/dist/docs/`
2. **CDN dependency** — Content pages fail gracefully if CDN is unreachable (returns error components)
3. **Subdomain routing** — Requires wildcard DNS or hosts file entries for local development
4. **GSAP licensing** — GSAP plugins (SplitText, ScrambleText) require a GSAP license for production use
5. **Static Generation & Caching** — Using `generateStaticParams` for known base routes, combined with route-level `export const revalidate = 86400` and `cache: "force-cache"` for dynamic MDX content.
6. **Pagefind CDN-hosted** — Search index is built offline (`bun run build:search`) and uploaded to CDN at `/pagefind/`. Client loads `pagefind.js` dynamically.
7. **Fumadocs framework** — `NextProvider` from `fumadocs-core/framework/next` wraps the app at root layout level

## MCP Servers

- `next-devtools`: `bunx next-devtools-mcp@latest` — Next.js dev tools integration

## Project File Structure

```
app/
├── (home)/                          # Homepage — portfolio sections
│   ├── page.tsx                     # Home page (Hero, About, Skills, Certs)
│   ├── HeroSection.tsx              # GSAP-animated hero (client)
│   ├── AboutSection.tsx             # About section (client)
│   ├── SkillsSection.tsx            # Skills grid (client)
│   ├── professional-certifications.tsx  # Certifications section (client)
│   └── loading.tsx                  # Loading skeleton
├── blogs/                           # Blog pages (under construction)
│   └── page.tsx
├── [baseRoute]/                     # Content listing pages
│   ├── page.tsx                     # Base route listing
│   ├── error.tsx / loading.tsx
│   └── [baseSlug]/                  # 3-panel layout
│       ├── layout.tsx               # Resizable panels + sidebar
│       ├── page.tsx                 # MDX content or directory listing
│       ├── error.tsx / loading.tsx
│       └── [...nestedSlug]/         # Deep nested MDX content
│           └── page.tsx
├── api/og/                          # OG image generation
├── mobile/                          # Mobile-specific rewrites (placeholder)
├── layout.tsx                       # Root layout: fonts, Lenis, Navbar, Footer, NextProvider, Providers
├── providers.tsx                    # Client: React Query + ReactQueryDevtools
├── globals.css                      # Tailwind v4 + shadcn theme + custom utilities
├── sitemap.ts / robots.ts / opengraph-image.tsx / not-found.tsx / error.tsx / loading.tsx
actions/
├── can-embed-in-iframe.ts           # HEAD request to check X-Frame-Options/CSP
├── fetch-link-metadata.ts           # OG metadata extraction with cheerio (40KB cap)
├── get-links.ts                     # Navigation links from CDN meta.json (docs, labs, workshops, writeups)
├── get-meta-json.ts                 # Fetch meta.json from CDN
├── get-socials.ts                   # Fetch socials.json from CDN
├── is-external-link.ts              # Check if URL is external to domain
components/
├── footer/index.tsx                 # Async server component footer
├── navbar/                          # Async server component navbar
│   ├── index.tsx                    # Server: fetches links + socials
│   └── nav-menu.tsx                 # Client: NavigationMenu with mega-menu
├── sidebar/                         # Client component with React Query
│   ├── index.tsx                    # SidebarContext + layout
│   ├── base-slug-selector.tsx       # Dropdown to switch base slug
│   ├── collapsible-directory.tsx    # Recursive directory tree
│   ├── collapsible-directory-content.tsx
│   └── file.tsx                     # File link item
├── search-dialog.tsx                # Pagefind search UI (cmdk + shadcn Command)
├── scroll-to-top.tsx                # Scroll-to-top button
├── logo.tsx                         # Logo component (light/dark variants)
├── matrix-rain.jsx                  # Canvas-based matrix rain effect
├── ui/                              # 33 shadcn/ui components
├── fumadocs-ui/files.tsx            # Fumadocs file tree component
├── kibo-ui/image-zoom/              # Image zoom (react-medium-image-zoom)
├── kibo-ui/video-player/            # Video player (media-chrome)
├── magic-ui/animated-theme-toggler.tsx  # Theme toggle animation
├── magic-ui/magic-card.tsx          # Animated card component
├── unizoy-ui/text-hover-effect.tsx  # Text hover effect
mdx/
├── components/
│   ├── mdx-breadcrumbs/             # Responsive breadcrumbs
│   ├── mdx-toc/                     # TOC with scroll spy (fumadocs)
│   │   ├── index.tsx / clerk.tsx / hooks.tsx / mobile.tsx / skeleton.tsx
│   ├── ui/                          # MDX-specific components
│   │   ├── index.tsx                # MdxComponents factory (maps all custom + native elements)
│   │   ├── callout.tsx              # Admonition/callout boxes
│   │   ├── external-link.tsx        # External link with icon
│   │   ├── internal-link.tsx        # Internal link component
│   │   ├── image.tsx                # CDN-resolved images with zoom
│   │   ├── video.tsx                # CDN-resolved video player
│   │   ├── mermaid.tsx              # Client-side mermaid diagram rendering
│   │   ├── steps.tsx                # Step/Steps components
│   │   └── link-hover-card/         # OG metadata preview on hover
│   │       ├── index.tsx            # Server: fetches metadata + iframe check
│   │       ├── link-preview.tsx     # Client: hover card UI
│   │       └── embed-iframe.tsx     # Iframe embed component
│   ├── mdx-renderer.tsx             # MDX content renderer
│   ├── mdx-directory-contents-renderer.tsx  # Directory listing
│   ├── mdx-previous-next-buttons.tsx # Prev/Next navigation
│   ├── mdx-structured-data.tsx      # JSON-LD structured data
│   ├── mdx-error-component.tsx      # Error display
│   ├── mdx-loading-component.tsx    # Loading state
│   └── mdx-loading-skeleton.tsx     # Loading skeleton
├── utils/process-mdx.ts             # MDX processing pipeline (React.cache wrapped)
├── types/                           # Frontmatter + Scope types
hooks/
├── use-mobile.ts                    # Mobile detection hook
├── use-search.ts                    # Pagefind search hook (lazy init, debounced search, preload)
├── zustand/use-theme-store.ts       # Zustand theme state store
lib/
├── config.ts                        # Site metadata config (title, description, keywords)
├── constants.ts                     # PROTOCOL, BASE_URL, CDN_BASE_URL, ALLOWED_SUBDOMAINS, BASE_ROUTES, DIRECTORIES
├── lenis.tsx                        # Lenis smooth scroll setup
├── skills.ts                        # Skills data
├── certifications.ts                # Certifications data
├── utils.ts                         # cn() utility
types/                               # TypeScript type definitions
├── certifications.type.ts / links.type.ts / meta-json.type.ts / pagefind.type.ts / skills.type.ts / socials.type.ts
schemas/
├── meta-json.schema.ts              # Zod schema (discriminated union: file | directory)
scripts/
├── build-search-index.ts            # Pagefind index builder (walks CDN, MDX→HTML, outputs index)
utils/
├── build-og-metadata.ts / generate-url.ts / get-og-token.ts / is-full-url.ts / load-google-font.ts
proxy.ts                             # Subdomain middleware
env.ts                               # @t3-oss/env-nextjs validation
```
