"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CaretUpDownIcon } from "@phosphor-icons/react"

import type { MetaJSON } from "@/types/meta-json.type"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"

export default function BaseSlugSelector({
  meta,
  defaultValue,
}: {
  meta: MetaJSON | undefined
  defaultValue: string
}) {
  if (!meta) return null

  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState(defaultValue)

  const selectedTitle = useMemo(() => {
    return meta.children.find((child) => child.slug === value)?.title
  }, [meta.children, value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mb-4 w-full justify-between"
        >
          {selectedTitle || "Select Category"}
          <CaretUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search Category..." className="h-9" />
          <CommandList className="w-full">
            <CommandEmpty>Not Found.</CommandEmpty>
            <CommandGroup>
              {meta.children.map((child) => (
                <CommandItem
                  key={child.slug}
                  value={child.title}
                  onSelect={() => {
                    setValue(child.slug)
                    setOpen(false)
                    router.push("/" + child.slug)
                  }}
                  className="w-full"
                  data-checked={value === child.slug ? "true" : "false"}
                >
                  <span className="truncate">{child.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function BaseSlugSelectorSkeleton() {
  return (
    <Button
      variant="outline"
      role="combobox"
      disabled
      className="mb-4 flex w-full items-center justify-center opacity-50"
    >
      <Spinner className="text-primary" />
    </Button>
  )
}
