import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PUBLIC_FILE.test(pathname)) {
    return;
  }

  const pathnameParts = pathname.split("/").filter(Boolean);
  const firstPart = pathnameParts[0];

  if (i18n.locales.includes(firstPart)) {
    return NextResponse.next();
  }

  const locale = getLocale(request) || i18n.defaultLocale;
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/images|favicon.ico|.*\\.png$).*)"],
};
