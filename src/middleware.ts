import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getWebsitePort, getAdminPort } from "@/lib/config/app";

const SESSION_COOKIE_NAME = "admin_session";

// Port configuration (extracted from URLs in .env)
const WEBSITE_PORT = getWebsitePort();
const ADMIN_PORT = getAdminPort();

// Domain configuration (for production)
// Set ADMIN_DOMAIN in .env for production (e.g., "admin.cognaium.com")
const ADMIN_DOMAIN = process.env.ADMIN_DOMAIN || "";

// Routes that don't require authentication
const publicRoutes = [
  "/admin/login",
  "/admin/setup",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  
  // Extract port from host (e.g., "localhost:3000" -> "3000")
  const portMatch = host.match(/:(\d+)$/);
  const port = portMatch ? portMatch[1] : "80";
  
  // Check if this is the admin domain (for production)
  const isAdminDomain = ADMIN_DOMAIN && host.includes(ADMIN_DOMAIN);
  
  // Create response with pathname header for layout detection
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  // Port-based routing enforcement
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isWebsitePort = port === WEBSITE_PORT && !isAdminDomain;
  const isAdminPort = port === ADMIN_PORT || isAdminDomain;

  // On website port (3000): Block admin routes
  if (isWebsitePort && isAdminRoute) {
    // Return 404 for admin routes on website port
    return new NextResponse("Not Found", { status: 404 });
  }

  // On admin port (3007): Redirect non-admin routes to admin
  if (isAdminPort && !isAdminRoute && !pathname.startsWith("/api/") && !pathname.startsWith("/_next")) {
    // Redirect to admin dashboard
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Check if it's an admin route
  if (pathname.startsWith("/admin")) {
    // Allow public routes
    if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
      return response;
    }

    // Check for session cookie
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      // Redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if it's a protected API route
  if (pathname.startsWith("/api/admin")) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files and api
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
