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
import type { FileNode } from ".";

import { SidebarCollapsibleDirectoryContentSkeleton } from "./sidebar-collapsible-directory-content";
import dynamic from "next/dynamic";

const SidebarCollapsibleDirectoryContent = dynamic(
  () => import("./sidebar-collapsible-directory-content"),
  { loading: () => <SidebarCollapsibleDirectoryContentSkeleton /> },
);

const SidebarCollapsibleDirectory = ({ title, href, children }: FileNode) => {
  const [isOpen, setIsOpen] = React.useState(false);

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

          <p className="ml-2 text-sm font-semibold">{title}</p>
        </div>

        <Button variant="ghost" size="icon" className="size-8">
          <ChevronDownIcon className={cn(isOpen ? "rotate-0" : "-rotate-90")} />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>

      {children && isOpen && (
        <SidebarCollapsibleDirectoryContent contents={children} />
      )}
    </Collapsible>
  );
};

export default SidebarCollapsibleDirectory;
