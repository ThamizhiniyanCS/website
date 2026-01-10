"use server"

import type { Socials } from "@/types/socials.type"
import { CDN_BASE_URL } from "@/lib/constants"

export default async function getSocials(): Promise<Socials | undefined> {
  try {
    const url = `${CDN_BASE_URL}socials.json`

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
