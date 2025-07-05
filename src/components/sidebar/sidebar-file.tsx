import type { FileNode } from ".";
import Link from "next/link";

const SidebarFile = ({ title, href }: FileNode) => {
  return (
    <Link
      href={href}
      className="border-primary w-full border-l px-4 py-2 font-mono text-sm"
    >
      {title}
    </Link>
  );
};

export default SidebarFile;
