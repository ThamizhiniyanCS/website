"use server"

import type { MetaJSON } from "@/types/meta-json.type"
import { CDN_BASE_URL } from "@/lib/constants"

export default async function getMetaJSON(
  pathname: string
): Promise<MetaJSON | undefined> {
  try {
    const url = `${CDN_BASE_URL}${pathname}/meta.json`

    const response = await fetch(url, {
      // TODO: Implement Caching
      // cache: "force-cache",
      // next: {
      //   revalidate: 3600,
      // },
    })

    if (!response.ok) {
      console.log(`[-] meta.json not found at ${url}`)
      console.log(response)
      return undefined
    }

    console.log("[+] getMetaJSON:", url)

    return await response.json()
  } catch (err) {
    console.error("Error fetching meta.json:", err)

    return undefined
  }
}
