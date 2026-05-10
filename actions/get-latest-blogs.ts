"use server"

import { BlogCardInputArraySchema } from "@/schemas/blogs.schema"

import type { BlogCardInputArray } from "@/types/blogs.type"

import { fetchFromCDN } from "./lib/fetch-cdn"

export default async function getLatestBlogs(): Promise<
  BlogCardInputArray | undefined
> {
  return fetchFromCDN("blogs/latest.json", BlogCardInputArraySchema)
}
