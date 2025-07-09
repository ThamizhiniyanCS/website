import * as cheerio from "cheerio";

export type LinkMetadata = {
  title: string;
  description: string;
  image: string;
  site: string;
  url: string;
};

export async function fetchLinkMetadata(
  href: string,
): Promise<LinkMetadata | null> {
  try {
    const res = await fetch(href, { cache: "no-store" });

    // Basic HTML type check
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    const getMeta = (prop: string) =>
      $(`meta[property="${prop}"]`).attr("content") ||
      $(`meta[name="${prop}"]`).attr("content") ||
      "";

    return {
      title: getMeta("og:title") || $("title").text(),
      description: getMeta("og:description") || getMeta("description"),
      image: getMeta("og:image"),
      site: getMeta("og:site_name"),
      url: getMeta("og:url") || href,
    };
  } catch (err) {
    console.error("Metadata fetch failed:", err);
    return null;
  }
}
