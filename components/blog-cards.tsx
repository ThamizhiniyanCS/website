import Link from "next/link"
import generateShortLocaleDate from "@/utils/generate-short-locate-date"
import { ArrowRightIcon } from "lucide-react"

import type { BlogCardInput, BlogCardInputArray } from "@/types/blogs.type"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const BlogCard = ({ title, description, path, date }: BlogCardInput) => {
  return (
    <Link href={path} prefetch={true} className="group no-underline">
      <Card
        style={{
          marginBlock: 0,
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>{date && generateShortLocaleDate(date)}</p>

          <p className="flex gap-2">
            Read more
            <ArrowRightIcon className="mr-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}

const BlogCards = ({
  data,
  className,
}: {
  data: BlogCardInputArray
  className?: string
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {data.map((props, index) => (
        <BlogCard key={`blog_card_${index}`} {...props} />
      ))}
    </div>
  )
}

export default BlogCards
