"use server"

import getMetaJSON from "@/actions/get-meta-json"
import generateURL from "@/utils/generate-url"

import type { Links } from "@/types/links.type"

import getLatestBlogs from "./get-latest-blogs"

const CONTENT_ROUTES = ["docs", "labs", "workshops", "writeups"] as const

export default async function getLinks(): Promise<Links> {
  const [latestBlogs, blogsMetadata, ...routeMetadata] = await Promise.all([
    getLatestBlogs(),
    getMetaJSON("blogs"),
    ...CONTENT_ROUTES.map((route) => getMetaJSON(route)),
  ])

  const links: Links = []

  if (blogsMetadata) {
    links.push({
      title: blogsMetadata.title,
      description: blogsMetadata.description,
      href: generateURL("blogs"),
      children: latestBlogs
        ? latestBlogs.map(({ title, path }) => ({
            title,
            href: generateURL("blogs", "/" + path),
          }))
        : [],
    })
  }

  for (let i = 0; i < CONTENT_ROUTES.length; i++) {
    const route = CONTENT_ROUTES[i]
    const meta = routeMetadata[i]

    if (meta) {
      links.push({
        title: meta.title,
        description: meta.description,
        href: generateURL(route),
        children: meta.children.map(({ slug, title }) => ({
          title,
          href: generateURL(route, "/" + slug),
        })),
      })
    }
  }

  return links
}
