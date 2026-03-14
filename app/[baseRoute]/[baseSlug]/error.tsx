"use client"

import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h2 className="text-2xl font-bold">Failed to load content</h2>
      <p className="text-muted-foreground max-w-md">
        {error.message ||
          "An unexpected error occurred while loading this content. The CDN may be temporarily unavailable."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
