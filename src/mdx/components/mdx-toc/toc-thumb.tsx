import { type HTMLAttributes, type RefObject, useEffect, useRef } from "react";

const TocThumb = ({
  containerRef,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  containerRef: RefObject<HTMLElement | null>;
}) => {
  const thumbRef = useRef<HTMLDivElement>(null);

  return <div></div>;
};

export default TocThumb;
