import type { MetaJSON } from "@/lib/types";
import Link from "next/link";
import { FolderIcon, FileIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DirectoryContentsRenderer = ({ meta }: { meta: MetaJSON }) => {
  const directories = meta.children.filter(({ type }) => type === "directory");
  const files = meta.children.filter(({ type }) => type === "file");

  const gridClass =
    "grid w-full grid-cols-2 gap-5 @min-3xl:grid-cols-3 @min-5xl:grid-cols-4 @min-7xl:grid-cols-5 @min-[90rem]:grid-cols-6";

  return (
    <div className="prose prose-invert @container max-w-none px-10">
      <h1>{meta.title}</h1>

      <h2>Directories</h2>

      <div className={gridClass}>
        {directories.map(({ title, slug }, index) => (
          <Link key={index} href={slug} className="no-underline">
            <Card className="rounded-sm p-0" style={{ margin: 0 }}>
              <CardContent className="flex gap-2 p-2">
                <FolderIcon /> {title}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2>Files</h2>

      <div className={gridClass}>
        {files.map(({ title, slug }, index) => (
          <Link key={index} href={slug} className="no-underline">
            <Card className="rounded-sm p-0" style={{ margin: 0 }}>
              <CardContent className="flex gap-2 p-2">
                <FileIcon /> {title}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DirectoryContentsRenderer;
