# Active Context

> **Last updated**: 2026-05-09

## Current Focus

- Site-wide search with Pagefind is fully implemented and functional
- All major content types (labs, workshops, writeups, docs) are supported
- Blogs route exists as a placeholder (under construction)

## Recent Changes (since last update 2026-03-14)

### New Features
- **Site-wide search** — Pagefind-powered search with CDN-hosted index, `SearchDialog` component using cmdk/shadcn Command, category filtering (checkboxes), grouped results with sub-results, keyboard navigation footer, `Ctrl+K` shortcut
- **`useSearch` hook** — Lazy-loads pagefind.js from CDN, debounced search (300ms), preload support, constructs subdomain URLs from search metadata
- **Search index builder** — `scripts/build-search-index.ts` walks all CDN content, converts MDX→HTML, builds Pagefind index with category/subCategory filters and path metadata
- **Docs support** — Added `docs` as an allowed subdomain and content type
- **Blogs route** — Added `app/blogs/page.tsx` placeholder (under construction)
- **Mermaid diagrams** — Added `mermaid` package + `remarkMdxMermaid` plugin + client-side `Mermaid` component
- **Zustand theme store** — `useThemeStore` for global dark/light theme state management

### Infrastructure Changes
- **Env variable refactor** — `CDN_DOMAIN` → `NEXT_PUBLIC_CDN_BASE_URL` (now shared/client-accessible), `DOMAIN` → `NEXT_PUBLIC_DOMAIN`
- **Next.js version** — Updated from `^16.2.0-canary.98` to `^16.2.4` (stable)
- **Fumadocs upgrade** — `fumadocs-core` from `^16.6.17` to `^16.8.3`
- **`NextProvider`** — Added `fumadocs-core/framework/next` `NextProvider` in root layout
- **shadcn upgrade** — From `^3.8.5` to `^4.4.0`
- **New npm script** — `build:search` for Pagefind index generation

### Fixes Applied
- Implemented route-level caching revalidation (`export const revalidate = 86400`)
- Extracted shared `buildOgMetadata()` utility to deduplicate metadata logic
- Fixed sitemap priorities, `globals.css` duplicates, and GSAP plugin registration
- Added `generateStaticParams` for known routes and created route-level `error.tsx` boundaries
- Fixed responsive Breadcrumbs collapse logic and React hydration error
- Fixed Pagefind import URL
- **Refactoring:** Centralized CDN fetching into `actions/lib/fetch-cdn.ts` with runtime Zod validation.
- **Refactoring:** Extracted shared logic into `mdx/lib/resolve-content.ts` and related utilities to deduplicate data fetching, MDX processing, and metadata generation across desktop, mobile, and blogs routes.
- **Proxy Optimization:** Fixed `proxy.ts` matcher regex escaping to skip static files natively at Edge, deferred `userAgent` parsing, and removed `env.ts` import to prevent Zod Edge bloat.
- **UI & Performance:** Replaced legacy `favicon.ico` with `icon.svg`. Refactored `Logo` component to use `fill` and `sizes` to resolve aspect ratio and performance warnings. Fixed division-by-zero bug in SVG `<radialGradient>` for `text-hover-effect.tsx`.

## Next Steps

- [x] **Generate project documentation** — Created all 13 doc files in `docs/` following the structure defined in `AGENTS.md`
- [ ] Build out the blogs section (`app/blogs/`) with full functionality
- [ ] Implement mobile-specific layouts under `app/mobile/`
- [ ] Conduct performance audit (Lighthouse, Core Web Vitals)
- [ ] Consider search term highlighting on landing pages (CSS Custom Highlight API)

## Active Decisions

- Memory Bank system adopted for cross-agent context persistence
- **In-repo `docs/` folder** adopted for project documentation (13 numbered Markdown files, must stay in sync with code)
- Component filenames follow kebab-case convention
- Pagefind search index is built offline and hosted on CDN (no server-side search)
- cmdk's internal filtering is disabled (`shouldFilter={false}`) — Pagefind controls all search logic

## Learnings & Insights

- The project is architecturally sound with clean server/client boundaries
- CDN-based content model scales well without database overhead
- Pagefind's CDN-hosted approach works well for static content search without server costs
- `shouldFilter={false}` on cmdk is critical when using external search providers
- `fumadocs-core/framework/next` `NextProvider` is required for fumadocs integration in Next.js 16+
