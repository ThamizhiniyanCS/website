import { useQueryStates, parseAsBoolean } from "nuqs";

const sidebarParams = {
  root: parseAsBoolean.withDefault(false),
};

export const useSidebarParams = () => {
  return useQueryStates(sidebarParams);
};
