import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const MdxImage = ({
  props,
  pathname,
}: {
  props: React.ComponentPropsWithoutRef<"img">;
  pathname: string;
}) => {
  console.log(props);

  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
      <Image
        src={pathname + "/" + props.src || ""}
        alt={props.alt || "Image"}
        fill
        className="h-full w-full rounded-lg object-cover"
      />
    </AspectRatio>
  );
};

export default MdxImage;
