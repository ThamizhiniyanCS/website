import { getMetaJSON } from "@/lib/actions";
import DirectoryContentsRenderer from "@/mdx/components/mdx-directory-contents-renderer";
import MdxErrorComponent from "@/mdx/components/mdx-error-component";

export default async function Page() {
  const response = await getMetaJSON("labs");

  if (!response) {
    return <MdxErrorComponent error="Failed to fetch meta.json" />;
  }

  return <DirectoryContentsRenderer meta={response} pathname="labs" />;
}
