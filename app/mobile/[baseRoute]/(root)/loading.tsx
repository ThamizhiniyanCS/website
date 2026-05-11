import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="prose prose-invert mx-auto min-h-svh w-full max-w-7xl px-4 pt-20 md:px-8">
      <Skeleton className="h-12 w-full rounded-full" />

      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={`mobile-baseroute-loading-skeleton-${index}`}
            className="!m-0 flex h-full items-center"
          >
            <CardContent className="w-full">
              <Skeleton className="h-8 w-full rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Loading
