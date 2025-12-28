import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  InfoIcon,
  LightbulbIcon,
  MessageSquareWarningIcon,
  OctagonAlertIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "relative my-4 grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-base has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default:
          "border-green-500 bg-green-500/10 text-green-500 *:data-[slot=callout-content]:border-green-500/50",
        info: "border-blue-600 bg-blue-600/10 text-blue-600 *:data-[slot=callout-content]:border-blue-600/50",
        warning:
          "border-yellow-500 bg-yellow-500/10 text-yellow-500 *:data-[slot=callout-content]:border-yellow-500/50",
        error:
          "border-red-500 bg-red-500/10 text-red-500 *:data-[slot=callout-content]:border-red-500/50",
        important:
          "border-violet-600 bg-violet-600/10 text-violet-600 *:data-[slot=callout-content]:border-violet-600/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const ICON_MAP: Record<string, LucideIcon> = {
  default: LightbulbIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: OctagonAlertIcon,
  important: MessageSquareWarningIcon,
}

function Callout({
  children,
  className,
  variant = "default", // Default prop value handles undefined cases
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof calloutVariants>) {
  const IconComponent = ICON_MAP[variant || "default"]

  // Errors should scream (alert), others are just notes.
  const role = variant === "error" ? "alert" : "note"

  return (
    <div
      data-slot="callout"
      role={role}
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {/* Render the icon directly from the map */}
      {IconComponent && <IconComponent aria-hidden="true" />}
      {children}
    </div>
  )
}

function CalloutTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function CalloutDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:my-0 [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function CalloutContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout-content"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 border-t pt-4 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Callout, CalloutTitle, CalloutDescription, CalloutContent }
