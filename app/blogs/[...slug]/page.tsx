import type { Metadata } from "next"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MdxStructuredData from "@/mdx/components/mdx-structured-data"
import { TOCProvider, TOCScrollArea } from "@/mdx/components/mdx-toc"
import * as TocClerk from "@/mdx/components/mdx-toc/clerk"
import MobileMdxToc from "@/mdx/components/mdx-toc/mobile"
import type Frontmatter from "@/mdx/types/frontmatter.type"
import { cachedProcessMDX } from "@/mdx/utils/process-mdx"
import buildOgMetadata from "@/utils/build-og-metadata"
import generateShortLocaleDate from "@/utils/generate-short-locate-date"
import { TOCItemType } from "fumadocs-core/toc"

import type { BlogCardInput } from "@/types/blogs.type"
import { CDN_BASE_URL, DIRECTORIES } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"
import BlogCards from "@/components/blog-cards"

export const revalidate = 86400 // 24 hrs

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const baseRoute = "blogs"

  const pathname = slug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

  if (metaJSON) {
    return buildOgMetadata({
      title: metaJSON.title,
      description: metaJSON.description || "",
      baseRoute,
      route: pathname,
    })
  }

  const response = await fetch(
    DIRECTORIES.has(baseRoute)
      ? `${absoultePathname}/index.mdx`
      : `${absoultePathname}.mdx`,
    {
      cache: "force-cache",
      next: {
        revalidate: 86400, // 24 hours
      },
    }
  )

  if (!response) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for is not available",
    }
  }

  const source = await response.text()
  const result = await cachedProcessMDX(source, baseRoute, "", cdnPathname)

  if (result.status === "failed") {
    return {
      title: "Render Page Error",
      description: "Failed to Render Page",
    }
  }

  const { frontmatter } = result

  return buildOgMetadata({
    title: frontmatter.title,
    description: frontmatter.description || "",
    baseRoute,
    route: pathname,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const baseRoute = "blogs"

  const pathname = slug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

  let blogCards: BlogCardInput[] = []

  let toc: TOCItemType[] = []
  let content: React.ReactNode = null
  let frontmatter: Frontmatter | undefined = undefined

  if (!metaJSON) {
    const response = await fetch(
      DIRECTORIES.has(baseRoute)
        ? `${absoultePathname}/index.mdx`
        : `${absoultePathname}.mdx`,
      {
        cache: "force-cache",
        next: {
          revalidate: 86400, // 24 hours
        },
      }
    )

    if (!response.ok) {
      console.error(`[+] Failed to fetch MDX: ${absoultePathname}.mdx`)

      notFound()
    }

    const source = await response.text()
    const result = await cachedProcessMDX(source, baseRoute, "", cdnPathname)

    if (result.status === "failed") {
      console.error("Failed")
      return <MdxErrorComponent error={result.error} />
    }

    toc =
      result.scope.toc?.map(({ value, href, depth }) => ({
        title: value,
        url: href,
        depth,
      })) ?? []

    frontmatter = result.frontmatter
    content = result.content
  } else {
    blogCards = metaJSON.children
      .filter(
        (
          child
        ): child is Extract<
          (typeof metaJSON.children)[number],
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

  return (
    <div className="mx-auto mt-20 flex min-h-svh w-full max-w-[calc(100vw-25px)] justify-center">
      {metaJSON ? (
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
            frontmatterTitle={frontmatter?.title}
            className="px-4 md:px-8 lg:px-10"
          />

          <article className="w-full">
            {content && frontmatter && (
              <>
                <MdxStructuredData {...frontmatter} />
                <MdxRenderer content={content} frontmatter={frontmatter} />
              </>
            )}
          </article>
        </div>
      )}

      {!metaJSON && (
        <>
          <div className="sticky top-0 hidden h-screen w-fit flex-none px-4 pt-16 xl:block">
            {frontmatter?.lastmod && (
              <>
                <p className="p-2 font-mono text-sm">
                  <span className="text-muted-foreground">Published on:</span>{" "}
                  {generateShortLocaleDate(frontmatter.lastmod)}
                </p>
                <Separator className="mb-2 ml-2 max-w-[90%]" />
              </>
            )}

            <TOCProvider toc={toc}>
              <TOCScrollArea>
                <TocClerk.TOCItems />
              </TOCScrollArea>
            </TOCProvider>
          </div>
          <MobileMdxToc toc={toc} />
        </>
      )}
    </div>
  )
}
