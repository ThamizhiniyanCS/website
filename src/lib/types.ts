export type MetaJSONchild =
  | {
      type: "file";
      slug: string;
      title: string;
      description: string;
      filename: string;
    }
  | {
      slug: string;
      type: "directory";
      title: string;
    };

export interface MetaJSON {
  slug: string;
  title: string;
  children: MetaJSONchild[];
}

export interface TocItem {
  title?: React.ReactNode;
  url: string;
  depth: number;
}
