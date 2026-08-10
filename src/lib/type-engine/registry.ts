import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { LOCALES, type Locale } from "@/lib/locale";

import type { Quiz } from "./types";

/**
 * Quiz registry. A locale is registered only once its content exists, so a
 * quiz can ship one locale at a time.
 */
const QUIZZES: Record<string, Partial<Record<Locale, Quiz>>> = {
  [CAMP_GEAR_QUIZ_ID]: {
    ja: campGearQuizJa,
    en: campGearQuizEn,
  },
};

export function getQuiz(quizId: string, locale: Locale): Quiz | undefined {
  return QUIZZES[quizId]?.[locale];
}

export function quizExists(quizId: string, locale: Locale): boolean {
  return getQuiz(quizId, locale) !== undefined;
}

export function getQuizIds(): string[] {
  return Object.keys(QUIZZES);
}

export function getQuizLocales(quizId: string): Locale[] {
  return LOCALES.filter((locale) => quizExists(quizId, locale));
}
