import type { Locale } from "@/lib/locale";
import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

import { iceCreamResultContentEn } from "./en";
import { iceCreamResultContentJa } from "./ja";

const ICE_CREAM_RESULT_CONTENT: Record<Locale, QuizResultContent> = {
  ja: iceCreamResultContentJa,
  en: iceCreamResultContentEn,
};

export function getIceCreamResultContent(locale: Locale): QuizResultContent {
  return ICE_CREAM_RESULT_CONTENT[locale];
}
