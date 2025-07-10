import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import SidebarFile from "./sidebar-file";

export type FileNode = {
  title: string;
  type: "file" | "directory";
  href: string;
  children?: FileNode[];
};

const Sidebar = async ({ absolutePathname }: { absolutePathname: string }) => {
  const response = await fetch(`${absolutePathname}/contents.json`);

  if (!response.ok) {
    console.log(Error(`Failed to fetch: ${response.status}`));
    return null;
  }

  const data: FileNode[] = await response.json();

  // console.log(data);

  return (
    <ScrollArea className="size-full px-2">
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
