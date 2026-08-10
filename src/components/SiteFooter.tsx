import Link from "next/link";

import { ParentProjectLink } from "@/components/ParentProjectLink";
import { SupportLink } from "@/components/SupportLink";
import {
  getStaticPagePath,
  STATIC_PAGE_IDS,
  STATIC_PAGE_LABELS,
} from "@/lib/legal/staticPages";
import { UI_LABELS } from "@/lib/brand/labels";
import type { Locale } from "@/lib/locale";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = UI_LABELS[locale];
  const pageLabels = STATIC_PAGE_LABELS[locale];

  return (
    <footer className="mt-12 space-y-4 border-t border-pink-100/80 pt-6 text-center">
      <nav
        aria-label={locale === "ja" ? "固定ページ" : "Site pages"}
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-semibold"
      >
        {STATIC_PAGE_IDS.map((pageId) => (
          <Link
            key={pageId}
            href={`/${locale}${getStaticPagePath(pageId)}`}
            className="text-slate-500 transition hover:text-violet-500 hover:underline"
          >
            {pageLabels[pageId]}
          </Link>
        ))}
      </nav>
      <p>
        <SupportLink
          locale={locale}
          className="text-xs font-semibold tracking-wide text-violet-500 transition hover:text-violet-600 hover:underline"
        >
          {copy.supportLink}
        </SupportLink>
      </p>
      <ParentProjectLink className="text-xs font-semibold tracking-wide text-orange-400 transition hover:text-orange-500 hover:underline" />
    </footer>
  );
}
