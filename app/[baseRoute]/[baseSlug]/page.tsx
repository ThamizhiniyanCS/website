import type { Metadata } from "next"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"
import buildOgMetadata from "@/utils/build-og-metadata"

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

export const revalidate = 86400 // 24 hrs

interface Props {
  params: Promise<{ baseRoute: string; baseSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { baseRoute, baseSlug } = await params

  const cdnPathname = baseRoute + "/" + baseSlug

  const response = await getMetaJSON(cdnPathname)

  if (!response) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for is not available",
    }
  }

  return buildOgMetadata({
    title: response.title,
    description: response.description || "",
    baseRoute,
    route: baseSlug,
  })
}

export default async function Page({ params }: Props) {
  const { baseRoute, baseSlug } = await params

  const pathname = baseSlug
  const cdnPathname = baseRoute + "/" + pathname
  const pathnameArray = [baseSlug]

  const response = await getMetaJSON(cdnPathname)

  if (!response) {
    notFound()
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
