import { Skeleton } from "@/components/ui/skeleton";

export default function MdxLoadingComponent() {
  return (
    <div id="mdx-loading" className="w-full">
      <div className="w-full pb-10">
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
    </div>
  );
}
