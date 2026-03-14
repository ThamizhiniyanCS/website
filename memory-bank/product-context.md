# Product Context

## Why This Project Exists

A unified platform to showcase Thamizhiniyan C S's dual expertise as an Ethical Hacker and Web Developer. Instead of scattered blog posts and separate lab repos, everything lives under one domain with structured subdomain routing.

## Problems It Solves

1. **Content fragmentation** — Labs, workshops, and writeups were spread across different platforms. Now unified under `labs.*`, `workshops.*`, `writeups.*` subdomains
2. **Professional visibility** — A polished, animated portfolio demonstrates both cybersecurity knowledge and frontend engineering skills
3. **Content management overhead** — MDX files on a CDN mean no database, no CMS login, no deployment for content updates — just push files to the CDN

## How It Should Work

### User Journey

1. **Visitor lands on homepage** → Sees GSAP-animated hero with name scramble effect, MatrixRain overlay, About section, Skills grid, and Certifications
2. **Navigates to content** → Via navbar links or subdomain URLs (e.g., `labs.thamizhiniyancs.com/tryhackme`)
3. **Browses content** → 3-panel layout with sidebar navigation, MDX-rendered content with syntax highlighting and math, and a TOC with scroll spy
4. **Shares pages** → Dynamic OG images with HMAC-signed tokens for each page

### UX Goals

- **Dark mode first** — Cybersecurity aesthetic, OKLCH colors for perceptually uniform theming
- **Smooth and polished** — Lenis smooth scroll, GSAP scroll-triggered animations, no janky transitions
- **Fast content access** — Sidebar navigation with collapsible directory trees, breadcrumbs, previous/next buttons
- **Mobile responsive** — Subdomain middleware detects device type and rewrites to mobile-specific routes
