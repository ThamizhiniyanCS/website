import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import getOgToken from "@/utils/get-og-token"

import { ALLOWED_SUBDOMAINS, PROTOCOL } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  params: Promise<{ baseRoute: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { baseRoute } = await params

  if (!ALLOWED_SUBDOMAINS.has(baseRoute)) {
    notFound()
  }

  const response = await getMetaJSON(baseRoute)

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
    ""
  )

  const url = `${PROTOCOL}og.${env.DOMAIN}/?title=${encodeURIComponent(response.title)}&description=${encodeURIComponent(response.description || "")}&subdomain=${encodeURIComponent(baseRoute)}&route=${encodeURIComponent("")}&token=${encodeURIComponent(ogToken)}`

  const canonicalUrl = `${PROTOCOL}${baseRoute}.${env.DOMAIN}/`

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
  const { baseRoute } = await params

  if (!ALLOWED_SUBDOMAINS.has(baseRoute)) {
    notFound()
  }

  const response = await getMetaJSON(baseRoute)

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />
  }

  return (
    <div className="prose prose-invert mx-auto min-h-screen w-full max-w-7xl pt-20">
      <h1 className="">{response.title}</h1>

      <div className="grid w-full grid-cols-3 gap-4">
        {response.children.map((child, index) => (
          <Link key={index} href={"/" + child.slug} className="no-underline">
            <Card
              style={{
                marginBlock: 0,
              }}
            >
              <CardContent>
                <h3>{child.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
