import type { NextConfig } from "next";
import { CDN_DOMAIN } from "@/lib/constants";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`https://${CDN_DOMAIN}/**`)],
  },
};

export default nextConfig;
