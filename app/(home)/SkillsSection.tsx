"use client"

import { RefObject, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
import { ExternalLinkIcon, InfoIcon } from "lucide-react"

import { skillsData } from "@/lib/skills"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Logo from "@/components/logo"
import { MagicCard } from "@/components/magic-ui/magic-card"

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger)

export default function SkillsSection() {
  const container: RefObject<HTMLElement | null> = useRef(null)
  const heading: RefObject<HTMLHeadingElement | null> = useRef(null)
  const divider: RefObject<HTMLDivElement | null> = useRef(null)

  useGSAP(
    () => {
      const split = SplitText.create(heading.current, {
        type: "chars",
        mask: "chars",
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
          end: "bottom top",
          scrub: 1,
        },
      })

      timeline
        .to(container.current, {
          autoAlpha: 1,
        })
        .from(
          split.chars,
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
          ".magic-hover-card",
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
      id="skills"
      className="font-josefin-sans min-h-svg invisible mx-auto flex flex-col items-start justify-center gap-5 px-6 py-20 md:w-9/13 lg:py-40"
      ref={container}
    >
      <h2
        className="w-full text-4xl tracking-widest uppercase lg:text-5xl"
        ref={heading}
      >
        Skills
      </h2>

      <div className="bg-primary h-px w-full" ref={divider} />

      <div className="grid w-full grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {skillsData.map(({ title, description, icon, href }, index) => (
          <div
            key={`skills-card-${title}-${index}`}
            className="aspect-square overflow-clip"
          >
            <MagicCard className="magic-hover-card flex size-full flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-2 lg:gap-5">
                <Logo
                  src={icon.src}
                  alt={icon.alt}
                  size={60}
                  imageClassName="size-8 md:size-10 lg:size-16"
                />

                <div className="flex items-center">
                  <p>{title}</p>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:inline-flex"
                      >
                        <InfoIcon />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{title}</h4>
                          <p className="text-sm">{description}</p>
                          <a
                            href={href}
                            className="text-muted-foreground flex items-center gap-2"
                          >
                            Website <ExternalLinkIcon className="size-4" />
                          </a>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </MagicCard>
          </div>
        ))}
      </div>
    </section>
  )
}
