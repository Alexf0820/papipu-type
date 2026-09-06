"use client";

import { trackHomeShareClick } from "@/lib/analytics/events";
import { HOME_SHARE_COPY } from "@/lib/home/content";
import type { Locale } from "@/lib/locale";
import { useShare } from "@/lib/share/useShare";

type HomeShareActionProps = {
  locale: Locale;
};

export function HomeShareAction({ locale }: HomeShareActionProps) {
  const copy = HOME_SHARE_COPY[locale];
  const { share, copied, copiedLabel } = useShare(locale);

  async function handleShare() {
    const method = await share({
      title: copy.title,
      text: copy.text,
      url: `/${locale}`,
    });

    if (method === "native" || method === "clipboard") {
      trackHomeShareClick({
        locale,
        share_type: method === "clipboard" ? "copy" : method,
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copy.accessibleLabel}
      className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#e63d75] shadow-sm transition hover:bg-pink-50 active:scale-[0.99] touch-manipulation"
    >
      {copied ? copiedLabel : copy.label}
    </button>
  );
}
