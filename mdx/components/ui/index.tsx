import Script from "next/script"
import {
  AirVent,
  AlertCircle,
  AlertTriangle,
  Ambulance,
  AppWindowIcon,
  ArrowRight,
  ArrowUpRightIcon,
  BadgeCheck,
  BadgeEuro,
  Bell,
  BookmarkIcon,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CodeIcon,
  Copy,
  Download,
  Edit,
  Home,
  Info,
  Mail,
  Menu,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Share2,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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
import { File, Files, Folder } from "@/components/fumadocs-ui/files"

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

    // NOTE: Badge
    Badge,

    // NOTE: Button
    Button,

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

    // NOTE: Carousel - Embla Carousel
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,

    // NOTE: External Link
    ExternalLink,

    // NOTE: Fumadocs Directory Structure Renderer
    File,
    Files,
    Folder,

    // NOTE: Internal Link
    InternalLink,

    // NOTE: Script tag fix
    script: (props: React.ScriptHTMLAttributes<HTMLScriptElement>) => (
      <Script {...props} strategy="lazyOnload" />
    ),

    // NOTE: Steps
    Step,
    Steps,

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

    // NOTE: Tabs
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,

    // NOTE: VideoPlayer
    Video: (props: { src: string }) => (
      <Video
        src={props.src}
        baseRoute={baseRoute}
        baseSlug={baseSlug}
        pathname={pathname}
      />
    ),

    // NOTE: Lucide React Icons
    AirVent,
    AlertCircle,
    AlertTriangle,
    Ambulance,
    AppWindowIcon,
    ArrowRight,
    ArrowUpRightIcon,
    BadgeCheck,
    BadgeEuro,
    Bell,
    BookmarkIcon,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    CodeIcon,
    Copy,
    Download,
    Edit,
    Home,
    Info,
    Mail,
    Menu,
    MessageSquare,
    MoreHorizontal,
    MoreVertical,
    Plus,
    Search,
    Settings,
    Share2,
    Trash2,
    Upload,
    User,
    X,
  }
}
