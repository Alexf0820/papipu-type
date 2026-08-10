import type { Locale } from "@/lib/locale";

import { campGearResultContentEn } from "./en";
import { campGearResultContentJa } from "./ja";
import type { CampGearResultContent } from "./types";

const CAMP_GEAR_RESULT_CONTENT: Record<Locale, CampGearResultContent> = {
  ja: campGearResultContentJa,
  en: campGearResultContentEn,
};

export function getCampGearResultContent(
  locale: Locale,
): CampGearResultContent {
  return CAMP_GEAR_RESULT_CONTENT[locale];
}

export type { CampGearResultContent, ResultTypeContent } from "./types";
export { CAMP_GEAR_VARIATION_RULES } from "./variationRules";
