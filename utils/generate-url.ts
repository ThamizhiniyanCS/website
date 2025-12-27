import { env } from "@/env"

import { ALLOWED_SUBDOMAINS } from "@/lib/constants"

export default function generateURL(subdomain: string, pathname: string = "") {
  if (!ALLOWED_SUBDOMAINS.includes(subdomain)) return ""

  return env.NODE_ENV === "development"
    ? `http://${subdomain}.${env.DOMAIN}${pathname}`
    : `https://${subdomain}.${env.DOMAIN}${pathname}`
}
