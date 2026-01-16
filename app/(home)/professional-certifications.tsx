"use client"

import { RefObject, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
import { ExternalLinkIcon, InfoIcon } from "lucide-react"

import { certificationsData } from "@/lib/certifications"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Logo from "@/components/logo"
import { MagicCard } from "@/components/magic-ui/magic-card"

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger)

export default function ProfessionalCertificationsSection() {
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
          end: "+=500",
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
            xPercent: -100,
            stagger: 0.1,
          },
          0
        )
    },
    { scope: container }
  )

  return (
    <section
      id="certifications"
      className="font-josefin-sans min-h-svg invisible mx-auto flex flex-col items-start justify-center gap-5 px-6 py-40 md:w-9/13"
      ref={container}
    >
      <h2
        className="w-full text-4xl tracking-widest uppercase lg:text-5xl"
        ref={heading}
      >
        Professional Certifications
      </h2>

      <div className="bg-primary h-px w-full" ref={divider} />

      <div className="flex w-full flex-col">
        {certificationsData.map(({ title, validity, badge, href }, index) => (
          <div
            key={`professional-certifications-card-${title}-${index}`}
            className="h-32 w-full overflow-clip"
          >
            <MagicCard className="magic-hover-card flex size-full items-center px-3">
              <div className="flex aspect-square h-full items-center gap-5">
                <Logo
                  src={{
                    light: badge.src,
                  }}
                  alt={badge.alt}
                  size={100}
                />

                <div className="flex flex-col justify-between gap-2 md:justify-start">
                  <p className="text-base md:text-xl">{title}</p>

                  <div className="flex justify-between md:flex-col md:justify-start">
                    <p className="text-muted-foreground text-base">
                      {validity}
                    </p>
                    <a
                      href={href}
                      className="text-muted-foreground flex items-center gap-1 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Validate <ExternalLinkIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        ))}
      </div>
    </section>
  )
}
