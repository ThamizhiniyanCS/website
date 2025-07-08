// import Image from "next/image";
import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { isFullUrl } from "@/lib/utils";

const MdxImage = ({
  props,
  pathname,
}: {
  props: React.ComponentPropsWithoutRef<"img">;
  pathname: string;
}) => {
  return (
    <ImageZoom className="bg-muted aspect-video rounded-lg">
      {isFullUrl(props.src as string) ? (
        <img
          src={props.src}
          alt={props.alt || "Image"}
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <img
          src={pathname + "/" + props.src || ""}
          alt={props.alt || "Image"}
          className="h-full w-full rounded-lg object-cover"
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
