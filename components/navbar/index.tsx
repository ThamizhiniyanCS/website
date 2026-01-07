import Link from "next/link"
import getMetaJSON from "@/actions/get-meta-json"
import generateURL from "@/utils/generate-url"
import { MenuIcon } from "lucide-react"

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
import { AnimatedThemeToggler } from "@/components/magic-ui/animated-theme-toggler"

import NavMenu from "./nav-menu"

const Navbar = async () => {
  const labsLinks = await getMetaJSON("labs")
  const writeupsLinks = await getMetaJSON("writeups")
  const workshopsLinks = await getMetaJSON("workshops")
  const commonClass =
    "bg-background fixed z-50 flex h-16 w-full items-center justify-between px-4 md:px-8"

  if (!labsLinks || !writeupsLinks || !workshopsLinks) {
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

  const labsData = {
    href: generateURL("labs"),
    children: labsLinks.children.map(({ slug, title }) => ({
      title,
      href: generateURL("labs", "/" + slug),
    })),
  }

  const writeupsData = {
    href: generateURL("writeups"),
    children: writeupsLinks.children.map(({ slug, title }) => ({
      title,
      href: generateURL("writeups", "/" + slug),
    })),
  }

  const workshopsData = {
    href: generateURL("workshops"),
    children: workshopsLinks.children.map(({ slug, title }) => ({
      title,
      href: generateURL("workshops", "/" + slug),
    })),
  }

  return (
    <nav className={cn(commonClass)}>
      <div className="flex items-center gap-6">
        <Link href="/" className="font-lavishly-yours text-3xl">
          Thamizhiniyan C S
        </Link>
        <NavMenu
          labsLinks={labsData}
          writeupsLinks={writeupsData}
          workshopsLinks={workshopsData}
          baseURL={BASE_URL}
        />
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
                <AccordionContent className="flex flex-col">
                  <Link href={`${BASE_URL}#about-me`}>About Me</Link>
                  <Link href={`${BASE_URL}#skills`}>Skills</Link>
                  <Link href={`${BASE_URL}#certifications`}>
                    Certifications
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="labs" className="w-full">
                <AccordionTrigger>Labs</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  <p className="text-muted-foreground text-sm leading-tight">
                    My lab setups for various tasks.
                  </p>
                  {labsData.children.map(({ title, href }, index) => (
                    <Link key={`mobile-nav-lab-links-${index}`} href={href}>
                      {title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="writeups" className="w-full">
                <AccordionTrigger>Workshops</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  <p className="text-muted-foreground text-sm leading-tight">
                    Detailed walkthroughs and key learnings from workshops I
                    deliver.
                  </p>

                  {workshopsData.children.map(({ title, href }, index) => (
                    <Link
                      key={`mobile-nav-writeups-links-${index}`}
                      href={href}
                    >
                      {title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="writeups" className="w-full">
                <AccordionTrigger>Writeups</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  <p className="text-muted-foreground text-sm leading-tight">
                    Step-by-step walkthroughs and insights for various labs and
                    challenges.
                  </p>

                  {writeupsData.children.map(({ title, href }, index) => (
                    <Link
                      key={`mobile-nav-writeups-links-${index}`}
                      href={href}
                    >
                      {title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
