import { NextResponse } from "next/server";


export function middleware(req) {
  
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("adminToken")?.value;

  if (pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if(pathname.startsWith("/admin")){
    if(!token){
      return NextResponse.redirect(new URL("/login", req.url) );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*" ,"/login"],
};