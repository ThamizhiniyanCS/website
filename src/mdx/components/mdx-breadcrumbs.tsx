import { Fragment } from "react";
import Link from "next/link";

import { getMetaJSON } from "@/lib/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default async function MdxBreadcrumbs({
  pathnameArray,
}: {
  pathnameArray: string[];
}) {
  const metaJsonArrayResolved = await Promise.all(
    pathnameArray.map((_, index) =>
      getMetaJSON(`${pathnameArray.slice(0, index + 1).join("/")}`),
    ),
  );

  return (
    <Breadcrumb className="px-10 pb-5">
      <BreadcrumbList>
        {pathnameArray.map((pathname, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index + 1 < pathnameArray.length ? (
                <BreadcrumbLink asChild>
                  <Link
                    href={`/${pathnameArray.slice(0, index + 1).join("/")}`}
                  >
                    {metaJsonArrayResolved[index]
                      ? metaJsonArrayResolved[index].title
                      : pathname}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {metaJsonArrayResolved[index]
                    ? metaJsonArrayResolved[index].title
                    : pathname}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index + 1 < pathnameArray.length && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const MdxBreadcrumbsSkeleton = () => {
  return (
    <Breadcrumb className="px-10 pb-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Skeleton className="h-4 w-[8rem] rounded-full" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Skeleton className="h-4 w-[8rem] rounded-full" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Skeleton className="h-4 w-[8rem] rounded-full" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
