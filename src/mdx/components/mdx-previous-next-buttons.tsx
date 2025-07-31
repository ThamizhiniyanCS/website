import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { getMetaJSON } from "@/lib/actions";
import type { MetaJSON, MetaJSONchild } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MdxPreviousNextButtons = async ({
  baseRoute,
  baseSlug,
  nestedSlug,
}: {
  baseRoute: string;
  baseSlug: string;
  nestedSlug: string[];
}) => {
  const result: MetaJSON | undefined = await getMetaJSON(
    baseRoute + "/" + baseSlug,
  );

  if (!result) return;

  const index = result.children.findIndex(
    ({ slug }) => nestedSlug[nestedSlug.length - 1] === slug,
  );
  const previousIndex = index - 1 < 0 ? undefined : index - 1;
  const nextIndex = index + 1 < result.children.length ? index + 1 : undefined;

  const previous: MetaJSONchild | undefined = previousIndex
    ? result.children[previousIndex]
    : undefined;
  const next: MetaJSONchild | undefined = nextIndex
    ? result.children[nextIndex]
    : undefined;

  return (
    <div className="mt-10 grid grid-cols-2 gap-5 px-10">
      <Button variant="outline" asChild>
        <Link
          className={cn(
            "col-span-1 flex h-auto",
            previousIndex === undefined && "pointer-events-none",
          )}
          style={{
            backgroundColor:
              previousIndex === undefined ? "var(--background)" : undefined,
            justifyContent: "space-between",
            padding: "1rem",
          }}
          href={{
            pathname: previous?.slug,
          }}
        >
          <ChevronLeftIcon
            className={cn(
              "size-[1.5rem] flex-none",
              previousIndex === undefined && "text-primary/50",
            )}
          />

          <div className="flex flex-col items-end">
            <p
              className={cn(
                "text-sm",
                previousIndex === undefined && "text-primary/50",
              )}
            >
              Previous
            </p>
            {previous && (
              <p className="line-clamp-1 text-base font-normal">
                {previous.title}
              </p>
            )}
          </div>
        </Link>
      </Button>

      <Button variant="outline" asChild>
        <Link
          className={cn(
            "col-span-1 flex h-auto",
            nextIndex === undefined && "pointer-events-none",
          )}
          style={{
            backgroundColor:
              nextIndex === undefined ? "var(--background)" : undefined,
            justifyContent: "space-between",
            padding: "1rem",
          }}
          href={{
            pathname: next?.slug,
          }}
        >
          <div className="flex flex-col">
            <p
              className={cn(
                "text-sm",
                nextIndex === undefined && "text-primary/50",
              )}
            >
              Next
            </p>

            {next && (
              <p className="line-clamp-1 text-base font-normal">{next.title}</p>
            )}
          </div>

          <ChevronRightIcon
            className={cn(
              "size-[1.5rem] flex-none",
              previousIndex === undefined && "text-primary/50",
            )}
          />
        </Link>
      </Button>
    </div>
  );
};

export default MdxPreviousNextButtons;
