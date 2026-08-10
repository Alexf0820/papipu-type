export const LOCALES = ["ja", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** Cookie name reserved for future persisted locale preference. */
export const LOCALE_COOKIE_NAME = "papipu_locale";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function localeFromPathname(pathname: string | null): Locale {
  if (!pathname) {
    return "ja";
  }

  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

/**
 * Pick ja when Accept-Language includes "ja" (e.g. ja-JP, ja;q=0.9).
 */
export function detectLocaleFromAcceptLanguage(
  acceptLanguage: string,
): Locale {
  if (acceptLanguage.toLowerCase().includes("ja")) {
    return "ja";
  }

  return "en";
}

export type LocaleResolutionInput = {
  /** Persisted user choice (cookie / localStorage). Highest priority when valid. */
  savedLocale?: string | null;
  /** Browser Accept-Language header value. */
  acceptLanguage?: string | null;
  /** Fallback when nothing else matches. */
  defaultLocale?: Locale;
};

/**
 * Resolve locale from saved preference, then Accept-Language, then default.
 * Root redirect and future proxy can share this helper.
 */
export function resolveLocale(input: LocaleResolutionInput = {}): Locale {
  const { savedLocale, acceptLanguage, defaultLocale = "en" } = input;

  if (savedLocale && isValidLocale(savedLocale)) {
    return savedLocale;
  }

  if (acceptLanguage?.trim()) {
    return detectLocaleFromAcceptLanguage(acceptLanguage);
  }

  return defaultLocale;
}
