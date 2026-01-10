import Image from "next/image"

import { cn } from "@/lib/utils"

interface Props {
  src: { light: string; dark?: string } | { light?: string; dark: string }
  alt: string
  size: number
  className?: string
}

export default function Logo({ src, alt, size, className = "" }: Props) {
  const hasDistinctModes = src.light && src.dark && src.light !== src.dark

  if (hasDistinctModes) {
    return (
      <div
        className={cn("relative", className)}
        style={{ width: size, height: size }}
      >
        <Image
          src={src.light!}
          alt={alt}
          width={size}
          height={size}
          className="hidden dark:block"
          priority
        />
        <Image
          src={src.dark!}
          alt={alt}
          width={size}
          height={size}
          className="dark:hidden"
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
      className={className}
      priority
    />
  )
}
