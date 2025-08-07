import { Suspense } from "react";
import MdxLoadingComponent from "@/mdx/components/mdx-loading-component";

import { cn } from "@/lib/utils";

const MdxRenderer = ({ content }: { content: React.JSX.Element }) => {
  return (
    <div
      className={cn(
        "prose prose-img:m-0 dark:prose-invert prose-a:break-words min-h-[70vh] max-w-none px-4 pb-10 md:px-8 lg:px-10",
        "prose-code:break-words",
      )}
    >
      <Suspense fallback={<MdxLoadingComponent />}>{content}</Suspense>
    </div>
  );
};

export default MdxRenderer;
