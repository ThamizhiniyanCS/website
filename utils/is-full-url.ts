export function isFullUrl(pathname: string): boolean {
  try {
    const url = new URL(pathname)

    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    // NOTE: Throws error if it's a relative URL
    return false
  }
}
