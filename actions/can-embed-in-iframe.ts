"use server"

export default async function canEmbedInIframe(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      cache: "force-cache",
      next: {
        revalidate: 86400, // Cache this result for 24 hours (in seconds)
        tags: ["iframe-check"], // To manually purge this cache later
      },
    })

    const headers = response.headers
    const xFrameOptions = headers.get("x-frame-options")?.toLowerCase()
    const csp = headers.get("content-security-policy")?.toLowerCase()

    if (xFrameOptions) {
      if (
        xFrameOptions.includes("deny") ||
        xFrameOptions.includes("sameorigin")
      ) {
        return false
      }
    }

    if (csp) {
      const directives = csp.split(";")
      const frameAncestors = directives.find((d) =>
        d.trim().startsWith("frame-ancestors")
      )

      if (frameAncestors) {
        const ruleValue = frameAncestors.trim()

        if (ruleValue === "frame-ancestors *") return true

        return false
      }
    }

    return true
  } catch (error) {
    console.error(`[-] [canEmbedInIframe.ts] Error fetching URL: ${URL}`, error)

    return false
  }
}
