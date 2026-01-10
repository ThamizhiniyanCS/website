import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="w-full px-4 pb-10">
      <Skeleton className="mt-10 h-12 w-full rounded-full" />

      <div className="mt-10">
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
      </div>

      <Skeleton className="mt-10 h-8 w-full rounded-full" />

      <div className="mt-10">
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
      </div>
    </div>
  )
}

export default Loading
