"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpIcon } from "lucide-react"

import { Button } from "./ui/button"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollToTop() {
  const circleRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    const circle = circleRef.current
    const container = containerRef.current

    const radius = 26
    const circumference = 2 * Math.PI * radius

    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    })

    gsap.to(circle, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })

    gsap.set(container, { opacity: 0, scale: 0 })

    ScrollTrigger.create({
      trigger: "body",
      start: "100px top", // Trigger when user scrolls 100px down

      // onEnter: Scrolled down past 100px -> Show button
      onEnter: () => {
        gsap.to(container, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
      },

      // onLeaveBack: Scrolled back up past 100px -> Hide button
      onLeaveBack: () => {
        gsap.to(container, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
        })
      },
    })

    const resizeObserver = new ResizeObserver(() => {
      // Whenever the body height changes, tell GSAP to re-measure
      ScrollTrigger.refresh()
    })

    // Start watching the body
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, {})

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      ref={containerRef}
      className="fixed right-8 bottom-8 z-50 flex size-15 items-center justify-center"
    >
      <svg
        className="pointer-events-none absolute top-0 left-0 h-full w-full -rotate-90"
        viewBox="0 0 60 60"
      >
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          className=""
          strokeWidth="4"
        />
        <circle
          ref={circleRef}
          cx="30"
          cy="30"
          r="26"
          fill="none"
          className="stroke-primary transition-colors"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <Button
        variant="ghost"
        onClick={scrollToTop}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-all hover:scale-105 active:scale-95"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="size-full" />
      </Button>
    </div>
  )
}
