import { Suspense } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// NOTE: MDX Related Components
import MdxErrorComponent from "@/components/mdx-error-component";
import MdxLoadingComponent from "@/components/mdx-loading-component";
import { mdxComponents } from "@/mdxComponents";

// NOTE: Remark Plugins
import remarkFlexibleToc from "remark-flexible-toc";

// NOTE: Rehype Plugins
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeExpressiveCode, {
  type RehypeExpressiveCodeOptions,
} from "rehype-expressive-code";

// NOTE: Rehype Expressive Code Options
const rehypeExpressiveCodeOptions: RehypeExpressiveCodeOptions = {
  themes: ["tokyo-night"],
  plugins: [pluginLineNumbers()],
  defaultProps: {
    // Disable line numbers by default
    showLineNumbers: false,
  },
};

const MdxRenderer = ({
  source,
  pathname,
}: {
  source: string;
  pathname: string;
}) => {
  // NOTE: MDX Remote Options
  const options: MDXRemoteOptions = {
    mdxOptions: {
      rehypePlugins: [
        rehypeUnwrapImages,
        [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
      ],
      remarkPlugins: [remarkFlexibleToc],
    },
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source).text,
    },
    vfileDataIntoScope: "toc",
  };

  return (
    <div className="prose prose-img:m-0 dark:prose-invert max-w-none px-10">
      <Suspense fallback={<MdxLoadingComponent />}>
        <MDXRemote
          source={source}
          options={options}
          components={mdxComponents(pathname)}
          onError={MdxErrorComponent}
        />
      </Suspense>
    </div>
  );
};

export default MdxRenderer;
