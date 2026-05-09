# Progress

## What Works

- [x] Homepage with 4 GSAP-animated sections (Hero, About, Skills, Certifications)
- [x] Subdomain routing via middleware (`labs.*`, `workshops.*`, `writeups.*`, `docs.*`, `blogs.*`, `og.*`)
- [x] CDN-based MDX content fetching with 24hr cache revalidation
- [x] MDX rendering with Expressive Code (tokyo-night theme), KaTeX, GFM, auto-link headings, mermaid diagrams
- [x] 3-panel resizable layout (Sidebar + Content + TOC)
- [x] Sidebar with React Query, collapsible directory tree, base slug selector, variant support (directory vs default)
- [x] TOC with scroll spy (Fumadocs) — desktop and mobile variants
- [x] Dynamic OG image generation with HMAC-signed tokens
- [x] Async Server Components for Navbar and Footer
- [x] Dark/light theme with animated toggler + Zustand theme store
- [x] Lenis smooth scrolling
- [x] Mobile/tablet device detection and route rewriting
- [x] SEO: metadata, canonical URLs, sitemap, robots.txt, structured data
- [x] Shared `buildOgMetadata` utility to deduplicate OG generation
- [x] Corrected sitemap priorities (`0.9` scale)
- [x] Cleaned up `globals.css` duplicate layers
- [x] GSAP plugin registration optimized in `HeroSection.tsx`
- [x] Data caching and revalidation fixed across layout/route boundaries
- [x] `generateStaticParams` for known base routes and slugs
- [x] Route-level `error.tsx` boundaries implemented
- [x] Fixed Breadcrumbs responsive collapse logic and `DropdownMenu` hydration mismatch
- [x] **Site-wide search** using Pagefind with CDN-hosted index
- [x] **Search dialog** with cmdk — category filtering, grouped results, keyboard navigation, `Ctrl+K` shortcut
- [x] **`useSearch` hook** — lazy init, debounced search, preload, subdomain URL construction
- [x] **Search index builder** — `scripts/build-search-index.ts` (MDX→HTML pipeline, Pagefind index output)
- [x] **Docs subdomain** support added
- [x] **Mermaid diagram** rendering in MDX content
- [x] **Zustand** state management for theme
- [x] **Link hover cards** — OG metadata preview with iframe embed detection
- [x] **Rich MDX components** — Callout, Steps, Video (media-chrome), Image (zoom), Mermaid, Tabs, Carousel, File/Folder trees
- [x] **Env variable refactored** to `NEXT_PUBLIC_*` for client-side access
- [x] **NextProvider** from fumadocs-core integrated at root layout
- [x] **Reading time estimation** for MDX content

## Known Issues

- `mobile/` route directory exists but mobile-specific pages not yet implemented
- `blogs/` page is a placeholder ("Under Construction")

## What's Left to Build

- [x] **Generate project documentation** — Created all 13 doc files in `docs/` per `AGENTS.md` structure
- [ ] Full blogs section with MDX support
- [ ] Mobile-specific layouts under `app/mobile/`
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] Search term highlighting on landing pages (CSS Custom Highlight API)

## Decision History

| Date       | Decision                             | Rationale                                                                     |
| ---------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| —          | CDN over database for content        | Static MDX doesn't need a DB; CDN provides edge caching                       |
| —          | Subdomain routing via middleware     | Clean URL separation for content types                                        |
| —          | React Query for sidebar only         | Server components handle all other data; sidebar needs client-side reactivity |
| —          | GSAP over CSS animations             | Complex scroll-driven timelines not achievable with CSS alone                 |
| —          | Fumadocs integration                 | Reuse battle-tested TOC, file tree, and MDX plugins                           |
| 2026-03-14 | Memory Bank system adopted           | Cross-agent context persistence for all AI coding assistants                  |
| 2026-04-20 | Pagefind for site-wide search        | CDN-hosted index, zero server cost, offline build, fast client-side search    |
| 2026-04-20 | cmdk `shouldFilter={false}`          | External Pagefind controls all search logic, cmdk provides only UI shell      |
| 2026-04-20 | Zustand for theme state              | Lightweight, minimal boilerplate, no provider needed                          |
| 2026-04-20 | Env vars → `NEXT_PUBLIC_*` prefix    | Client-side access needed for CDN URL in `useSearch` hook                     |
| 2026-04-20 | Mermaid via fumadocs plugin          | `remarkMdxMermaid` from fumadocs-core for consistent MDX integration          |
| 2026-04-23 | Docs + Blogs subdomains added        | Expanding content types beyond labs/workshops/writeups                        |
| 2026-04-25 | In-repo `docs/` folder adopted       | 13 numbered Markdown files, Mermaid diagrams, must stay in sync with code changes |
