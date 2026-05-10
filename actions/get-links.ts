"use server"

import getMetaJSON from "@/actions/get-meta-json"
import generateURL from "@/utils/generate-url"

import type { Links } from "@/types/links.type"

import getLatestBlogs from "./get-latest-blogs"

export default async function getLinks(): Promise<Links> {
  const [
    latestBlogs,
    blogsMetadata,
    docsMetadata,
    labsMetadata,
    workshopsMetadata,
    writeupsMetadata,
  ] = await Promise.all([
    getLatestBlogs(),
    getMetaJSON("blogs"),
    getMetaJSON("docs"),
    getMetaJSON("labs"),
    getMetaJSON("workshops"),
    getMetaJSON("writeups"),
  ])

  let links: Links = []

  blogsMetadata &&
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

  docsMetadata &&
    links.push({
      title: docsMetadata.title,
      description: docsMetadata.description,
      href: generateURL("docs"),
      children: docsMetadata.children.map(({ slug, title }) => ({
        title,
        href: generateURL("docs", "/" + slug),
      })),
    })

  labsMetadata &&
    links.push({
      title: labsMetadata.title,
      description: labsMetadata.description,
      href: generateURL("labs"),
      children: labsMetadata.children.map(({ slug, title }) => ({
        title,
        href: generateURL("labs", "/" + slug),
      })),
    })

  workshopsMetadata &&
    links.push({
      title: workshopsMetadata.title,
      description: workshopsMetadata.description,
      href: generateURL("workshops"),
      children: workshopsMetadata.children.map(({ slug, title }) => ({
        title,
        href: generateURL("workshops", "/" + slug),
      })),
    })

  writeupsMetadata &&
    links.push({
      title: writeupsMetadata.title,
      description: writeupsMetadata.description,
      href: generateURL("writeups"),
      children: writeupsMetadata.children.map(({ slug, title }) => ({
        title,
        href: generateURL("writeups", "/" + slug),
      })),
    })

  return links
}
