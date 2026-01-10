import { Skeleton } from "@/components/ui/skeleton"

const MdxLoadingSkeleton = () => {
  return (
    <div className="w-full px-10 pb-10">
      <Skeleton className="mt-10 h-12 w-120 rounded-full" />

      <div className="mt-10">
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
      </div>

      <Skeleton className="mt-10 h-8 w-[20rem] rounded-full" />

      <div className="mt-10">
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-full rounded-full" />
      </div>
    </div>
  )
}

export default MdxLoadingSkeleton
