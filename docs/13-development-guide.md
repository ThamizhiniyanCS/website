# 13 — Development Guide

**Last Updated**: 2026-05-09

> **Note**: This documentation was generated with the assistance of AI and has been reviewed for accuracy.
> However, mistakes may exist. If you find any errors or inconsistencies, please [raise an issue](https://github.com/ThamizhiniyanCS/website/issues).

## Local Setup

### Prerequisites

- **Bun** — Package manager ([install](https://bun.sh/docs/installation))
- **Node.js** — v18+ required
- **Git** — Version control

### Step-by-Step

```bash
# 1. Clone
git clone https://github.com/ThamizhiniyanCS/website.git
cd website

# 2. Install dependencies
bun install

# 3. Environment
cp .env.example .env.local
# Edit .env.local:
#   NEXT_PUBLIC_DOMAIN=localhost:3000
#   NEXT_PUBLIC_CDN_BASE_URL=http://localhost:8000
#   OG_SECRET=your-secret-here

# 4. (Optional) Set up CDN server locally
# Serve content files at http://localhost:8000

# 5. (Optional) Add subdomain hosts entries
# See: docs/04-routing-and-middleware.md

# 6. Start dev server
bun run dev
```

## How-To Guides

### Add a New Content Type (Subdomain)

1. Add subdomain to `ALLOWED_SUBDOMAINS` in `lib/constants.ts`
2. If using directory-style MDX (`/index.mdx`), add to `DIRECTORIES` set
3. Add special routing case in `proxy.ts` if needed (like `blogs`)
4. Create CDN content directory with root `meta.json`
5. Update navigation: `getLinks()` in `actions/get-links.ts` fetches the new route
6. Update search: `build-search-index.ts` automatically picks up from `ALLOWED_SUBDOMAINS`
7. Update docs: `04-routing-and-middleware.md`, `03-content-system.md`

### Add a New MDX Component

1. Create component in `mdx/components/ui/` (kebab-case filename)
2. If client-only, add `"use client"` directive
3. Register in `MdxComponents()` factory in `mdx/components/ui/index.tsx`
4. Document in `docs/06-mdx-system.md`

### Add a New shadcn/ui Component

```bash
bun shadcn add <component-name>
```

Components are installed to `components/ui/`.

### Add a New Server Action

1. Create file in `actions/` (kebab-case, e.g., `get-new-data.ts`)
2. Start with `"use server"` directive
3. Use default export
4. Add fetch caching: `cache: "force-cache"` with `next: { revalidate: 86400 }`
5. Document in `docs/08-data-flow.md`

### Rebuild the Search Index

```bash
# Ensure CDN is running
bun run build:search

# Upload ./pagefind-output/ to CDN at /pagefind/
```

## Coding Conventions

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | kebab-case, `.tsx`, default export | `hero-section.tsx` |
| Actions | kebab-case, `.ts`, `"use server"`, default export | `get-meta-json.ts` |
| Types | kebab-case, `.type.ts` | `meta-json.type.ts` |
| Schemas | kebab-case, `.schema.ts` | `meta-json.schema.ts` |
| Hooks | camelCase with `use-` prefix, `.ts` | `use-mobile.ts` |
| Index files | `index.tsx` for component directories | `navbar/index.tsx` |

### TypeScript Rules

- Use `type` keyword for data shapes (not `interface`)
- Use `type` imports: `import type { Metadata } from "next"`
- Infer types from Zod: `type MetaJSON = z.infer<typeof MetaJsonSchema>`
- All dynamic route `params` are `Promise<{...}>` — always `await params`
- Explicit return types on server actions and `generateMetadata`
- No `any` — use proper types or `unknown`

### React Patterns

- **Server Components by default** — only add `"use client"` when using hooks, event handlers, or browser APIs
- **Async Server Components** — Navbar, Footer, page.tsx are async and fetch data directly
- **React Query** — sidebar only, with server actions as `queryFn`
- **Fragments** — use `<Fragment>` or `<>`, not wrapper divs
- **Refs** — `useRef<HTMLElement | null>(null)` pattern

### Styling Rules

- Use Tailwind utility classes
- Always use `cn()` from `@/lib/utils` for conditional merging
- Dark mode first — design for `.dark`, adjust for light
- No inline styles except for dynamic GSAP properties

### Animation Rules

- **GSAP** — use `useGSAP` from `@gsap/react`, never `useEffect`
- Register plugins at module level
- Scope with `{ scope: containerRef }`
- **Framer Motion** — for simpler component animations

## Don'ts

- ❌ Use `interface` for data shapes — use `type` + Zod inference
- ❌ Add `"use client"` without justification
- ❌ Use inline styles (except dynamic GSAP properties)
- ❌ Import from `@/components/ui/*` in server actions
- ❌ Hardcode URLs — use `BASE_URL`, `CDN_BASE_URL`, `PROTOCOL` from constants
- ❌ Use `useEffect` for animations — use `useGSAP`
- ❌ Install new UI component libraries — use shadcn/ui, magic-ui, or kibo-ui registries
- ❌ Use `npm` or `yarn` — this project uses **Bun**

## Commit Conventions

Format: `type(scope): description`

| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting (no logic) |
| `refactor` | Restructure (no behavior change) |
| `perf` | Performance improvement |
| `test` | Tests |
| `build` | Build/dependencies |
| `ci` | CI changes |
| `chore` | Miscellaneous |
| `revert` | Undo a commit |

For documentation: `docs(section): description`

```
docs(search): document Pagefind build pipeline
docs(dev-guide): update local setup instructions
```

## Related Docs

- [Introduction](./01-introduction.md) — project overview and quick-start
- [Environment & Config](./12-environment-and-config.md) — env vars and tooling
- [Architecture](./02-architecture.md) — project structure
