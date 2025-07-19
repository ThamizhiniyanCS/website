"use client";

import { title } from "process";
import { createContext, useContext, useEffect, useState } from "react";

import { getMetaJSON } from "@/lib/actions";
import { MetaJSON, MetaJSONchild } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { useSidebarParams } from "./nuqs/client";

type SidebarContextType = {
  root: string | undefined;
  tree: MetaJSON | undefined;
  opened: string[];
  setRoot: (root: string | undefined) => void;
  setTree: (tree: MetaJSON | undefined) => void;
  setOpened: (opened: string[]) => void;
};

// optional fallback for non-wrapped components
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({
  baseSlug,
  pathnameArray,
}: {
  baseSlug: string;
  pathnameArray: string[];
}) => {
  const [params, setParams] = useSidebarParams();

  const [root, setRoot] = useState<string | undefined>(
    params.root ? params.root : undefined,
  );

  const [tree, setTree] = useState<MetaJSON | undefined>(undefined);
  const [opened, setOpened] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  type Node = {
    title: string;
    description: string;
    children: Node[];
  };

  const ensurePath = (root: Node, path: string[]): Node => {
    let current = root;

    for (let i = 1; i < path.length; i++) {
      const title = path[i];
      let child = current.children.find((c) => c.title === title);

      if (!child) {
        child = {
          title,
          description: "",
          children: [],
        };
        current.children.push(child);
      }

      current = child;
    }

    return current;
  };

  useEffect(() => {
    if (tree != undefined) {
      console.log("Tree:", tree);
      setIsLoading(false);
    } else {
      getMetaJSON(pathnameArray[0]).then((res) => {
        if (res) {
          setTree(res);
        }
      });
    }
  }, [tree]);

  return (
    <SidebarContext.Provider
      value={{ root, tree, opened, setRoot, setTree, setOpened }}
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
          <></>
        )}
      </ScrollArea>
    </SidebarContext.Provider>
  );
};

// <SidebarCollapsibleDirectory
//             slug={tree?.slug || "slug"}
//             title={tree?.title || "Title"}
//             children={tree?.children}
//             pathname={baseSlug + "/" + (tree?.slug || "slug")}
//             depth={0}
//           />

export default Sidebar;

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within <Sidebar />");
  return context;
};
