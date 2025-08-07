import { MdxBreadcrumbsSkeleton } from "@/mdx/components/mdx-breadcrumbs";
import MdxLoadingSkeleton from "@/mdx/components/mdx-loading-skeleton";
import MdxTocSkeleton from "@/mdx/components/mdx-toc/skeleton";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarSkeleton } from "@/components/sidebar";

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-between">
      BaseRoute Loading...
    </div>
  );
};

export default Loading;
