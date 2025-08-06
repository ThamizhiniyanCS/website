// import Image from "next/image";
import { CDN_URL, DIRECTORIES } from "@/lib/constants";
import { isFullUrl } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

const MdxImage = ({
  props,
  baseRoute,
  baseSlug,
  pathname,
}: {
  props: React.ComponentPropsWithoutRef<"img">;
  baseRoute: string;
  baseSlug: string;
  pathname: string;
}) => {
  let path = pathname + "/" + props.src;

  if (!DIRECTORIES.includes(baseRoute)) {
    path =
      baseRoute +
      "/" +
      baseSlug +
      "/" +
      (props.src as string).replaceAll("../", "");
  }

  return (
    <ImageZoom className="bg-muted/10 mx-auto my-5 flex aspect-video items-center justify-center rounded-lg">
      {isFullUrl(props.src as string) ? (
        <img
          src={props.src}
          alt={props.alt || "Image"}
          className="h-full w-full rounded-lg object-contain"
        />
      ) : (
        <img
          src={CDN_URL + path || ""}
          alt={props.alt || "Image"}
          className="h-full w-full rounded-lg object-contain"
        />
      )}
    </ImageZoom>
  );
};

// <Image
//   src={pathname + "/" + props.src || ""}
//   alt={props.alt || "Image"}
//   fill
//   className="h-full w-full rounded-lg object-cover"
// />;

export default MdxImage;
