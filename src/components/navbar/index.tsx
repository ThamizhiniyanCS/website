import Link from "next/link";

import { getMetaJSON } from "@/lib/actions";

import { ModeToggle } from "../mode-toggle";
import NavMenu from "./nav-menu";

const Navbar = async () => {
  const labsLinks = await getMetaJSON("labs");
  const writeupsLinks = await getMetaJSON("writeups");

  if (!labsLinks || !writeupsLinks) {
    return (
      <nav className="bg-background fixed z-50 flex h-16 w-full items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Link href="/">Thamizhiniyan C S</Link>
        </div>

        <ModeToggle />
      </nav>
    );
  }

  return (
    <nav className="bg-background fixed z-50 flex h-16 w-full items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <Link href="/">Thamizhiniyan C S</Link>
        <NavMenu labsLinks={labsLinks} writeupsLinks={writeupsLinks} />
      </div>

      <ModeToggle />
    </nav>
  );
};

export default Navbar;
