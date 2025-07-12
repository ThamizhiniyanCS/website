import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MetaJSON } from "./types";
import { DOMAIN } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFullUrl(pathname: string): boolean {
  try {
    const url = new URL(pathname);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false; // throws if it's a relative URL
  }
}

export function isExternalLink(
  absolutePathname: string,
  currentHost: string = DOMAIN,
): boolean {
  try {
    const url = new URL(absolutePathname, `http://${currentHost}`);
    const linkHost = url.hostname;

    // External if hostname doesn't match or isn't a subdomain
    return linkHost !== currentHost && !linkHost.endsWith(`.${currentHost}`);
  } catch {
    // If it can't be parsed as URL, assume it's relative => not external
    return false;
  }
}
