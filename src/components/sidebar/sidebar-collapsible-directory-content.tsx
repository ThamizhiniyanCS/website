import { CollapsibleContent } from "@/components/ui/collapsible";
import type { FileNode } from ".";
import { Skeleton } from "@/components/ui/skeleton";
import SidebarFile from "./sidebar-file";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";

const SidebarCollapsibleDirectoryContent = ({
  contents,
}: {
  contents: FileNode[];
}) => {
  return (
    <CollapsibleContent className="flex flex-col pl-4" forceMount>
      {contents.map((filenode, index) =>
        filenode.type === "directory" ? (
          <SidebarCollapsibleDirectory key={index} {...filenode} />
        ) : (
          <SidebarFile key={index} {...filenode} />
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
