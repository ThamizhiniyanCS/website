import { Suspense } from "react"
import MdxLoadingComponent from "@/mdx/components/mdx-loading-component"

import { cn } from "@/lib/utils"

import type Frontmatter from "../types/frontmatter.type"

const MdxRenderer = ({
  content,
  frontmatter,
}: {
  content: React.JSX.Element
  frontmatter: Frontmatter
}) => {
  return (
    <div
      className={cn(
        "prose prose-img:m-0 dark:prose-invert prose-a:wrap-break-word min-h-[70vh] max-w-none px-4 pb-10 md:px-8 lg:px-10",
        "prose-code:wrap-break-word"
      )}
    >
      <h1>{frontmatter.title}</h1>

      <Suspense fallback={<MdxLoadingComponent />}>{content}</Suspense>
    </div>
  )
}

export default MdxRenderer
