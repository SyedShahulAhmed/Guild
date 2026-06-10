import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    const protectedRoutes = [
        "/dashboard",
        "/settings",
        "/communities/create",
    ]

    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(
            new URL("/auth/login", req.url)
        )
    }
    if (token && !isProtectedRoute) {
        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        )
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/communities/create/:path*",
    ]
}