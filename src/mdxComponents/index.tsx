import MdxImage from "./image";
import {
  Callout,
  CalloutTitle,
  CalloutDescription,
  CalloutContent,
} from "./callout";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const mdxComponents = (pathname: string) => ({
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <MdxImage props={props} pathname={pathname} />
  ),
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Callout,
  CalloutTitle,
  CalloutDescription,
  CalloutContent,
});
