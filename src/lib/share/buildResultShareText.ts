import type { Locale } from "@/lib/locale";

export function buildCampGearResultShareText(
  locale: Locale,
  displayName: string,
): string {
  if (locale === "ja") {
    return `私のパピプは「${displayName}タイプ」でした！🍿\nあなたもパピプってみる？`;
  }

  return `My Papipu is the ${displayName} type! 🍿\nWhat's your Papipu?`;
}

export function formatSharePayload(text: string, url: string): string {
  return `${text}\n${url}`.trim();
}

export function buildQuizStartPath(locale: Locale, quizId: string): string {
  return `/${locale}/${quizId}`;
}
