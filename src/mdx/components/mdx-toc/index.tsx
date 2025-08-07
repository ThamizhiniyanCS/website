"use client";

// References:
//  - https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/docs-toc.tsx
//  - https://github.com/fuma-nama/fumadocs/blob/dev/packages/ui/src/components/layout/toc-clerk.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ListTreeIcon } from "lucide-react";

import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useActiveItem } from "./hooks";
import { getItemOffset, getLineOffset } from "./utils";

const MdxToc = ({ toc, className }: { toc: TocItem[]; className?: string }) => {
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const [svg, setSvg] = useState<{
    path: string;
    width: number;
    height: number;
  }>();

  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const onResize = () => {
      if (container.clientHeight === 0) return;

      let w = 0;
      let h = 0;

      const d: string[] = [];

      for (let i = 0; i < toc.length; i++) {
        const element: HTMLElement | null = container.querySelector(
          `a[href="${toc[i].url}"]`,
        );
        if (!element) continue;

        const styles = getComputedStyle(element);
        const offset = getLineOffset(toc[i].depth) + 1;
        const top = element.offsetTop + parseFloat(styles.paddingTop);
        const bottom =
          element.offsetTop +
          element.clientHeight -
          parseFloat(styles.paddingBottom);

        w = Math.max(offset, w);
        h = Math.max(h, bottom);

        d.push(`${i === 0 ? "M" : "L"}${offset} ${top}`);
        d.push(`L${offset} ${bottom}`);
      }

      // console.log(d);

      setSvg({
        path: d.join(" "),
        width: w + 1,
        height: h,
      });
    };

    const observer = new ResizeObserver(onResize);
    onResize();

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  return (
    <ScrollArea className="size-full px-2">
      <p className="text-muted-foreground lg:bg-background flex h-6 items-center gap-2 text-base">
        <ListTreeIcon className="size-4 flex-none" />
        On This Page
      </p>

      <div className={cn("relative mt-2", className)}>
        {svg ? (
          <div
            className="bg-foreground/20 absolute start-2 top-0"
            style={{
              width: svg.width,
              height: svg.height,
              maskImage: `url("data:image/svg+xml,${
                // Inline SVG
                encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`,
                )
              }")`,
            }}
          ></div>
        ) : null}

        <div
          className="flex flex-col gap-2 p-4 pt-0 text-sm"
          ref={containerRef}
        >
          {toc.map((item, index) => (
            <a
              key={item.url}
              href={item.url}
              className={cn(
                "text-muted-foreground hover:text-foreground data-[active=true]:text-foreground line-clamp-1 text-[0.8rem] no-underline transition-colors",
                "data-[depth=2]:pl-4 data-[depth=3]:pl-6 data-[depth=4]:pl-8 data-[depth=5]:pl-10 data-[depth=6]:pl-12",
                index != 0 && "data-[depth=1]:pl-2",
              )}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default MdxToc;
