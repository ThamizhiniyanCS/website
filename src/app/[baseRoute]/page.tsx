import Link from "next/link";
import { notFound } from "next/navigation";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";

import { getMetaJSON } from "@/lib/actions";
import { ALLOWED_ROUTES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: Promise<{ baseRoute: string }>;
}) {
  const { baseRoute } = await params;

  if (!ALLOWED_ROUTES.includes(baseRoute)) {
    notFound();
  }

  const response = await getMetaJSON(baseRoute);

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />;
  }

  // console.log(response);

  return (
    <div className="prose prose-invert mx-auto min-h-screen w-full max-w-7xl pt-20">
      <h1 className="">{response.title}</h1>

      <div className="grid w-full grid-cols-3 gap-4">
        {response.children.map((child, index) => (
          <Link key={index} href={"/" + child.slug} className="no-underline">
            <Card
              style={{
                marginBlock: 0,
              }}
            >
              <CardContent>
                <h3>{child.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
