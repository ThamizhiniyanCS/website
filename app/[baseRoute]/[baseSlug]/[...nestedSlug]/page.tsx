import type { Metadata } from "next"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxPreviousNextButtons from "@/mdx/components/mdx-previous-next-buttons"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MdxStructuredData from "@/mdx/components/mdx-structured-data"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"
import type Frontmatter from "@/mdx/types/frontmatter.type"
import { cachedProcessMDX } from "@/mdx/utils/process-mdx"
import { TOCItemType } from "fumadocs-core/toc"

import { CDN_BASE_URL, DIRECTORIES, PROTOCOL } from "@/lib/constants"
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"

export const revalidate = 86400 // 24 hrs

interface Props {
  params: Promise<{ baseRoute: string; baseSlug: string; nestedSlug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { baseRoute, baseSlug, nestedSlug } = await params

  const pathname = baseSlug + "/" + nestedSlug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

  if (metaJSON) {
    return {
      title: metaJSON.title,
      description: metaJSON.description,
      alternates: {
        canonical: `${PROTOCOL}${baseRoute}.${env.DOMAIN}/${pathname}`,
      },
    }
  }

  const response = await fetch(
    DIRECTORIES.has(baseRoute)
      ? `${absoultePathname}/index.mdx`
      : `${absoultePathname}.mdx`,
    {
      cache: "force-cache",
      next: {
        revalidate: 86400, // 24 hours
      },
    }
  )

  if (!response) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for is not available",
    }
  }

  const source = await response.text()
  const result = await cachedProcessMDX(
    source,
    baseRoute,
    baseSlug,
    cdnPathname
  )

  if (result.status === "failed") {
    return {
      title: "Render Page Error",
      description: "Failed to Render Page",
    }
  }

  const { frontmatter } = result

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `${PROTOCOL}${baseRoute}.${env.DOMAIN}/${pathname}`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { baseRoute, baseSlug, nestedSlug } = await params

  const pathname = baseSlug + "/" + nestedSlug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const pathnameArray = [baseSlug, ...nestedSlug]
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

  let toc: TOCItemType[] = []
  let content: React.ReactNode = null
  let frontmatter: Frontmatter | undefined = undefined

  if (!metaJSON) {
    const response = await fetch(
      DIRECTORIES.has(baseRoute)
        ? `${absoultePathname}/index.mdx`
        : `${absoultePathname}.mdx`,
      {
        cache: "force-cache",
        next: {
          revalidate: 86400, // 24 hours
        },
      }
    )

    if (!response.ok) {
      console.error(`[+] Failed to fetch MDX: ${absoultePathname}.mdx`)

      notFound()
    }

    const source = await response.text()
    const result = await cachedProcessMDX(
      source,
      baseRoute,
      baseSlug,
      cdnPathname
    )

    if (result.status === "failed") {
      console.error("Failed")
      return <MdxErrorComponent error={result.error} />
    }

    toc =
      result.scope.toc?.map(({ value, href, depth }) => ({
        title: value,
        url: href,
        depth,
      })) ?? []

    frontmatter = result.frontmatter
    content = result.content
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
    ]
  }

  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} order={2} className="pt-16">
        <MdxBreadcrumbs
          pathnameArray={pathnameArray}
          frontmatterTitle={frontmatter?.title}
        />

        <article className="w-full">
          {metaJSON ? (
            <DirectoryContentsRenderer
              meta={metaJSON}
              pathname={pathname}
              root={null}
            />
          ) : (
            content &&
            frontmatter && (
              <>
                <MdxStructuredData {...frontmatter} />
                <MdxRenderer content={content} frontmatter={frontmatter} />
              </>
            )
          )}
        </article>

        {!DIRECTORIES.has(baseRoute) && (
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
