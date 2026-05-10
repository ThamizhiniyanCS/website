import type Frontmatter from "@/mdx/types/frontmatter.type"
import type { TOCItemType } from "fumadocs-core/toc"

import type { MetaJSON } from "@/types/meta-json.type"

type ResolvedDirectory = {
  type: "directory"
  meta: MetaJSON
  toc: TOCItemType[]
}

type ResolvedMdx = {
  type: "mdx"
  content: React.JSX.Element
  frontmatter: Frontmatter
  toc: TOCItemType[]
}

type ResolvedError = {
  type: "error"
  error: string | Error
}

export type ResolvedContent =
  | ResolvedDirectory
  | ResolvedMdx
  | ResolvedError
  | null
