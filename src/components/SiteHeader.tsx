import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BRAND_WORDS } from "@/lib/brand/labels";
import type { Locale } from "@/lib/locale";

type SiteHeaderProps = {
  locale: Locale;
  path: string;
};

export function SiteHeader({ locale, path }: SiteHeaderProps) {
  return (
    <header className="relative z-10 mb-10 flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-extrabold"
        >
          <span className="text-2xl" aria-hidden="true">
            🍿
          </span>
          <span>
            <span className="text-[#FF4785]">{BRAND_WORDS.first}</span>{" "}
            <span className="text-teal-600">{BRAND_WORDS.second}</span>
          </span>
        </Link>
      </div>
      <LanguageSwitcher locale={locale} path={path} />
    </header>
  );
}
