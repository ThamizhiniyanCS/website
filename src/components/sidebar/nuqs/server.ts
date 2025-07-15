"use server";

import { createLoader, parseAsString } from "nuqs/server";

const sidebarParams = {
  root: parseAsString,
};

export const loadSidebarParams = createLoader(sidebarParams);
