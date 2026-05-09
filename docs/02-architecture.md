# 02 — Architecture

**Last Updated**: 2026-05-09

> **Note**: This documentation was generated with the assistance of AI and has been reviewed for accuracy.
> However, mistakes may exist. If you find any errors or inconsistencies, please [raise an issue](https://github.com/ThamizhiniyanCS/website/issues).

## System Architecture Overview

```mermaid
flowchart TD
    A[Browser Request] --> B{Has Subdomain?}
    B -- Yes --> C["proxy.ts (Middleware)"]
    C --> D{Which Subdomain?}
    D -- "og.*" --> E["/api/og"]
    D -- "blogs.*" --> F["/blogs"]
    D -- "labs/docs/workshops/writeups" --> G{Device Type?}
    G -- "Mobile/Tablet" --> H["/mobile/{subdomain}/..."]
    G -- "Desktop" --> I["/{subdomain}/..."]
    B -- No --> J[Next.js App Router]
    J --> K["(home)/ — Portfolio"]
    J --> L["[baseRoute]/ — Content"]
    J --> M["api/og/ — OG Images"]
    L --> N["[baseSlug]/ — 3-Panel Layout"]
    N --> O["[...nestedSlug]/ — MDX Content"]

    style C fill:#f59e0b,color:#000
    style E fill:#10b981,color:#000
    style K fill:#6366f1,color:#fff
    style L fill:#6366f1,color:#fff
```

## Project File Structure

```
├── app/
│   ├── (home)/                    # Homepage sections
│   ├── blogs/                     # Blog pages (under construction)
│   ├── [baseRoute]/               # Content routes (labs, workshops, writeups, docs)
│   │   └── [baseSlug]/            # 3-panel layout (sidebar + content + TOC)
│   │       └── [...nestedSlug]/   # Deep nested MDX pages
│   ├── api/og/                    # OG image generation endpoint
│   ├── mobile/                    # Mobile rewrites (placeholder)
│   ├── layout.tsx                 # Root layout
│   ├── providers.tsx              # React Query provider
│   └── globals.css                # Tailwind v4 theme
├── actions/                       # Server Actions (CDN data fetching)
├── components/                    # UI components
├── mdx/                           # MDX processing pipeline
├── lib/                           # Config, constants, utilities
├── types/                         # TypeScript type definitions
├── schemas/                       # Zod validation schemas
├── hooks/                         # Custom React hooks
├── utils/                         # URL helpers, OG tokens
├── scripts/                       # Build scripts (Pagefind)
├── proxy.ts                       # Subdomain middleware
└── env.ts                         # Environment validation
```

## Dynamic Route Hierarchy

```mermaid
graph TD
    A["[baseRoute]"] --> B["labs"]
    A --> C["workshops"]
    A --> D["writeups"]
    A --> E["docs"]
    B --> F["[baseSlug] e.g. tryhackme"]
    C --> G["[baseSlug] e.g. portswigger"]
    D --> H["[baseSlug] e.g. hackthebox"]
    E --> I["[baseSlug] e.g. getting-started"]
    F --> J["[...nestedSlug] e.g. room/task-1"]
    H --> K["[...nestedSlug] e.g. machine/writeup"]
```

## Server / Client Component Boundary

```mermaid
graph LR
    subgraph Server["Server Components (RSC)"]
        N[Navbar]
        F[Footer]
        P["All page.tsx"]
        MR[MdxRenderer]
        MB[MdxBreadcrumbs]
        DC[DirectoryContentsRenderer]
        MS[MdxStructuredData]
        MP[MdxPreviousNextButtons]
        LHC["LinkHoverCard (server part)"]
    end

    subgraph Client["Client Components ('use client')"]
        HS[HeroSection]
        AS[AboutSection]
        SS[SkillsSection]
        CS[CertificationsSection]
        SB["Sidebar (React Query)"]
        ST[ScrollToTop]
        AT[AnimatedThemeToggler]
        MX[MatrixRain]
        SD[SearchDialog]
        NM[NavMenu]
        ME["Mermaid (rendering)"]
    end

    N --> NM
    LHC --> LP["LinkPreview (client)"]

    style Server fill:#1e3a5f,color:#fff
    style Client fill:#5f1e3a,color:#fff
```

## 3-Panel Content Layout

```mermaid
block-beta
    columns 3
    block:left["Left Panel (20%)"]:1
        SB["Sidebar"]
        BSS["Base Slug Selector"]
        DT["Directory Tree"]
    end
    block:center["Center Panel (60%)"]:1
        BC["Breadcrumbs"]
        MDX["MDX Content / Directory Listing"]
        PN["Prev/Next Buttons"]
    end
    block:right["Right Panel (20%)"]:1
        TOC["Table of Contents"]
        SS2["Scroll Spy"]
    end

    style left fill:#1e3a5f,color:#fff
    style center fill:#2d1e5f,color:#fff
    style right fill:#1e5f3a,color:#fff
```

The 3-panel layout is implemented using `react-resizable-panels` in `[baseSlug]/layout.tsx`:
- **Left (order 1)**: Sidebar with React Query — base slug selector + collapsible directory tree
- **Center (order 2)**: Breadcrumbs + MDX content or directory listing (rendered by `page.tsx`)
- **Right (order 3)**: TOC with scroll spy from Fumadocs (rendered by `page.tsx`)
- All panels use `style={{ overflow: "visible" }}` for sticky positioning

## Root Layout Component Tree

```mermaid
graph TD
    HTML["html (dark class, Josefin Sans font)"]
    HTML --> LENIS[Lenis]
    HTML --> BODY[body]
    BODY --> NP[NextProvider]
    NP --> PROV[Providers]
    PROV --> NAV[Navbar]
    PROV --> MAIN["main (children)"]
    PROV --> FOOT[Footer]
    BODY --> SCROLL[ScrollToTop]

    style HTML fill:#1e1e2e,color:#cdd6f4
    style NP fill:#313244,color:#cdd6f4
    style PROV fill:#313244,color:#cdd6f4
```

## Related Docs

- [Routing & Middleware](./04-routing-and-middleware.md) — detailed subdomain routing
- [Components](./05-components.md) — individual component documentation
- [Data Flow](./08-data-flow.md) — server actions and caching
