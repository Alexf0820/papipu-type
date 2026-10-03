import type { Locale } from "@/lib/locale";
import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

import { pizzaResultContentEn } from "./en";
import { pizzaResultContentJa } from "./ja";

const PIZZA_RESULT_CONTENT: Record<Locale, QuizResultContent> = {
  ja: pizzaResultContentJa,
  en: pizzaResultContentEn,
};

export function getPizzaResultContent(locale: Locale): QuizResultContent {
  return PIZZA_RESULT_CONTENT[locale];
}
