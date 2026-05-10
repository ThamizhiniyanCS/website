import type { Metadata } from "next"
import { notFound } from "next/navigation"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxPreviousNextButtons from "@/mdx/components/mdx-previous-next-buttons"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MdxStructuredData from "@/mdx/components/mdx-structured-data"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"
import { resolveContent } from "@/mdx/lib/resolve-content"
import { resolveContentMetadata } from "@/mdx/lib/resolve-content-metadata"
import generateShortLocaleDate from "@/utils/generate-short-locate-date"

import { DIRECTORIES } from "@/lib/constants"
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

  return resolveContentMetadata(baseRoute, pathname, cdnPathname, baseSlug)
}

export default async function Page({ params }: Props) {
  const { baseRoute, baseSlug, nestedSlug } = await params

  const pathname = baseSlug + "/" + nestedSlug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const pathnameArray = [baseSlug, ...nestedSlug]

  const resolved = await resolveContent(baseRoute, cdnPathname, baseSlug)

  if (!resolved) notFound()
  if (resolved.type === "error") {
    return <MdxErrorComponent error={resolved.error} />
  }

  const frontmatter = resolved.type === "mdx" ? resolved.frontmatter : undefined

  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} order={2} className="pt-16">
        <MdxBreadcrumbs
          pathnameArray={pathnameArray}
          frontmatterTitle={frontmatter?.title}
        />

        <article className="w-full">
          {resolved.type === "directory" ? (
            <DirectoryContentsRenderer
              meta={resolved.meta}
              pathname={pathname}
              root={null}
            />
          ) : (
            <>
              <MdxStructuredData {...resolved.frontmatter} />
              <MdxRenderer
                content={resolved.content}
                frontmatter={resolved.frontmatter}
              />
            </>
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
                {generateShortLocaleDate(frontmatter.lastmod)}
              </p>
              <Separator className="mb-2 ml-2 max-w-[90%]" />
            </>
          )}

          <TOCProvider toc={resolved.toc}>
            <TOCScrollArea>
              <TocClerk.TOCItems />
            </TOCScrollArea>
          </TOCProvider>
        </div>
      </ResizablePanel>
    </>
  )
}
