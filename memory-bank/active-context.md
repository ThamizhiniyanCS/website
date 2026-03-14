# Active Context

> **Last updated**: 2026-03-14

## Current Focus

- Setting up project documentation and AI agent workspace rules
- No active feature development in progress

## Recent Changes

- Created comprehensive `AGENTS.md` workspace rules
- Updated `README.md` with actual project details
- Established Memory Bank documentation system

- Implemented route-level caching revalidation (`export const revalidate = 86400`)
- Extracted shared `buildOgMetadata()` utility to deduplicate metadata logic
- Fixed sitemap priorities, `globals.css` duplicates, and GSAP plugin registration
- Added `generateStaticParams` for known routes and created route-level `error.tsx` boundaries
- Fixed responsive Breadcrumbs collapse logic and a severe React hydration error caused by invalid HTML nesting (`<ol>` > `<span>`)

## Next Steps

- [ ] Implement mobile-specific layouts under `app/mobile/`
- [ ] Conduct performance audit (Lighthouse, Core Web Vitals)

## Active Decisions

- Memory Bank system adopted for cross-agent context persistence
- Component filenames follow kebab-case convention

## Learnings & Insights

- The project is architecturally sound with clean server/client boundaries
- CDN-based content model scales well without database overhead
- OG metadata generation logic is duplicated across 3 route files — prime refactor target
