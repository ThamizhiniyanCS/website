import type { Metadata } from "next"
import { notFound } from "next/navigation"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MdxStructuredData from "@/mdx/components/mdx-structured-data"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"
import MobileMdxToc from "@/mdx/components/mdx-toc/mobile"
import { resolveContent } from "@/mdx/lib/resolve-content"
import { resolveContentMetadata } from "@/mdx/lib/resolve-content-metadata"
import generateShortLocaleDate from "@/utils/generate-short-locate-date"

import type { BlogCardInputArray } from "@/types/blogs.type"
import { Separator } from "@/components/ui/separator"
import BlogCards from "@/components/blog-cards"

export const revalidate = 86400 // 24 hrs

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const pathname = slug.join("/")
  const cdnPathname = "blogs/" + pathname

  return resolveContentMetadata("blogs", pathname, cdnPathname, "")
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const pathname = slug.join("/")
  const cdnPathname = "blogs/" + pathname

  const resolved = await resolveContent("blogs", cdnPathname, "")

  if (!resolved) notFound()
  if (resolved.type === "error") {
    return <MdxErrorComponent error={resolved.error} />
  }

  let blogCards: BlogCardInputArray = []

  if (resolved.type === "directory") {
    blogCards = resolved.meta.children
      .filter(
        (
          child
        ): child is Extract<
          (typeof resolved.meta.children)[number],
          { type: "file" }
        > => child.type === "file"
      )
      .map((data) => ({
        title: data.title,
        description: data.description,
        path: slug + "/" + data.slug,
        date: data.date,
      }))
  }

  const frontmatter = resolved.type === "mdx" ? resolved.frontmatter : undefined

  return (
    <div className="mx-auto mt-20 flex min-h-svh w-full max-w-[calc(100vw-25px)] justify-center">
      {resolved.type === "directory" ? (
        <div className="flex w-full max-w-6xl flex-col gap-5">
          <MdxBreadcrumbs
            pathnameArray={slug}
            frontmatterTitle={frontmatter?.title}
            className="lg:px-0"
          />

          <span className="prose prose-invert">
            <h1 className="">{slug}</h1>
          </span>

          <article className="w-full">
            <BlogCards data={blogCards} className="" />
          </article>
        </div>
      ) : (
        <div className="flex w-full max-w-4xl flex-col gap-5">
          <MdxBreadcrumbs
            pathnameArray={slug}
            frontmatterTitle={resolved.frontmatter.title}
            className="px-4 md:px-8 lg:px-10"
          />

          <article className="w-full">
            <MdxStructuredData {...resolved.frontmatter} />
            <MdxRenderer
              content={resolved.content}
              frontmatter={resolved.frontmatter}
            />
          </article>
        </div>
      )}

      {resolved.type === "mdx" && (
        <>
          <div className="sticky top-0 hidden h-screen w-fit flex-none px-4 pt-16 xl:block">
            {resolved.frontmatter.lastmod && (
              <>
                <p className="p-2 font-mono text-sm">
                  <span className="text-muted-foreground">Published on:</span>{" "}
                  {generateShortLocaleDate(resolved.frontmatter.lastmod)}
                </p>
                <Separator className="mb-2 ml-2 max-w-[90%]" />
              </>
            )}

            <TOCProvider toc={resolved.toc}>
              <TOCScrollArea>
                <TocClerk.TOCItems />
              </TOCScrollArea>
            </TOCProvider>
          </div>
          <MobileMdxToc toc={resolved.toc} />
        </>
      )}
    </div>
  )
}
