import { ListTreeIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const MdxTocSkeleton = () => {
  return (
    <ScrollArea className="size-full px-2">
      <p className="text-muted-foreground bg-background flex h-6 items-center gap-2 text-base">
        <ListTreeIcon className="size-4 flex-none" />
        On This Page
      </p>

      <div className={"relative mt-2"}>
        <div className="flex flex-col gap-2 p-4 pt-0 text-sm">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[0.8rem] w-full max-w-60 rounded-full"
            ></Skeleton>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default MdxTocSkeleton;
