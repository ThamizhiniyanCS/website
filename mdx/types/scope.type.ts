import type { TocItem } from "remark-flexible-toc"

type Scope = {
  readingTime: string
  toc?: TocItem[]
}

export default Scope
