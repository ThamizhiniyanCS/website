import MdxImage from "./image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Callout,
  CalloutTitle,
  CalloutDescription,
  CalloutContent,
} from "./callout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Step, Steps } from "./steps";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinkHoverCard from "./link-hover-card";

export const mdxComponents = (pathname: string) => ({
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <LinkHoverCard props={props} />
  ),
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <MdxImage props={props} pathname={pathname} />
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
});
