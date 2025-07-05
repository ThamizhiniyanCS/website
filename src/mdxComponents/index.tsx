import MdxImage from "./image";
import CustomAlert from "./alert";

export const mdxComponents = (pathname: string) => ({
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <MdxImage props={props} pathname={pathname} />
  ),
  Alert: CustomAlert,
});
