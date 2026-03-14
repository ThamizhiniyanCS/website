# Active Context

> **Last updated**: 2026-03-14

## Current Focus

- Setting up project documentation and AI agent workspace rules
- No active feature development in progress

## Recent Changes

- Created comprehensive `AGENTS.md` workspace rules
- Updated `README.md` with actual project details
- Established Memory Bank documentation system

## Next Steps

- [ ] Address architecture optimizations identified during project review:
  - Extract shared `buildOgMetadata()` utility to deduplicate metadata generation
  - Fix sitemap priorities (`9.9` → `0.9`)
  - Merge duplicate `@layer base` blocks in `globals.css`
  - Move GSAP `registerPlugin` to module level in `HeroSection.tsx`
  - Add `generateStaticParams` for known routes
  - Add route-level `error.tsx` boundaries

## Active Decisions

- Memory Bank system adopted for cross-agent context persistence
- Component filenames follow kebab-case convention

## Learnings & Insights

- The project is architecturally sound with clean server/client boundaries
- CDN-based content model scales well without database overhead
- OG metadata generation logic is duplicated across 3 route files — prime refactor target
