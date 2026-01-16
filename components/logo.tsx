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
        style={{ width: size, height: size }}
      >
        <Image
          src={src.light!}
          alt={alt}
          width={size}
          height={size}
          className={cn("hidden dark:block", imageClassName)}
          priority
        />
        <Image
          src={src.dark!}
          alt={alt}
          width={size}
          height={size}
          className={cn("dark:hidden", imageClassName)}
          priority
        />
      </div>
    )
  }

  const finalSrc = src.light || src.dark!

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={size}
      height={size}
      className={cn(className, imageClassName)}
      priority
    />
  )
}
