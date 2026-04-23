export type SubResult = {
  title: string
  url: string
  excerpt: string
}

export type PageSearchResult = {
  id: string
  url: string
  title: string
  description: string
  category: string
  subCategory: string
  subResults: SubResult[]
}

export type PagefindResultData = {
  url: string
  excerpt: string
  meta: Record<string, string>
  filters: Record<string, string[]>
  sub_results: Array<{
    title: string
    url: string
    excerpt: string
    anchor?: { id: string; text: string; element: string }
  }>
}

export type PagefindResult = {
  id: string
  data: () => Promise<PagefindResultData>
}

export type Pagefind = {
  init: () => Promise<void>
  options: (opts: Record<string, unknown>) => Promise<void>
  search: (
    query: string,
    options?: Record<string, unknown>
  ) => Promise<{ results: PagefindResult[] }>
  debouncedSearch: (
    query: string,
    options?: Record<string, unknown>,
    timeout?: number
  ) => Promise<{ results: PagefindResult[] } | null>
  preload: (query: string, options?: Record<string, unknown>) => Promise<void>
  filters: () => Promise<Record<string, Record<string, number>>>
  destroy: () => Promise<void>
}
