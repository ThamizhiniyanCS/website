import { MdxBreadcrumbsSkeleton } from "@/mdx/components/mdx-breadcrumbs";
import MdxTocSkeleton from "@/mdx/components/mdx-toc/skeleton";

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} className="pt-16">
        <MdxBreadcrumbsSkeleton />

        <div className="w-full">
          <div className="w-full px-10 pb-10">
            <Skeleton className="mt-10 h-[3rem] w-[30rem] rounded-full" />

            <div className="mt-10">
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
            </div>

            <Skeleton className="mt-10 h-[2rem] w-[20rem] rounded-full" />

            <div className="mt-10">
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
              <Skeleton className="mt-2 h-[1rem] w-full rounded-full" />
            </div>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={20}
        minSize={10}
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-0 h-screen w-full pt-16">
          <MdxTocSkeleton />
        </div>
      </ResizablePanel>
    </>
  );
};

export default Loading;
