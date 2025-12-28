import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import { type ElementContent } from "hast"
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic"
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc"
import { readingTime } from "reading-time-estimator"
import rehypeAutoLinkHeadings from "rehype-autolink-headings"
import rehypeExpressiveCode, {
  type RehypeExpressiveCodeOptions,
} from "rehype-expressive-code"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import rehypeUnwrapImages from "rehype-unwrap-images"
import RemarkFlexibleToc from "remark-flexible-toc"
import remarkGFM from "remark-gfm"
import remarkMath from "remark-math"
import remarkNormalizeHeadings from "remark-normalize-headings"

import MdxComponents from "../components/ui"
import type Frontmatter from "../types/frontmatter.type"
import type Scope from "../types/scope.type"

const ANCHOR_SVG_CONTENT = fromHtmlIsomorphic(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  { fragment: true }
).children as ElementContent[]

const EXPRESSIVE_CODE_OPTIONS: RehypeExpressiveCodeOptions = {
  themes: ["tokyo-night"],
  plugins: [pluginLineNumbers()],
  defaultProps: {
    // Disable line numbers by default
    showLineNumbers: false,
  },
}

const STATIC_MDX_OPTIONS: EvaluateOptions<Scope>["mdxOptions"] = {
  rehypePlugins: [
    rehypeUnwrapImages,
    [rehypeExpressiveCode, EXPRESSIVE_CODE_OPTIONS],
    rehypeKatex,
    rehypeSlug,
    [
      rehypeAutoLinkHeadings,
      {
        behavior: "append",
        content: ANCHOR_SVG_CONTENT,
      },
    ],
  ],
  remarkPlugins: [
    [RemarkFlexibleToc, { skipLevels: [] }],
    remarkGFM,
    remarkMath,
    remarkNormalizeHeadings,
  ],
}

type MdxResult =
  | {
      status: "success"
      content: React.JSX.Element
      mod: Record<string, unknown>
      frontmatter: Frontmatter
      scope: Scope
    }
  | { status: "failed"; error: string | Error }

export default async function processMDX(
  source: string,
  baseRoute: string,
  baseSlug: string,
  pathname: string
): Promise<MdxResult> {
  if (!source) {
    return {
      status: "failed",
      error: "[-] The mdx source could not be found!",
    }
  }

  try {
    const { content, frontmatter, scope, mod, error } = await evaluate<
      Frontmatter,
      Scope
    >({
      source,
      options: {
        mdxOptions: STATIC_MDX_OPTIONS,
        parseFrontmatter: true,
        vfileDataIntoScope: "toc",
        scope: {
          readingTime: readingTime(source).text,
        },
      },
      components: MdxComponents(baseRoute, baseSlug, pathname),
    })

    if (error) throw error

    return { status: "success", content, frontmatter, scope, mod }
  } catch (error) {
    return {
      status: "failed",
      error: error instanceof Error ? error : String(error),
    }
  }
}
