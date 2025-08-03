import { NextRequest, NextResponse } from "next/server";

import { DOMAIN } from "./lib/constants";

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
  // NOTE: Extract the hostname (e.g., "labs.thamizhiniyancs.me" or "labs.localhost:3000")
  const hostname = req.headers.get("host") || "";

  if (hostname.endsWith(`.${DOMAIN}`)) {
    const baseRoute = hostname.replace(`.${DOMAIN}`, "");

    return NextResponse.rewrite(
      new URL(`/${baseRoute}${url.pathname}`, req.url),
    );
  }

  return NextResponse.next();
}
