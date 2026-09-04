import type { Locale } from "@/lib/locale";
import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

import { sushiResultContentEn } from "./en";
import { sushiResultContentJa } from "./ja";

const SUSHI_RESULT_CONTENT: Record<Locale, QuizResultContent> = {
  ja: sushiResultContentJa,
  en: sushiResultContentEn,
};

export function getSushiResultContent(locale: Locale): QuizResultContent {
  return SUSHI_RESULT_CONTENT[locale];
}
