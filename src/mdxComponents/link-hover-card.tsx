import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { isExternalLink } from "@/lib/utils";

const LinkHoverCard = ({
  props,
}: {
  props: React.ComponentPropsWithoutRef<"a">;
}) => {
  return (
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
