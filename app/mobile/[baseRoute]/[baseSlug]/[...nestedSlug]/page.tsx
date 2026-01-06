import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MobileMdxToc from "@/mdx/components/mdx-toc/mobile"
import Frontmatter from "@/mdx/types/frontmatter.type"
import processMDX from "@/mdx/utils/process-mdx"
import { TOCItemType } from "fumadocs-core/toc"

import { CDN_BASE_URL, DIRECTORIES } from "@/lib/constants"

export default async function Page({
  params,
}: {
  params: Promise<{
    baseRoute: string
    baseSlug: string
    nestedSlug: string[]
  }>
}) {
  const { baseRoute, baseSlug, nestedSlug } = await params

  console.log("[*****] Nested Slug", nestedSlug)
  const pathname = baseSlug + "/" + nestedSlug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

  let toc: TOCItemType[] = []
  let content: React.ReactNode = null
  let frontmatter: Frontmatter | undefined = undefined

  if (!metaJSON) {
    const response = await fetch(
      DIRECTORIES.has(baseRoute)
        ? `${absoultePathname}/index.mdx`
        : `${absoultePathname}.mdx`
    )

    if (!response.ok) {
      // throw new Error(`Failed to fetch MDX from : ${response.statusText}`);
      console.log(`[+] Failed to fetch MDX: ${absoultePathname}.mdx`)

      notFound()
    }

    const source = await response.text()
    const result = await processMDX(source, baseRoute, baseSlug, cdnPathname)

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
    <div className="mt-10 w-full">
      {metaJSON ? (
        <DirectoryContentsRenderer
          meta={metaJSON}
          pathname={pathname}
          root={null}
        />
      ) : (
        content &&
        frontmatter && (
          <MdxRenderer content={content} frontmatter={frontmatter} />
        )
      )}

      <MobileMdxToc toc={toc} />
    </div>
  )
}
