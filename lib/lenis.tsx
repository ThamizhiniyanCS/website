"use client"

import { RefObject, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ReactLenis } from "lenis/react"
import type { LenisRef } from "lenis/react"

export default function Lenis() {
  const lenisRef: RefObject<LenisRef | null> = useRef(null)

  useGSAP(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add(update)

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0)

    return () => gsap.ticker.remove(update)
  }, {})

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        anchors: {
          offset: -100,
        },
        allowNestedScroll: true,
      }}
      ref={lenisRef}
    />
  )
}
