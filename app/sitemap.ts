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
      url: `${PROTOCOL}labs.${env.DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 9.9,
    },
    {
      url: `${PROTOCOL}workshops.${env.DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 9.9,
    },
    {
      url: `${PROTOCOL}writeups.${env.DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 9.9,
    },
  ]
}
