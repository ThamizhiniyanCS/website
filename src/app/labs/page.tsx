import { Suspense } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkFlexibleToc from "remark-flexible-toc";

export default async function Page() {
  const response = await fetch(
    "https://cdn.thamizhiniyancs.me/labs/Malware%20Analysis%20Lab%20Setup/remote.mdx",
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch MDX from : ${response.statusText}`);
  }

  const source = await response.text();

  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [remarkFlexibleToc],
    },
    parseFrontmatter: true,
    // scope: {
    //   readingTime: calculateSomeHow(source),
    // },
    vfileDataIntoScope: "toc",
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MDXRemote source={source} options={options} />
    </Suspense>
  );
}
