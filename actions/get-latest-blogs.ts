"use server"

import type { BlogCardInput } from "@/types/blogs.type"
import { CDN_BASE_URL } from "@/lib/constants"

export default async function getLatestBlogs(): Promise<
  BlogCardInput[] | undefined
> {
  try {
    const url = `${CDN_BASE_URL}blogs/latest.json`

    const response = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: 86400, // 24 hours
      },
    })

    if (!response.ok) {
      console.log(`[-] socials.json not found at ${url}`)
      console.log(response)
      return undefined
    }

    return await response.json()
  } catch (err) {
    console.error("Error fetching socials.json:", err)

    return undefined
  }
}
