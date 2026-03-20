import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except static files, api, _next
    "/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)",
  ],
};
