import type { Locale } from "@/lib/locale";
import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

import { donutResultContentEn } from "./en";
import { donutResultContentJa } from "./ja";

const DONUT_RESULT_CONTENT: Record<Locale, QuizResultContent> = {
  ja: donutResultContentJa,
  en: donutResultContentEn,
};

export function getDonutResultContent(locale: Locale): QuizResultContent {
  return DONUT_RESULT_CONTENT[locale];
}
