import { Suspense } from "react";
import MdxLoadingComponent from "@/mdx/components/mdx-loading-component";

const MdxRenderer = ({ content }: { content: React.JSX.Element }) => {
  return (
    <div className="prose prose-img:m-0 dark:prose-invert max-w-none px-10 pb-10">
      <Suspense fallback={<MdxLoadingComponent />}>{content}</Suspense>
    </div>
  );
};

export default MdxRenderer;
