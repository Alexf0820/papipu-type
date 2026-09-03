import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { getCampGearResultContent } from "@/data/quizzes/camp-gear/results";
import { SPAGHETTI_QUIZ_ID } from "@/data/quizzes/spaghetti/definition";
import { spaghettiQuizJa } from "@/data/quizzes/spaghetti/ja";
import { spaghettiQuizEn } from "@/data/quizzes/spaghetti/en";
import { getSpaghettiResultContent } from "@/data/quizzes/spaghetti/results";
import { LOCALES, type Locale } from "@/lib/locale";

import type { Quiz } from "./types";
import type { QuizResultContent } from "./resolveResult";

/**
 * Quiz registry. A locale is registered only once its content exists, so a
 * quiz can ship one locale at a time.
 */
const QUIZZES: Record<string, Partial<Record<Locale, Quiz>>> = {
  [CAMP_GEAR_QUIZ_ID]: {
    ja: campGearQuizJa,
    en: campGearQuizEn,
  },
  [SPAGHETTI_QUIZ_ID]: {
    ja: spaghettiQuizJa,
    en: spaghettiQuizEn,
  },
};

const RESULT_CONTENT: Record<
  string,
  Partial<Record<Locale, QuizResultContent>>
> = {
  [CAMP_GEAR_QUIZ_ID]: {
    ja: getCampGearResultContent("ja"),
    en: getCampGearResultContent("en"),
  },
  [SPAGHETTI_QUIZ_ID]: {
    ja: getSpaghettiResultContent("ja"),
    en: getSpaghettiResultContent("en"),
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

export function getQuizResultContent(
  quizId: string,
  locale: Locale,
): QuizResultContent | undefined {
  return RESULT_CONTENT[quizId]?.[locale];
}
