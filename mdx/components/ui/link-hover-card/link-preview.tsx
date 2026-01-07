"use client"

import canEmbedInIframe from "@/actions/can-embed-in-iframe"
import fetchLinkMetadata from "@/actions/fetch-link-metadata"
import { useQuery } from "@tanstack/react-query"
import { Ban, ExternalLink } from "lucide-react"

import { Spinner } from "@/components/ui/spinner"

import EmbedIframe from "./embed-iframe"

export default function LinkPreview({
  url,
  isExternal,
}: {
  url: string
  isExternal: boolean
}) {
  const { data: isEmbeddable, isLoading } = useQuery({
    queryKey: ["iframe-check", url],
    queryFn: async () => canEmbedInIframe(url),
    enabled: isExternal,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  })

  const { data: linkMetadata, isLoading: isFetchLinkMetadataLoading } =
    useQuery({
      queryKey: ["fetch-link-meta-data", url],
      queryFn: async () => fetchLinkMetadata(url),
      enabled: !isEmbeddable,
      staleTime: 1000 * 60 * 60, // Cache for 1 hour
    })

  // If internal link
  if (!isExternal) {
    return <EmbedIframe url={url} />
  }

  // If external link is loading
  if (isLoading) {
    return (
      <div className="bg-muted/20 flex aspect-video w-full flex-col items-center justify-center gap-2 p-6 text-center">
        <Spinner />
      </div>
    )
  }

  // If iframe embedding is blocked
  if (isEmbeddable === false) {
    return (
      <>
        {isFetchLinkMetadataLoading && (
          <div className="bg-muted/20 flex aspect-video w-full flex-col items-center justify-center gap-2 p-6 text-center">
            <Spinner />
          </div>
        )}

        {linkMetadata ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <div className="bg-muted/20 group hover:bg-muted/30 relative flex aspect-video w-full flex-col items-center justify-center gap-2 p-6 text-center transition-colors">
              {linkMetadata.image ? (
                <img
                  src={linkMetadata.image}
                  alt={linkMetadata.title}
                  className="mb-2 h-16 w-16 rounded-md object-cover shadow-sm transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="bg-background mb-2 flex h-12 w-12 items-center justify-center rounded-md shadow-sm">
                  <span className="text-muted-foreground/50 text-xl font-bold">
                    {linkMetadata.site.slice(0, 1).toUpperCase() || "🔗"}
                  </span>
                </div>
              )}

              <h3 className="text-foreground line-clamp-2 text-sm font-semibold tracking-tight">
                {linkMetadata.title}
              </h3>

              {linkMetadata.description && (
                <p className="text-muted-foreground line-clamp-2 text-xs">
                  {linkMetadata.description}
                </p>
              )}

              <div className="mt-1 flex items-center gap-1 opacity-60">
                <span className="text-[10px] font-medium tracking-wider uppercase">
                  {linkMetadata.site || new URL(url).hostname}
                </span>
              </div>
            </div>
          </a>
        ) : (
          <div className="bg-muted/20 flex aspect-video w-full flex-col items-center justify-center gap-2 p-6 text-center">
            <Ban className="text-muted-foreground/50 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              Preview not available for this site.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
            >
              Open in new tab <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </>
    )
  }

  return <EmbedIframe url={url} />
}
