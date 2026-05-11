# 11 — Animation System

**Last Updated**: 2026-05-09

> **Note**: This documentation was generated with the assistance of AI and has been reviewed for accuracy.
> However, mistakes may exist. If you find any errors or inconsistencies, please [raise an issue](https://github.com/ThamizhiniyanCS/website/issues).

## Overview

The project uses three animation systems:

| System                       | Use Case                                                  |
| ---------------------------- | --------------------------------------------------------- |
| **GSAP**                     | Complex scroll-driven animations, text effects, timelines |
| **Framer Motion** (`motion`) | Simple component animations, layout transitions           |
| **Lenis**                    | Smooth scrolling                                          |

## GSAP Patterns

### Plugin Registration

Register plugins at module level (outside the component):

```typescript
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin)
```

### `useGSAP` Hook

Always use `useGSAP` from `@gsap/react` — **never** use `useEffect` for animations:

```typescript
useGSAP(
  () => {
    // All GSAP animations go here
    gsap.from(".element", { opacity: 0, y: 50 })
  },
  { scope: containerRef } // Scope to container for cleanup
)
```

### ScrollTrigger Pattern

```typescript
useGSAP(
  () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: 1,
      },
    })

    tl.from(".element", { opacity: 0, y: 100 })
    tl.to(".element", { scale: 1.2 })
  },
  { scope: containerRef }
)
```

### SplitText for Reveals

```typescript
useGSAP(
  () => {
    const split = new SplitText(".heading", { type: "chars" })

    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      stagger: 0.03,
      mask: "chars", // or "lines"
    })
  },
  { scope: containerRef }
)
```

### ScrambleText Effect

Used in the `HeroSection` for the name reveal:

```typescript
gsap.to(".name", {
  duration: 2,
  scrambleText: {
    text: "Thamizhiniyan C S",
    chars: "!@#$%&*",
    speed: 0.3,
  },
})
```

## Homepage Animations

| Section                 | Animation Type     | Key Effects                                   |
| ----------------------- | ------------------ | --------------------------------------------- |
| `HeroSection`           | GSAP Timeline      | Name scramble, MatrixRain overlay, fade-in    |
| `AboutSection`          | GSAP ScrollTrigger | Pin + scrub, text reveal, section transitions |
| `SkillsSection`         | GSAP ScrollTrigger | Staggered card reveals                        |
| `CertificationsSection` | GSAP ScrollTrigger | Staggered certification card reveals          |

## Framer Motion (`motion`)

Used for simpler component-level animations:

```typescript
import { motion } from "motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### When to Use Which

| Scenario                  | Use                            |
| ------------------------- | ------------------------------ |
| Scroll-driven animations  | GSAP (ScrollTrigger)           |
| Complex timelines         | GSAP                           |
| Text splitting / scramble | GSAP (SplitText, ScrambleText) |
| Simple enter/exit         | Framer Motion                  |
| Layout animations         | Framer Motion                  |
| Hover state transitions   | CSS or Framer Motion           |

## Lenis Smooth Scrolling

**File**: `lib/lenis.tsx`

Provides smooth, inertia-based scrolling for the entire page. Imported in `app/layout.tsx` as `<Lenis />`.

Key configuration:

- Wraps the native scroll behavior
- Provides lerp-based smooth interpolation
- Works with GSAP ScrollTrigger via integration

## Animation Guidelines

1. **Always scope GSAP** — use `{ scope: containerRef }` to prevent animation leaks
2. **Register plugins once** — at module level, not inside components
3. **No `useEffect` for animations** — always use `useGSAP`
4. **No inline styles** except for dynamic GSAP properties (like `clipPath`)
5. **Clean up** — `useGSAP` handles cleanup automatically when scoped
6. **Client components only** — all animated components must be `"use client"`

## Related Docs

- [Components](./05-components.md) — animated component documentation
- [Styling & Theming](./09-styling-and-theming.md) — CSS animations and view transitions
