# Progress

## What Works

- [x] Homepage with 4 GSAP-animated sections (Hero, About, Skills, Certifications)
- [x] Subdomain routing via middleware (`labs.*`, `workshops.*`, `writeups.*`, `og.*`)
- [x] CDN-based MDX content fetching with 24hr cache revalidation
- [x] MDX rendering with Expressive Code, KaTeX, GFM, auto-link headings
- [x] 3-panel resizable layout (Sidebar + Content + TOC)
- [x] Sidebar with React Query, collapsible directory tree, base slug selector
- [x] TOC with scroll spy (Fumadocs)
- [x] Dynamic OG image generation with HMAC-signed tokens
- [x] Async Server Components for Navbar and Footer
- [x] Dark/light theme with animated toggler
- [x] Lenis smooth scrolling
- [x] Mobile/tablet device detection and route rewriting
- [x] SEO: metadata, canonical URLs, sitemap, robots.txt, structured data
- [x] Custom MDX components: callouts, tabs, steps, link hover previews, image zoom, video player

## Known Issues

- Sitemap priorities set to `9.9` (should be `0.0`–`1.0` scale)
- Duplicate `@layer base` blocks in `globals.css`
- GSAP `registerPlugin` called inside component body in `HeroSection.tsx`
- OG metadata logic duplicated across 3 route files
- No `generateStaticParams` — all content pages are dynamically rendered
- `mobile/` route directory exists but mobile-specific pages not yet implemented

## What's Left to Build

- [ ] Mobile-specific layouts under `app/mobile/`
- [ ] `generateStaticParams` for known base routes and slugs
- [ ] Route-level `error.tsx` boundaries
- [ ] Shared metadata utility to deduplicate OG generation
- [ ] Performance audit (Lighthouse, Core Web Vitals)

## Decision History

| Date | Decision | Rationale |
|---|---|---|
| — | CDN over database for content | Static MDX doesn't need a DB; CDN provides edge caching |
| — | Subdomain routing via middleware | Clean URL separation for content types |
| — | React Query for sidebar only | Server components handle all other data; sidebar needs client-side reactivity |
| — | GSAP over CSS animations | Complex scroll-driven timelines not achievable with CSS alone |
| — | Fumadocs integration | Reuse battle-tested TOC and file tree components |
| 2026-03-14 | Memory Bank system adopted | Cross-agent context persistence for all AI coding assistants |
