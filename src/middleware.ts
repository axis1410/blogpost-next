import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(session);

  if (session && path.endsWith("/")) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  if (!session && path !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  } else if (session && (path === "/auth/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
