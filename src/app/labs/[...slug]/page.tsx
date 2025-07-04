import { Suspense } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/mdxComponents";
import { headers } from "next/headers";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// NOTE: Remark Plugins
import remarkFlexibleToc from "remark-flexible-toc";

// NOTE: Rehype Plugins
import rehypeUnwrapImages from "rehype-unwrap-images";

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

  const options: MDXRemoteOptions = {
    mdxOptions: {
      rehypePlugins: [rehypeUnwrapImages],
      remarkPlugins: [remarkFlexibleToc],
    },
    parseFrontmatter: true,
    // scope: {
    //   readingTime: calculateSomeHow(source),
    // },
    vfileDataIntoScope: "toc",
  };

  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  console.log(userAgent);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>One</ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={60}>
        <div className="prose prose-img:m-0 dark:prose-invert max-w-none px-10">
          <Suspense fallback={<p>Loading...</p>}>
            <MDXRemote
              source={source}
              options={options}
              components={mdxComponents(pathname)}
            />
          </Suspense>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={20}>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
}
