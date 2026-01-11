import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"

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

  return {
    title: response.title,
    description: response.description,
    alternates: {
      canonical: `${PROTOCOL}${baseRoute}.${env.DOMAIN}/`,
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
    <div className="prose prose-invert mx-auto min-h-screen w-full max-w-7xl px-4 pt-20 md:px-8">
      <h1 className="">{response.title}</h1>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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
