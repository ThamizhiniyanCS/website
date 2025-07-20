import Link from "next/link";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";

import { getMetaJSON } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const response = await getMetaJSON("labs");

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />;
  }

  // console.log(response);

  return (
    <div className="prose prose-invert mx-auto min-h-screen w-full max-w-7xl pt-20">
      <h1 className="">{response.title}</h1>

      <div className="grid w-full grid-cols-3 gap-4">
        {response.children.map((child, index) => (
          <Link
            key={index}
            href={`/labs/${child.slug}`}
            className="no-underline"
          >
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
