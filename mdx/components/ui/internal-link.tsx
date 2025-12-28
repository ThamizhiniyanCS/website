import Link from "next/link"
import generateURL from "@/utils/generate-url"
import { ArrowRightIcon } from "lucide-react"

import { ALLOWED_SUBDOMAINS } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"

export default function InternalLink({
  route,
  pathname,
  title,
  description,
}: {
  route: string
  pathname: string
  title: string
  description: string
}) {
  if (!route || !pathname || !ALLOWED_SUBDOMAINS.has(route)) return

  const url = generateURL(route, pathname)

  return (
    <Link href={url} className="group">
      <Card className="rounded-md py-3 hover:bg-white/10">
        <CardContent className="flex h-fit items-center justify-between gap-3 px-5">
          <div className="flex flex-col justify-between gap-1">
            <div>
              <h3 className="line-clamp-2 text-sm font-semibold">{title}</h3>
              <p className="text-muted-foreground line-clamp-3 text-xs">
                {description}
              </p>
            </div>
          </div>

          <ArrowRightIcon className="mr-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
        </CardContent>
      </Card>
    </Link>
  )
}
