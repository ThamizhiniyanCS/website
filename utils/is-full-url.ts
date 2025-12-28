export function isFullUrl(pathname: string): boolean {
  if (!pathname.startsWith("http")) {
    return false
  }

  try {
    const url = new URL(pathname)

    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    // NOTE: Throws error if it's a relative URL
    return false
  }
}
