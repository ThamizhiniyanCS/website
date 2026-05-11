import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="prose prose-invert mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-10 px-4 pt-20 md:px-8 lg:px-10">
      <section>
        <Skeleton className="mb-8 h-10 w-48" />

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={`latest-blog-skeleton-${i}`} className="!m-0 h-full">
              <CardHeader>
                <Skeleton className="mb-4 h-8 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
              <CardFooter className="mt-auto flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="mb-8 h-10 w-32" />

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card
              key={`archive-blog-skeleton-${i}`}
              className="!m-0 flex h-full items-center"
            >
              <CardContent className="w-full">
                <Skeleton className="h-6 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
