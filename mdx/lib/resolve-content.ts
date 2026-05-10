import getMetaJSON from "@/actions/get-meta-json"
import { buildDirectoryTOC } from "@/mdx/lib/build-directory-toc"
import { fetchMDXSource } from "@/mdx/utils/fetch-mdx"
import { cachedProcessMDX } from "@/mdx/utils/process-mdx"

import type { ResolvedContent } from "@/types/resolved-content.type"

export async function resolveContent(
  baseRoute: string,
  cdnPathname: string,
  baseSlug: string
): Promise<ResolvedContent> {
  const metaJSON = await getMetaJSON(cdnPathname)

  if (metaJSON) {
    return {
      type: "directory",
      meta: metaJSON,
      toc: buildDirectoryTOC(metaJSON),
    }
  }

  const source = await fetchMDXSource(baseRoute, cdnPathname)

  if (!source) {
    return null
  }

  const result = await cachedProcessMDX(
    source,
    baseRoute,
    baseSlug,
    cdnPathname
  )

  if (result.status === "failed") {
    return {
      type: "error",
      error: result.error,
    }
  }

  const toc =
    result.scope.toc?.map(({ value, href, depth }) => ({
      title: value,
      url: href,
      depth,
    })) ?? []

  return {
    type: "mdx",
    content: result.content,
    frontmatter: result.frontmatter,
    toc,
  }
}
