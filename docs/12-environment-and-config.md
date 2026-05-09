# 12 — Environment & Config

**Last Updated**: 2026-05-09

> **Note**: This documentation was generated with the assistance of AI and has been reviewed for accuracy.
> However, mistakes may exist. If you find any errors or inconsistencies, please [raise an issue](https://github.com/ThamizhiniyanCS/website/issues).

## Environment Variables

Validated at runtime using `@t3-oss/env-nextjs` with Zod schemas in `env.ts`.

### Variable Reference

| Variable                    | Scope    | Type   | Default                  | Required | Purpose                          |
| --------------------------- | -------- | ------ | ------------------------ | -------- | -------------------------------- |
| `NODE_ENV`                  | shared   | enum   | `"development"`          | No       | `development`, `test`, `production` |
| `NEXT_PUBLIC_DOMAIN`        | shared   | string | `"localhost:3000"`       | No       | Main domain for URL generation   |
| `NEXT_PUBLIC_CDN_BASE_URL`  | shared   | string | `"http://localhost:8000"` | No       | CDN base URL for content         |
| `OG_SECRET`                 | server   | string | —                        | **Yes**  | HMAC secret for OG image tokens  |

### Shared vs Server vs Client

- **Shared**: Available on both server and client. Prefixed with `NEXT_PUBLIC_`.
- **Server**: Only available on the server. Never exposed to the client.
- **Client**: Only available on the client (currently empty).

### `env.ts` Implementation

```typescript
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_DOMAIN: z.string().min(1).default("localhost:3000"),
    NEXT_PUBLIC_CDN_BASE_URL: z.string().min(1).default("http://localhost:8000"),
  },
  server: {
    OG_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL,
    OG_SECRET: process.env.OG_SECRET,
  },
})
```

## Next.js Configuration

**File**: `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(`${env.NEXT_PUBLIC_CDN_BASE_URL}/**`),
      new URL("https://cdn.jsdelivr.net/**"),
    ],
  },
}
```

### Remote Image Patterns

| Domain | Purpose |
|--------|---------|
| `CDN_BASE_URL` | Content images from CDN |
| `cdn.jsdelivr.net` | CDN for npm package assets |

## Constants (`lib/constants.ts`)

```typescript
export const PROTOCOL = env.NODE_ENV === "development" ? "http://" : "https://"
export const BASE_URL = `${PROTOCOL}${env.NEXT_PUBLIC_DOMAIN}/`
export const CDN_BASE_URL = env.NEXT_PUBLIC_CDN_BASE_URL + "/"
export const ALLOWED_SUBDOMAINS = new Set(["blogs", "docs", "labs", "og", "workshops", "writeups"])
export const BASE_ROUTES = Array.from(ALLOWED_SUBDOMAINS).filter((r) => r !== "og")
export const DIRECTORIES = new Set(["writeups"])
```

## Build & Tooling

### TypeScript (`tsconfig.json`)

- `strict: true`
- Module resolution: `bundler`
- Path alias: `@/*` → `./`
- Target: `ES2017`

### ESLint

- Config: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Run: `bun run lint`

### Prettier

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": false,
  "plugins": [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ]
}
```

Import order (enforced by `@ianvs/prettier-plugin-sort-imports`):
1. `react` / `react-dom`
2. `next/*`
3. Third-party modules
4. _(blank line)_
5. `@/types/*` → `@/lib/*` → `@/hooks/*` → `@/components/ui/*` → `@/components/*`
6. _(blank line)_
7. Relative imports (`./`)

### PostCSS

```js
// postcss.config.mjs
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

### shadcn/ui (`components.json`)

- Style: radix-vega
- Base color: zinc
- CSS variables: enabled
- Icon library: lucide

### Fumadocs CLI (`cli.json`)

Used for generating fumadocs components.

## npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Development server |
| `build` | `next build` | Production build |
| `build:search` | `bun run scripts/build-search-index.ts` | Pagefind index build |
| `analyze` | `ANALYZE=true next build` | Bundle analysis |
| `start` | `next start` | Production server |
| `lint` | `eslint` | Linting |
| `format` | `prettier . --write` | Code formatting |

## MCP Server

```json
{
  "next-devtools": {
    "command": "bunx",
    "args": ["next-devtools-mcp@latest"]
  }
}
```

## Related Docs

- [Introduction](./01-introduction.md) — quick-start guide
- [Development Guide](./13-development-guide.md) — local setup details
- [Routing & Middleware](./04-routing-and-middleware.md) — domain configuration
