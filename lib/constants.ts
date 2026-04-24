import { env } from "@/env"

export const PROTOCOL = env.NODE_ENV === "development" ? "http://" : "https://"

export const BASE_URL = `${PROTOCOL}${env.NEXT_PUBLIC_DOMAIN}/`

export const CDN_BASE_URL = env.NEXT_PUBLIC_CDN_BASE_URL + "/"

export const ALLOWED_SUBDOMAINS = new Set<string>([
  "blogs",
  "docs",
  "labs",
  "og",
  "workshops",
  "writeups",
])

export const BASE_ROUTES = Array.from(ALLOWED_SUBDOMAINS).filter(
  (route) => route !== "og"
)

export const DIRECTORIES = new Set<string>(["writeups"])
