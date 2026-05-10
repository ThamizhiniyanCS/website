"use server"

import { MetaJsonSchema } from "@/schemas/meta-json.schema"

import type { MetaJSON } from "@/types/meta-json.type"

import { fetchFromCDN } from "./lib/fetch-cdn"

export default async function getMetaJSON(
  pathname: string
): Promise<MetaJSON | undefined> {
  return fetchFromCDN(`${pathname}/meta.json`, MetaJsonSchema)
}
