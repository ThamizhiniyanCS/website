import type { TocItem } from "remark-flexible-toc";

export type Scope = {
  readingTime: string;
  toc?: TocItem[];
};

export type Frontmatter = {
  title: string;
  author: string;
};
