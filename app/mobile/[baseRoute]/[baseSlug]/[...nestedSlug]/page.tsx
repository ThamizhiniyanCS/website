import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxPreviousNextButtons from "@/mdx/components/mdx-previous-next-buttons"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MdxStructuredData from "@/mdx/components/mdx-structured-data"
import MobileMdxToc from "@/mdx/components/mdx-toc/mobile"
import { resolveContent } from "@/mdx/lib/resolve-content"
import { resolveContentMetadata } from "@/mdx/lib/resolve-content-metadata"

import { DIRECTORIES } from "@/lib/constants"

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

  const resolved = await resolveContent(baseRoute, cdnPathname, baseSlug)

  if (!resolved) notFound()
  if (resolved.type === "error") {
    return <MdxErrorComponent error={resolved.error} />
  }

  const frontmatter = resolved.type === "mdx" ? resolved.frontmatter : undefined

  return (
    <div className="mt-10 w-full">
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

      <MobileMdxToc toc={resolved.toc} />
    </div>
  )
}
