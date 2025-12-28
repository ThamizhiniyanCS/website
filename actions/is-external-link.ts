"use server"

import { env } from "@/env"

export default async function isExternalLink(
  href: string,
  domain: string = env.DOMAIN
): Promise<boolean> {
  if (
    (href.startsWith("/") && !href.startsWith("//")) ||
    href.startsWith("#") ||
    href.startsWith("?")
  ) {
    return false
  }

  try {
    const currentHost = domain.includes(":") ? domain.split(":")[0] : domain

    const url = new URL(href, `http://${currentHost}`)
    const linkHost = url.hostname

    return linkHost !== currentHost && !linkHost.endsWith(`.${currentHost}`)
  } catch {
    // NOTE: If it can't be parsed as URL, assume it's relative => not external
    return false
  }
}
