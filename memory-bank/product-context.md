# Product Context

## Why This Project Exists

A unified platform to showcase Thamizhiniyan C S's dual expertise as an Ethical Hacker and Web Developer. Instead of scattered blog posts and separate lab repos, everything lives under one domain with structured subdomain routing.

## Problems It Solves

1. **Content fragmentation** — Labs, workshops, writeups, docs, and blogs were spread across different platforms. Now unified under `labs.*`, `workshops.*`, `writeups.*`, `docs.*`, `blogs.*` subdomains
2. **Professional visibility** — A polished, animated portfolio demonstrates both cybersecurity knowledge and frontend engineering skills
3. **Content management overhead** — MDX files on a CDN mean no database, no CMS login, no deployment for content updates — just push files to the CDN
4. **Content discoverability** — Pagefind-powered site-wide search with category filtering, grouped results, and keyboard navigation

## How It Should Work

### User Journey

1. **Visitor lands on homepage** → Sees GSAP-animated hero with name scramble effect, MatrixRain overlay, About section, Skills grid, and Certifications
2. **Navigates to content** → Via navbar links, subdomain URLs (e.g., `labs.thamizhiniyancs.com/tryhackme`), or global search (`Ctrl+K`)
3. **Browses content** → 3-panel layout with sidebar navigation, MDX-rendered content with syntax highlighting, math, and mermaid diagrams, and a TOC with scroll spy
4. **Searches across content** → Opens search dialog (`Ctrl+K`), types query, filters by category (labs/workshops/writeups/blogs/docs), navigates results with keyboard
5. **Shares pages** → Dynamic OG images with HMAC-signed tokens for each page

### UX Goals

- **Dark mode first** — Cybersecurity aesthetic, OKLCH colors for perceptually uniform theming
- **Smooth and polished** — Lenis smooth scroll, GSAP scroll-triggered animations, no janky transitions
- **Fast content access** — Sidebar navigation with collapsible directory trees, breadcrumbs, previous/next buttons
- **Mobile responsive** — Subdomain middleware detects device type and rewrites to mobile-specific routes
- **Instant search** — CDN-hosted Pagefind index with debounced search, preloading, and grouped sub-results
