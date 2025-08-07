import Link from "next/link";
import { fetchLinkMetadata } from "@/mdx/lib/fetchLinkMetadata";
import { ArrowRightIcon } from "lucide-react";

import { ALLOWED_ROUTES } from "@/lib/constants";
import { generateURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const InternalLink = async ({
  route,
  pathname,
  title,
  description,
}: {
  route: string;
  pathname: string;
  title?: string;
  description?: string;
}) => {
  if (!route || !pathname || !ALLOWED_ROUTES.includes(route)) return;

  const url = generateURL(route, pathname);

  const meta = await fetchLinkMetadata(url);

  if (!meta) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {url}
      </Link>
    );
  }

  return (
    <Link href={meta.url} className="group">
      <Card className="rounded-md py-3 hover:bg-white/10">
        <CardContent className="flex h-fit items-center justify-between gap-3 px-5">
          <div className="flex flex-col justify-between gap-1">
            <div>
              <h3 className="line-clamp-2 text-sm font-semibold">
                {title || meta.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 text-xs">
                {description || meta.description}
              </p>
            </div>
            <span className="text-primary text-xs">{meta.site}</span>
          </div>

          <ArrowRightIcon className="mr-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default InternalLink;
