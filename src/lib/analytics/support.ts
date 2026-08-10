import type { SupportType } from "@/lib/analytics/events";
import {
  BUY_ME_A_COFFEE_SUPPORT_URL,
  OFUSE_SUPPORT_URL,
} from "@/lib/brand/externalUrls";
import type { Locale } from "@/lib/locale";

type SupportLinkConfig = {
  href: string;
  supportType: SupportType;
};

export const SUPPORT_LINKS: Record<Locale, SupportLinkConfig> = {
  ja: {
    href: OFUSE_SUPPORT_URL,
    supportType: "ofuse",
  },
  en: {
    href: BUY_ME_A_COFFEE_SUPPORT_URL,
    supportType: "buy_me_a_coffee",
  },
};
