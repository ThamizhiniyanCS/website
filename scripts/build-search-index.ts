import * as pagefind from "pagefind"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import { remark } from "remark"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import { MetaJSON } from "@/types/meta-json.type"
import { ALLOWED_SUBDOMAINS, DIRECTORIES } from "@/lib/constants"

const CDN_BASE_URL = "http://localhost:8000/"
const OUTPUT_DIR = process.env.OUTPUT_DIR || "./pagefind-output"

async function mdxToHtml(mdxSource: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"]) // Parse & exclude frontmatter from output
    .use(remarkMdx) // Parse JSX — stripped during rehype conversion
    .use(remarkGfm) // Tables, strikethrough, task lists
    .use(remarkRehype, {
      allowDangerousHtml: false, // Strip unknown HTML/JSX component tags
    })
    .use(rehypeSlug) // Add id attributes to headings for anchors
    .use(rehypeStringify)
    .process(mdxSource)

  return String(result)
}

function buildPagefindHTML(
  bodyHTML: string,
  title: string,
  description: string,
  category: string,
  subCategory: string,
  path: string
): string {
  // Escape HTML entities in attribute values
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

  return `<html lang="en">
<head><title>${esc(title)}</title></head>
<body>
  <article data-pagefind-body>
    <div data-pagefind-meta="description:${esc(description)}"></div>
    <div data-pagefind-meta="path:${esc(path)}"></div>
    <div data-pagefind-filter="category:${esc(category)}"></div>
    <div data-pagefind-filter="subCategory:${esc(subCategory)}"></div>
    <h1>${esc(title)}</h1>
    ${bodyHTML}
  </article>
</body>
</html>`
}

async function fetchMetaJson(cdnPath: string): Promise<MetaJSON | null> {
  try {
    const url = `${CDN_BASE_URL}${cdnPath}/meta.json`
    const res = await fetch(url)

    if (!res.ok) return null

    return await res.json()
  } catch {
    return null
  }
}

async function fetchMDX(
  cdnPath: string,
  isDirectory: boolean
): Promise<string | null> {
  try {
    const suffix = isDirectory ? "/index.mdx" : ".mdx"
    const url = `${CDN_BASE_URL}${cdnPath}${suffix}`
    const res = await fetch(url)

    if (!res.ok) return null

    return await res.text()
  } catch {
    return null
  }
}

function extractMdxHeadings(mdxSource: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: string[] = []

  let match

  while ((match = headingRegex.exec(mdxSource)) !== null) {
    headings.push(match[1].trim())
  }

  return headings
}

type IndexEntry = {
  url: string
  title: string
  description: string
  html: string // Converted HTML body (not plain text)
  baseRoute: string
  baseSlug: string
  path: string // Full content path for metadata
}

async function walkContent(
  cdnPath: string,
  urlPath: string,
  baseRoute: string,
  baseSlug: string,
  isDirectoryType: boolean
): Promise<IndexEntry[]> {
  const entries: IndexEntry[] = []
  const meta = await fetchMetaJson(cdnPath)

  if (!meta) return entries

  for (const child of meta.children) {
    const childCdnPath = `${cdnPath}/${child.slug}`
    const childUrlPath = `${urlPath}/${child.slug}`

    if (child.type === "directory") {
      const subEntries = await walkContent(
        childCdnPath,
        childUrlPath,
        baseRoute,
        baseSlug,
        isDirectoryType
      )

      entries.push(...subEntries)
    } else if (child.type === "file") {
      const mdxSource = await fetchMDX(childCdnPath, isDirectoryType)

      if (mdxSource) {
        const html = await mdxToHtml(mdxSource)

        entries.push({
          url: childUrlPath,
          title: child.title,
          description: child.description,
          html,
          baseRoute,
          baseSlug,
          path: childCdnPath,
        })

        console.log(`  ✓ Indexed: ${childUrlPath}`)
      } else {
        console.log(`  ✗ Skipped (no MDX): ${childUrlPath}`)
      }
    }
  }

  return entries
}

async function main() {
  console.log("[!] Building Pagefind search index...")
  console.log(`[!] CDN: ${CDN_BASE_URL}`)
  console.log(`[!] Output: ${OUTPUT_DIR}`)

  const { index } = await pagefind.createIndex({
    forceLanguage: "en",
    writePlayground: true,
  })

  if (!index) {
    console.error("Failed to create Pagefind index")
    process.exit(1)
  }

  let totalIndexed = 0

  for (const subdomain of ALLOWED_SUBDOMAINS) {
    console.log(`\n[+] Processing: ${subdomain}`)
    const isDirectoryType = DIRECTORIES.has(subdomain)

    const rootMeta = await fetchMetaJson(subdomain)

    if (!rootMeta) {
      console.log(`[-] No meta.json found for ${subdomain}, skipping`)
      continue
    }

    for (const child of rootMeta.children) {
      if (child.type !== "directory") continue

      const baseSlug = child.slug
      const cdnPath = `${subdomain}/${baseSlug}`
      const urlPath = `/${subdomain}/${baseSlug}`

      console.log(`[+] ${child.title} (${baseSlug})`)

      const entries = await walkContent(
        cdnPath,
        urlPath,
        subdomain,
        baseSlug,
        isDirectoryType
      )

      for (const entry of entries) {
        // Build a full HTML document with Pagefind attributes
        const fullHTML = buildPagefindHTML(
          entry.html,
          entry.title,
          entry.description,
          entry.baseRoute,
          entry.baseSlug,
          entry.path.replace(`${entry.baseRoute}/`, "")
        )

        const { errors } = await index.addHTMLFile({
          url: entry.url,
          content: fullHTML,
        })

        if (errors?.length) {
          console.error(`[-] Error indexing ${entry.url}:`, errors)
        } else {
          totalIndexed++
        }
      }
    }
  }

  console.log(`\n[!] Indexed ${totalIndexed} pages total`)

  console.log(`\n[+] Writing index to ${OUTPUT_DIR}...`)
  const { errors } = await index.writeFiles({
    outputPath: OUTPUT_DIR,
  })

  if (errors?.length) {
    console.error("Failed to write index:", errors)
    process.exit(1)
  }

  console.log("[+] Search index built successfully!")
  console.log(`\n[!] Output directory: ${OUTPUT_DIR}`)
  console.log("[!] Upload this directory to your CDN at: /pagefind/")

  await pagefind.close()
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
