import Link from "next/link";

import { ParentProjectLink } from "@/components/ParentProjectLink";
import { HomeHeroVisual } from "@/components/home/HomeHeroVisual";
import { BRAND_WORDS } from "@/lib/brand/labels";
import { HOME_COPY, HOME_PRIMARY_QUIZ_ID } from "@/lib/home/content";
import type { Locale } from "@/lib/locale";

type HomeHeroProps = {
  locale: Locale;
};

const MAIN_CTA_CLASS =
  "inline-flex w-full items-center justify-center rounded-full bg-[#FF4785] px-8 py-4 text-base font-bold text-white shadow-lg shadow-pink-300/40 transition hover:bg-[#e63d75] hover:shadow-xl active:scale-[0.99] touch-manipulation sm:w-auto";

export function HomeHero({ locale }: HomeHeroProps) {
  const copy = HOME_COPY[locale];

  return (
    <section className="relative pb-2 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:pb-2">
      <div className="space-y-5 text-center lg:text-left">
        <p className="text-[11px] font-bold tracking-[0.12em] text-orange-400">
          <ParentProjectLink className="transition hover:text-orange-500 hover:underline" />
        </p>

        <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-[#FF4785]">{BRAND_WORDS.first}</span>{" "}
          <span className="text-teal-600">{BRAND_WORDS.second}</span>
        </h1>

        <div className="space-y-2">
          <p className="text-balance text-2xl font-extrabold leading-snug text-slate-800 sm:text-3xl">
            {copy.heroTitle}
          </p>
          <p className="mx-auto max-w-lg whitespace-pre-line text-[15px] leading-relaxed text-slate-600 sm:text-base lg:mx-0">
            {copy.heroSubtitle}
          </p>
        </div>

        <div className="flex justify-center lg:justify-start">
          <Link
            href={`/${locale}/${HOME_PRIMARY_QUIZ_ID}`}
            className={MAIN_CTA_CLASS}
          >
            {copy.heroMainCta}
          </Link>
        </div>

        <div className="flex justify-center pt-2 lg:hidden">
          <HomeHeroVisual />
        </div>
      </div>

      <div className="hidden shrink-0 lg:block lg:pl-2 lg:pr-8">
        <HomeHeroVisual />
      </div>
    </section>
  );
}
