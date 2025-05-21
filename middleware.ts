// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path starts with /dashboard
  const isDashboardRoute = path.startsWith("/dashboard");

  // Get the token from cookies
  const token = request.cookies.get("auth-token")?.value;

  // If trying to access dashboard without token, redirect to login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Specify the paths that the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*"],
};
