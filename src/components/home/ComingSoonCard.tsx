import { HOME_COPY } from "@/lib/home/content";
import type { Locale } from "@/lib/locale";

/** Subtle visual variety for placeholder cards — no theme-specific imagery. */
const QUESTION_MARK_VARIANTS = [
  { className: "text-pink-300/90 -rotate-6" },
  { className: "text-teal-300/90 rotate-3" },
  { className: "text-amber-300/90 -rotate-2" },
  { className: "text-purple-300/85 rotate-6" },
  { className: "text-sky-300/90 -rotate-3" },
  { className: "text-rose-300/90 rotate-2" },
  { className: "text-lime-300/85 -rotate-5" },
] as const;

type ComingSoonCardProps = {
  locale: Locale;
  index: number;
};

export function ComingSoonCard({ locale, index }: ComingSoonCardProps) {
  const copy = HOME_COPY[locale];
  const variant =
    QUESTION_MARK_VARIANTS[index % QUESTION_MARK_VARIANTS.length];

  return (
    <article
      aria-label={copy.comingSoonDescription}
      className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-pink-100/70 bg-gradient-to-br from-[#fff8f0]/70 via-white/95 to-pink-50/40 px-4 py-7 text-center shadow-[0_1px_4px_rgba(255,71,133,0.04)] sm:px-5 sm:py-8"
    >
      <span
        className="absolute right-5 top-5 h-2 w-2 rounded-full bg-pink-100/80"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-6 left-5 h-1.5 w-1.5 rotate-45 bg-teal-100/70"
        aria-hidden="true"
      />

      <p
        className={`text-5xl font-extrabold leading-none sm:text-6xl ${variant.className}`}
        aria-hidden="true"
      >
        ?
      </p>

      <p className="mt-4 text-[11px] font-extrabold tracking-[0.18em] text-[#FF4785]/70 sm:text-xs">
        {copy.comingSoonLabel}
      </p>

      <p className="mt-2 text-balance text-[14px] font-semibold leading-snug text-slate-500 sm:text-[15px]">
        {copy.comingSoonDescription}
      </p>
    </article>
  );
}
