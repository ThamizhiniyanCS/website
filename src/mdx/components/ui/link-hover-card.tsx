import Link from "next/link";

import { isExternalLink } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const LinkHoverCard = ({
  props,
}: {
  props: React.ComponentPropsWithoutRef<"a">;
}) => {
  if (props.href?.startsWith("mailto:") || props.href?.startsWith("tel:")) {
    return <strong className="font-mono">{props.children}</strong>;
  }

  return props.href && props.href.startsWith("#") ? (
    <Link
      href={props.href}
      className="pointer-events-none cursor-pointer opacity-0"
    >
      {props.children}
    </Link>
  ) : (
    <HoverCard>
      <HoverCardTrigger asChild>
        {isExternalLink(props.href || "") ? (
          <a href={props.href} target="_blank">
            {props.children}
          </a>
        ) : (
          <Link href={props.href || ""}>{props.children}</Link>
        )}
      </HoverCardTrigger>
      <HoverCardContent align="end" className="aspect-video w-[50rem]">
        <iframe
          src={props.href}
          loading="lazy"
          className="size-full rounded-sm"
        ></iframe>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LinkHoverCard;
