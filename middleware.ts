import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("chat_token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isChatDashboard = request.nextUrl.pathname.startsWith("/chat");

  // Protect /chat route
  if (!token && isChatDashboard) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is already authenticated and visits /login
  if (token && isAuthPage) {
    const chatUrl = new URL("/chat", request.url);
    return NextResponse.redirect(chatUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
