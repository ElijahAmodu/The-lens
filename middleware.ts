import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected admin routes
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthPage =
    req.nextUrl.pathname === "/admin/login" ||
    req.nextUrl.pathname === "/admin/signup" ||
    req.nextUrl.pathname === "/admin/forgot-password";

  // If user is trying to access admin routes
  if (isAdminRoute && !isAuthPage) {
    // Redirect to login if no session
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Check if user has admin/super_admin role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (
      !profile ||
      (profile.role !== "admin" && profile.role !== "super_admin")
    ) {
      // User is not authorized, redirect to login
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (isAuthPage && session) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (
      profile &&
      (profile.role === "admin" || profile.role === "super_admin")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };
