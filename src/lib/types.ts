type Child =
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
  children: Child[];
}
