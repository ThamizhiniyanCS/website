import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import type { Frontmatter, Scope } from "./types";

import { readingTime } from "reading-time-estimator";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// NOTE: MDX Related Components
import { mdxComponents } from "@/mdx/components/ui";

import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
/**
 * @import {ElementContent} from 'hast'
 */

// NOTE: Remark Plugins
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkNormalizeHeadings from "remark-normalize-headings";

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

export default async function (
  source: string,
  pathname: string,
): Promise<
  | {
      status: "success";
      content: React.JSX.Element;
      mod: Record<string, unknown>;
      frontmatter: Frontmatter;
      scope: Scope;
    }
  | { status: "failed"; error: string | Error }
> {
  if (!source) {
    return { status: "failed", error: "[-] The mdx source could not found !" };
  }

  // NOTE: MDX Remote Options
  const options: EvaluateOptions<Scope> = {
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
        [remarkFlexibleToc, { skipLevels: [] }],
        remarkGfm,
        remarkMath,
        remarkNormalizeHeadings,
      ],
    },
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source).text,
    },
    vfileDataIntoScope: "toc",
  };

  const { content, frontmatter, scope, mod, error } = await evaluate<
    Frontmatter,
    Scope
  >({
    source,
    options,
    components: mdxComponents(pathname),
  });

  if (error) {
    return { status: "failed", error };
  }

  return { status: "success", content, frontmatter, scope, mod };
}
