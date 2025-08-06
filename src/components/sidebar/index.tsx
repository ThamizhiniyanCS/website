"use client";

import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathnameArray = useRef(
    slugArray.map(
      (_, index) => baseRoute + "/" + slugArray.slice(0, index + 1).join("/"),
    ),
  );
  const [contents, setContents] = useState<MetaJSON | undefined>(undefined);
  const cache = useRef<Record<string, MetaJSON>>({});
  const [baseRouteMeta, setBaseRouteMeta] = useState<MetaJSON | undefined>(
    undefined,
  );

  useEffect(() => {
    const load = async () => {
      const res = await getMetaJSON(baseRoute);

      if (res) {
        setBaseRouteMeta(res);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (contents !== undefined) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      const pn = pathnameArray.current[0];

      if (cache.current[pn]) {
        setContents(cache.current[pn]);
        setIsLoading(false);
        return;
      }

      const res = await getMetaJSON(pn);
      if (res) {
        setContents(res);
        cache.current[pn] = res;
        setIsLoading(false);
      }
    };

    load();
  }, []);

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
        {baseRouteMeta ? (
          <BaseSlugSelector meta={baseRouteMeta} defaultValue={baseSlug} />
        ) : (
          <BaseslugSelectorSkeleton />
        )}

        {isLoading ? (
          <SidebarCollapsibleDirectorySkeleton />
        ) : (
          <SidebarCollapsibleDirectory
            pathname={contents?.slug || "slug"}
            slug={contents?.slug || "slug"}
            title={contents?.title || "Title"}
            children={contents?.children}
            isRoot={contents?.root}
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
