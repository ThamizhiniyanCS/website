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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Callout,
  CalloutContent,
  CalloutDescription,
  CalloutTitle,
} from "./callout";
import MdxImage from "./image";
import LinkHoverCard from "./link-hover-card";
import { Step, Steps } from "./steps";

export const mdxComponents = (
  baseRoute: string,
  baseSlug: string,
  pathname: string,
) => ({
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <LinkHoverCard props={props} />
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
