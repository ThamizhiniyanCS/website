"use client"

// References:
//  - https://github.com/fuma-nama/fumadocs/blob/dev/packages/ui/src/components/toc/index.tsx
import {
  createContext,
  use,
  useEffect,
  useEffectEvent,
  useRef,
  type ComponentProps,
  type RefObject,
} from "react"
import * as Primitive from "fumadocs-core/toc"
import { ListTreeIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { mergeRefs } from "./utils/merge-refs"
import { useOnChange } from "./utils/use-on-change"

const TOCContext = createContext<Primitive.TOCItemType[]>([])

export function useTOCItems(): Primitive.TOCItemType[] {
  return use(TOCContext)
}

export function TOCProvider({
  toc,
  children,
  ...props
}: ComponentProps<typeof Primitive.AnchorProvider>) {
  return (
    <TOCContext value={toc}>
      <Primitive.AnchorProvider toc={toc} {...props}>
        {children}
      </Primitive.AnchorProvider>
    </TOCContext>
  )
}

export function TOCScrollArea({
  ref,
  className,
  ...props
}: ComponentProps<"div">) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={mergeRefs(viewRef, ref)}
      className={cn(
        "relative ml-2 max-h-[calc(100vh-4rem)] min-h-0 overflow-y-scroll mask-[linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3 text-sm [scrollbar-width:none]",
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground lg:bg-background flex h-6 items-center gap-2 text-base">
        <ListTreeIcon className="size-4 flex-none" />
        On This Page
      </p>

      <Primitive.ScrollProvider containerRef={viewRef}>
        {props.children}
      </Primitive.ScrollProvider>
    </div>
  )
}

type TocThumbType = [top: number, height: number]

interface RefProps {
  containerRef: RefObject<HTMLElement | null>
}

export function TocThumb({
  containerRef,
  ...props
}: ComponentProps<"div"> & RefProps) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const active = Primitive.useActiveAnchors()
  function update(info: TocThumbType): void {
    const element = thumbRef.current
    if (!element) return
    element.style.setProperty("--fd-top", `${info[0]}px`)
    element.style.setProperty("--fd-height", `${info[1]}px`)
  }

  const onPrint = useEffectEvent(() => {
    if (containerRef.current) {
      update(calc(containerRef.current, active))
    }
  })

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const observer = new ResizeObserver(onPrint)
    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [containerRef])

  useOnChange(active, () => {
    if (containerRef.current) {
      update(calc(containerRef.current, active))
    }
  })

  return <div ref={thumbRef} data-hidden={active.length === 0} {...props} />
}

function calc(container: HTMLElement, active: string[]): TocThumbType {
  if (active.length === 0 || container.clientHeight === 0) {
    return [0, 0]
  }

  let upper = Number.MAX_VALUE,
    lower = 0

  for (const item of active) {
    const element = container.querySelector<HTMLElement>(`a[href="#${item}"]`)
    if (!element) continue

    const styles = getComputedStyle(element)
    upper = Math.min(upper, element.offsetTop + parseFloat(styles.paddingTop))
    lower = Math.max(
      lower,
      element.offsetTop +
        element.clientHeight -
        parseFloat(styles.paddingBottom)
    )
  }

  return [upper, lower - upper]
}
