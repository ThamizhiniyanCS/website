// import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs";
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";
import MdxRenderer from "@/mdx/components/mdx-renderer";
import MdxToc from "@/mdx/components/mdx-toc";
import parseMdx from "@/mdx/lib/parseMdx";
import type { SearchParams } from "nuqs/server";
import { ImperativePanelGroupHandle } from "react-resizable-panels";

import { getMetaJSON } from "@/lib/actions";
import { CDN_URL } from "@/lib/constants";
import { TocItem } from "@/lib/types";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { loadSidebarParams } from "@/components/sidebar/nuqs/server";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    baseRoute: string;
    baseSlug: string;
    nestedSlug: string[];
  }>;
  searchParams: Promise<SearchParams>;
}) {
  const { baseRoute, baseSlug, nestedSlug } = await params;
  const { root } = await loadSidebarParams(searchParams);

  const pathname = baseRoute + "/" + baseSlug + "/" + nestedSlug.join("/");
  const pathnameArray = [baseRoute, baseSlug, ...nestedSlug];
  const absoultePathname = `${CDN_URL}${pathname}`;

  const metaJSON = await getMetaJSON(pathname);

  let toc: TocItem[] = [];
  let content: React.ReactNode = null;

  if (!metaJSON) {
    const response = await fetch(`${absoultePathname}.mdx`);

    if (!response.ok) {
      // throw new Error(`Failed to fetch MDX from : ${response.statusText}`);
      console.log(`[+] Failed to fetch MDX: ${absoultePathname}.mdx`);

      notFound();
    }

    const source = await response.text();
    const result = await parseMdx(source, pathname);

    if (result.status === "failed") {
      console.error("Faailed");
      return <MdxErrorComponent error={result.error} />;
    }

    toc =
      result.scope.toc?.map(({ value, href, depth }) => ({
        title: value,
        url: href,
        depth,
      })) ?? [];

    content = result.content;
  } else {
    toc = [
      {
        title: metaJSON.title,
        url: "#" + metaJSON.slug,
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
  }

  // const headersList = await headers();
  // const userAgent = headersList.get("user-agent");
  //
  // console.log(userAgent);
  //

  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} className="pt-16">
        <MdxBreadcrumbs pathnameArray={pathnameArray} />

        <div className="w-full">
          {metaJSON ? (
            <DirectoryContentsRenderer
              meta={metaJSON}
              pathname={pathname}
              root={root}
            />
          ) : (
            content && <MdxRenderer content={content} />
          )}
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
