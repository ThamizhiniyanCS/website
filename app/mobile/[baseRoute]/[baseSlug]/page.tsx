import type { Metadata } from "next"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"

import { PROTOCOL } from "@/lib/constants"

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

  return {
    title: response.title,
    description: response.description,
    alternates: {
      canonical: `${PROTOCOL}${baseRoute}.${env.DOMAIN}/${baseSlug}`,
    },
  }
}

export default async function Page({ params }: Props) {
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
