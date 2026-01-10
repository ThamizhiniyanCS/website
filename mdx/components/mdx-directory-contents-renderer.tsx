import Link from "next/link"
import { FileIcon, FolderIcon, LinkIcon } from "lucide-react"

import type { MetaJSON } from "@/types/meta-json.type"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const DirectoryContentsRenderer = ({
  meta,
  pathname,
  root,
}: {
  meta: MetaJSON
  pathname: string
  root: string | null
}) => {
  const directories = meta.children.filter(({ type }) => type === "directory")
  const files = meta.children.filter(({ type }) => type === "file")

  const gridClass =
    "grid w-full grid-cols-2 gap-5 @min-3xl:grid-cols-3 @min-5xl:grid-cols-4 @min-7xl:grid-cols-5 @min-[90rem]:grid-cols-6"

  return (
    <div
      className={cn(
        "prose dark:prose-invert @container max-w-none px-4 md:px-8 lg:px-10"
      )}
    >
      <h1 id={meta.slug}>
        {meta.title}
        <Link href={"#" + meta.title} className="pointer-events-none opacity-0">
          <LinkIcon className="size-6" />
        </Link>
      </h1>

      <h2 id="directories">
        Directories
        <Link href="#directories" className="pointer-events-none opacity-0">
          <LinkIcon className="size-6" />
        </Link>
      </h2>

      <div className={gridClass}>
        {directories.map(({ title, slug }, index) => (
          <Link
            key={index}
            href={{
              pathname: `/${pathname}/${slug}`,
              query: root != null ? { root } : undefined,
            }}
            className="no-underline"
          >
            <Card className="rounded-sm p-0" style={{ margin: 0 }}>
              <CardContent className="flex gap-2 p-2">
                <FolderIcon className="flex-none" /> {title}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 id="files">
        Files
        <Link href="#files" className="pointer-events-none opacity-0">
          <LinkIcon className="size-6" />
        </Link>
      </h2>

      <div className={gridClass}>
        {files.map(({ title, slug }, index) => (
          <Link
            key={index}
            href={{
              pathname: `/${pathname}/${slug}`,
              query: root != null ? { root } : undefined,
            }}
            className="no-underline"
          >
            <Card className="rounded-sm p-0" style={{ margin: 0 }}>
              <CardContent className="flex gap-2 p-2">
                <FileIcon className="flex-none" /> {title}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DirectoryContentsRenderer
