import fetchLinkMetadata from "@/actions/fetch-link-metadata"
import { Link } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default async function ExternalLink({ href }: { href: string }) {
  // TODO: Refactor this component to have React Suspense
  const meta = await fetchLinkMetadata(href)

  if (!meta) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {href}
      </a>
    )
  }

  return (
    <a href={meta.url} target="_blank" rel="noopener noreferrer">
      <Card className="py-3 hover:bg-white/10">
        <CardContent className="flex h-fit gap-3 px-3">
          {meta.image ? (
            <img
              src={meta.image}
              alt=""
              className="size-16 shrink-0 rounded-md object-cover"
            />
          ) : (
            <Link className="size-16 rounded-md" />
          )}
          <div className="flex flex-col justify-between gap-1">
            <div>
              <h3 className="line-clamp-2 text-sm font-semibold">
                {meta.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 text-xs">
                {meta.description}
              </p>
            </div>
            <span className="text-primary text-xs">{meta.site}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
