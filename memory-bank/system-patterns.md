# System Patterns

## Architecture Overview

```
Browser Request
    │
    ├── Subdomain? (blogs.*, docs.*, labs.*, workshops.*, writeups.*, og.*)
    │   └── proxy.ts middleware
    │       ├── og.* → /api/og
    │       ├── blogs.* → /blogs
    │       ├── Mobile/Tablet → /mobile/{subdomain}/...
    │       └── Desktop → /{subdomain}/...
    │
    └── Main domain
        └── Next.js App Router
            ├── (home)/              → Portfolio sections (Hero, About, Skills, Certs)
            ├── blogs/               → Blog pages (under construction)
            ├── [baseRoute]/         → Content listing (labs, workshops, writeups, docs)
            │   └── [baseSlug]/      → 3-panel layout (sidebar + content + TOC)
            │       └── [...nestedSlug]/  → MDX or directory pages
            └── api/og/              → OG image generation
```

## Routing Model

### Subdomain Proxy (`proxy.ts`)

- Middleware intercepts subdomain requests before they hit the App Router
- Rewrites `labs.domain.com/path` → `/labs/path` internally
- Detects mobile/tablet via `userAgent()` and routes to `/mobile/` prefix
- Special handling: `og.*` → `/api/og`, `blogs.*` → `/blogs`
- Sets security headers (CSP, X-Frame-Options, Content-Signal, X-Content-Type-Options, Referrer-Policy) on all responses
- Allowed subdomains defined in `lib/constants.ts` → `ALLOWED_SUBDOMAINS` Set: `blogs`, `docs`, `labs`, `og`, `workshops`, `writeups`
- `BASE_ROUTES` — derived from `ALLOWED_SUBDOMAINS` minus `og`

### Dynamic Route Hierarchy

```
[baseRoute]          → "labs" | "workshops" | "writeups" | "docs"
  [baseSlug]         → First-level category (e.g., "tryhackme")
    [...nestedSlug]  → Deep nesting (e.g., "room-name/task-1")
```

## Data Flow

### Content Resolution

1. The central orchestrator `resolveContent` (`mdx/lib/resolve-content.ts`) handles fetching for all dynamic content routes.
2. It calls `getMetaJSON(cdnPathname)` to fetch `meta.json` from CDN.
3. If `meta.json` exists → Page is a **directory** → return directory data and static TOC.
4. If `meta.json` doesn't exist → Page is **content** → fallback to fetching `.mdx` file via `fetchMDXSource()`.
5. MDX suffix convention: `DIRECTORIES` set routes (`writeups`) use `/index.mdx`, others use `.mdx`.
6. Result is a discriminated union `ResolvedContent` (`type: "directory" | "mdx" | "error"`) for page components to render.

### MDX Processing Pipeline

```
CDN (.mdx file)
    → fetch with 24hr cache
    → cachedProcessMDX() (React.cache wrapped)
        → remark plugins: GFM, Math, FlexibleTOC, NormalizeHeadings, MdxFiles, MdxMermaid
        → rehype plugins: UnwrapImages, ExpressiveCode (tokyo-night + line numbers), KaTeX, Slug, AutoLinkHeadings
    → MdxRenderer component
        → Custom MDX components (links, images, videos, callouts, tabs, mermaid, steps, etc.)
```

### Navigation Data

- `getLinks()` server action fetches meta.json for 4 content types (docs, labs, workshops, writeups)
- `getSocials()` server action fetches `socials.json` from CDN for social links
- Builds navigation links with `generateURL()` helper
- Used by both Navbar and Footer (async Server Components)

### Search System (Pagefind)

```
Build-time:
    scripts/build-search-index.ts
        → Walks all content on CDN recursively
        → Converts MDX to HTML (remark + rehype pipeline)
        → Builds Pagefind index with data-pagefind attributes
        → Outputs to CDN at /pagefind/

Runtime:
    useSearch() hook (client-side)
        → Lazy-loads pagefind.js from CDN on dialog open
        → debouncedSearch() with 300ms delay
        → Preload for instant results
        → Constructs subdomain URLs from filters (category, subCategory, path)

    SearchDialog component (cmdk + shadcn Command)
        → Ctrl+K shortcut
        → Category filter checkboxes (labs, workshops, writeups, blogs, docs)
        → Grouped results (page + sub-results with #anchors)
        → Keyboard navigation footer
        → shouldFilter={false} (disables cmdk internal filtering for Pagefind control)
```

## Component Patterns

### Server vs Client Boundary

| Server Components                        | Client Components                                               |
| ---------------------------------------- | --------------------------------------------------------------- |
| Navbar, Footer                           | HeroSection, AboutSection, SkillsSection, CertificationsSection |
| All page.tsx files                       | Sidebar (React Query)                                           |
| MdxRenderer, MdxBreadcrumbs              | ScrollToTop, AnimatedThemeToggler                               |
| DirectoryContentsRenderer                | MatrixRain, SearchDialog                                        |
| MdxStructuredData, MdxPreviousNextButtons| NavMenu                                                         |
| LinkHoverCard (server with client parts) | Mermaid (client for rendering)                                  |

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
- Supports `variant` prop: `"directory"` or `"default"` (based on `DIRECTORIES` set)

### MDX Component System

- `MdxComponents()` factory function takes `baseRoute`, `baseSlug`, `pathname` for contextual rendering
- Overrides native HTML elements: `a` → LinkHoverCard, `img` → MdxImage, `table` → shadcn Table, `script` → Next.js Script
- Custom components: Callout, ExternalLink, InternalLink, Mermaid, Steps, Video, Carousel, Tabs, Accordion, Badge, Button, Card, File/Files/Folder (fumadocs), Lucide icons
- LinkHoverCard: fetches OG metadata server-side, checks iframe embeddability, shows preview on hover
- MdxImage: resolves relative images to CDN URLs with kibo-ui ImageZoom
- Video: resolves relative paths to CDN URLs with kibo-ui VideoPlayer (media-chrome)

### State Management

- **Zustand** — `useThemeStore` for dark/light theme state (persisted across components)
- **React Query** — sidebar data fetching with server actions as `queryFn`

## Key Design Decisions

1. **CDN over database** — Content is static MDX; no need for a DB. CDN provides global edge caching.
2. **Server Actions as data layer** — All CDN fetches go through `actions/` with `"use server"`. Keeps URLs server-side.
3. **HMAC-signed OG tokens** — Prevents unauthorized OG image generation via `og.*` subdomain.
4. **Fumadocs integration** — Uses fumadocs-core's TOC types, MDX plugins (remarkMdxFiles, remarkMdxMermaid), CSS variable system, and file tree components.
5. **`DIRECTORIES` set** — Writeups use directory-style content (`/index.mdx`), while labs/workshops/docs use flat files (`.mdx`).
6. **Pagefind for search** — CDN-hosted search index built offline, loaded on-demand. No server-side search required.
7. **cmdk with `shouldFilter={false}`** — Pagefind handles all search logic; cmdk provides only the UI shell and keyboard navigation.
8. **`NextProvider` from fumadocs** — Wraps the app at root level for fumadocs framework integration.

## Documentation System

The project maintains in-repo documentation in `docs/` (13 numbered Markdown files). This is the **developer-facing** reference — separate from the CDN-hosted content served to end users.

- Docs are Markdown with Mermaid diagrams, tables, and cross-references
- Docs **must** be updated in the same session as related code changes (enforced by `AGENTS.md` rules)
- Structure: `01-introduction.md` through `13-development-guide.md` covering architecture, routing, components, MDX, search, data flow, styling, SEO, animations, env/config, and dev guide
- See `AGENTS.md` → "Project Documentation" section for the full structure and update triggers

