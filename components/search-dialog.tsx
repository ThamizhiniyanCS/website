"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CornerDownLeftIcon,
  FileTextIcon,
  HashIcon,
  Loader2Icon,
  SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useSearch } from "@/hooks/use-search"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { Button } from "./ui/button"

const BASE_ROUTES = ["blogs", "docs", "labs", "workshops", "writeups"]

export default function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const router = useRouter()
  const { results, isLoading, search, preload, initPagefind } = useSearch()

  const toggleFilter = useCallback((category: string) => {
    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((f) => f !== category)
        : [...prev, category]
    )
  }, [])

  // Ctrl + K Keyboard Shotcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Pre-Initialize Pagefind when dialog opens
  useEffect(() => {
    if (open) initPagefind()
  }, [open, initPagefind])

  // Reactively search when query changes
  useEffect(() => {
    if (query.length > 0) {
      preload(query)
      search(query)
    } else {
    }
  }, [query, search, preload])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const filteredResults =
    activeFilters.length > 0
      ? results.filter((r) => activeFilters.includes(r.category))
      : results

  // Navigate to result
  const handleSelect = useCallback(
    (url: string) => {
      setOpen(false)
      setQuery("")
      router.push(url)
    },
    [router]
  )

  // Category based colors
  const categoryColor: Record<string, string> = {
    labs: "text-emerald-400",
    workshops: "text-blue-400",
    writeups: "text-amber-400",
    blogs: "text-rose-400",
    docs: "text-orange-500",
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        className="border-border/40 bg-muted/30 text-muted-foreground hover:bg-muted/50 flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="border-border/40 bg-muted text-muted-foreground pointer-events-none hidden rounded border px-1.5 font-mono text-[10px] select-none sm:inline">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="xl:max-w-5xl"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search across all content..."
            value={query}
            onValueChange={handleSearch}
          />

          <div className="border-border/40 flex items-center gap-2 border-b px-3 py-2">
            {BASE_ROUTES.map((route) => (
              <div key={route} className="flex items-center gap-1.5">
                <Checkbox
                  id={`filter-${route}`}
                  checked={activeFilters.includes(route)}
                  onCheckedChange={() => toggleFilter(route)}
                  className="h-3.5 w-3.5"
                />

                <label
                  htmlFor={`filter-${route}`}
                  className={cn(
                    "cursor-pointer text-xs font-medium capitalize",
                    activeFilters.includes(route)
                      ? categoryColor[route]
                      : "text-muted-foreground"
                  )}
                >
                  {route}
                </label>
              </div>
            ))}
          </div>

          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <Loader2Icon className="text-muted-foreground h-5 w-5 animate-spin" />
              </div>
            )}

            {!isLoading && query.length > 0 && filteredResults.length === 0 && (
              <CommandEmpty>
                No results found for &quot;{query}&quot;
              </CommandEmpty>
            )}

            {!isLoading &&
              filteredResults.map((pageResult, pageIndex) => (
                <div key={pageResult.id}>
                  {pageIndex > 0 && <CommandSeparator />}

                  {/* Each page is a group, sub_results are the items */}
                  <CommandGroup
                    heading={
                      <div className="flex items-center justify-between">
                        <span className="truncate">{pageResult.title}</span>
                        <span
                          className={`ml-2 shrink-0 text-[10px] font-semibold uppercase ${
                            categoryColor[pageResult.category] ??
                            "text-muted-foreground"
                          }`}
                        >
                          {pageResult.category}
                        </span>
                      </div>
                    }
                  >
                    {pageResult.subResults.map((subResult, subIndex) => {
                      // Is this the page-level result (no #anchor) or a section?
                      const isPageLevel = subResult.url === pageResult.url

                      return (
                        <CommandItem
                          key={`${pageResult.id}-${subIndex}`}
                          value={`${subResult.title}_${pageResult.title}_${subIndex}`}
                          onSelect={() => handleSelect(subResult.url)}
                          className="flex flex-col items-start gap-1 py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            {isPageLevel ? (
                              <FileTextIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                            ) : (
                              <HashIcon className="text-muted-foreground/60 h-3.5 w-3.5 shrink-0" />
                            )}
                            <span
                              className={
                                isPageLevel ? "font-medium" : "text-sm"
                              }
                            >
                              {subResult.title}
                            </span>
                          </div>
                          {subResult.excerpt && (
                            <p
                              className="text-muted-foreground line-clamp-1 pl-5.5 text-xs"
                              dangerouslySetInnerHTML={{
                                __html: subResult.excerpt,
                              }}
                            />
                          )}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </div>
              ))}

            {!query && (
              <CommandEmpty>
                <p className="text-muted-foreground text-sm">
                  Type to search across labs, workshops, and writeups...
                </p>
              </CommandEmpty>
            )}
          </CommandList>

          <div className="border-border/40 bg-muted/30 flex items-center gap-4 border-t px-3 py-2">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <p>
                {filteredResults.length} / {results.length} results displayed
              </p>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <kbd className="border-border/40 bg-muted inline-flex h-5 items-center rounded border px-1 font-mono text-[10px]">
                ↑↓
              </kbd>
              <span>navigate</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <kbd className="border-border/40 bg-muted inline-flex h-5 items-center rounded border px-1 font-mono text-[10px]">
                <CornerDownLeftIcon className="h-2.5 w-2.5" />
              </kbd>
              <span>open</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <kbd className="border-border/40 bg-muted inline-flex h-5 items-center rounded border px-1 font-mono text-[10px]">
                esc
              </kbd>
              <span>close</span>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
