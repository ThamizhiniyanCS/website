"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CaretDownIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@phosphor-icons/react"

import type { MetaJsonChild } from "@/types/meta-json.type"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Skeleton } from "@/components/ui/skeleton"

import { useSidebarContext } from "."
import CollapsibleDirectoryContent, {
  CollapsibleDirectoryContentSkeleton,
} from "./collapsible-directory-content"

interface Props {
  pathname: string
  title: string
  group?: boolean
  preloadedChildren?: MetaJsonChild[]
  isRoot?: boolean
}

export default function CollapsibleDirectory({
  pathname,
  title,
  group,
  preloadedChildren,
  isRoot,
}: Props) {
  const { pathnameArray } = useSidebarContext()
  const browserPathname = usePathname()

  const isActivePath = pathnameArray.includes(pathname)

  const [isOpen, setIsOpen] = useState<boolean>(
    group || isActivePath || !!isRoot
  )

  // NOTE: Sync open state with navigation if the user clicks a deep link
  useEffect(() => {
    if (browserPathname.startsWith("/" + pathname + "/")) {
      setIsOpen(true)
    }
  }, [browserPathname, pathname])

  console.log(pathname, title, group, preloadedChildren, isRoot)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "flex w-full flex-col",
        !isRoot && !group && "border-l-border border-l",
        browserPathname === "/" + pathname && !group && "border-l-primary"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-r-md",
          browserPathname === "/" + pathname && "bg-primary/10"
        )}
      >
        {!isRoot &&
          (group ? (
            <p className="py-4 font-mono text-sm font-bold tracking-widest uppercase">
              {title}
            </p>
          ) : (
            <div className="flex items-center">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 aria-expanded:bg-transparent"
                >
                  <CaretDownIcon
                    className={cn(
                      "transition-transform duration-300",
                      isOpen ? "rotate-0" : "-rotate-90"
                    )}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>

              {isOpen ? (
                <FolderOpenIcon className="size-4 flex-none" />
              ) : (
                <FolderIcon className="size-4 flex-none" />
              )}

              <Link
                href={"/" + pathname}
                className="ml-2 line-clamp-1 size-full text-sm font-semibold"
              >
                {title}
              </Link>
            </div>
          ))}
      </div>

      <CollapsibleDirectoryContent
        basePathname={pathname}
        preloadedChildren={preloadedChildren}
        isOpen={isOpen}
        isGroup={group}
        isRoot={isRoot}
      />
    </Collapsible>
  )
}

export function CollapsibleDirectorySkeleton() {
  return (
    <div className="flex flex-col gap-2 border-l py-2 pr-4">
      <Skeleton className="ml-4 h-4 w-full max-w-60 rounded-full" />
      <CollapsibleDirectoryContentSkeleton />
    </div>
  )
}
