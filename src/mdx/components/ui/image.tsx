// import Image from "next/image";
import { CDN_URL } from "@/lib/constants";
import { isFullUrl } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";

const MdxImage = ({
  props,
  pathname,
}: {
  props: React.ComponentPropsWithoutRef<"img">;
  pathname: string;
}) => {
  return (
    <ImageZoom className="bg-muted mx-auto aspect-video rounded-lg">
      {isFullUrl(props.src as string) ? (
        <img
          src={props.src}
          alt={props.alt || "Image"}
          className="h-full w-full rounded-lg object-contain"
        />
      ) : (
        <img
          src={CDN_URL + pathname + "/" + props.src || ""}
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
