"use client"

import { useMemo, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import type { TOCItemType } from "fumadocs-core/toc"
import gsap from "gsap"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

import { TOCProvider, TOCScrollArea } from "."
import * as TocClerk from "./clerk"
import { useActiveItem } from "./hooks"

const MobileMdxToc = ({ toc }: { toc: TOCItemType[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const tocScrollAreaRef = useRef<HTMLDivElement>(null)
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return

      const timeline = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setIsOpen(false)
        },
        defaults: {
          ease: "back",
          duration: 0.3,
        },
      })

      timeline
        .fromTo(
          cardRef.current,
          {
            width: 30,
          },
          {
            width: 300,
          }
        )
        .fromTo(
          tocScrollAreaRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
          }
        )

      if (isOpen) timeline.play()

      const listener = contextSafe((event: MouseEvent | TouchEvent) => {
        // Get the element from the ref
        const el = cardRef.current

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
          return
        }

        if (isOpen) {
          timeline.reverse()
        }
      })

      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)

      return () => {
        document.removeEventListener("mousedown", listener)
        document.removeEventListener("touchstart", listener)
      }
    },
    {
      dependencies: [isOpen],
    }
  )

  return (
    <Card
      className={cn(
        "bg-card/10 fixed top-1/2 right-2 z-50 h-[60vh] -translate-y-1/2 overflow-clip rounded-sm border-none py-2",
        isOpen && "bg-card rounded-xl border"
      )}
      onClick={() => setIsOpen(true)}
      ref={cardRef}
    >
      {isOpen ? (
        <TOCProvider toc={toc}>
          <TOCScrollArea ref={tocScrollAreaRef}>
            <TocClerk.TOCItems />
          </TOCScrollArea>
        </TOCProvider>
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col gap-4 py-2 pl-1",
            isOpen && "px-1"
          )}
          style={{
            opacity: 1,
          }}
        >
          {toc.map((item, index) => (
            <div
              key={item.url}
              className={cn(
                "bg-muted data-[active=true]:bg-foreground h-0.75 rounded-full transition-all duration-300 ease-in-out",
                "data-[depth=2]:ml-2 data-[depth=3]:ml-3 data-[depth=4]:ml-4 data-[depth=5]:ml-5 data-[depth=6]:ml-6"
              )}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
            />
          ))}
        </div>
      )}
    </Card>
  )
}

export default MobileMdxToc
