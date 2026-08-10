import type { Locale } from "@/lib/locale";

export function homeHref(locale: Locale): string {
  return `/${locale}`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/ja" || pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/ja/")) {
    return pathname.slice(3) || "/";
  }

  if (pathname.startsWith("/en/")) {
    return pathname.slice(3) || "/";
  }

  return pathname;
}

/** Swap /ja and /en while keeping the current pathname (for 404 pages). */
export function localePathHref(pathname: string, locale: Locale): string {
  const normalized = stripLocalePrefix(pathname) || "/";

  if (normalized === "/") {
    return homeHref(locale);
  }

  return `/${locale}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
}
