"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  // PinIcon,
  // PinOffIcon,
} from "lucide-react";

import { MetaJSONchild } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

import { useSidebarContext } from ".";
// import { useSidebarParams } from "./nuqs/client";
import SidebarCollapsibleDirectoryContent from "./sidebar-collapsible-directory-content";

const SidebarCollapsibleDirectory = ({
  pathname,
  title,
  slug,
  children,
}: {
  pathname: string;
  title: string;
  slug: string;
  children?: MetaJSONchild[];
}) => {
  const { pathnameArray } = useSidebarContext();
  const browserPathname = usePathname();
  // const [params, setParams] = useSidebarParams();

  const [isOpen, setIsOpen] = React.useState<boolean>(
    pathnameArray.current.includes(pathname),
  );
  const [contents, setContents] = React.useState<MetaJSONchild[] | undefined>(
    children,
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "border-l-border flex w-full flex-col gap-2 border-l",
        browserPathname === "/" + pathname && "border-l-primary",
        // params.root && !browserPathname.startsWith(params.root) && "hidden",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-r-md",
          browserPathname === "/" + pathname && "bg-primary/10",
        )}
      >
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronDownIcon
                className={cn(isOpen ? "rotate-0" : "-rotate-90")}
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>

          {isOpen ? (
            <FolderOpenIcon className="size-4 flex-none" />
          ) : (
            <FolderClosedIcon className="size-4 flex-none" />
          )}

          <Link
            href={{
              pathname: "/" + pathname,
              // query: params.root != null ? { root: params.root } : undefined,
            }}
            className="ml-2 line-clamp-1 size-full text-sm font-semibold"
          >
            {title}
          </Link>
        </div>

        {/* FIX: Whenever the `root` query param is updated for the same path, the sidbar is not re-rendered */}
        {/* <Tooltip> */}
        {/*   <TooltipTrigger asChild> */}
        {/*     <Button variant="ghost" size="icon" className="size-4" asChild> */}
        {/*       <Link */}
        {/*         href={{ */}
        {/*           pathname: "/" + pathname, */}
        {/*           query: */}
        {/*             params.root === "/" + pathname */}
        {/*               ? undefined */}
        {/*               : { root: "/" + pathname }, */}
        {/*         }} */}
        {/*       > */}
        {/*         {params.root === "/" + pathname ? <PinOffIcon /> : <PinIcon />} */}
        {/*         <span className="sr-only">Toggle</span> */}
        {/*       </Link> */}
        {/*     </Button> */}
        {/*   </TooltipTrigger> */}
        {/*   <TooltipContent> */}
        {/*     <p> */}
        {/*       {params.root === "/" + pathname */}
        {/*         ? "Click to unpin this directory" */}
        {/*         : "Click to pin this directory"} */}
        {/*     </p> */}
        {/*   </TooltipContent> */}
        {/* </Tooltip> */}
      </div>

      <SidebarCollapsibleDirectoryContent
        basePathname={pathname}
        contents={contents}
        setContentsAction={setContents}
        isOpen={isOpen}
      />
    </Collapsible>
  );
};

export default SidebarCollapsibleDirectory;
