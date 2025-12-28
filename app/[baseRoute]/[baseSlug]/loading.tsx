import { MdxBreadcrumbsSkeleton } from "@/mdx/components/mdx-breadcrumbs"
import MdxLoadingSkeleton from "@/mdx/components/mdx-loading-skeleton"
import MdxTocSkeleton from "@/mdx/components/mdx-toc/skeleton"

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

const Loading = () => {
  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} className="pt-16" order={2}>
        <MdxBreadcrumbsSkeleton />
        <MdxLoadingSkeleton />
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
    </>
  )
}

export default Loading
