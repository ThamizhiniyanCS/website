import { describe } from "node:test"
import type { Metadata } from "next"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import getOgToken from "@/utils/get-og-token"

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
