import * as React from "react"
import Link from "next/link"

import type { Links } from "@/types/links.type"
import type { Socials } from "@/types/socials.type"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Logo from "@/components/logo"

export default function NavMenu({
  links,
  baseURL,
  socials,
}: {
  links: Links
  baseURL: string
  socials?: Socials
}) {
  return (
    <NavigationMenu viewport={false} className="hidden lg:flex">
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

        {links.map(({ title, description, href, children }, index) => (
          <NavigationMenuItem key={`nav-link-${title}-${index}`}>
            <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col items-start justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={href}
                    >
                      <div className="font-josefin-sans mt-4 mb-2 text-lg font-medium">
                        {title}
                      </div>
                      {description && (
                        <p className="text-muted-foreground text-sm leading-tight">
                          {description}
                        </p>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </li>
                {children.map(({ title, href }, index) => (
                  <ListItem key={index} href={href} title={title}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {socials && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Socials</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  {socials.map(({ title, href, logo }, index) => (
                    <NavigationMenuLink
                      key={`nav-links-socials-${title}-${index}`}
                      asChild
                    >
                      <Link
                        href={href}
                        className="flex-row items-center gap-2"
                        target="_blank"
                      >
                        <Logo src={logo.src} alt={logo.alt} size={20} />
                        {title}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
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
