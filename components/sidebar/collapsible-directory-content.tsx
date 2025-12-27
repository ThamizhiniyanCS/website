"use client"

import getMetaJSON from "@/actions/get-meta-json"
import { useQuery } from "@tanstack/react-query"

import type { MetaJsonChild } from "@/types/meta-json.type"
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "@/components/ui/collapsible"
import { Skeleton } from "@/components/ui/skeleton"

import { useSidebarContext } from "."
import CollapsibleDirectory from "./collapsible-directory"
import File from "./file"

interface Props {
  basePathname: string
  preloadedChildren?: MetaJsonChild[]
  isOpen: boolean
  isGroup?: boolean
  isRoot?: boolean
}

export default function CollapsibleDirectoryContent({
  isRoot,
  preloadedChildren,
  basePathname,
  isOpen,
  isGroup,
}: Props) {
  const { baseRoute } = useSidebarContext()

  const shouldFetch = isOpen && !preloadedChildren

  const query = useQuery({
    queryKey: ["sidebar-query", baseRoute, basePathname],
    queryFn: () => getMetaJSON(baseRoute + "/" + basePathname),
    enabled: shouldFetch,
    staleTime: 1000 * 60 * 5,
  })

  const items = preloadedChildren || query.data?.children
  const isLoading = !preloadedChildren && query.isLoading

  if (isLoading) {
    return <CollapsibleDirectoryContentSkeleton />
  }

  return (
    <CollapsibleContent
      className={cn(
        "CollapsibleContent flex flex-col",
        !isRoot && !isGroup && "pl-4"
      )}
    >
      {items?.map((each) =>
        each.type === "directory" ? (
          <CollapsibleDirectory
            key={basePathname + "/" + each.slug}
            title={each.title}
            group={each.group}
            pathname={basePathname + "/" + each.slug}
          />
        ) : (
          <File
            key={basePathname + "/" + each.slug}
            title={each.title}
            href={{
              pathname: "/" + basePathname + "/" + each.slug,
              query: undefined,
            }}
          />
        )
      )}
    </CollapsibleContent>
  )
}

export function CollapsibleDirectoryContentSkeleton() {
  return (
    <div className="flex flex-col pl-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="border-l py-2 pr-4 pl-4 font-mono text-sm">
          <Skeleton className="h-4 w-full max-w-60 rounded-full" />
        </div>
      ))}
    </div>
  )
}
