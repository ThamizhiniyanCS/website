import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex h-20 w-full items-center justify-between px-8">
      <p>Thamizhiniyan C S</p>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
