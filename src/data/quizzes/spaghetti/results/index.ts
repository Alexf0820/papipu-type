import type { Locale } from "@/lib/locale";
import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

import { spaghettiResultContentEn } from "./en";
import { spaghettiResultContentJa } from "./ja";

const SPAGHETTI_RESULT_CONTENT: Record<Locale, QuizResultContent> = {
  ja: spaghettiResultContentJa,
  en: spaghettiResultContentEn,
};

export function getSpaghettiResultContent(locale: Locale): QuizResultContent {
  return SPAGHETTI_RESULT_CONTENT[locale];
}
