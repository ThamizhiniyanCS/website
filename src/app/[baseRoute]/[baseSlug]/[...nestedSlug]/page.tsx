// import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs";
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";
import MdxPreviousNextButtons from "@/mdx/components/mdx-previous-next-buttons";
import MdxRenderer from "@/mdx/components/mdx-renderer";
import MdxToc from "@/mdx/components/mdx-toc";
import parseMdx from "@/mdx/lib/parseMdx";
import { Frontmatter } from "@/mdx/lib/types";
import type { SearchParams } from "nuqs/server";
import { ImperativePanelGroupHandle } from "react-resizable-panels";

import { getMetaJSON } from "@/lib/actions";
import { CDN_URL, DIRECTORIES } from "@/lib/constants";
import { TocItem } from "@/lib/types";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
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

  const pathname = baseSlug + "/" + nestedSlug.join("/");
  const cdnPathname = baseRoute + "/" + pathname;
  const pathnameArray = [baseSlug, ...nestedSlug];
  const absoultePathname = `${CDN_URL}${cdnPathname}`;

  const metaJSON = await getMetaJSON(cdnPathname);

  let toc: TocItem[] = [];
  let content: React.ReactNode = null;
  let frontmatter: Frontmatter | undefined = undefined;

  if (!metaJSON) {
    const response = await fetch(
      DIRECTORIES.includes(baseRoute)
        ? `${absoultePathname}/index.mdx`
        : `${absoultePathname}.mdx`,
    );

    if (!response.ok) {
      // throw new Error(`Failed to fetch MDX from : ${response.statusText}`);
      console.log(`[+] Failed to fetch MDX: ${absoultePathname}.mdx`);

      notFound();
    }

    const source = await response.text();
    const result = await parseMdx(source, baseRoute, baseSlug, cdnPathname);

    if (result.status === "failed") {
      console.error("Failed");
      return <MdxErrorComponent error={result.error} />;
    }

    toc =
      result.scope.toc?.map(({ value, href, depth }) => ({
        title: value,
        url: href,
        depth,
      })) ?? [];

    frontmatter = result.frontmatter;
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
      <ResizablePanel defaultSize={60} minSize={40} order={2} className="pt-16">
        <MdxBreadcrumbs
          pathnameArray={pathnameArray}
          frontmatterTitle={frontmatter?.title}
        />

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

        {!DIRECTORIES.includes(baseRoute) && (
          <MdxPreviousNextButtons
            baseRoute={baseRoute}
            previousPage={frontmatter?.previousPage}
            nextPage={frontmatter?.nextPage}
          />
        )}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={20}
        minSize={10}
        order={3}
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-0 h-screen w-full pt-16">
          {frontmatter?.lastmod && (
            <>
              <p className="p-2 font-mono text-sm">
                <span className="text-muted-foreground">Last Updated:</span>{" "}
                {new Date(frontmatter.lastmod).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <Separator className="mb-2 ml-2 max-w-[90%]" />
            </>
          )}
          <MdxToc toc={toc} />
        </div>
      </ResizablePanel>
    </>
  );
}
