import { headers } from "next/headers";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MdxRenderer from "@/components/mdx-renderer";
import Sidebar from "@/components/sidebar";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pathname = `https://cdn.thamizhiniyancs.me/labs/${slug}`;

  const response = await fetch(`${pathname}/index.mdx`);

  if (!response.ok) {
    throw new Error(`Failed to fetch MDX from : ${response.statusText}`);
  }

  const source = await response.text();

  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  console.log(userAgent);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} minSize={10}>
        <Sidebar pathname={pathname} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={60} minSize={40}>
        <div className="w-full">
          <MdxRenderer source={source} pathname={pathname} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20} minSize={10}>
        On This Page
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
