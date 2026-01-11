"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface Props {
  title: string
  href: {
    pathname: string
    query?: Record<string, string | string[] | undefined>
  }
}

export default function File({ href, title }: Props) {
  const pathname = usePathname()

  return (
    <Link
      prefetch={true}
      href={href}
      className={cn(
        "border-l-border w-full rounded-r-sm border-l px-4 py-2 text-sm",
        pathname === href.pathname && "border-l-primary bg-primary/10"
      )}
    >
      <span className="line-clamp-1">{title}</span>
    </Link>
  )
}
