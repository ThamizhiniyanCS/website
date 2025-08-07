import { MdxBreadcrumbsSkeleton } from "@/mdx/components/mdx-breadcrumbs";
import MdxLoadingSkeleton from "@/mdx/components/mdx-loading-skeleton";
import MdxTocSkeleton from "@/mdx/components/mdx-toc/skeleton";

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-between">
      NestedRoute Loading...
    </div>
  );
};

export default Loading;
