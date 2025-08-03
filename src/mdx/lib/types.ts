import type { TocItem } from "remark-flexible-toc";

export type Scope = {
  readingTime: string;
  toc?: TocItem[];
};

export type Frontmatter = {
  title: string;
  description: string;
  date: Date;
  lastmod: Date;
  previousPage?: {
    title: string;
    slug: string;
  };
  nextPage?: {
    title: string;
    slug: string;
  };
};
