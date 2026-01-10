import Link from "next/link"
import getLinks from "@/actions/get-links"
import getSocials from "@/actions/get-socials"
import { MenuIcon } from "lucide-react"

import type { Links } from "@/types/links.type"
import type { Socials } from "@/types/socials.type"
import { BASE_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logo from "@/components/logo"
import { AnimatedThemeToggler } from "@/components/magic-ui/animated-theme-toggler"

import NavMenu from "./nav-menu"

const Navbar = async () => {
  const links: Links | undefined = await getLinks()
  const socials: Socials | undefined = await getSocials()

  const commonClass =
    "bg-background fixed z-50 flex h-16 w-full items-center justify-between px-4 md:px-8"

  if (!links) {
    return (
      <nav className={cn(commonClass)}>
        <div className="flex items-center gap-6">
          <Link href="/" className="font-lavishly-yours text-3xl">
            Thamizhiniyan C S
          </Link>
        </div>

        <AnimatedThemeToggler className="cursor-pointer" />
      </nav>
    )
  }

  return (
    <nav className={cn(commonClass)}>
      <div className="flex items-center gap-6">
        <Link href="/" className="font-lavishly-yours text-3xl">
          Thamizhiniyan C S
        </Link>
        <NavMenu links={links} baseURL={BASE_URL} socials={socials} />
      </div>

      <div className="flex items-center gap-2">
        <AnimatedThemeToggler />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="lg:hidden">
              <MenuIcon className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={14}
            className="bg-background w-screen rounded-none px-4"
          >
            <Accordion
              className=""
              type="single"
              collapsible
              data-state="closed"
            >
              <AccordionItem value="home" className="w-full">
                <AccordionTrigger>Home</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <Link href={`${BASE_URL}#about-me`}>About Me</Link>
                  <Link href={`${BASE_URL}#skills`}>Skills</Link>
                  <Link href={`${BASE_URL}#certifications`}>
                    Certifications
                  </Link>
                </AccordionContent>
              </AccordionItem>

              {links.map(({ title, description, children }, index) => (
                <AccordionItem
                  value={title}
                  className="w-full"
                  key={`mobile-nav-link-${title}-${index}`}
                >
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    {description && (
                      <p className="text-muted-foreground text-sm leading-tight">
                        {description}
                      </p>
                    )}
                    {children.map(({ title, href }, index) => (
                      <Link key={`mobile-nav-lab-links-${index}`} href={href}>
                        {title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}

              {socials && (
                <AccordionItem value="Socials" className="w-full">
                  <AccordionTrigger>Socials</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {socials.map(({ title, href, logo }, index) => (
                      <Link
                        href={href}
                        className="flex flex-row items-center gap-2"
                        target="_blank"
                        key={`nav-links-socials-${title}-${index}`}
                      >
                        <Logo src={logo.src} alt={logo.alt} size={20} />
                        {title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
