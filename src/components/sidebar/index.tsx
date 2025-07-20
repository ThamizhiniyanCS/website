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

import { useSidebarParams } from "./nuqs/client";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";

type SidebarContextType = {
  root: string | undefined;
  pathnameArray: RefObject<string[]>;
  cache: RefObject<Record<string, MetaJSON | MetaJSONchild[]>>;
  setRoot: (root: string | undefined) => void;
};

// optional fallback for non-wrapped components
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({ baseSlug }: { baseSlug: string }) => {
  const [params, setParams] = useSidebarParams();

  const [root, setRoot] = useState<string | undefined>(
    params.root ? params.root : undefined,
  );

  const pathname = usePathname();
  const slugArray = pathname.split("/").filter((each) => each.length > 0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathnameArray = useRef(
    slugArray
      .map((each, index) => slugArray.slice(0, index + 1).join("/"))
      .slice(1),
  );
  // console.log(pathname);
  // console.log(slugArray);
  // console.log(pathnameArray);
  const [contents, setContents] = useState<MetaJSON | undefined>(undefined);
  const cache = useRef<Record<string, MetaJSON>>({});

  useEffect(() => {
    if (contents != undefined) {
      setIsLoading(false);
    } else {
      if (cache.current[pathnameArray.current[0]]) {
        setContents(cache.current[pathnameArray.current[0]]);
        return;
      }

      getMetaJSON(pathnameArray.current[0]).then((res) => {
        if (res) {
          setContents(res);
          cache.current[pathnameArray.current[0]] = res;
        }
      });
    }
  }, [contents]);

  return (
    <SidebarContext.Provider
      value={{
        root,
        pathnameArray,
        cache,
        setRoot,
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
        ) : (
          <SidebarCollapsibleDirectory
            pathname={baseSlug + "/" + (contents?.slug || "slug")}
            slug={contents?.slug || "slug"}
            title={contents?.title || "Title"}
            children={contents?.children}
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
