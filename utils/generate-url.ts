import { env } from "@/env"

import { ALLOWED_SUBDOMAINS, PROTOCOL } from "@/lib/constants"

export default function generateURL(subdomain: string, pathname: string = "") {
  if (!ALLOWED_SUBDOMAINS.has(subdomain)) return ""

  return `${PROTOCOL}${subdomain}.${env.DOMAIN}${pathname}`
}
