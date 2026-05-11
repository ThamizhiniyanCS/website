import type { Metadata } from "next"
import Link from "next/link"
import getLatestBlogs from "@/actions/get-latest-blogs"
import getMetaJSON from "@/actions/get-meta-json"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import buildOgMetadata from "@/utils/build-og-metadata"

import type { BlogCardInputArray } from "@/types/blogs.type"
import { Card, CardContent } from "@/components/ui/card"
import BlogCards from "@/components/blog-cards"

export async function generateMetadata(): Promise<Metadata> {
  const baseRoute = "blogs"
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

const Page = async () => {
  const response = await getMetaJSON("blogs")

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />
  }

  const latestBlogs: BlogCardInputArray | undefined = await getLatestBlogs()

  return (
    <div className="prose prose-invert mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-10 px-4 pt-20 md:px-8 lg:px-10">
      {latestBlogs && (
        <section>
          <h1>Latest Blogs</h1>

          <BlogCards data={latestBlogs} />
        </section>
      )}

      <section>
        <h1>Archive</h1>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {response.children.map((child, index) => (
            <Link
              key={index}
              href={"/" + child.slug}
              className="group no-underline"
              prefetch={true}
            >
              <Card className="!m-0 flex h-full items-center transition-all duration-300">
                <CardContent className="w-full">
                  <h3 className="!m-0 text-xl transition-colors">
                    {child.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Page
