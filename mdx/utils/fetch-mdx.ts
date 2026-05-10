import { CDN_BASE_URL, DIRECTORIES } from "@/lib/constants"

export async function fetchMDXSource(
  baseRoute: string,
  cdnPathname: string
): Promise<string | null> {
  const absolutePathname = `${CDN_BASE_URL}${cdnPathname}`

  const url = DIRECTORIES.has(baseRoute)
    ? `${absolutePathname}/index.mdx`
    : `${absolutePathname}.mdx`

  try {
    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 86400 }, // 24 hours
    })

    if (!response.ok) {
      console.error(`[-] Failed to fetch MDX: ${url} (${response.status})`)
      return null
    }

    return await response.text()
  } catch (err) {
    console.error(`[-] MDX fetch error: ${url}`, err)
    return null
  }
}
