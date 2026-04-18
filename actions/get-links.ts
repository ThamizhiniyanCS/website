"use server"

import getMetaJSON from "@/actions/get-meta-json"
import generateURL from "@/utils/generate-url"

import type { Links } from "@/types/links.type"

export default async function getLinks(): Promise<Links | undefined> {
  const [docsMetadata, labsMetadata, workshopsMetadata, writeupsMetadata] =
    await Promise.all([
      getMetaJSON("docs"),
      getMetaJSON("labs"),
      getMetaJSON("workshops"),
      getMetaJSON("writeups"),
    ])

  if (!docsMetadata || !labsMetadata || !workshopsMetadata || !writeupsMetadata)
    return undefined

  const docsLinks = {
    title: docsMetadata.title,
    description: docsMetadata.description,
    href: generateURL("docs"),
    children: docsMetadata.children.map(({ slug, title }) => ({
      title,
      href: generateURL("docs", "/" + slug),
    })),
  }

  const labsLinks = {
    title: labsMetadata.title,
    description: labsMetadata.description,
    href: generateURL("labs"),
    children: labsMetadata.children.map(({ slug, title }) => ({
      title,
      href: generateURL("labs", "/" + slug),
    })),
  }

  const workshopsLinks = {
    title: workshopsMetadata.title,
    description: workshopsMetadata.description,
    href: generateURL("workshops"),
    children: workshopsMetadata.children.map(({ slug, title }) => ({
      title,
      href: generateURL("workshops", "/" + slug),
    })),
  }

  const writeupsLinks = {
    title: writeupsMetadata.title,
    description: writeupsMetadata.description,
    href: generateURL("writeups"),
    children: writeupsMetadata.children.map(({ slug, title }) => ({
      title,
      href: generateURL("writeups", "/" + slug),
    })),
  }

  return [docsLinks, labsLinks, workshopsLinks, writeupsLinks]
}
