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

export type HomeQuizGenreIcon = {
  /** Genre emoji shown on the home quiz card. */
  emoji: string;
  /** Accessible label for the genre icon. */
  label: Record<Locale, string>;
};

export type HomeQuizCardTitle = {
  line1: string;
  line2: string;
};

export type HomeQuizEntry = {
  id: string;
  icon: HomeQuizGenreIcon;
  /** Two-line card title — line1 sits beside the genre icon. */
  cardTitle: Record<Locale, HomeQuizCardTitle>;
  description: Record<Locale, string>;
};

/** Quizzes listed on the home page — append new entries here later. */
export const HOME_QUIZZES: readonly HomeQuizEntry[] = [
  {
    id: CAMP_GEAR_QUIZ_ID,
    icon: {
      emoji: "⛺",
      label: {
        ja: "キャンプ",
        en: "Camping",
      },
    },
    cardTitle: {
      ja: {
        line1: "キャンプ道具",
        line2: "タイプ診断",
      },
      en: {
        line1: "Camping Gear",
        line2: "Type Quiz",
      },
    },
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
