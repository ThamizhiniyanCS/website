"use client";

import { CollapsibleContent } from "@/components/ui/collapsible";
import type { MetaJSONchild } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import SidebarFile from "./sidebar-file";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import { getMetaJSON } from "@/lib/actions";
import { useEffect, useState } from "react";

const SidebarCollapsibleDirectoryContent = ({
  pathname,
  openedArray,
  contents: initialContents,
  isLoading,
}: {
  pathname: string;
  openedArray: false | string[];
  contents?: MetaJSONchild[];
  isLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [contents, setContents] = useState<MetaJSONchild[] | undefined>(
    initialContents,
  );

  useEffect(() => {
    if (!initialContents) {
      isLoading(true);

      getMetaJSON(pathname).then((res) => {
        setContents(res ? res.children : undefined);
        isLoading(false);
      });
    }
  }, [initialContents, pathname]);

  return (
    <CollapsibleContent className="flex flex-col pl-4" forceMount>
      {contents?.map((each, index) =>
        each.type === "directory" ? (
          <SidebarCollapsibleDirectory
            key={index}
            title={each.title}
            slug={each.slug}
            pathname={pathname + "/" + each.slug}
            openedArray={
              openedArray &&
              openedArray[0] === pathname + "/" + each.slug &&
              openedArray.slice(1)
            }
          />
        ) : (
          <SidebarFile
            key={index}
            title={each.title}
            href={"/" + pathname + "/" + each.slug}
          />
        ),
      )}
    </CollapsibleContent>
  );
};

export const SidebarCollapsibleDirectoryContentSkeleton = () => {
  return (
    <CollapsibleContent className="flex flex-col pl-4" forceMount>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="border-l py-2 pr-4 pl-6 font-mono text-sm">
          <Skeleton className="h-4 w-full max-w-60 rounded-full" />
        </div>
      ))}
    </CollapsibleContent>
  );
};

export default SidebarCollapsibleDirectoryContent;
