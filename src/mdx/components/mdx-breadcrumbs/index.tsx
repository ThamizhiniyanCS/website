import { getMetaJSON } from "@/lib/actions";
import { MetaJSON } from "@/lib/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

import Breadcrumbs from "./breadcrumbs";

export default async function MdxBreadcrumbs({
  pathnameArray,
  frontmatterTitle,
  padding = true,
}: {
  pathnameArray: string[];
  frontmatterTitle?: string;
  padding?: boolean;
}) {
  const metaJsonArrayResolved: (MetaJSON | undefined)[] = await Promise.all(
    pathnameArray
      .slice(0, pathnameArray.length - 1)
      .map((_, index) =>
        getMetaJSON(`${pathnameArray.slice(0, index + 1).join("/")}`),
      ),
  );

  const breadcrumbLinks: { title: string; href: string }[] = pathnameArray
    .slice(0, pathnameArray.length - 1)
    .map((pathname, index) => ({
      title: metaJsonArrayResolved[index]
        ? metaJsonArrayResolved[index].title
        : pathname.replaceAll("-", " "),
      href: `/${pathnameArray.slice(0, index + 1).join("/")}`,
    }));

  const breadcrumbPage: string | undefined =
    frontmatterTitle ||
    (metaJsonArrayResolved.length > 1
      ? metaJsonArrayResolved[metaJsonArrayResolved.length - 1]?.title
      : undefined);

  return (
    <Breadcrumbs
      breadcrumbLinks={breadcrumbLinks}
      breadcrumbPage={
        breadcrumbPage
          ? breadcrumbPage
          : pathnameArray[pathnameArray.length - 1].replaceAll("-", " ")
      }
      padding={padding}
    />
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
