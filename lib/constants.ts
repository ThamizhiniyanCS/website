import { env } from "@/env"

export const BASE_URL =
  env.NODE_ENV === "development"
    ? `http://${env.DOMAIN}/`
    : `https://${env.DOMAIN}/`

export const CDN_DOMAIN =
  env.NODE_ENV === "development" ? `localhost:8000` : `cdn.${env.DOMAIN}`

export const CDN_BASE_URL =
  env.NODE_ENV === "development"
    ? `http://${CDN_DOMAIN}/`
    : `https://${CDN_DOMAIN}/`

export const ALLOWED_SUBDOMAINS = ["labs", "workshops", "writeups"]

export const DIRECTORIES = ["writeups"]
