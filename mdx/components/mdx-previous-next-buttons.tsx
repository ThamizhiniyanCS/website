import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { getMetaJSON } from "@/lib/actions";
import type { MetaJSON, MetaJSONchild } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MdxPreviousNextButtons = async ({
  baseRoute,
  nextPage,
  previousPage,
}: {
  baseRoute: string;
  nextPage:
    | {
        title: string;
        slug: string;
      }
    | undefined;
  previousPage:
    | {
        title: string;
        slug: string;
      }
    | undefined;
}) => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 px-10">
      <Button variant="outline" asChild>
        <Link
          className={cn(
            "col-span-1 flex h-auto",
            previousPage === undefined && "pointer-events-none",
          )}
          style={{
            backgroundColor:
              previousPage === undefined ? "var(--background)" : undefined,
            justifyContent: "space-between",
            padding: "1rem",
          }}
          href={{
            pathname: "/" + previousPage?.slug,
          }}
        >
          <ChevronLeftIcon
            className={cn(
              "size-[1.5rem] flex-none",
              previousPage === undefined && "text-primary/50",
            )}
          />

          <div className="flex flex-col items-end">
            <p
              className={cn(
                "text-sm",
                previousPage === undefined && "text-primary/50",
              )}
            >
              Previous
            </p>
            {previousPage && (
              <p className="text-base font-normal text-wrap">
                {previousPage.title}
              </p>
            )}
          </div>
        </Link>
      </Button>

      <Button variant="outline" asChild>
        <Link
          className={cn(
            "col-span-1 flex h-auto",
            nextPage === undefined && "pointer-events-none",
          )}
          style={{
            backgroundColor:
              nextPage === undefined ? "var(--background)" : undefined,
            justifyContent: "space-between",
            padding: "1rem",
          }}
          href={{
            pathname: "/" + nextPage?.slug,
          }}
        >
          <div className="flex flex-col">
            <p
              className={cn(
                "text-sm",
                nextPage === undefined && "text-primary/50",
              )}
            >
              Next
            </p>

            {nextPage && (
              <p className="text-base font-normal text-wrap">
                {nextPage.title}
              </p>
            )}
          </div>

          <ChevronRightIcon
            className={cn(
              "size-[1.5rem] flex-none",
              nextPage === undefined && "text-primary/50",
            )}
          />
        </Link>
      </Button>
    </div>
  );
};

export default MdxPreviousNextButtons;
