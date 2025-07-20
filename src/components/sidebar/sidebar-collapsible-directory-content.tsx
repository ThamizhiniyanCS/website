"use client";

import { useEffect, useState } from "react";

import { getMetaJSON } from "@/lib/actions";
import type { MetaJSONchild } from "@/lib/types";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";

import { useSidebarContext } from ".";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import SidebarFile from "./sidebar-file";

export default function SidebarCollapsibleDirectoryContent({
  basePathname,
  contents,
  setContentsAction,
  isOpen,
}: {
  basePathname: string;
  contents?: MetaJSONchild[];
  isOpen: boolean;
  setContentsAction: React.Dispatch<
    React.SetStateAction<MetaJSONchild[] | undefined>
  >;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { cache } = useSidebarContext();

  useEffect(() => {
    if (!contents && isOpen) {
      if (cache.current[basePathname]) {
        setContentsAction(cache.current[basePathname] as MetaJSONchild[]);
        return;
      }

      setIsLoading(true);

      getMetaJSON(basePathname)
        .then((res) => {
          if (res) {
            setContentsAction(res.children);
            cache.current[basePathname] = res.children;
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [basePathname, contents, isOpen]);

  return isLoading ? (
    <SidebarCollapsibleDirectoryContentSkeleton />
  ) : (
    <CollapsibleContent className="CollapsibleContent flex flex-col pl-4">
      {contents?.map((each) =>
        each.type === "directory" ? (
          <SidebarCollapsibleDirectory
            key={basePathname + "/" + each.slug}
            title={each.title}
            slug={each.slug}
            pathname={basePathname + "/" + each.slug}
          />
        ) : (
          <SidebarFile
            key={basePathname + "/" + each.slug}
            title={each.title}
            href={{
              pathname: "/" + basePathname + "/" + each.slug,
              // query: root != null ? { root } : undefined,
            }}
          />
        ),
      )}
    </CollapsibleContent>
  );
}

export function SidebarCollapsibleDirectoryContentSkeleton() {
  return (
    <CollapsibleContent className="CollapsibleContent flex flex-col pl-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="border-l py-2 pr-4 pl-6 font-mono text-sm">
          <Skeleton className="h-4 w-full max-w-60 rounded-full" />
        </div>
      ))}
    </CollapsibleContent>
  );
}
