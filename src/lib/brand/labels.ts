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
  }
> = {
  ja: {
    previousQuestion: "← 前の質問",
  },
  en: {
    previousQuestion: "← Previous",
  },
};
