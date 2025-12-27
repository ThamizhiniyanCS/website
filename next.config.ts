import type { NextConfig } from "next"

import { env } from "./env"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`https://${env.CDN_DOMAIN}/**`)],
  },
}

export default nextConfig
