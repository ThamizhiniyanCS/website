"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  PinIcon,
  PinOffIcon,
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
  root,
}: {
  title: string;
  slug: string;
  children?: MetaJSONchild[];
  openedArray: false | string[];
  pathname: string;
  root: string | null;
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
            href={{
              pathname: "/" + pathname,
              query: root != null ? { root } : undefined,
            }}
            className="ml-2 line-clamp-1 size-full text-sm font-semibold"
          >
            {title}
          </Link>
        </div>

        {/* FIX: Whenever the `root` query param is updated for the same path, the sidbar is not re-rendered */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-4" asChild>
              <Link
                href={{
                  pathname: "/" + pathname,
                  query: root === null ? { root: slug } : undefined,
                }}
              >
                {root === slug ? <PinOffIcon /> : <PinIcon />}
                <span className="sr-only">Toggle</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {root === slug
                ? "Click to unpin this directory"
                : "Click to pin this directory"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {isOpen && (
        <>
          <SidebarCollapsibleDirectoryContent
            pathname={pathname}
            openedArray={openedArray}
            contents={children}
            setIsLoading={setIsLoading}
            root={root}
          />
          {isLoading && <SidebarCollapsibleDirectoryContentSkeleton />}
        </>
      )}
    </Collapsible>
  );
};

export default SidebarCollapsibleDirectory;
