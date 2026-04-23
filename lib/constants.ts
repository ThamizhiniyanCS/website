import { env } from "@/env"

export const PROTOCOL = env.NODE_ENV === "development" ? "http://" : "https://"

export const BASE_URL = `${PROTOCOL}${env.DOMAIN}/`

export const CDN_BASE_URL = env.CDN_BASE_URL + "/"

export const ALLOWED_SUBDOMAINS = new Set<string>([
  "blogs",
  "docs",
  "labs",
  "og",
  "workshops",
  "writeups",
])

export const DIRECTORIES = new Set<string>(["writeups"])
