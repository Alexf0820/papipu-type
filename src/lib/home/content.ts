import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import type { Locale } from "@/lib/locale";

/** Home page hero and CTA copy — separate from quiz in-flow labels. */
export const HOME_COPY: Record<
  Locale,
  {
    heroTitle: string;
    heroSubtitle: string;
    heroMainCta: string;
    takeQuiz: string;
    comingSoonLabel: string;
    comingSoonDescription: string;
  }
> = {
  ja: {
    heroTitle: "あなたは、何タイプ？",
    heroSubtitle:
      "いろんなモノにたとえて、\nあなたのタイプをゆるく診断します。",
    heroMainCta: "🍿 パピプってみる！",
    takeQuiz: "パピプる！ →",
    comingSoonLabel: "COMING SOON",
    comingSoonDescription: "次のパピプを準備中！",
  },
  en: {
    heroTitle: "What type are you?",
    heroSubtitle: "Discover your type\nthrough everyday things.",
    heroMainCta: "🍿 Let's Papipu!",
    takeQuiz: "Your Papipu →",
    comingSoonLabel: "COMING SOON",
    comingSoonDescription: "More Papipu types are on the way!",
  },
};

export type HomeQuizEntry = {
  id: string;
  description: Record<Locale, string>;
};

/** Quizzes listed on the home page — append new entries here later. */
export const HOME_QUIZZES: readonly HomeQuizEntry[] = [
  {
    id: CAMP_GEAR_QUIZ_ID,
    description: {
      ja: "もしあなたがキャンプ道具だったら？",
      en: "If you were a piece of camping gear, what would you be?",
    },
  },
];

/** Primary quiz linked from the hero main CTA. */
export const HOME_PRIMARY_QUIZ_ID = HOME_QUIZZES[0]?.id ?? CAMP_GEAR_QUIZ_ID;

/** Placeholder cards shown on the home quiz grid before launch. */
export const HOME_COMING_SOON_CARD_COUNT = 7;
