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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AnimatedThemeToggler } from "@/components/magic-ui/animated-theme-toggler"

import { Button } from "../ui/button"
import NavMenu from "./nav-menu"

const Navbar = async () => {
  const labsLinks = await getMetaJSON("labs")
  const writeupsLinks = await getMetaJSON("writeups")
  const commonClass =
    "bg-background fixed z-50 flex h-16 w-full items-center justify-between px-4 md:px-8"

  if (!labsLinks || !writeupsLinks) {
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

  return (
    <nav className={cn(commonClass)}>
      <div className="flex items-center gap-6">
        <Link href="/" className="font-lavishly-yours text-3xl">
          Thamizhiniyan C S
        </Link>
        <NavMenu
          labsLinks={labsData}
          writeupsLinks={writeupsData}
          baseURL={BASE_URL}
        />
      </div>

      <div className="flex items-center gap-2">
        <AnimatedThemeToggler />
        {/* <NavMobileTrigger /> */}
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
                  <Link href={"#"}>a</Link>
                  <Link href={"#"}>b</Link>
                  <Link href={"#"}>c</Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="writeups" className="w-full">
                <AccordionTrigger>Writeups</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  <p className="text-muted-foreground text-sm leading-tight">
                    Step-by-step walkthroughs and insights for various labs and
                    challenges.
                  </p>

                  {writeupsLinks.children.map(({ title, slug }, index) => (
                    <Link
                      key={`mobile-nav-writeups-links-${index}`}
                      href={generateURL("writeups", "/" + slug)}
                    >
                      {title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="labs" className="w-full">
                <AccordionTrigger>Labs</AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  <p className="text-muted-foreground text-sm leading-tight">
                    My lab setups for various tasks.
                  </p>
                  {labsLinks.children.map(({ title, slug }, index) => (
                    <Link
                      key={`mobile-nav-lab-links-${index}`}
                      href={generateURL("labs", "/" + slug)}
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
