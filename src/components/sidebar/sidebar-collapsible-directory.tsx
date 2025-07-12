"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  FolderClosedIcon,
  FolderOpenIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { MetaJSONchild } from "@/lib/types";

import SidebarCollapsibleDirectoryContent, {
  SidebarCollapsibleDirectoryContentSkeleton,
} from "./sidebar-collapsible-directory-content";
import Link from "next/link";

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
  console.log(title, slug, children, openedArray, pathname);

  const [isOpen, setIsOpen] = React.useState<boolean>(
    openedArray ? true : false,
  );
  const [loading, isLoading] = React.useState<boolean>(false);

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

          {isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />}

          <Link
            href={"/" + pathname}
            className="ml-2 line-clamp-1 size-full text-sm font-semibold"
          >
            {title}
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="size-8">
          <ChevronDownIcon className={cn(isOpen ? "rotate-0" : "-rotate-90")} />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>

      {isOpen && (
        <>
          <SidebarCollapsibleDirectoryContent
            pathname={pathname}
            openedArray={openedArray}
            contents={children}
            isLoading={isLoading}
          />
          {loading && <SidebarCollapsibleDirectoryContentSkeleton />}
        </>
      )}
    </Collapsible>
  );
};

export default SidebarCollapsibleDirectory;
