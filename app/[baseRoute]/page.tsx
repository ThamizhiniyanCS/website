import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import buildOgMetadata from "@/utils/build-og-metadata"

import { ALLOWED_SUBDOMAINS } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"

export const revalidate = 86400 // 24 hrs

export async function generateStaticParams() {
  return [
    { baseRoute: "labs" },
    { baseRoute: "workshops" },
    { baseRoute: "writeups" },
  ]
}

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

  return buildOgMetadata({
    title: response.title,
    description: response.description || "",
    baseRoute,
    route: "",
  })
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
    <div className="prose prose-invert mx-auto min-h-svh w-full max-w-7xl pt-20">
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
