import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="prose prose-invert mx-auto min-h-svh w-full max-w-7xl pt-20">
      <Skeleton className="mb-8 h-12 w-48" />

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card
            key={`base-route-skeleton-${i}`}
            className="!m-0 flex h-full items-center"
          >
            <CardContent className="w-full">
              <Skeleton className="h-6 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
