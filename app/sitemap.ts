import type { MetadataRoute } from "next"
import { env } from "@/env"

import { BASE_URL, PROTOCOL } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${PROTOCOL}labs.${env.NEXT_PUBLIC_DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${PROTOCOL}workshops.${env.NEXT_PUBLIC_DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${PROTOCOL}writeups.${env.NEXT_PUBLIC_DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ]
}
