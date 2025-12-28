import Image from "next/image"
import { isFullUrl } from "@/utils/is-full-url"

import { CDN_BASE_URL, DIRECTORIES } from "@/lib/constants"
import { ImageZoom } from "@/components/kibo-ui/image-zoom"

const joinPath = (...parts: string[]) => {
  return parts
    .map((part, i) => {
      if (i === 0) return part.replace(/\/+$/, "")
      return part.replace(/^\/+|\/+$/g, "")
    })
    .join("/")
}

const MdxImage = ({
  props,
  baseRoute,
  baseSlug,
  pathname,
}: {
  props: React.ComponentPropsWithoutRef<"img">
  baseRoute: string
  baseSlug: string
  pathname: string
}) => {
  const src = props.src as string
  let finalSrc = src

  if (isFullUrl(src)) {
    finalSrc = src
  } else {
    // Determine the correct relative path
    // If it's not a special directory, remove "../" and build the slug path
    if (!DIRECTORIES.has(baseRoute)) {
      const cleanSrc = src.replaceAll("../", "")
      finalSrc = joinPath(CDN_BASE_URL, baseRoute, baseSlug, cleanSrc)
    } else {
      // Default fallback
      finalSrc = joinPath(CDN_BASE_URL, pathname, src)
    }
  }

  return (
    <ImageZoom className="bg-muted/10 relative mx-auto my-5 flex aspect-video items-center justify-center overflow-hidden rounded-lg">
      <Image
        src={finalSrc}
        alt={props.alt || ""}
        // Adapt to the aspect-video container
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        className="object-contain"
        placeholder="empty"
        loading="lazy"
      />
    </ImageZoom>
  )
}

export default MdxImage
