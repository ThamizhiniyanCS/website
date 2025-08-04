import { MdxBreadcrumbsSkeleton } from "@/mdx/components/mdx-breadcrumbs";
import MdxTocSkeleton from "@/mdx/components/mdx-toc/skeleton";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarSkeleton } from "@/components/sidebar";

const Loading = () => {
  return (
    <ResizablePanelGroup
      // autoSaveId="persistance"
      direction="horizontal"
      className="min-h-screen w-full max-w-[calc(100vw-15px)]"
      style={{ overflow: "visible" }}
    >
      <ResizablePanel
        defaultSize={20}
        minSize={10}
        order={1}
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-0 h-screen w-full px-4 pt-16">
          <SidebarSkeleton />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={60} minSize={40} order={2} className="pt-16">
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
        order={3}
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-0 h-screen w-full pt-16">
          <MdxTocSkeleton />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Loading;
