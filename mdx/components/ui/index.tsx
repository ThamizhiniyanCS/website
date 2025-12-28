import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Callout,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "./callout"
import ExternalLink from "./external-link"
import MdxImage from "./image"
import InternalLink from "./internal-link"
import LinkHoverCard from "./link-hover-card"
import { Step, Steps } from "./steps"
import Video from "./video"

export default function MdxComponents(
  baseRoute: string,
  baseSlug: string,
  pathname: string
) {
  return {
    a: (props: React.ComponentPropsWithoutRef<"a">) => (
      <LinkHoverCard children={props.children} href={props.href || ""} />
    ),
    img: (props: React.ComponentPropsWithoutRef<"img">) => (
      <MdxImage
        props={props}
        baseRoute={baseRoute}
        baseSlug={baseSlug}
        pathname={pathname}
      />
    ),

    // NOTE: Accordion
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,

    // NOTE: Callout
    Callout,
    CalloutTitle,
    CalloutDescription,
    CalloutContent,

    // NOTE: Card
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

    // NOTE: External Link
    ExternalLink,

    // NOTE: Internal Link
    InternalLink,

    // NOTE: Steps
    Step,
    Steps,

    // NOTE: Tabs
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,

    // NOTE: Table
    table: Table,
    thead: TableHeader,
    tbody: TableBody,
    tfoot: TableFooter,
    th: TableHead,
    tr: TableRow,
    td: TableCell,
    caption: TableCaption,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,

    // NOTE: VideoPlayer
    Video: (props: { src: string }) => (
      <Video
        src={props.src}
        baseRoute={baseRoute}
        baseSlug={baseSlug}
        pathname={pathname}
      />
    ),
  }
}
