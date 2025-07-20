"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const SidebarFile = ({
  title,
  href,
}: {
  title: string;
  href: {
    pathname: string;
    query?: Record<string, string | string[] | undefined>;
  };
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "border-l-border w-full rounded-r-sm border-l px-4 py-2 text-sm",
        pathname === href.pathname && "border-l-primary bg-primary/10",
      )}
    >
      <span className="line-clamp-1">{title}</span>
    </Link>
  );
};

export default SidebarFile;
