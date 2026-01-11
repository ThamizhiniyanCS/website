import type { Metadata } from "next"
import { notFound } from "next/navigation"
import getMetaJSON from "@/actions/get-meta-json"
import { env } from "@/env"
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer"
import MdxErrorComponent from "@/mdx/components/mdx-error-component"
import MdxRenderer from "@/mdx/components/mdx-renderer"
import MdxStructuredData from "@/mdx/components/mdx-structured-data"
import MobileMdxToc from "@/mdx/components/mdx-toc/mobile"
import Frontmatter from "@/mdx/types/frontmatter.type"
import { cachedProcessMDX } from "@/mdx/utils/process-mdx"
import getOgToken from "@/utils/get-og-token"
import { TOCItemType } from "fumadocs-core/toc"

import { BASE_URL, CDN_BASE_URL, DIRECTORIES, PROTOCOL } from "@/lib/constants"

export const revalidate = 86400 // 24 hrs

interface Props {
  params: Promise<{ baseRoute: string; baseSlug: string; nestedSlug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { baseRoute, baseSlug, nestedSlug } = await params

  const pathname = baseSlug + "/" + nestedSlug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`
  const canonicalUrl = `${PROTOCOL}${baseRoute}.${env.DOMAIN}/${pathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

  if (metaJSON) {
    const ogToken = getOgToken(
      metaJSON.title,
      metaJSON.description || "",
      baseRoute,
      baseSlug
    )

    const url = `${PROTOCOL}og.${env.DOMAIN}/?title=${encodeURIComponent(metaJSON.title)}&description=${encodeURIComponent(metaJSON.description || "")}&subdomain=${encodeURIComponent(baseRoute)}&route=${encodeURIComponent(baseSlug)}&token=${encodeURIComponent(ogToken)}`

    return {
      title: metaJSON.title,
      description: metaJSON.description,
      openGraph: {
        title: metaJSON.title,
        description: metaJSON.description,
        url: canonicalUrl,
        images: [
          {
            url,
            width: 1200,
            height: 630,
            alt: `${metaJSON.title} - ${metaJSON.description} opengraph image`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: metaJSON.title,
        description: metaJSON.description,
        creator: "@ThamizhiniyanCS",
        images: [url],
      },
      alternates: {
        canonical: canonicalUrl,
      },
    }
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
  const result = await cachedProcessMDX(
    source,
    baseRoute,
    baseSlug,
    cdnPathname
  )

  if (result.status === "failed") {
    return {
      title: "Render Page Error",
      description: "Failed to Render Page",
    }
  }

  const { frontmatter } = result
  const ogToken = getOgToken(
    frontmatter.title,
    frontmatter.description || "",
    baseRoute,
    baseSlug
  )

  const url = `${PROTOCOL}og.${env.DOMAIN}/?title=${encodeURIComponent(frontmatter.title)}&description=${encodeURIComponent(frontmatter.description || "")}&subdomain=${encodeURIComponent(baseRoute)}&route=${encodeURIComponent(baseSlug)}&token=${encodeURIComponent(ogToken)}`

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: canonicalUrl,
      images: [
        {
          url,
          width: 1200,
          height: 630,
          alt: `${frontmatter.title} - ${frontmatter.description} opengraph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      creator: "@ThamizhiniyanCS",
      images: [url],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function Page({ params }: Props) {
  const { baseRoute, baseSlug, nestedSlug } = await params

  const pathname = baseSlug + "/" + nestedSlug.join("/")
  const cdnPathname = baseRoute + "/" + pathname
  const absoultePathname = `${CDN_BASE_URL}${cdnPathname}`

  const metaJSON = await getMetaJSON(cdnPathname)

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
      console.log(`[+] Failed to fetch MDX: ${absoultePathname}.mdx`)

      notFound()
    }

    const source = await response.text()
    const result = await cachedProcessMDX(
      source,
      baseRoute,
      baseSlug,
      cdnPathname
    )

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
    toc = [
      {
        title: metaJSON.title,
        url: "#" + metaJSON.slug,
        depth: 1,
      },
      {
        title: "Directories",
        url: "#directories",
        depth: 2,
      },
      {
        title: "Files",
        url: "#files",
        depth: 2,
      },
    ]
  }

  return (
    <div className="mt-10 w-full">
      {metaJSON ? (
        <DirectoryContentsRenderer
          meta={metaJSON}
          pathname={pathname}
          root={null}
        />
      ) : (
        content &&
        frontmatter && (
          <>
            <MdxStructuredData {...frontmatter} />
            <MdxRenderer content={content} frontmatter={frontmatter} />
          </>
        )
      )}

      <MobileMdxToc toc={toc} />
    </div>
  )
}
