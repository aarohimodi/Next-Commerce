import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token");

  const isProtectedRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/profile") ||
    path.startsWith("/checkout") ||
    path.startsWith("/orders") ||
    path.startsWith("/admin");
  const guestRoutes = ["/login", "/register"];
  let isAuthenticated = false;

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token) {
    isAuthenticated = true;
    // try {
    //   jwt.verify(token.value, process.env.JWT_SECRET!);
    //   isAuthenticated = true;
    // } catch (error) {
    //   isAuthenticated = false;
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }
  if (isAuthenticated && guestRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};

// const protectedRoutes = [
//   "/dashboard",
//   "/profile",
//   "/checkout",
//   "/orders",
//   "/admin",
// ];
// if (!token && protectedRoutes.includes(path)) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }
