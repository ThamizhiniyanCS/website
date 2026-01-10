"use client"

import { Fragment } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/all"

import MatrixRain from "@/components/matrix-rain"

export default function HeroSection() {
  gsap.registerPlugin(useGSAP, ScrambleTextPlugin)

  useGSAP(() => {
    let timeline = gsap.timeline({
      id: "Home Page Timeline",
      onComplete: () => {},
    })

    // GSDevTools.create({ animation: timeline });

    document.fonts.ready.then(() => {
      timeline.fromTo(
        "#hi-folks-text",
        {
          duration: 1,
          opacity: 0,
          y: 50,
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
        },
        1
      )

      timeline.to(
        "#scramble-text",
        {
          duration: 2,
          scrambleText: {
            text: "Thamizhiniyan C S",
            chars: "upperAndLowerCase",
            revealDelay: 0.5,
            speed: 0.1,
          },
        },
        2
      )

      timeline.fromTo(
        "#role-separator",
        {
          duration: 1,
          opacity: 0,
          y: 30,
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
        },
        4
      )

      timeline.fromTo(
        "#role-ethical-hacker",
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        },
        5
      )

      timeline.fromTo(
        "#role-web-developer",
        {
          x: 30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        },
        5
      )

      timeline.fromTo(
        "#hero-overlay",
        {
          opacity: 0,
          duration: 1,
        },
        {
          opacity: 1,
          duration: 1,
        },
        6
      )
    })

    function handleMouseMove(event: MouseEvent) {
      // Reference
      // - https://www.youtube.com/watch?v=y6z8MYjZ_J8
      // - https://codepen.io/designcourse/pen/QWxppgv

      const { clientX, clientY } = event

      const x = Math.round((clientX / window.innerWidth) * 100)
      const y = Math.round((clientY / window.innerHeight) * 100)

      gsap.to("#hero-overlay", {
        "--x": `${x}%`,
        "--y": `${y}%`,
        duration: 0.3,
        ease: "sine.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  })

  return (
    <Fragment>
      <section className="font-josefin-sans flex min-h-screen w-full flex-col items-center justify-center gap-5 py-20">
        <p id="hi-folks-text" className="text-xl tracking-widest md:text-2xl">
          Hi Folks, This is
        </p>
        <p id="scramble-text" className="text-[10vw]"></p>
        <div
          id="role-container"
          className="flex items-center justify-center gap-3 md:gap-5"
        >
          <p id="role-ethical-hacker" className="text-xl md:text-2xl">
            Ethical Hacker
          </p>
          <div
            id="role-separator"
            className="w-1px h-7 rounded-full bg-white md:h-10 md:w-[2px]"
          />
          <p id="role-web-developer" className="text-xl md:text-2xl">
            Web Developer
          </p>
        </div>
      </section>

      <section
        id="hero-overlay"
        style={{
          clipPath: "circle(200px at var(--x, 50%) var(--y, 50%))",
        }}
        className="font-josefin-sans absolute top-0 left-0 flex min-h-screen w-full flex-col items-center justify-center gap-5 border-none py-20 text-red-500"
      >
        <MatrixRain className="z-[-1]" />
        <p
          id="hi-folks-text-overlay"
          className="text-xl tracking-widest md:text-2xl"
        >
          Hi Folks, This is
        </p>
        <p id="scramble-text-overlay" className="text-[10vw]">
          Thamizhiniyan C S
        </p>
        <div
          id="role-container-overlay"
          className="flex items-center justify-center gap-3 md:gap-5"
        >
          <p id="role-ethical-hacker-overlay" className="text-xl md:text-2xl">
            Ethical Hacker
          </p>
          <div
            id="role-separator-overlay"
            className="w-1px h-7 rounded-full bg-red-500 md:h-10 md:w-[2px]"
          />
          <p id="role-web-developer-overlay" className="text-xl md:text-2xl">
            Web Developer
          </p>
        </div>
      </section>
    </Fragment>
  )
}
