import type { z } from "zod"

import { CDN_BASE_URL } from "@/lib/constants"

type FetchFromCDNOptions = {
  revalidate?: number
}

export async function fetchFromCDN<T>(
  path: string,
  schema: z.ZodType<T>,
  options?: FetchFromCDNOptions
): Promise<T | undefined> {
  const url = `${CDN_BASE_URL}${path}`
  const revalidate = options?.revalidate ?? 86400 // 24 hours

  try {
    const response = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate,
      },
    })

    if (!response.ok) {
      console.log(`[-] CDN fetch failed: ${url} (${response.status})`)
      return undefined
    }

    const data: unknown = await response.json()
    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      console.error(`[-] CDN validation failed: ${url}`, parsed.error.issues)
      return undefined
    }

    return parsed.data
  } catch (err) {
    console.error(`Error fetching from CDN: ${path}`, err)
    return undefined
  }
}
