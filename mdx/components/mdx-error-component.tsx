import { MdxBreadcrumbsSkeleton } from "@/mdx/components/mdx-breadcrumbs";
import MdxTocSkeleton from "@/mdx/components/mdx-toc/skeleton";

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";

type Props = {
  error: Error | string;
};

export default function MdxErrorComponent({ error }: Props) {
  return (
    <>
      <ResizablePanel defaultSize={60} minSize={40} className="pt-16">
        <MdxBreadcrumbsSkeleton />

        <div className="w-full">
          <div className="w-full px-10 pb-10">
            <div id="mdx-error" className="flex w-full items-center">
              <pre style={{ color: "var(--error)" }}>
                <h1>Error</h1>
                <code>{typeof error === "string" ? error : error.message}</code>
              </pre>
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
}
