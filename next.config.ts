import type { NextConfig } from "next"

import { env } from "./env"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(`${env.CDN_BASE_URL}/**`),
      new URL("https://cdn.jsdelivr.net/**"),
    ],
  },
}

export default nextConfig
