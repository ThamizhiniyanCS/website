import type { NextConfig } from "next"

import { env } from "./env"

const CDN_DOMAIN =
  env.NODE_ENV === "development" ? `localhost:8000` : `cdn.${env.DOMAIN}`

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`https://${CDN_DOMAIN}/**`)],
  },
}

export default nextConfig
