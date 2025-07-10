// import { headers } from "next/headers";
import { notFound } from "next/navigation";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer";
import Sidebar from "@/components/sidebar";
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs";
import { CDN_URL } from "@/lib/constants";

import MdxErrorComponent from "@/mdx/components/mdx-error-component";
import MdxRenderer from "@/mdx/components/mdx-renderer";

import { getMetaJSON } from "@/lib/utils";
import parseMdx from "@/mdx/lib/parseMdx";
import { DocsTableOfContents } from "@/components/docs-toc";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pathname = `labs/${slug}`;

  const pathnameArray = pathname.split("/");

  const absoultePathname = `${CDN_URL}${pathname}`;

  const metaJSON = await getMetaJSON(absoultePathname);

  let source: string = "";

  if (!metaJSON) {
    const response = await fetch(`${absoultePathname}/index.mdx`);

    if (!response.ok) {
      // throw new Error(`Failed to fetch MDX from : ${response.statusText}`);
      notFound();
    }

    source = await response.text();
  }

  const result = await parseMdx(source, pathname);

  if (result.status === "failed") {
    return <MdxErrorComponent error={result.error} />;
  }

  const { scope, content } = result;

  const toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[] =
    scope.toc?.map(({ value, href, depth }) => ({
      title: value,
      url: href,
      depth,
    })) ?? [];

  // const headersList = await headers();
  // const userAgent = headersList.get("user-agent");
  //
  // console.log(userAgent);

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
        <div className="sticky top-0 h-screen w-full pt-16">
          <Sidebar absolutePathname={absoultePathname} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={60} minSize={40} className="pt-16">
        <MdxBreadcrumbs pathnameArray={pathnameArray} />

        <div className="w-full">
          {metaJSON ? (
            <DirectoryContentsRenderer meta={metaJSON} pathname={pathname} />
          ) : (
            <MdxRenderer content={content} />
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
          <DocsTableOfContents toc={toc} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
