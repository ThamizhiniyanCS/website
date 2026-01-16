"use client"

import { RefObject, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger)

export default function AboutSection() {
  const container: RefObject<HTMLElement | null> = useRef(null)
  const heading: RefObject<HTMLHeadingElement | null> = useRef(null)
  const divider: RefObject<HTMLDivElement | null> = useRef(null)
  const paragraph: RefObject<HTMLParagraphElement | null> = useRef(null)

  useGSAP(
    () => {
      const headingSplit = SplitText.create(heading.current, {
        type: "chars",
        mask: "chars",
      })

      const paragraphSplit = SplitText.create(paragraph.current, {
        type: "lines",
        mask: "lines",
      })

      const timeline = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "linear",
        },
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          start: "top top",
          end: "+=500",
          scrub: 1,
        },
      })

      timeline
        .to(container.current, {
          autoAlpha: 1,
        })
        .from(
          headingSplit.chars,
          {
            xPercent: -100,
          },
          0
        )
        .from(
          divider.current,
          {
            width: 0,
            transformOrigin: "left center",
          },
          0
        )
        .from(
          paragraphSplit.lines,
          {
            yPercent: 100,
            stagger: 0.1,
          },
          0
        )
    },
    { scope: container }
  )

  return (
    <section
      id="about-me"
      className="font-josefin-sans mx-auto flex flex-col items-start justify-center gap-5 px-6 py-20 md:min-h-svh md:w-9/12"
      ref={container}
    >
      <h2
        className="w-full text-4xl tracking-widest uppercase lg:text-5xl"
        ref={heading}
      >
        About Me
      </h2>

      <div className="bg-primary h-px w-full" ref={divider} />

      <p
        className="text-2xl leading-14 tracking-wide lg:text-4xl lg:leading-20"
        ref={paragraph}
      >
        Hello, everyone. I&apos;m{" "}
        <span className="font-lavishly-yours px-2 py-1 font-medium">
          Thamizhiniyan C S
        </span>
        , an Ethical Hacker, Web Developer, and Cyber Security enthusiast
        currently in my final year of engineering studies. My expertise is
        centered around cyber security, digital forensics, and crafting engaging
        web applications with Next.js.
      </p>
    </section>
  )
}
