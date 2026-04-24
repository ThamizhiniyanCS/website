import type { Metadata } from "next"
import { env } from "@/env"
import getOgToken from "@/utils/get-og-token"

import { PROTOCOL } from "@/lib/constants"

type OgMetadataInput = {
  title: string
  description: string
  baseRoute: string
  route: string
}

export default function buildOgMetadata({
  title,
  description,
  baseRoute,
  route,
}: OgMetadataInput): Metadata {
  const ogToken = getOgToken(title, description, baseRoute, route)

  const ogImageUrl = `${PROTOCOL}og.${env.NEXT_PUBLIC_DOMAIN}/?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&subdomain=${encodeURIComponent(baseRoute)}&route=${encodeURIComponent(route)}&token=${encodeURIComponent(ogToken)}`

  const canonicalUrl = `${PROTOCOL}${baseRoute}.${env.NEXT_PUBLIC_DOMAIN}/${route}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${description} opengraph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ThamizhiniyanCS",
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
