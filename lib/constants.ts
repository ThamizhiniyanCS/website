import { env } from "@/env"

export const BASE_URL =
  env.NODE_ENV === "development"
    ? `http://${env.DOMAIN}/`
    : `https://${env.DOMAIN}/`

export const CDN_BASE_URL =
  env.NODE_ENV === "development"
    ? `http://${env.CDN_DOMAIN}/`
    : `https://${env.CDN_DOMAIN}/`

export const ALLOWED_SUBDOMAINS = ["labs", "workshops", "writeups"]

export const DIRECTORIES = ["writeups"]
