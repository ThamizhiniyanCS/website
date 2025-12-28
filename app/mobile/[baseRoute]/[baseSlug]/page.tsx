import getMetaJSON from "@/actions/get-meta-json"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"

export default async function Page({
  params,
}: {
  params: Promise<{ baseRoute: string; baseSlug: string }>
}) {
  const { baseRoute, baseSlug } = await params

  const pathname = baseSlug
  const cdnPathname = baseRoute + "/" + pathname

  const response = await getMetaJSON(cdnPathname)

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />
  }

  return (
    <div>
      <DirectoryContentsRenderer
        meta={response}
        pathname={pathname}
        root={null}
      />
    </div>
  )
}
