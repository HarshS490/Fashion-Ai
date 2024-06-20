import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/login") &&
      req.nextauth.token !== null
    ) {
      // If already logged in then redirect here
      return NextResponse.redirect(new URL("/explore", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/new-product") &&
      req.nextauth.token === null
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // paths not allowed for unauthorized users
        if (req.nextUrl.pathname.includes("dashboard") && token === null) {
          return false;
        }
        return true;
      },
    },
  },
);

// NOTE: Add those paths in matcher which are to be considered by middleware
export const config = { matcher: ["/login", "/new-product"] };
