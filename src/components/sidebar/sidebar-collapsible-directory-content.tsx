"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMetaJSON } from "@/lib/actions";
import type { MetaJSONchild } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";

import { useSidebarContext } from ".";
import { useSidebarParams } from "./nuqs/client";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import SidebarFile from "./sidebar-file";

export default function SidebarCollapsibleDirectoryContent({
  basePathname,
  contents,
  setContentsAction,
  isOpen,
  isGroup,
  isRoot,
}: {
  basePathname: string;
  contents?: MetaJSONchild[];
  isOpen: boolean;
  isGroup?: boolean;
  isRoot?: boolean;
  setContentsAction: React.Dispatch<
    React.SetStateAction<MetaJSONchild[] | undefined>
  >;
}) {
  const { baseRoute } = useSidebarContext();
  const [params, setParams] = useSidebarParams();

  const query = useQuery({
    queryKey: ["sidebar-query", baseRoute + "/" + basePathname],
    queryFn: ({ queryKey }) => getMetaJSON(queryKey[1]),
  });

  return query.isLoading ? (
    <SidebarCollapsibleDirectoryContentSkeleton />
  ) : (
    <CollapsibleContent
      className={cn(
        "CollapsibleContent flex flex-col",
        !isRoot && !isGroup && "pl-4",
      )}
    >
      {query.data?.children?.map((each) =>
        each.type === "directory" ? (
          <SidebarCollapsibleDirectory
            key={basePathname + "/" + each.slug}
            title={each.title}
            slug={each.slug}
            group={each.group}
            pathname={basePathname + "/" + each.slug}
          />
        ) : (
          <SidebarFile
            key={basePathname + "/" + each.slug}
            title={each.title}
            href={{
              pathname: "/" + basePathname + "/" + each.slug,
              query: params.root != null ? { root: params.root } : undefined,
            }}
          />
        ),
      )}
    </CollapsibleContent>
  );
}

export function SidebarCollapsibleDirectoryContentSkeleton() {
  return (
    <div className="flex flex-col pl-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="border-l py-2 pr-4 pl-4 font-mono text-sm">
          <Skeleton className="h-4 w-full max-w-60 rounded-full" />
        </div>
      ))}
    </div>
  );
}
