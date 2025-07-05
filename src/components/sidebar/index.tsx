import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import SidebarFile from "./sidebar-file";

export type FileNode = {
  title: string;
  type: "file" | "directory";
  href: string;
  children?: FileNode[];
};

const Sidebar = async ({ pathname }: { pathname: string }) => {
  const response = await fetch(`${pathname}/contents.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const data: FileNode[] = await response.json();

  console.log(data);

  return (
    <ScrollArea className="h-[calc(100vh-80px)] w-full px-2">
      {data.map((filenode, index) =>
        filenode.type === "directory" ? (
          <SidebarCollapsibleDirectory key={index} {...filenode} />
        ) : (
          <div key={index} className="w-full">
            <SidebarFile {...filenode} />
          </div>
        ),
      )}
    </ScrollArea>
  );
};

export default Sidebar;
