import type { Locale } from "@/lib/locale";

import { BRAND_NAME } from "@/lib/brand/labels";

export function buildCampGearResultShareText(
  locale: Locale,
  displayName: string,
): string {
  if (locale === "ja") {
    return `私は「${displayName}タイプ」でした！\nあなたはどのキャンプ道具タイプ？\n\n${BRAND_NAME}`;
  }

  return `I'm the ${displayName} Type!\nWhat camping gear type are you?\n\n${BRAND_NAME}`;
}

export function formatSharePayload(text: string, url: string): string {
  return `${text}\n${url}`.trim();
}
