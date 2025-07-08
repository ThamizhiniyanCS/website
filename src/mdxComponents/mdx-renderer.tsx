import { Suspense } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { Link } from "lucide-react";

// NOTE: MDX Related Components
import MdxErrorComponent from "@/mdxComponents/mdx-error-component";
import MdxLoadingComponent from "@/mdxComponents/mdx-loading-component";
import { mdxComponents } from "@/mdxComponents";

import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
/**
 * @import {ElementContent} from 'hast'
 */

// NOTE: Remark Plugins
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
// import remarkEmbedder from "@remark-embedder/core";
import oembedTransformer, {
  type Config as OembedTransformerConfig,
} from "@remark-embedder/transformer-oembed";
import remarkMath from "remark-math";

// NOTE: Rehype Plugins
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeExpressiveCode, {
  type RehypeExpressiveCodeOptions,
} from "rehype-expressive-code";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// NOTE: Rehype Expressive Code Options
const rehypeExpressiveCodeOptions: RehypeExpressiveCodeOptions = {
  themes: ["tokyo-night"],
  plugins: [pluginLineNumbers()],
  defaultProps: {
    // Disable line numbers by default
    showLineNumbers: false,
  },
};

// NOTE: Remark Embedder Options
// const remarkEmbedderOptions = {
//   transformers: [
//     oembedTransformer,
//     {
//       params: { theme: "dark", dnt: true, omit_script: true },
//     } as OembedTransformerConfig,
//   ],
// };

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
        rehypeKatex,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            content: /** @type {Array<ElementContent>} */ fromHtmlIsomorphic(
              `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
              { fragment: true },
            ).children,
          },
        ],
      ],
      remarkPlugins: [
        remarkFlexibleToc,
        remarkGfm,
        // [remarkEmbedder, remarkEmbedderOptions],
        remarkMath,
      ],
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
