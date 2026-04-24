import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXT_PUBLIC_DOMAIN: z.string().min(1).default("localhost:3000"),
    NEXT_PUBLIC_CDN_BASE_URL: z
      .string()
      .min(1)
      .default("http://localhost:8000"),
  },
  server: {
    OG_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_CDN_BASE_URL: process.env.NEXT_PUBLIC_CDN_BASE_URL,
    OG_SECRET: process.env.OG_SECRET,
  },
})
