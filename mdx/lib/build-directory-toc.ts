import type { TOCItemType } from "fumadocs-core/toc"

import type { MetaJSON } from "@/types/meta-json.type"

export function buildDirectoryTOC(meta: MetaJSON): TOCItemType[] {
  return [
    { title: meta.title, url: "#" + meta.slug, depth: 1 },
    { title: "Directories", url: "#directories", depth: 2 },
    { title: "Files", url: "#files", depth: 2 },
  ]
}
