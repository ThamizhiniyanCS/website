import MdxImage from "./image";

export const mdxComponents = (pathname: string) => ({
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <MdxImage props={props} pathname={pathname} />
  ),
});
