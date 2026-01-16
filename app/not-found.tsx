import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "404 | Page Not Found",
}

export default function NotFound() {
  return (
    <div className="font-josefin-sans flex min-h-svh flex-col items-center justify-center gap-4">
      <Image
        src="/404.svg"
        width={400}
        height={400}
        alt="404 Not Found Illustration"
      />

      <h1 className="text-5xl">Page Not Found</h1>
      <p className="text-xl">Could not find requested resource</p>

      <Button asChild size="lg">
        <Link href="/" className="">
          Return Home
        </Link>
      </Button>
    </div>
  )
}
