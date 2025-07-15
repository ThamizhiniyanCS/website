import { useQueryStates, parseAsString } from "nuqs";

const sidebarParams = {
  root: parseAsString,
};

export const useSidebarParams = () => {
  return useQueryStates(sidebarParams);
};
