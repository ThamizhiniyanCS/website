"use client";

import { createContext, RefObject, useContext, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getMetaJSON } from "@/lib/actions";
import { MetaJSON, MetaJSONchild } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

import BaseSlugSelector, {
  BaseslugSelectorSkeleton,
} from "./base-slug-selector";
import SidebarCollapsibleDirectory, {
  SidebarCollapsibleDirectorySkeleton,
} from "./sidebar-collapsible-directory";

// import { useSidebarParams } from "./nuqs/client";

type SidebarContextType = {
  baseRoute: string;
  baseSlug: string;
  pathnameArray: RefObject<string[]>;
  cache: RefObject<Record<string, MetaJSON | MetaJSONchild[]>>;
};

// optional fallback for non-wrapped components
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({
  baseRoute,
  baseSlug,
  variant,
}: {
  baseRoute: string;
  baseSlug: string;
  variant: "default" | "directory";
}) => {
  // const [params, setParams] = useSidebarParams();
  const pathname = usePathname();

  const slugArray = pathname.split("/").filter((each) => each.length > 0);
  const pathnameArray = useRef(
    slugArray.map(
      (_, index) => baseRoute + "/" + slugArray.slice(0, index + 1).join("/"),
    ),
  );
  const cache = useRef<Record<string, MetaJSON>>({});

  const baseRouteMeta = useQuery({
    queryKey: ["sidebar-query", baseRoute],
    queryFn: () => getMetaJSON(baseRoute),
  });

  const contentsQuery = useQuery({
    queryKey: ["sidebar-query", pathnameArray.current[0]],
    queryFn: () => getMetaJSON(pathnameArray.current[0]),
  });

  return (
    <SidebarContext.Provider
      value={{
        baseRoute,
        baseSlug,
        pathnameArray,
        cache,
      }}
    >
      <ScrollArea className="size-full px-2">
        {baseRouteMeta.isLoading && <BaseslugSelectorSkeleton />}

        {baseRouteMeta.isSuccess && (
          <BaseSlugSelector meta={baseRouteMeta.data} defaultValue={baseSlug} />
        )}

        {contentsQuery.isLoading && <SidebarCollapsibleDirectorySkeleton />}

        {contentsQuery.isSuccess && (
          <SidebarCollapsibleDirectory
            pathname={contentsQuery.data?.slug || "slug"}
            slug={contentsQuery.data?.slug || "slug"}
            title={contentsQuery.data?.title || "Title"}
            children={contentsQuery.data?.children}
            isRoot={contentsQuery.data?.root}
          />
        )}
      </ScrollArea>
    </SidebarContext.Provider>
  );
};

export default Sidebar;

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within <Sidebar />");
  return context;
};

export const SidebarSkeleton = () => {
  return (
    <ScrollArea className="size-full px-2">
      <BaseslugSelectorSkeleton />
      <SidebarCollapsibleDirectorySkeleton />
    </ScrollArea>
  );
};
