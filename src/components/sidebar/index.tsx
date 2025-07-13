import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarCollapsibleDirectory from "./sidebar-collapsible-directory";
import type { MetaJSON } from "@/lib/types";
import { getMetaJSON } from "@/lib/actions";

const Sidebar = async ({
  pathnameArray,
  root,
}: {
  pathnameArray: string[];
  root: string | null;
}) => {
  let opened: string[] = [];

  if (root) {
    const index = pathnameArray.indexOf(root);
    if (index !== -1) {
      const baseParts = pathnameArray.slice(0, index + 1);
      const base = baseParts.join("/");

      opened = [base];

      let current = base;
      for (let i = index + 1; i < pathnameArray.length; i++) {
        current += `/${pathnameArray[i]}`;
        opened.push(current);
      }
    }
  } else {
    let current = "";
    for (const part of pathnameArray) {
      current += (current ? "/" : "") + part;
      opened.push(current);
    }
  }

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
        root={root}
      />
    </ScrollArea>
  );
};

export default Sidebar;
