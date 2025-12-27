"use client"

import { createContext, useContext, useMemo } from "react"
import { usePathname } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import { useQuery } from "@tanstack/react-query"

import { ScrollArea } from "@/components/ui/scroll-area"

import BaseSlugSelector, {
  BaseSlugSelectorSkeleton,
} from "./base-slug-selector"
import CollapsibleDirectory, {
  CollapsibleDirectorySkeleton,
} from "./collapsible-directory"

// TODO: Add Base Slug Selector

type SidebarContextType = {
  baseRoute: string
  baseSlug: string
  pathnameArray: string[]
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface Props {
  baseRoute: string
  baseSlug: string
  variant: "default" | "directory"
}

export default function Sidebar({ baseRoute, baseSlug, variant }: Props) {
  const pathname = usePathname()

  const pathnameArray = useMemo(() => {
    const slugArray = pathname.split("/").filter((each) => each.length > 0)

    return slugArray.map(
      (_, index) => baseRoute + "/" + slugArray.slice(0, index + 1).join("/")
    )
  }, [pathname, baseRoute])

  const baseRouteMetaQuery = useQuery({
    queryKey: ["sidebar-query", baseRoute],
    queryFn: () => getMetaJSON(baseRoute),
  })

  const rootSlug = pathnameArray[0] || baseRoute

  const contentsQuery = useQuery({
    queryKey: ["sidebar-query", rootSlug],
    queryFn: () => getMetaJSON(rootSlug),
  })

  return (
    <SidebarContext.Provider
      value={{
        baseRoute,
        baseSlug,
        pathnameArray,
      }}
    >
      <ScrollArea className="size-full px-2">
        {baseRouteMetaQuery.isLoading && <BaseSlugSelectorSkeleton />}

        {baseRouteMetaQuery.isSuccess && (
          <BaseSlugSelector
            meta={baseRouteMetaQuery.data}
            defaultValue={baseSlug}
          />
        )}

        {contentsQuery.isLoading && <CollapsibleDirectorySkeleton />}

        {contentsQuery.isSuccess && (
          <CollapsibleDirectory
            pathname={contentsQuery.data?.slug || rootSlug}
            title={contentsQuery.data?.title || "Directory"}
            preloadedChildren={contentsQuery.data?.children}
            isRoot={contentsQuery.data?.root}
          />
        )}
      </ScrollArea>
    </SidebarContext.Provider>
  )
}

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  if (!context) throw new Error("useSidebar must be used within <Sidebar />")

  return context
}

export function SidebarSkeleton() {
  return (
    <ScrollArea className="size-full px-2">
      <BaseSlugSelectorSkeleton />
      <CollapsibleDirectorySkeleton />
    </ScrollArea>
  )
}
