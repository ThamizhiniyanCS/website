"use client";

import * as React from "react";
import Link from "next/link";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  MenuIcon,
} from "lucide-react";

import type { MetaJSON } from "@/lib/types";
import { cn, generateURL } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavMenu({
  labsLinks,
  writeupsLinks,
}: {
  labsLinks: MetaJSON;
  writeupsLinks: MetaJSON;
}) {
  const isMobile = useIsMobile(1024);

  return isMobile ? (
    <Accordion
      id="nav-menu-mobile"
      className={cn(
        "bg-background pointer-events-none fixed top-16 left-0 w-screen -translate-y-2 px-5 opacity-0 transition-all duration-300 ease-in-out",
        "data-[state=open]:pointer-events-auto data-[state=open]:translate-y-0 data-[state=open]:opacity-100",
      )}
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
  ) : (
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
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
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
                    <div className="mt-4 mb-2 text-lg font-medium">
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
                    <div className="mt-4 mb-2 text-lg font-medium">Labs</div>
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

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Components</div>
                    <div className="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Components</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Documentation</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Blocks</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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

export const NavMobileTrigger = () => {
  /**
   * Handles the click event on the mobile navigation trigger button.
   * It toggles the visibility and ARIA states of the mobile navigation menu.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The React mouse event.
   */
  const handleMobileNavTriggerOnClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // Per your instruction, we select the navigation menu using its ID.
    const navMobile: HTMLElement | null =
      document.getElementById("nav-menu-mobile");

    // The trigger button is the element that was clicked.
    const trigger: HTMLButtonElement = event.currentTarget;

    // Type guard: Ensure both elements exist before proceeding.
    if (!navMobile) {
      console.error(
        "Mobile navigation menu with ID 'nav-menu-mobile' not found.",
      );
      return;
    }

    const currentState = navMobile.getAttribute("data-state");

    if (currentState === "open") {
      // --- CLOSE MENU LOGIC ---
      navMobile.setAttribute("data-state", "closed");
      navMobile.setAttribute("aria-hidden", "true");

      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", "Open navigation menu");
      trigger.focus(); // Return focus to the trigger button
    } else {
      // --- OPEN MENU LOGIC ---
      navMobile.setAttribute("data-state", "open");
      navMobile.setAttribute("aria-hidden", "false");

      trigger.setAttribute("aria-expanded", "true");
      trigger.setAttribute("aria-label", "Close navigation menu");

      // Find all focusable elements within the mobile navigation.
      const focusableElements: NodeListOf<HTMLElement> =
        navMobile.querySelectorAll(
          "a[href], button:not([disabled]), textarea, input, select",
        );
      const firstFocusableElement: HTMLElement | undefined =
        focusableElements[0];

      // Move focus to the first item in the menu.
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleMobileNavTriggerOnClick}
      className="lg:hidden"
    >
      <MenuIcon />
    </Button>
  );
};
