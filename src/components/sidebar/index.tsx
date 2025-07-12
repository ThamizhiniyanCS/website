import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import type { MetaJSON } from "@/lib/types";
import { getMetaJSON } from "@/lib/actions";

const Sidebar = async ({ pathnameArray }: { pathnameArray: string[] }) => {
  const opened: string[] = pathnameArray.map((_, index) =>
    pathnameArray.slice(0, index + 1).join("/"),
  );

  const meta: MetaJSON | undefined = await getMetaJSON(opened[0]).then((res) =>
    res ? res : undefined,
  );

  if (!meta) {
    return null;
  }

  return (
    <ScrollArea id="sidebar" data-root={meta.slug} className="size-full px-2">
      <SidebarCollapsibleDirectory
        title={meta.title}
        slug={meta.slug}
        children={meta.children}
        openedArray={opened.slice(1)}
        pathname={opened[0]}
      />
    </ScrollArea>
  );
};

export default Sidebar;
