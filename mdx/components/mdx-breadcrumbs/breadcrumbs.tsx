"use client"

import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type BreadcrumbLinkItem = { title: string; href: string }

const SEPARATOR_WIDTH = 24 // approx width of " / " separator
const ELLIPSIS_WIDTH = 48 // approx width of the "..." dropdown trigger + separator
const PAGE_PADDING = 20 // extra breathing room

const Breadcrumbs = ({
  breadcrumbLinks: allLinks,
  breadcrumbPage,
}: {
  breadcrumbLinks: BreadcrumbLinkItem[]
  breadcrumbPage: string
}) => {
  const containerRef = useRef<HTMLOListElement>(null)
  const itemWidthsRef = useRef<number[]>([])
  const pageWidthRef = useRef<number>(0)
  const hasInitialized = useRef(false)

  const [visibleLinks, setVisibleLinks] =
    useState<BreadcrumbLinkItem[]>(allLinks)
  const [hiddenLinks, setHiddenLinks] = useState<BreadcrumbLinkItem[]>([])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsDropdownOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 200)
  }, [])

  // Measure all items at full width on first render
  const measureItems = useCallback(() => {
    if (!containerRef.current || hasInitialized.current) return

    const items = Array.from(
      containerRef.current.querySelectorAll<HTMLLIElement>(
        "[data-breadcrumb-item]"
      )
    )

    if (items.length === 0) return

    itemWidthsRef.current = items.map(
      (item) => item.getBoundingClientRect().width
    )

    const page = containerRef.current.querySelector<HTMLSpanElement>(
      "[data-breadcrumb-page]"
    )
    if (page) {
      pageWidthRef.current = page.getBoundingClientRect().width
    }

    hasInitialized.current = true
  }, [])

  // Calculate which items should be visible/hidden for a given width
  const recalculate = useCallback(
    (containerWidth: number) => {
      if (!hasInitialized.current || itemWidthsRef.current.length === 0) return

      const totalLinks = allLinks.length

      // Start with the leading separator width + page width
      let usedWidth = SEPARATOR_WIDTH + pageWidthRef.current + PAGE_PADDING

      // Always try to show all items first
      let visibleCount = 0

      for (let i = 0; i < totalLinks; i++) {
        const itemWidth = (itemWidthsRef.current[i] ?? 80) + SEPARATOR_WIDTH
        usedWidth += itemWidth
        if (usedWidth <= containerWidth) {
          visibleCount++
        } else {
          break
        }
      }

      // If not all fit and we need a dropdown, account for ellipsis width
      if (visibleCount < totalLinks) {
        usedWidth =
          SEPARATOR_WIDTH + pageWidthRef.current + ELLIPSIS_WIDTH + PAGE_PADDING

        visibleCount = 0
        for (let i = 0; i < totalLinks; i++) {
          const itemWidth = (itemWidthsRef.current[i] ?? 80) + SEPARATOR_WIDTH
          usedWidth += itemWidth
          if (usedWidth <= containerWidth) {
            visibleCount++
          } else {
            break
          }
        }
      }

      const newVisible = allLinks.slice(0, visibleCount)
      const newHidden = allLinks.slice(visibleCount)

      setVisibleLinks(newVisible)
      setHiddenLinks(newHidden)
    },
    [allLinks]
  )

  // Measure once on mount
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is painted
    const raf = requestAnimationFrame(() => {
      measureItems()
      if (containerRef.current) {
        recalculate(containerRef.current.getBoundingClientRect().width)
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [measureItems, recalculate])

  // Observe container width changes
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        recalculate(entry.contentRect.width)
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [recalculate])

  return (
    <Breadcrumb className={cn("border-border lg:px-10 lg:pb-5")}>
      <BreadcrumbList ref={containerRef}>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>

        {visibleLinks.map(({ title, href }, index) => (
          <Fragment key={`${href}-${index}`}>
            <BreadcrumbItem data-breadcrumb-item>
              <BreadcrumbLink asChild>
                <Link className="capitalize" href={href}>
                  {title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </Fragment>
        ))}

        {hiddenLinks.length > 0 && (
          <Fragment>
            <BreadcrumbItem>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                modal={false}
              >
                <DropdownMenuTrigger
                  className="flex items-center gap-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-max max-w-[calc(100vw-2rem)]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {hiddenLinks.map(({ title, href }, index) => (
                    <DropdownMenuItem key={`${href}-${index}`} asChild>
                      <Link className="cursor-pointer capitalize" href={href}>
                        {title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </Fragment>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage data-breadcrumb-page className="capitalize">
            {breadcrumbPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
