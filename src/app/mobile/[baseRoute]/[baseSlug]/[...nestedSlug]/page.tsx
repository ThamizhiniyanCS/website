import { notFound } from "next/navigation";
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs";
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";
import MdxPreviousNextButtons from "@/mdx/components/mdx-previous-next-buttons";
import MdxRenderer from "@/mdx/components/mdx-renderer";
import MdxToc from "@/mdx/components/mdx-toc";
import MobileMdxToc from "@/mdx/components/mdx-toc/mobile";
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

  return (
    <div className="mt-10 w-full">
      {metaJSON ? (
        <DirectoryContentsRenderer
          meta={metaJSON}
          pathname={pathname}
          root={root}
        />
      ) : (
        content && <MdxRenderer content={content} />
      )}

      <MobileMdxToc toc={toc} />
    </div>
  );
}
