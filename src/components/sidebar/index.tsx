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
import { Skeleton } from "@/components/ui/skeleton";

// import { useSidebarParams } from "./nuqs/client";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";

type SidebarContextType = {
  pathnameArray: RefObject<string[]>;
  cache: RefObject<Record<string, MetaJSON | MetaJSONchild[]>>;
};

// optional fallback for non-wrapped components
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({
  baseRoute,
  variant,
}: {
  baseRoute: string;
  variant: "default" | "directory";
}) => {
  // const [params, setParams] = useSidebarParams();

  const pathname = usePathname();
  const slugArray = pathname.split("/").filter((each) => each.length > 0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathnameArray = useRef(
    slugArray
      .map((each, index) => slugArray.slice(0, index + 1).join("/"))
      .slice(1),
  );
  const [contents, setContents] = useState<MetaJSON | undefined>(undefined);
  const cache = useRef<Record<string, MetaJSON>>({});

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
        pathnameArray,
        cache,
      }}
    >
      <ScrollArea className="size-full px-2">
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
        ) : variant === "directory" ? (
          <SidebarCollapsibleDirectory
            pathname={baseRoute + "/" + (contents?.slug || "slug")}
            slug={contents?.slug || "slug"}
            title={contents?.title || "Title"}
            children={contents?.children}
          />
        ) : (
          <div>Conten</div>
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
