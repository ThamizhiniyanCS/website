import { cn } from "@/lib/utils"

export const Step = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("fd-step", className)} {...props}>
      {children}
    </div>
  )
}

export const Steps = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className="fd-steps" {...props}>
      {children}
    </div>
  )
}
