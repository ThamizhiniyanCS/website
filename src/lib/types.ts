export type MetaJSONchild =
  | {
      type: "file";
      slug: string;
      title: string;
      description: string;
      filename: string;
    }
  | {
      type: "directory";
      slug: string;
      title: string;
      group?: boolean;
    };

export interface MetaJSON {
  root?: boolean;
  slug: string;
  title: string;
  default?: string;
  children: MetaJSONchild[];
}

export type MetaJsonArray = MetaJSON[];

export interface TocItem {
  title?: React.ReactNode;
  url: string;
  depth: number;
}
