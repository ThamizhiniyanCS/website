import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs";
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";
import MdxToc from "@/mdx/components/mdx-toc";
import type { SearchParams } from "nuqs/server";

import { getMetaJSON } from "@/lib/actions";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { loadSidebarParams } from "@/components/sidebar/nuqs/server";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ baseRoute: string; baseSlug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { baseRoute, baseSlug } = await params;
  const { root } = await loadSidebarParams(searchParams);

  const pathname = baseRoute + "/" + baseSlug;
  const pathnameArray = [baseRoute, baseSlug];

  const response = await getMetaJSON(pathname);

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />;
  }

  const toc = [
    {
      title: response.title,
      url: "#" + response.slug,
      depth: 1,
    },
    {
      title: "Directories",
      url: "#directories",
      depth: 2,
    },
    {
      title: "Files",
      url: "#files",
      depth: 2,
    },
  ];

  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} className="pt-16">
        <MdxBreadcrumbs pathnameArray={pathnameArray} />

        <div className="w-full">
          <DirectoryContentsRenderer
            meta={response}
            pathname={pathname}
            root={root}
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={20}
        minSize={10}
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-0 h-screen w-full pt-16">
          <MdxToc toc={toc} />
        </div>
      </ResizablePanel>
    </>
  );
}
