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
    console.log(Error(`Failed to fetch: ${response.status}`));
    return null;
  }

  const data: FileNode[] = await response.json();

  console.log(data);

  return (
    <div className="sticky size-full w-full">
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
    </div>
  );
};

export default Sidebar;
