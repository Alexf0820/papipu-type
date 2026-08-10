import Link from "next/link";

import type { Locale } from "@/lib/locale";
import { LOCALES } from "@/lib/locale";
import { localePathHref } from "@/lib/routes/notFound";

type LanguageSwitcherProps = {
  locale: Locale;
  path?: string;
  /** When set, swap locale prefix on the current pathname (404 pages). */
  preservePathname?: string | null;
  /** Optional query string to append (e.g. "?q=1"). */
  preserveSuffix?: string;
};

const LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

function getSwitcherHref(
  targetLocale: Locale,
  path: string,
  preservePathname?: string | null,
  preserveSuffix?: string,
): string {
  if (preservePathname != null) {
    return `${localePathHref(preservePathname, targetLocale)}${preserveSuffix ?? ""}`;
  }

  return `/${targetLocale}${path}`;
}

export function LanguageSwitcher({
  locale,
  path = "",
  preservePathname,
  preserveSuffix,
}: LanguageSwitcherProps) {
  return (
    <nav className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm ring-1 ring-pink-100">
      {LOCALES.map((loc) => (
        <Link
          key={loc}
          href={getSwitcherHref(loc, path, preservePathname, preserveSuffix)}
          className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
            loc === locale
              ? "bg-[#FF4785] text-white"
              : "text-gray-600 hover:bg-pink-50"
          }`}
        >
          {LABELS[loc]}
        </Link>
      ))}
    </nav>
  );
}
