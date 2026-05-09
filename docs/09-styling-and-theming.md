# 09 — Styling & Theming

**Last Updated**: 2026-05-09

> **Note**: This documentation was generated with the assistance of AI and has been reviewed for accuracy.
> However, mistakes may exist. If you find any errors or inconsistencies, please [raise an issue](https://github.com/ThamizhiniyanCS/website/issues).

## Overview

The project uses **Tailwind CSS v4** with the OKLCH color space for perceptually uniform theming. The design is **dark-mode-first** — the `<html>` element has `className="dark"` by default.

## Tailwind CSS v4 Setup

### Imports (`globals.css`)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));
```

### Theme Configuration

Design tokens are defined using `@theme inline {}`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... 40+ token mappings ... */
  --font-lavishly-yours: var(--var-font-lavishly-yours);
  --font-josefin-sans: var(--var-font-josefin-sans);
}
```

### Custom Utilities

```css
@utility fd-steps { /* Fumadocs steps counter */ }
@utility fd-step  { /* Individual step with counter */ }
```

## OKLCH Color System

All colors use the **OKLCH** color space for perceptual uniformity:

### Light Mode (`:root`)

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  /* ... */
}
```

### Dark Mode (`.dark`)

```css
.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.42 0.18 266);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  /* ... */
}
```

### Fumadocs Theme Integration

Fumadocs colors are mapped to shadcn theme variables:

```css
:root, .dark {
  --color-fd-background: var(--background);
  --color-fd-foreground: var(--foreground);
  --color-fd-primary: var(--primary);
  /* ... */
}
```

## Typography

### Fonts

| Font | CSS Variable | Usage |
|------|-------------|-------|
| **Josefin Sans** | `--var-font-josefin-sans` | Primary text, headings |
| **Lavishly Yours** | `--var-font-lavishly-yours` | Decorative/signature text |

Loaded via `next/font/google` in `app/layout.tsx`:

```typescript
const fontJosefinSans = Josefin_Sans({
  variable: "--var-font-josefin-sans",
  weight: "400",
  subsets: ["latin"],
})
```

### Tailwind Font Classes

```css
font-josefin-sans  /* Primary font */
font-lavishly-yours  /* Decorative font */
```

## View Transitions

Custom view transition styles for theme switching:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) { z-index: 9999; }
.dark::view-transition-new(root) { z-index: 1; }
```

## Prose Styles

Custom styles for MDX content rendered in `.prose` context:

- Headings display as flex with gap for anchor links
- Anchor links hidden by default, visible on heading hover
- Card/accordion headings have no vertical margin
- Tab content has reduced margin
- Table headers use border colors
- Backtick styling removed from inline code (`code::before/after { content: "" }`)
- Expressive Code blocks have 1rem vertical margin

## Collapsible Animations

Custom Radix collapsible content animations:

```css
.CollapsibleContent[data-state="open"] {
  animation: slideDown 300ms ease-out;
}
.CollapsibleContent[data-state="closed"] {
  animation: slideUp 300ms ease-out;
}
```

## Theme State Management (Zustand)

**File**: `hooks/zustand/use-theme-store.ts`

```typescript
export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}))
```

Used by `AnimatedThemeToggler` to toggle between light/dark modes.

## Utility Function

**`cn()` utility** — always use for conditional class merging:

```typescript
// lib/utils.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

## Related Docs

- [Components](./05-components.md) — component styling patterns
- [Animation System](./11-animation-system.md) — GSAP and Framer Motion
- [Development Guide](./13-development-guide.md) — styling conventions
