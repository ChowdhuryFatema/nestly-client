import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService"

type TRole = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
    // landlord: [/^\/landlord/,/^\/create-shop/],
    landlord: [/^\/landlord/],
    tenant: [/^\/tenant/],
    admin: [/^\/admin/],
}

export const middleware = async (request: NextRequest) => {

    const { pathname } = request.nextUrl;

    const userInfo = await getCurrentUser();

    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(`https://nestly-server.vercel.app/api/auth/login?redirectPath=${pathname}`, request.url))
        }
    }

    if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as TRole]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as TRole];
        if (routes.some(route => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: [
        "/login",
        "/admin",
        "/landlord",
        "/tenant",
        "/admin/:page",
        "/landlord/:page",
        "/tenant/:page"
    ]
}