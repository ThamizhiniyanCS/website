import { notFound } from "next/navigation";
import { NextRequest, NextResponse, userAgent } from "next/server";

import { ALLOWED_ROUTES, DOMAIN } from "./lib/constants";

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
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === "/favicon.ico") return NextResponse.next();

  // NOTE: Extract the hostname (e.g., "labs.thamizhiniyancs.me" or "labs.localhost:3000")
  const hostname = req.headers.get("host") || "";

  const { device } = userAgent(req);

  if (hostname.endsWith(`.${DOMAIN}`)) {
    const baseRoute = hostname.replace(`.${DOMAIN}`, "");

    if (ALLOWED_ROUTES.includes(baseRoute)) {
      switch (device.type) {
        case "mobile":
          return NextResponse.rewrite(
            new URL(`/mobile/${baseRoute}${url.pathname}`, req.url),
          );
        case "tablet":
          return NextResponse.rewrite(
            new URL(`/mobile/${baseRoute}${url.pathname}`, req.url),
          );
        default:
          return NextResponse.rewrite(
            new URL(`/${baseRoute}${url.pathname}`, req.url),
          );
      }
    } else {
      notFound();
    }
  }

  return NextResponse.next();
}
