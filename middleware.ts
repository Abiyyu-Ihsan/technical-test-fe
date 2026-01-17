import { guestPath } from "@libs/data/middlewarePath";
import { AES, enc } from "crypto-js";
import { NextResponse, NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authorizeCookie = request.cookies.get("test-authorize");

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||

    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (authorizeCookie && pathname === "/") {
    return NextResponse.next();
  }
  if (authorizeCookie && pathname === "/lalin") {
    return NextResponse.next();
  }
  if (authorizeCookie && pathname === "/gerbang") {
    return NextResponse.next();
  }

 
  if (authorizeCookie) {
    if (guestPath.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const authDataCookie = request.cookies.get("test-data");
    const secretKey = process.env.SECRET_KEY;

    if (!authDataCookie || !secretKey) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("test-authorize");
      res.cookies.delete("test-data");
      return res;
    }

    try {
      const bytes = AES.decrypt(authDataCookie.value, secretKey);
      const decryptedText = bytes.toString(enc.Utf8);

      if (!decryptedText) throw new Error("Decrypt failed");

      const user = JSON.parse(decryptedText);
      if (!user?.id) throw new Error("Invalid user");

      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("test-authorize");
      res.cookies.delete("test-data");
      return res;
    }
  }

 
  if (!authorizeCookie && !guestPath.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


