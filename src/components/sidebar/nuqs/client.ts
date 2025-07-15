"use client";

import { parseAsString, useQueryStates } from "nuqs";

const sidebarParams = {
  root: parseAsString,
};

export const useSidebarParams = () => {
  return useQueryStates(sidebarParams);
};
