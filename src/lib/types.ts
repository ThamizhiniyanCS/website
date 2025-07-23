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
  group?: boolean;
  slug: string;
  title: string;
  children: MetaJSONchild[];
}

export type MetaJsonArray = MetaJSON[];

export interface TocItem {
  title?: React.ReactNode;
  url: string;
  depth: number;
}
