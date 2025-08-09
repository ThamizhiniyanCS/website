import Link from "next/link";

import { getMetaJSON } from "@/lib/actions";
import { cn } from "@/lib/utils";

import { ModeToggle } from "../mode-toggle";
import NavMenu, { NavMobileTrigger } from "./nav-menu";

const Navbar = async () => {
  const labsLinks = await getMetaJSON("labs");
  const writeupsLinks = await getMetaJSON("writeups");
  const commonClass =
    "bg-background fixed z-50 flex h-16 w-full items-center justify-between px-4 md:px-8";

  if (!labsLinks || !writeupsLinks) {
    return (
      <nav className={cn(commonClass)}>
        <div className="flex items-center gap-6">
          <Link href="/">Thamizhiniyan C S</Link>
        </div>

        <ModeToggle />
      </nav>
    );
  }

  return (
    <nav className={cn(commonClass)}>
      <div className="flex items-center gap-6">
        <Link href="/">Thamizhiniyan C S</Link>
        <NavMenu labsLinks={labsLinks} writeupsLinks={writeupsLinks} />
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <NavMobileTrigger />
      </div>
    </nav>
  );
};

export default Navbar;
