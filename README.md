# Thamizhiniyan C S — Personal Website

A personal portfolio and content platform built with **Next.js 16**, **React 19**, and **TypeScript**. Showcases cybersecurity labs, workshops, and writeups through a CDN-powered MDX content system with a polished, dark-mode-first design.

## Tech Stack

| Layer           | Technology                                                    |
| --------------- | ------------------------------------------------------------- |
| Framework       | Next.js 16 (canary) with App Router                           |
| React           | React 19 (RSC by default)                                     |
| Language        | TypeScript (strict mode)                                      |
| Styling         | Tailwind CSS v4, OKLCH color variables                        |
| UI Library      | shadcn/ui (radix-vega)                                        |
| Animations      | GSAP (ScrollTrigger, SplitText, ScrambleText) + Framer Motion |
| Smooth Scroll   | Lenis                                                         |
| MDX             | next-mdx-remote-client/rsc with rehype/remark plugins         |
| Data Fetching   | React Query (TanStack) + Server Actions                       |
| Env Validation  | @t3-oss/env-nextjs + Zod                                      |
| Package Manager | Bun                                                           |

## Features

- **Animated Portfolio Homepage** — GSAP-powered hero with ScrambleText, MatrixRain overlay, scroll-triggered About/Skills/Certifications sections
- **CDN-based Content System** — MDX content fetched from an external CDN with 24hr cache revalidation
- **Subdomain Routing** — `labs.*`, `workshops.*`, `writeups.*` subdomains routed via middleware with mobile detection
- **3-Panel Resizable Layout** — Sidebar, MDX content, and TOC with scroll spy for content pages
- **Dynamic OG Images** — HMAC-signed token-based OpenGraph image generation via `og.*` subdomain with unified metadata utilities
- **Performance Optimized** — `generateStaticParams` for known routes, route-level caching revalidation, and isolated GSAP plugin registration
- **Robust Error Handling** — Route-level `error.tsx` boundaries for graceful failure on CDN/content missing
- **Rich MDX Components** — Expressive Code syntax highlighting, KaTeX math, callouts, tabs, link hover previews, image zoom, video player, and responsive breadcrumbs
- **Dark Mode First** — OKLCH color system with animated theme toggler

## Project Structure

```
app/                    # Next.js App Router
├── (home)/             # Homepage sections (Hero, About, Skills, Certifications)
├── [baseRoute]/        # Content listing pages
│   └── [baseSlug]/     # Category pages with 3-panel layout
│       └── [...nestedSlug]/  # MDX content or directory pages
├── api/og/             # OpenGraph image generation
└── mobile/             # Mobile-specific rewrites
actions/                # Server Actions (CDN data fetching)
components/             # UI components (shadcn, navbar, footer, sidebar)
mdx/                    # MDX processing pipeline and custom components
lib/                    # Config, constants, data, utils
types/                  # TypeScript type definitions
schemas/                # Zod validation schemas
utils/                  # URL helpers, OG token, font loader
hooks/                  # Custom React hooks
proxy.ts                # Subdomain middleware
env.ts                  # Environment validation
```

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Production build
bun run build

# Lint
bun run lint

# Format
bun run format
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file with:

```env
DOMAIN=localhost:3000
CDN_DOMAIN=<your-cdn-domain>
OG_SECRET=<your-og-secret>
```

## License

© Thamizhiniyan C S. All rights reserved.
