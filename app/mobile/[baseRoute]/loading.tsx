import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="prose prose-invert mx-auto min-h-screen w-full max-w-7xl px-4 pt-20 md:px-8">
      <Skeleton className="h-12 w-full rounded-full" />

      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={`mobile-baseroute-loading-skeleton-${index}`}
            style={{
              marginBlock: 0,
            }}
          >
            <CardContent>
              <Skeleton className="mt-2 h-8 w-full rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Loading
