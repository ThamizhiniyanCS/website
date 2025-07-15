"use client";

import { useEffect, useState } from "react";

import { getMetaJSON } from "@/lib/actions";
import type { MetaJSON } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useSidebarParams } from "./nuqs/client";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";

const Sidebar = ({ pathnameArray }: { pathnameArray: string[] }) => {
  let opened: string[] = [];
  const [params, _] = useSidebarParams();
  const { root } = params;
  const [meta, setMeta] = useState<MetaJSON | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (root) {
    const index = pathnameArray.indexOf(root);
    if (index !== -1) {
      const baseParts = pathnameArray.slice(0, index + 1);
      const base = baseParts.join("/");

      opened = [base];

      let current = base;
      for (let i = index + 1; i < pathnameArray.length; i++) {
        current += `/${pathnameArray[i]}`;
        opened.push(current);
      }
    }
  } else {
    let current = "";
    for (const part of pathnameArray) {
      current += (current ? "/" : "") + part;
      opened.push(current);
    }
  }

  useEffect(() => {
    getMetaJSON(opened[0]).then((res) => {
      setMeta(res ? res : undefined);
      setIsLoading(res ? false : true);
    });
  }, [opened]);

  return (
    <ScrollArea id="sidebar" data-root={meta?.slug} className="size-full px-2">
      {isLoading ? (
        <div className="flex flex-col gap-2 border-l py-2 pr-4">
          <Skeleton className="ml-4 h-4 w-full max-w-60 rounded-full" />
          <div className="flex flex-col pl-4">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="border-l py-2 pr-4 pl-4 font-mono text-sm"
              >
                <Skeleton className="h-4 w-full max-w-60 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SidebarCollapsibleDirectory
          title={meta?.title || ""}
          slug={meta?.slug || ""}
          children={meta?.children || []}
          openedArray={opened.slice(1)}
          pathname={opened[0]}
          root={root}
        />
      )}
    </ScrollArea>
  );
};

export default Sidebar;
