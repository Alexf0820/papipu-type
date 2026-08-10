import type { Locale } from "@/lib/locale";

import { PARENT_PROJECT_URL } from "./externalUrls";

/** Site-wide brand — header, SEO suffix. */
export const BRAND_NAME = "PAPIPU TYPE";

/** Header renders the brand as two coloured words. */
export const BRAND_WORDS = {
  first: "PAPIPU",
  second: "TYPE",
} as const;

/** Parent project — linked from header area and future footer. */
export const PARENT_PROJECT_NAME = "Project PapipupePopcorn";
export { PARENT_PROJECT_URL };

export const UI_LABELS: Record<
  Locale,
  {
    /** Steps the quiz flow back to the previously answered question. */
    previousQuestion: string;
    /** Result screen — compatibility section headings. */
    compatibilityGood: string;
    compatibilityBad: string;
    compatibilityReason: string;
    /** Result screen — motto / philosophy heading. */
    mottoHeading: string;
    /** Result screen — share primary CTA. */
    shareResult: string;
    /** Result screen — retry secondary CTA. */
    tryAgain: string;
    /** Clipboard fallback after share. */
    shareCopied: string;
    supportLink: string;
  }
> = {
  ja: {
    previousQuestion: "← 前の質問",
    compatibilityGood: "相性 GOOD",
    compatibilityBad: "相性 BAD",
    compatibilityReason: "理由",
    mottoHeading: "座右の銘",
    shareResult: "結果をシェア",
    tryAgain: "もう一度診断する",
    shareCopied: "リンクをコピーしました！",
    supportLink: "☕ 応援する",
  },
  en: {
    previousQuestion: "← Previous",
    compatibilityGood: "BEST MATCH",
    compatibilityBad: "WORST MATCH",
    compatibilityReason: "Reason",
    mottoHeading: "MY PHILOSOPHY",
    shareResult: "Share My Result",
    tryAgain: "Try Again",
    shareCopied: "Link copied!",
    supportLink: "☕ Support us",
  },
};

export function resultTypeTitle(locale: Locale, displayName: string): string {
  return locale === "ja"
    ? `あなたは${displayName}タイプ！`
    : `You're the ${displayName} Type!`;
}

export function compatibilityTypeLabel(
  locale: Locale,
  displayName: string,
): string {
  return locale === "ja" ? `${displayName}タイプ` : displayName;
}
