import Link from "next/link";

import { HOME_COPY } from "@/lib/home/content";
import type { Locale } from "@/lib/locale";

const CTA_CLASS =
  "mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#FF4785] px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-[#e63d75] active:scale-[0.99] touch-manipulation sm:w-auto sm:min-w-[200px] sm:px-8";

type QuizCardProps = {
  locale: Locale;
  quizId: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  icon: string;
  iconLabel: string;
};

export function QuizCard({
  locale,
  quizId,
  titleLine1,
  titleLine2,
  description,
  icon,
  iconLabel,
}: QuizCardProps) {
  const cta = HOME_COPY[locale].takeQuiz;

  return (
    <article className="relative overflow-hidden rounded-3xl border border-pink-100/90 bg-gradient-to-br from-[#fff8f0]/90 via-white to-pink-50/50 px-5 py-6 shadow-[0_1px_4px_rgba(255,71,133,0.06)] sm:px-6 sm:py-7">
      <span
        className="absolute right-5 top-5 h-2 w-2 rounded-full bg-pink-200/90"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-6 left-5 h-1.5 w-1.5 rotate-45 bg-teal-200/80"
        aria-hidden="true"
      />
      <h2 className="pr-4 text-xl font-extrabold leading-snug text-slate-800 sm:text-2xl">
        <span className="block whitespace-nowrap">
          <span
            className="mr-0.5 inline text-[0.82em] leading-none"
            role="img"
            aria-label={iconLabel}
          >
            {icon}
          </span>
          {titleLine1}
        </span>
        <span className="block">{titleLine2}</span>
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>
      <Link href={`/${locale}/${quizId}`} className={CTA_CLASS}>
        {cta}
      </Link>
    </article>
  );
}
