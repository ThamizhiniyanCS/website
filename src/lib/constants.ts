export const DOMAIN =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "thamizhiniyancs.me";

export const WEBSITE_URL =
  process.env.NODE_ENV === "development"
    ? `http://${DOMAIN}/`
    : `https://${DOMAIN}/`;

export const CDN_DOMAIN =
  process.env.NODE_ENV === "development" ? `localhost:8000` : `cdn.${DOMAIN}`;

export const CDN_URL =
  process.env.NODE_ENV === "development"
    ? `http://${CDN_DOMAIN}/`
    : `https://${CDN_DOMAIN}/`;

export const ALLOWED_ROUTES = ["labs", "workshops", "writeups"];
export const DIRECTORIES = ["writeups"];
