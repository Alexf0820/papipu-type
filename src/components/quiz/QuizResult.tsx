"use client";

import { useState } from "react";

import { CharacterVisual } from "@/components/character/CharacterVisual";
import type { FaceExpression } from "@/components/character/types";
import {
  compatibilityTypeLabel,
  resultTypeTitle,
  UI_LABELS,
} from "@/lib/brand/labels";
import type { ResolvedQuizResult } from "@/lib/type-engine/resolveResult";
import {
  pickRandomFace,
  pickRandomMottoIndex,
  resultPresentationKey,
} from "@/lib/result/presentation";

type QuizResultProps = {
  result: ResolvedQuizResult;
};

type Presentation = {
  face: FaceExpression;
  mottoIndex: 0 | 1 | 2;
};

function splitBodyForHero(body: string): {
  intro: string | null;
  profileBody: string;
} {
  const paragraphs = body.split("\n\n");

  if (paragraphs.length <= 1) {
    return { intro: null, profileBody: body };
  }

  return {
    intro: paragraphs[0],
    profileBody: paragraphs.slice(1).join("\n\n"),
  };
}

function BodyParagraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph) => (
        <p
          key={paragraph}
          className="whitespace-pre-line text-[15px] leading-relaxed text-slate-700 sm:text-base"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

function CompatibilityBlock({
  heading,
  typeName,
  reasonLabel,
  reason,
}: {
  heading: string;
  typeName: string;
  reasonLabel: string;
  reason: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-pink-100/90 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5">
      <h3 className="text-xs font-extrabold tracking-[0.12em] text-[#FF4785] sm:text-sm">
        {heading}
      </h3>
      <p className="mt-2 text-base font-bold text-slate-800 sm:text-lg">
        {typeName}
      </p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-slate-700">
          {reasonLabel}
          {reasonLabel === "理由" ? "：" : ": "}
        </span>
        <span className="whitespace-pre-line">{reason}</span>
      </p>
    </article>
  );
}

function QuizResultView({ result }: QuizResultProps) {
  const labels = UI_LABELS[result.locale];
  const [presentation] = useState<Presentation>(() => ({
    face: pickRandomFace(),
    mottoIndex: pickRandomMottoIndex(),
  }));
  const motto = result.mottos[presentation.mottoIndex];
  const { intro, profileBody } = splitBodyForHero(result.body);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ① Result hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-b from-pink-50/60 via-pink-50/30 to-white px-4 py-7 ring-1 ring-pink-100/70 shadow-sm sm:px-6 sm:py-9">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full bg-pink-100/80 px-3.5 py-1 text-[11px] font-extrabold tracking-[0.22em] text-[#FF4785] sm:text-xs">
            RESULT
          </span>

          <h2 className="max-w-xl text-balance text-[1.75rem] font-extrabold leading-tight text-slate-800 sm:text-4xl">
            {resultTypeTitle(result.locale, result.displayName)}
          </h2>

          <div className="mt-6 w-full max-w-[340px] sm:mt-7 sm:max-w-[380px]">
            <div className="mx-auto rounded-[1.75rem] bg-[radial-gradient(ellipse_96%_94%_at_50%_44%,_#ffffff_0%,_#ffffff_50%,_rgb(253_242_248_/_0)_100%)] px-3 py-3 sm:px-4 sm:py-4">
              <CharacterVisual
                visualKey={result.visualKey}
                expression={presentation.face}
                className="relative max-w-[300px] sm:max-w-[340px]"
              />
            </div>
          </div>

          {intro ? (
            <p className="mt-5 max-w-lg whitespace-pre-line text-[15px] leading-relaxed text-slate-600 sm:mt-6 sm:text-base">
              {intro}
            </p>
          ) : null}
        </div>
      </section>

      {/* ② Type profile */}
      <section className="space-y-4 rounded-3xl bg-white px-5 py-6 ring-1 ring-pink-100/70 shadow-sm sm:px-6 sm:py-7">
        <BodyParagraphs text={intro ? profileBody : result.body} />
      </section>

      {/* ③ Compatibility */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CompatibilityBlock
          heading={labels.compatibilityGood}
          typeName={compatibilityTypeLabel(
            result.locale,
            result.good.displayName,
          )}
          reasonLabel={labels.compatibilityReason}
          reason={result.good.reason}
        />

        <CompatibilityBlock
          heading={labels.compatibilityBad}
          typeName={compatibilityTypeLabel(
            result.locale,
            result.bad.displayName,
          )}
          reasonLabel={labels.compatibilityReason}
          reason={result.bad.reason}
        />
      </section>

      {/* ④ Motto */}
      <section className="rounded-3xl bg-gradient-to-b from-pink-50/70 via-pink-50/40 to-amber-50/30 px-5 py-8 text-center ring-1 ring-pink-100/70 shadow-sm sm:px-8 sm:py-10">
        <h3 className="text-sm font-extrabold tracking-[0.16em] text-[#FF4785] sm:text-base">
          {labels.mottoHeading}
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-balance text-2xl font-extrabold leading-snug text-slate-800 sm:mt-5 sm:text-3xl">
          {motto}
        </p>
      </section>
    </div>
  );
}

/** Remounts when the resolved result changes so face / motto randomise once. */
export function QuizResult({ result }: QuizResultProps) {
  return (
    <QuizResultView
      key={resultPresentationKey(result)}
      result={result}
    />
  );
}
