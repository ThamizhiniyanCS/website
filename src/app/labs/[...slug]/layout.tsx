import { getMetaJSON } from "@/lib/actions";
import { CDN_URL } from "@/lib/constants";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/sidebar";

export default async function Layout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}>) {
  const { slug } = await params;

  const sidebarPathnameArray = ["labs/" + slug[0], ...slug.slice(1)];
  const pathname = `labs/${slug.join("/")}`;
  const pathnameArray = ["labs", ...slug];
  const absoultePathname = `${CDN_URL}${pathname}`;

  return (
    <ResizablePanelGroup
      // autoSaveId="persistance"
      direction="horizontal"
      className="min-h-screen w-full"
      style={{ overflow: "visible" }}
    >
      <ResizablePanel
        defaultSize={20}
        minSize={10}
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-0 h-screen w-full px-4 pt-16">
          <Sidebar baseSlug="labs" pathnameArray={sidebarPathnameArray} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {children}
    </ResizablePanelGroup>
  );
}
