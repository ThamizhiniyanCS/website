"use client"

import Link from "next/link"
import isExternalLink from "@/actions/is-external-link"
import { useQuery } from "@tanstack/react-query"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import LinkPreview from "./link-preview"

interface Props extends React.ComponentPropsWithoutRef<"a"> {
  children: React.ReactNode
  href: string
}

export default function LinkHoverCard({ children, href, ...props }: Props) {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return <strong className="font-mono hover:underline">{children}</strong>
  }

  if (href.startsWith("#")) {
    return (
      <Link
        href={href}
        className="cursor-pointer opacity-50 hover:opacity-100"
        {...props}
      >
        {children}
      </Link>
    )
  }

  const { data: isExternal } = useQuery({
    queryKey: ["is-external-link-check", href],
    queryFn: async () => isExternalLink(href),
    enabled: true,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  })

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:decoration-solid"
            {...props}
          >
            {children}
          </a>
        ) : (
          <Link
            href={href}
            className="underline decoration-dotted underline-offset-4 hover:decoration-solid"
            {...props}
          >
            {children}
          </Link>
        )}
      </HoverCardTrigger>

      <HoverCardContent
        align="start"
        className="aspect-video w-150 overflow-hidden p-0"
      >
        {isExternal && <LinkPreview url={href} isExternal={isExternal} />}
      </HoverCardContent>
    </HoverCard>
  )
}
