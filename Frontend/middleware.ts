import NextAuth from "next-auth";

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const role = req.auth?.user.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAminRoute = nextUrl.pathname.startsWith("/admin");
  const isDevRoute = nextUrl.pathname.startsWith("/dev");

  if (nextUrl.pathname.startsWith("/auth/glemt-passord")) return;

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === "DEV") {
        return Response.redirect(new URL("/dev", nextUrl));
      } else if (role === "ADMIN") {
        return Response.redirect(new URL("/admin", nextUrl));
      } else {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    }

    return;
  }

  if (isDevRoute && role !== "DEV") {
    return Response.redirect(new URL("/admin", nextUrl));
  }
  if (isAminRoute && role !== "ADMIN" && role !== "DEV")
    return Response.redirect(new URL("/min-side", nextUrl));

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("auth/logginn", nextUrl.origin));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
