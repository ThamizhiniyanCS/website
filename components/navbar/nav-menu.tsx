"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface Links {
  href: string
  children: {
    title: string
    href: string
  }[]
}

export default function NavMenu({
  labsLinks,
  writeupsLinks,
  workshopsLinks,
  baseURL,
}: {
  labsLinks: Links
  writeupsLinks: Links
  workshopsLinks: Links
  baseURL: string
}) {
  const isMobile = useIsMobile(1024)

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
                      className="from-muted/50 to-muted flex h-full w-full flex-col items-start justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={baseURL}
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
                <ListItem href={`${baseURL}#about-me`} title="About">
                  A small intro to myself.
                </ListItem>
                <ListItem href={`${baseURL}#skills`} title="Skills">
                  Tools and Technologies I am familiar with.
                </ListItem>
                <ListItem
                  href={`${baseURL}#certifications`}
                  title="Professional Certifications"
                >
                  Some of my certifications.
                </ListItem>
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
                      className="from-muted/50 to-muted flex h-full w-full flex-col items-start justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={labsLinks.href}
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
                {labsLinks.children.map(({ title, href }, index) => (
                  <ListItem key={index} href={href} title={title}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Workshops</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col items-start justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={workshopsLinks.href}
                    >
                      <div className="font-josefin-sans mt-4 mb-2 text-lg font-medium">
                        Workshops
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Detailed walkthroughs and key learnings from workshops I
                        deliver.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {workshopsLinks.children.map(({ title, href }, index) => (
                  <ListItem key={index} href={href} title={title}></ListItem>
                ))}
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
                      className="from-muted/50 to-muted flex h-full w-full flex-col items-start justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={writeupsLinks.href}
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
                {writeupsLinks.children.map(({ title, href }, index) => (
                  <ListItem key={index} href={href} title={title}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Socials</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="https://github.com/ThamizhiniyanCS/"
                      className="flex-row items-center gap-2"
                      target="_blank"
                    >
                      <Image
                        src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github-light.svg"
                        alt="Github Logo"
                        width={20}
                        height={20}
                      />
                      Github
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="https://www.linkedin.com/in/thamizhiniyancs/"
                      className="flex-row items-center gap-2"
                      target="_blank"
                    >
                      <Image
                        src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linkedin.svg"
                        alt="Linkedin Logo"
                        width={20}
                        height={20}
                      />
                      LinkedIn
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  )
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
        <Link href={href} className="flex-col items-start">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
