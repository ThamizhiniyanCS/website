"use client"

import { Fragment, useEffect, useRef, useState } from "react"
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

const Breadcrumbs = ({
  breadcrumbLinks: defaultBreadcrumbLinks,
  breadcrumbPage,
}: {
  breadcrumbLinks: { title: string; href: string }[]
  breadcrumbPage: string
}) => {
  const breadcrumbsRef = useRef<HTMLOListElement>(null)
  const [width, setWidth] = useState<number | null>(null)
  const itemsWidths = useRef<number[]>([])
  const [breadcrumbLinks, setBreadcrumbsLinks] = useState<
    { title: string; href: string }[]
  >(defaultBreadcrumbLinks)
  const [dropdownMenuLinks, setDropdownMenuLinks] = useState<
    { title: string; href: string }[]
  >([])

  // NOTE: Effect to observe the width of the breadcrumbs
  useEffect(() => {
    if (!breadcrumbsRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width
        setWidth(newWidth)
      }
    })

    observer.observe(breadcrumbsRef.current)

    return () => observer.disconnect()
  }, [])

  // NOTE: Effect to calculate widths of breadcrumb items
  useEffect(() => {
    if (!breadcrumbsRef.current) return

    const items: HTMLLIElement[] = Array.from(
      breadcrumbsRef.current.getElementsByTagName("li")
    )
    itemsWidths.current = items.map(
      (item) => item.getBoundingClientRect().width
    ) // Reset and calculate widths

    const page: HTMLSpanElement | null =
      breadcrumbsRef.current.querySelector("span")
    if (page) {
      itemsWidths.current.push(page.getBoundingClientRect().width)
    }
  }, [breadcrumbLinks])

  // NOTE: Effect to manage dropdown menu links based on width
  useEffect(() => {
    if (width == null) return

    const itemsWidthsSum =
      itemsWidths.current.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) +
      itemsWidths.current.length * 10

    if (width < itemsWidthsSum && breadcrumbLinks.length > 0) {
      const link = breadcrumbLinks[breadcrumbLinks.length - 1]

      if (link !== undefined) {
        setTimeout(() => {
          setDropdownMenuLinks((state) => [link, ...state])
          setBreadcrumbsLinks((state) => state.slice(0, -1)) // Use slice with -1 for clarity
        }, 0)
      }
    }
  }, [width, breadcrumbLinks])

  return (
    <Breadcrumb className={cn("border-border lg:px-10 lg:pb-5")}>
      <BreadcrumbList ref={breadcrumbsRef}>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>

        {breadcrumbLinks.map(({ title, href }, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="capitalize" href={href}>
                  {title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </Fragment>
        ))}

        {dropdownMenuLinks.length > 0 && (
          <Fragment>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {dropdownMenuLinks
                    .filter(Boolean)
                    .map(({ title, href }, index) => (
                      <DropdownMenuItem key={index} asChild>
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

        <BreadcrumbPage className="capitalize">{breadcrumbPage}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
