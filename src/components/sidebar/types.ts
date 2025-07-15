export interface Tree {
  slug: string;
  title: string;
  type: "directory" | "file";
  depth: number;
  children: Tree[];
}
