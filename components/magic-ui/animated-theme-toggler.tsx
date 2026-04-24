"use client"

import { useCallback, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { useThemeStore } from "@/hooks/zustand/use-theme-store"

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: {
  className?: string
  duration?: number
}) => {
  const { theme, setTheme } = useThemeStore()
  const isDark = theme === "dark"
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !document.startViewTransition) {
      // Fallback for browsers that don't support View Transitions
      const nextTheme = isDark ? "light" : "dark"
      setTheme(nextTheme)
      document.documentElement.classList.toggle("dark", nextTheme === "dark")
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const nextTheme = isDark ? "light" : "dark"
        setTheme(nextTheme)
        document.documentElement.classList.toggle("dark", nextTheme === "dark")
      })
    })

    await transition.ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, setTheme])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("hover:bg-accent rounded-md p-2", className)}
      {...props}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
