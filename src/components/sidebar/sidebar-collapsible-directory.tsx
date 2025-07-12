"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  FolderRoot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { MetaJSONchild } from "@/lib/types";

import SidebarCollapsibleDirectoryContent, {
  SidebarCollapsibleDirectoryContentSkeleton,
} from "./sidebar-collapsible-directory-content";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SidebarCollapsibleDirectory = ({
  title,
  slug,
  children,
  openedArray,
  pathname,
}: {
  title: string;
  slug: string;
  children?: MetaJSONchild[];
  openedArray: false | string[];
  pathname: string;
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(
    openedArray ? true : false,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-primary flex w-full flex-col gap-2 border-l"
    >
      <div className="flex items-center justify-between gap-4">
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
            href={"/" + pathname}
            className="ml-2 line-clamp-1 size-full text-sm font-semibold"
          >
            {title}
          </Link>
        </div>

        {/* TODO: Setting root directory if possible */}
        {/* <Tooltip> */}
        {/*   <TooltipTrigger asChild> */}
        {/*     <Button */}
        {/*       variant="ghost" */}
        {/*       size="icon" */}
        {/*       className="size-4" */}
        {/*       onClick={makeRootOnClickHandle} */}
        {/*     > */}
        {/*       <FolderRoot className="" /> */}
        {/*       <span className="sr-only">Toggle</span> */}
        {/*     </Button> */}
        {/*   </TooltipTrigger> */}
        {/*   <TooltipContent> */}
        {/*     <p>Click to make this directory as root.</p> */}
        {/*   </TooltipContent> */}
        {/* </Tooltip> */}
      </div>

      {isOpen && (
        <>
          <SidebarCollapsibleDirectoryContent
            pathname={pathname}
            openedArray={openedArray}
            contents={children}
            setIsLoading={setIsLoading}
          />
          {isLoading && <SidebarCollapsibleDirectoryContentSkeleton />}
        </>
      )}
    </Collapsible>
  );
};

export default SidebarCollapsibleDirectory;
