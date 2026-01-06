"use client"

import { useMemo, useRef, useState } from "react"
import type { TOCItemType } from "fumadocs-core/toc"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

import { TOCProvider, TOCScrollArea } from "."
import * as TocClerk from "./clerk"
import { useActiveItem, useOnClickOutside } from "./hooks"

const MobileMdxToc = ({ toc }: { toc: TOCItemType[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  useOnClickOutside(cardRef, () => setIsOpen(false))

  return (
    <Card
      className={cn(
        "bg-card/10 fixed top-1/2 right-2 z-50 h-[60vh] -translate-y-1/2 overflow-clip rounded-sm border-none py-2 transition-all duration-300 ease-in-out",
        isOpen && "bg-card rounded-xl border"
      )}
      onClick={() => setIsOpen(true)}
      ref={cardRef}
    >
      {isOpen ? (
        <TOCProvider toc={toc}>
          <TOCScrollArea>
            <TocClerk.TOCItems />
          </TOCScrollArea>
        </TOCProvider>
      ) : (
        <div
          className={cn(
            "flex h-full w-8 flex-col gap-4 py-2 pl-1",
            isOpen && "px-1"
          )}
        >
          {toc.map((item, index) => (
            <div
              key={item.url}
              className={cn(
                "bg-muted data-[active=true]:bg-foreground h-[3px] rounded-full transition-all duration-300 ease-in-out",
                "data-[depth=2]:ml-2 data-[depth=3]:ml-3 data-[depth=4]:ml-4 data-[depth=5]:ml-5 data-[depth=6]:ml-6"
              )}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
            ></div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default MobileMdxToc
