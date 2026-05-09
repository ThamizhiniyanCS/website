# 01 — Introduction

**Last Updated**: 2026-05-09

> **Note**: This documentation was generated with the assistance of AI and has been reviewed for accuracy.
> However, mistakes may exist. If you find any errors or inconsistencies, please [raise an issue](https://github.com/ThamizhiniyanCS/website/issues).

## Project Overview

**Thamizhiniyan C S — Personal Website** is a portfolio and content platform for an Ethical Hacker & Web Developer. It serves as a unified hub for:

- **Portfolio** — Animated homepage showcasing skills, certifications, and professional identity
- **Content** — CDN-hosted MDX articles across cybersecurity labs, workshops, CTF writeups, docs, and blogs
- **Search** — Site-wide Pagefind-powered search with category filtering and keyboard navigation
- **SEO** — Dynamic OG image generation, structured data, sitemaps, and subdomain-based canonical URLs

## Tech Stack

| Layer           | Technology                                                    |
| --------------- | ------------------------------------------------------------- |
| Framework       | Next.js 16 (stable) with App Router                           |
| React           | React 19 (RSC by default)                                     |
| Language        | TypeScript (strict mode)                                      |
| Styling         | Tailwind CSS v4, CSS variables (OKLCH colors)                 |
| UI Library      | shadcn/ui (radix-vega style)                                  |
| Animations      | GSAP (ScrollTrigger, SplitText, ScrambleText) + Framer Motion |
| Smooth Scroll   | Lenis                                                         |
| MDX             | `next-mdx-remote-client/rsc` with rehype/remark plugins       |
| Data Fetching   | React Query (TanStack) for client, Server Actions for server  |
| Search          | Pagefind (CDN-hosted index)                                   |
| State Mgmt      | Zustand (theme store)                                         |
| Icons           | Lucide (primary), Phosphor (secondary)                        |
| Env Validation  | `@t3-oss/env-nextjs` + Zod                                    |
| Package Manager | Bun                                                           |

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ThamizhiniyanCS/website.git
cd website

# 2. Install dependencies (Bun only)
bun install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values (see 12-environment-and-config.md)

# 4. Start the dev server
bun run dev

# 5. (Optional) Build search index
bun run build:search
```

### Available Scripts

| Script           | Command                                    | Purpose                              |
| ---------------- | ------------------------------------------ | ------------------------------------ |
| `dev`            | `next dev`                                 | Start development server             |
| `build`          | `next build`                               | Production build                     |
| `build:search`   | `bun run scripts/build-search-index.ts`    | Build Pagefind search index from CDN |
| `analyze`        | `ANALYZE=true next build`                  | Bundle analysis                      |
| `start`          | `next start`                               | Start production server              |
| `lint`           | `eslint`                                   | Run ESLint                           |
| `format`         | `prettier . --write`                       | Format all files with Prettier       |

## Documentation Index

| # | Document | Contents |
|---|----------|----------|
| 01 | [Introduction](./01-introduction.md) | This file — overview, stack, quick-start |
| 02 | [Architecture](./02-architecture.md) | System architecture, high-level diagrams |
| 03 | [Content System](./03-content-system.md) | CDN content model, meta.json, DIRECTORIES |
| 04 | [Routing & Middleware](./04-routing-and-middleware.md) | Subdomain routing, proxy.ts, device detection |
| 05 | [Components](./05-components.md) | Component documentation |
| 06 | [MDX System](./06-mdx-system.md) | MDX pipeline, plugins, custom components |
| 07 | [Search System](./07-search-system.md) | Pagefind build + runtime |
| 08 | [Data Flow](./08-data-flow.md) | Server actions, caching, navigation data |
| 09 | [Styling & Theming](./09-styling-and-theming.md) | Tailwind v4, OKLCH, fonts, Zustand theme |
| 10 | [SEO & Metadata](./10-seo-and-metadata.md) | Metadata, OG images, sitemap, structured data |
| 11 | [Animation System](./11-animation-system.md) | GSAP, Framer Motion, Lenis |
| 12 | [Environment & Config](./12-environment-and-config.md) | Env vars, next.config, build tooling |
| 13 | [Development Guide](./13-development-guide.md) | Local setup, how-tos, conventions |
