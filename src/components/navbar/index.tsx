import { ModeToggle } from "../mode-toggle";
import NavMenu from "./nav-menu";

const Navbar = () => {
  return (
    <nav className="bg-background fixed z-50 flex h-16 w-full items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <p>Thamizhiniyan C S</p>
        <NavMenu />
      </div>

      <ModeToggle />
    </nav>
  );
};

export default Navbar;
