"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, LoaderCircleIcon } from "lucide-react";

import { MetaJSON } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BaseSlugSelector({
  meta,
  defaultValue,
}: {
  meta: MetaJSON | undefined;
  defaultValue: string;
}) {
  if (!meta) return;

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!buttonRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
      }
    });

    observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mb-4 w-full justify-between"
          ref={buttonRef}
        >
          {value
            ? meta.children.find((child) => child.slug === value)?.title
            : "Select Category"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: width ? width + 25 : 200 }}
      >
        <Command>
          <CommandInput placeholder="Search Category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {meta.children.map((child) => (
                <CommandItem
                  key={child.slug}
                  value={child.slug}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(`/labs/${child.slug}`);
                  }}
                >
                  <p className="line-clamp-1">{child.title}</p>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === child.slug ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const BaseslugSelectorSkeleton = () => {
  return (
    <Button
      variant="outline"
      role="combobox"
      className="mb-4 flex w-full items-center justify-center"
    >
      <LoaderCircleIcon className="animate-spin" />
    </Button>
  );
};
