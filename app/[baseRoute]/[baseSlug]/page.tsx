import type { Metadata } from "next"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"
import getOgToken from "@/utils/get-og-token"

import { BASE_URL, PROTOCOL } from "@/lib/constants"
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

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

  const ogToken = getOgToken(
    response.title,
    response.description || "",
    baseRoute,
    baseSlug
  )

  const url = `${PROTOCOL}og.${env.DOMAIN}/?title=${encodeURIComponent(response.title)}&description=${encodeURIComponent(response.description || "")}&subdomain=${encodeURIComponent(baseRoute)}&route=${encodeURIComponent(baseSlug)}&token=${encodeURIComponent(ogToken)}`

  const canonicalUrl = `${PROTOCOL}${baseRoute}.${env.DOMAIN}/${baseSlug}`

  return {
    title: response.title,
    description: response.description,
    openGraph: {
      title: response.title,
      description: response.description,
      url: canonicalUrl,
      images: [
        {
          url,
          width: 1200,
          height: 630,
          alt: `${response.title} - ${response.description} opengraph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: response.title,
      description: response.description,
      creator: "@ThamizhiniyanCS",
      images: [url],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
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
