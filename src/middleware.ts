import { NextRequest, NextResponse } from "next/server";

// Off-niche legacy paths that should return 410 Gone (permanently removed)
const GONE_PATHS = new Set([
  "/web-hosting-riyadh",
  "/graphic-design-riyadh",
  "/logo-design-riyadh",
  "/video-production-riyadh",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GONE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/web-hosting-riyadh",
    "/graphic-design-riyadh",
    "/logo-design-riyadh",
    "/video-production-riyadh",
  ],
};
