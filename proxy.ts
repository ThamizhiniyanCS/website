import { notFound } from "next/navigation"
import { NextResponse, userAgent } from "next/server"
import type { NextRequest } from "next/server"

import { ALLOWED_SUBDOMAINS, BASE_URL } from "@/lib/constants"

import { env } from "./env"

const BASE_DOMAIN = `.${env.DOMAIN}`

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)",
  ],
}

export default async function proxy(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname === "/favicon.ico") return NextResponse.next()

  // NOTE: Extract the hostname (e.g., "labs.thamizhiniyancs.me" or "labs.localhost:3000")
  const hostname = request.headers.get("host")

  const { device } = userAgent(request)

  if (hostname?.endsWith(BASE_DOMAIN)) {
    const subdomain = hostname.replace(BASE_DOMAIN, "")

    if (ALLOWED_SUBDOMAINS.has(subdomain)) {
      if (subdomain === "og") {
        return rewriteWithCustomHeaders(new URL(`/api/og`, request.url))
      }

      switch (device.type) {
        case "mobile":
          return rewriteWithCustomHeaders(
            new URL(`/mobile/${subdomain}${url.pathname}`, request.url)
          )
        case "tablet":
          return rewriteWithCustomHeaders(
            new URL(`/mobile/${subdomain}${url.pathname}`, request.url)
          )
        default:
          return rewriteWithCustomHeaders(
            new URL(`/${subdomain}${url.pathname}`, request.url)
          )
      }
    } else {
      notFound()
    }
  }
}

function rewriteWithCustomHeaders(url: URL) {
  const res = NextResponse.rewrite(url)

  res.headers.set("Content-Signal", "search=yes, ai-train=no")
  res.headers.set("X-Frame-Options", "SAMEORIGIN")
  res.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${BASE_URL} https://*${BASE_DOMAIN};`
  )
  res.headers.set("X-Content-Type-Options", "nosniff")
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return res
}
