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

  const pathname = baseSlug;
  const cdnPathname = baseRoute + "/" + pathname;
  const pathnameArray = [baseSlug];

  const response = await getMetaJSON(cdnPathname);

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
    <div>
      <DirectoryContentsRenderer
        meta={response}
        pathname={pathname}
        root={root}
      />
    </div>
  );
}
