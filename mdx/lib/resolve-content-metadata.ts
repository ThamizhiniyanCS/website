import type { Metadata } from "next"
import getMetaJSON from "@/actions/get-meta-json"
import { fetchMDXSource } from "@/mdx/utils/fetch-mdx"
import { cachedProcessMDX } from "@/mdx/utils/process-mdx"
import buildOgMetadata from "@/utils/build-og-metadata"

const NOT_FOUND_METADATA: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for is not available",
}

const RENDER_ERROR_METADATA: Metadata = {
  title: "Render Page Error",
  description: "Failed to Render Page",
}

export async function resolveContentMetadata(
  baseRoute: string,
  pathname: string,
  cdnPathname: string,
  baseSlug: string
): Promise<Metadata> {
  const metaJSON = await getMetaJSON(cdnPathname)

  if (metaJSON) {
    return buildOgMetadata({
      title: metaJSON.title,
      description: metaJSON.description || "",
      baseRoute,
      route: pathname,
    })
  }

  const source = await fetchMDXSource(baseRoute, cdnPathname)

  if (!source) {
    return NOT_FOUND_METADATA
  }

  const result = await cachedProcessMDX(
    source,
    baseRoute,
    baseSlug,
    cdnPathname
  )

  if (result.status === "failed") {
    return RENDER_ERROR_METADATA
  }

  return buildOgMetadata({
    title: result.frontmatter.title,
    description: result.frontmatter.description || "",
    baseRoute,
    route: pathname,
  })
}
