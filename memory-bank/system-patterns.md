# System Patterns

## Architecture Overview

```
Browser Request
    │
    ├── Subdomain? (labs.*, workshops.*, writeups.*, og.*)
    │   └── proxy.ts middleware
    │       ├── Mobile/Tablet → /mobile/{subdomain}/...
    │       └── Desktop → /{subdomain}/...
    │
    └── Main domain
        └── Next.js App Router
            ├── (home)/ → Portfolio sections
            ├── [baseRoute]/ → Content listing
            │   └── [baseSlug]/ → 3-panel layout
            │       └── [...nestedSlug]/ → MDX or directory
            └── api/og/ → OG image generation
```

## Routing Model

### Subdomain Proxy (`proxy.ts`)
- Middleware intercepts subdomain requests before they hit the App Router
- Rewrites `labs.domain.com/path` → `/labs/path` internally
- Detects mobile/tablet via `userAgent()` and routes to `/mobile/` prefix
- Sets security headers (CSP, X-Frame-Options, etc.) on all responses
- Allowed subdomains defined in `lib/constants.ts` → `ALLOWED_SUBDOMAINS` Set

### Dynamic Route Hierarchy
```
[baseRoute]          → "labs" | "workshops" | "writeups"
  [baseSlug]         → First-level category (e.g., "tryhackme")
    [...nestedSlug]  → Deep nesting (e.g., "room-name/task-1")
```

## Data Flow

### Content Resolution
1. Server action `getMetaJSON(cdnPathname)` fetches `meta.json` from CDN
2. If `meta.json` exists → Page is a **directory** → render directory listing
3. If `meta.json` doesn't exist → Page is **content** → fetch `.mdx` file
4. MDX suffix convention: `DIRECTORIES` set routes use `/index.mdx`, others use `.mdx`

### MDX Processing Pipeline
```
CDN (.mdx file)
    → fetch with 24hr cache
    → cachedProcessMDX() (React.cache wrapped)
        → remark plugins: GFM, Math, FlexibleTOC, NormalizeHeadings, MdxFiles
        → rehype plugins: UnwrapImages, ExpressiveCode, KaTeX, Slug, AutoLinkHeadings
    → MdxRenderer component
        → Custom MDX components (links, images, videos, callouts, tabs, etc.)
```

### Navigation Data
- `getLinks()` server action fetches meta.json for all 3 content types (labs, workshops, writeups)
- Builds navigation links with `generateURL()` helper
- Used by both Navbar and Footer (async Server Components)

## Component Patterns

### Server vs Client Boundary
| Server Components | Client Components |
|---|---|
| Navbar, Footer | HeroSection, AboutSection, SkillsSection, CertificationsSection |
| All page.tsx files | Sidebar (React Query) |
| MdxRenderer, MdxBreadcrumbs | ScrollToTop, AnimatedThemeToggler |
| DirectoryContentsRenderer | MatrixRain |

### 3-Panel Layout (`react-resizable-panels`)
- Layout defined in `[baseSlug]/layout.tsx`
- Left panel: Sidebar (order 1, 20%, min 10%)
- Center panel: Content (order 2, 60%, min 40%) — rendered by page.tsx
- Right panel: TOC (order 3, 20%, min 10%) — rendered by page.tsx
- Panels use `style={{ overflow: "visible" }}` for sticky positioning

### Sidebar Architecture
- Client component with React Query
- `SidebarContext` provides `baseRoute`, `baseSlug`, `pathnameArray`
- Two queries: base route meta (for slug selector) + root slug meta (for directory tree)
- Collapsible directory tree with lazy-loaded children

## Key Design Decisions

1. **CDN over database** — Content is static MDX; no need for a database. CDN provides global edge caching.
2. **Server Actions as data layer** — All CDN fetches go through `actions/` with `"use server"`. Keeps URLs server-side.
3. **HMAC-signed OG tokens** — Prevents unauthorized OG image generation via `og.*` subdomain.
4. **Fumadocs TOC integration** — Uses fumadocs-core's TOC types and the fumadocs CSS variable system for consistent theming.
5. **`DIRECTORIES` set** — Writeups use directory-style content (`/index.mdx`), while labs/workshops use flat files (`.mdx`).
