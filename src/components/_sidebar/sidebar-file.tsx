import Link from "next/link";

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
  return (
    <Link
      href={href}
      className="border-primary w-full border-l px-4 py-2 text-sm"
    >
      <span className="line-clamp-1">{title}</span>
    </Link>
  );
};

export default SidebarFile;
