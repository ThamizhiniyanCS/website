"use client"

import { useCallback, useRef, useState } from "react"
import { env } from "@/env"

import { Pagefind, PageSearchResult } from "@/types/pagefind.type"
import { CDN_BASE_URL, PROTOCOL } from "@/lib/constants"

export function useSearch() {
  const pagefindRef = useRef<Pagefind | null>(null)
  const [results, setResults] = useState<PageSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const initPagefind = useCallback(async () => {
    if (pagefindRef.current) return

    const pagefind = (await import(
      /* webpackIgnore: true */
      `${CDN_BASE_URL}pagefind/pagefind.js`
    )) as Pagefind

    await pagefind.options({
      excerptLength: 20,
    })

    await pagefind.init()

    pagefindRef.current = pagefind

    setIsInitialized(true)
  }, [])

  const search = useCallback(
    async (query: string, filters?: Record<string, string[]>) => {
      if (!pagefindRef.current) await initPagefind()
      if (!pagefindRef.current || !query.trim()) {
        setResults([])

        return
      }

      setIsLoading(true)

      try {
        const searchResult = await pagefindRef.current.debouncedSearch(
          query,
          filters ? { filters } : undefined,
          300
        )

        if (!searchResult) return // Debounced Away

        const loaded = await Promise.all(
          searchResult.results.map(async (r) => {
            const data = await r.data()

            const baseUrl = data.meta.path
              ? `${PROTOCOL}${data.filters?.category?.[0] ?? ""}.${env.NEXT_PUBLIC_DOMAIN}/${data.meta.path}`
              : data.url

            return {
              id: r.id,
              url: baseUrl,
              title: data.meta.title ?? "Untitled",
              description: data.meta.description ?? "",
              category: data.filters?.category?.[0] ?? "",
              subCategory: data.filters?.subCategory?.[0] ?? "",
              subResults: data.sub_results.map((result) => ({
                title: result.title,
                url:
                  baseUrl +
                  (result.url.includes("#")
                    ? `#${result.url.split("#")[1]}`
                    : ""),
                excerpt: result.excerpt,
              })),
            }
          })
        )

        setResults(loaded)
      } finally {
        setIsLoading(false)
      }
    },
    [initPagefind]
  )

  const preload = useCallback(async (query: string) => {
    if (!pagefindRef.current) await initPagefind()

    pagefindRef.current?.preload(query)
  }, [])

  return { results, isLoading, isInitialized, search, preload, initPagefind }
}
