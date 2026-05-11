import Image from "next/image"

import { cn } from "@/lib/utils"

interface Props {
  src: { light: string; dark?: string } | { light?: string; dark: string }
  alt: string
  size: number
  className?: string
  imageClassName?: string
}

export default function Logo({
  src,
  alt,
  size,
  className = "",
  imageClassName,
}: Props) {
  const hasDistinctModes = src.light && src.dark && src.light !== src.dark

  if (hasDistinctModes) {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        style={className ? undefined : { width: size, height: size }}
      >
        <Image
          src={src.light!}
          alt={alt}
          fill
          sizes={`${size}px`}
          className={cn("hidden object-contain dark:block", imageClassName)}
          priority
        />
        <Image
          src={src.dark!}
          alt={alt}
          fill
          sizes={`${size}px`}
          className={cn("object-contain dark:hidden", imageClassName)}
          priority
        />
      </div>
    )
  }

  const finalSrc = src.light || src.dark!

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={className ? undefined : { width: size, height: size }}
    >
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes={`${size}px`}
        className={cn("object-contain", imageClassName)}
        priority
      />
    </div>
  )
}
