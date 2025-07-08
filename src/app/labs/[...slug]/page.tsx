import { headers } from "next/headers";
import { notFound } from "next/navigation";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MdxRenderer from "@/mdxComponents/mdx-renderer";
import DirectoryContentsRenderer from "@/mdxComponents/directory-contents-renderer";
import Sidebar from "@/components/sidebar";
import MdxBreadcrumbs from "@/mdxComponents/mdx-breadcrumbs";
import { CDN_URL } from "@/lib/constants";

import { getMetaJSON } from "@/lib/utils";

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

  // const headersList = await headers();
  // const userAgent = headersList.get("user-agent");
  //
  // console.log(userAgent);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} minSize={10}>
        <Sidebar absolutePathname={absoultePathname} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={60} minSize={40}>
        <MdxBreadcrumbs pathnameArray={pathnameArray} />

        <div className="w-full">
          {metaJSON ? (
            <DirectoryContentsRenderer meta={metaJSON} />
          ) : (
            <MdxRenderer source={source} pathname={pathname} />
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20} minSize={10}>
        On This Page
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
