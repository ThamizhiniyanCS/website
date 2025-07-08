import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getMetaJSON } from "@/lib/utils";
import { CDN_URL } from "@/lib/constants";

export default async function MdxBreadcrumbs({
  pathnameArray,
}: {
  pathnameArray: string[];
}) {
  const metaJsonArrayResolved = await Promise.all(
    pathnameArray.map((_, index) =>
      getMetaJSON(`${CDN_URL}${pathnameArray.slice(0, index + 1).join("/")}`),
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
