import { parseAsString, createLoader } from "nuqs/server";

const sidebarParams = {
  root: parseAsString,
};

export const loadSidebarParams = createLoader(sidebarParams);
