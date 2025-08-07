"use client";

import { useMemo, useRef, useState } from "react";

import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

import MdxToc from ".";
import { useActiveItem, useOnClickOutside } from "./hooks";

const MobileMdxToc = ({ toc }: { toc: TocItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);

  useOnClickOutside(cardRef, () => setIsOpen(false));

  return (
    <Card
      className={cn(
        "bg-card/10 fixed top-1/2 right-2 h-[80vh] -translate-y-1/2 overflow-clip rounded-sm py-2 transition-all duration-300 ease-in-out",
        isOpen && "rounded-xl",
        isOpen && "bg-card",
      )}
      onClick={() => setIsOpen(true)}
      ref={cardRef}
    >
      {isOpen ? (
        <MdxToc toc={toc} />
      ) : (
        <div className="flex w-6 flex-col gap-1 px-1">
          {toc.map((item, index) => (
            <div
              key={item.url}
              className={cn(
                "bg-muted data-[active=true]:bg-foreground h-1 rounded-full transition-colors",
                "data-[depth=2]:ml-1 data-[depth=3]:ml-2 data-[depth=4]:ml-3 data-[depth=5]:ml-4 data-[depth=6]:ml-5",
                index != 0 && "data-[depth=1]:ml-0",
              )}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
            ></div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MobileMdxToc;
