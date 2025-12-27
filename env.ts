import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DOMAIN: z.url().default("localhost:3000"),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DOMAIN: process.env.DOMAIN,
  },
})
