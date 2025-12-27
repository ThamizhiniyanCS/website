import { env } from "@/env"

export function isExternalLink(
  absolutePathname: string,
  currentHost: string = env.DOMAIN
): boolean {
  try {
    const url = new URL(absolutePathname, `http://${currentHost}`)
    const linkHost = url.hostname

    // NOTE: External if hostname doesn't match or isn't a subdomain
    return linkHost !== currentHost && !linkHost.endsWith(`.${currentHost}`)
  } catch {
    // NOTE: If it can't be parsed as URL, assume it's relative => not external
    return false
  }
}
