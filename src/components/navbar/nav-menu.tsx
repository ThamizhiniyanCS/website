"use client";

import * as React from "react";
import Link from "next/link";

import { WEBSITE_URL } from "@/lib/constants";
import type { MetaJSON } from "@/lib/types";
import { generateURL } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function NavMenu({
  labsLinks,
  writeupsLinks,
}: {
  labsLinks: MetaJSON;
  writeupsLinks: MetaJSON;
}) {
  const isMobile = useIsMobile(1024);

  return (
    !isMobile && (
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={WEBSITE_URL}
                    >
                      <div className="font-josefin-sans mt-4 mb-2 text-lg font-medium">
                        Thamizhiniyan C S
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Ethical Hacker and Web Developer.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href={`${WEBSITE_URL}/#about`} title="About">
                  A small intro to myself.
                </ListItem>
                <ListItem href={`${WEBSITE_URL}/#skills`} title="Skills">
                  Tools and Technologies I am familiar with.
                </ListItem>
                <ListItem
                  href={`${WEBSITE_URL}/#certifications`}
                  title="Professional Certifications"
                >
                  Some of my certifications.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Writeups</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={generateURL("writeups")}
                    >
                      <div className="font-josefin-sans mt-4 mb-2 text-lg font-medium">
                        Writeups
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Step-by-step walkthroughs and insights for various labs
                        and challenges.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {writeupsLinks.children.map(({ title, slug }, index) => (
                  <ListItem
                    key={index}
                    href={generateURL("writeups", "/" + slug)}
                    title={title}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Labs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={generateURL("labs")}
                    >
                      <div className="font-josefin-sans mt-4 mb-2 text-lg font-medium">
                        Labs
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        My lab setups for various tasks.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {labsLinks.children.map(({ title, slug }, index) => (
                  <ListItem
                    key={index}
                    href={generateURL("labs", "/" + slug)}
                    title={title}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
