"use server"

import * as cheerio from "cheerio"

export type LinkMetadata = {
  title: string
  description: string
  image: string | null
  site: string
  url: string
}

export default async function fetchLinkMetadata(
  url: string
): Promise<LinkMetadata | null> {
  if (!url) return null

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 4000) // 4s timeout

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "force-cache",
      next: {
        revalidate: 86400, // 24 hours
      },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreviewBot/1.0)",
        Accept: "text/html",
      },
    })

    if (!res.headers.get("content-type")?.includes("text/html")) {
      clearTimeout(timeoutId)

      return null
    }

    const reader = res.body?.getReader()
    if (!reader) throw new Error("[-] [fetch-link-metadata.ts] No Body")

    const decoder = new TextDecoder("utf-8")
    let html = ""
    let bytesRead = 0
    const MAX_BYTES = 40 * 1024 // 40KB Cap

    while (true) {
      const { done, value } = await reader.read()

      if (done || bytesRead >= MAX_BYTES) break

      html += decoder.decode(value, { stream: true })
      bytesRead += value.length
      if (html.includes("</head>")) break
    }

    controller.abort()
    clearTimeout(timeoutId)

    const $ = cheerio.load(html)
    const getMeta = (prop: string) =>
      $(`meta[property="${prop}"]`).attr("content") ||
      $(`meta[name="${prop}"]`).attr("content")

    // Helper to fix relative URLs (e.g. "/logo.png" -> "https://site.com/logo.png")
    const resolveUrl = (path: string | undefined) => {
      if (!path) return null
      if (path.startsWith("http")) return path
      try {
        return new URL(path, url).toString()
      } catch {
        return null
      }
    }

    return {
      title: (getMeta("og:title") || $("title").text() || "").trim(),
      description: (
        getMeta("og:description") ||
        getMeta("description") ||
        ""
      ).trim(),
      image: resolveUrl(getMeta("og:image")),
      site: (getMeta("og:site_name") || "").trim(),
      url: resolveUrl(getMeta("og:url")) || url,
    }
  } catch (error) {
    console.error("[-] [fetch-link-metadata.ts] Preview failed:", error)
    return null
  }
}
