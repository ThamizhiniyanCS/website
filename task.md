# Task Log

Completed tasks across all sessions, ordered newest first.

---

## 2026-03-14

- [x] Project walkthrough and architecture review
- [x] Created comprehensive `AGENTS.md` workspace rules
- [x] Updated `README.md` with actual project details
- [x] Architecture optimization analysis (identified 6 improvements)
- [x] Implemented Memory Bank documentation system (`memory-bank/`)

### Optimizations

- [x] Extract shared `buildOgMetadata()` utility to deduplicate metadata generation across `[baseRoute]/page.tsx`, `[baseSlug]/page.tsx`, `[...nestedSlug]/page.tsx`, and `mobile/[...nestedSlug]/page.tsx`
- [x] Fix sitemap priorities (`9.9` → `0.9`)
- [x] Merge duplicate `@layer base` blocks in `globals.css`
- [x] Move GSAP `registerPlugin` to module level in `HeroSection.tsx`
- [x] Add `generateStaticParams` for known routes (`labs`, `workshops`, `writeups`)
- [x] Add route-level `error.tsx` boundaries for better error UX

### Caching Fixes

- [x] Add `export const revalidate = 86400` to `app/[baseRoute]/page.tsx`
- [x] Add `export const revalidate = 86400` to `app/[baseRoute]/[baseSlug]/page.tsx`
- [x] Add `export const revalidate = 86400` to `app/[baseRoute]/[baseSlug]/layout.tsx`
- [x] Add `export const revalidate = 86400` to `app/layout.tsx` (navbar/footer data)

### UI Bug Fixes

- [x] Fixed an invalid HTML tag nesting hydration error (`<ol>` > `<span>`) in `<BreadcrumbList>`
- [x] Fixed Breadcrumbs responsive collapse logic (added expand condition) and dropdown wrapping

### Pending Tasks

- [ ] Implement mobile-specific layouts under `app/mobile/`
- [ ] Conduct performance audit (Lighthouse, Core Web Vitals)
