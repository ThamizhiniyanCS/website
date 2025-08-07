import MdxBreadcrumbs from "@/mdx/components/mdx-breadcrumbs";
import { PanelLeftIcon } from "lucide-react";

import { DIRECTORIES } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

export default async function Layout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ baseRoute: string; baseSlug: string }>;
}>) {
  const { baseRoute, baseSlug } = await params;

  const pathname = baseSlug;
  const pathnameArray = [baseSlug];

  return (
    <div className="mt-20 min-h-screen w-full max-w-[calc(100vw-25px)]">
      <div className="flex w-full items-center gap-3 px-4 md:px-8">
        <Sheet>
          <SheetTrigger>
            <PanelLeftIcon />
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <Sidebar
              baseRoute={baseRoute}
              baseSlug={baseSlug}
              variant={
                DIRECTORIES.includes(baseRoute) ? "directory" : "default"
              }
            />
          </SheetContent>
        </Sheet>

        <MdxBreadcrumbs pathnameArray={pathnameArray} padding={false} />
      </div>

      {children}
    </div>
  );
}
