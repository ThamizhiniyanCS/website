import getMetaJSON from "@/actions/get-meta-json"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

export default async function Page({
  params,
}: {
  params: Promise<{ baseRoute: string; baseSlug: string }>
}) {
  const { baseRoute, baseSlug } = await params

  const pathname = baseSlug
  const cdnPathname = baseRoute + "/" + pathname
  const pathnameArray = [baseSlug]

  const response = await getMetaJSON(cdnPathname)

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />
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
  ]

  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} className="pt-16">
        <MdxBreadcrumbs pathnameArray={pathnameArray} />

        <div className="w-full">
          <DirectoryContentsRenderer
            meta={response}
            pathname={pathname}
            root={null}
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
          <TOCProvider toc={toc}>
            <TOCScrollArea>
              <TocClerk.TOCItems />
            </TOCScrollArea>
          </TOCProvider>
        </div>
      </ResizablePanel>
    </>
  )
}
