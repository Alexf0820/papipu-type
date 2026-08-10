"use client";

import { useEffect, useState } from "react";

import { CharacterVisual } from "@/components/character/CharacterVisual";
import { AdSlot } from "@/components/AdSlot";
import type { FaceExpression } from "@/components/character/types";
import { trackQuizResult } from "@/lib/analytics/events";
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

import { ResultActions } from "./ResultActions";

type QuizResultProps = {
  result: ResolvedQuizResult;
  quizTitle: string;
  onRetry: () => void;
  attemptId: number;
};

type Presentation = {
  face: FaceExpression;
  mottoIndex: 0 | 1 | 2;
};

const RESULT_SECTION_LABELS = {
  ja: {
    typeProfile: "あなたのタイプ",
    compatibility: "相性チェック",
  },
  en: {
    typeProfile: "YOUR TYPE",
    compatibility: "COMPATIBILITY",
  },
} as const;

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

function BodyParagraphs({
  text,
  variant = "default",
}: {
  text: string;
  variant?: "default" | "profile";
}) {
  const paragraphClass =
    variant === "profile"
      ? "whitespace-pre-line text-[17px] leading-[1.85] text-slate-700 sm:text-base sm:leading-[1.9]"
      : "whitespace-pre-line text-[17px] leading-relaxed text-slate-700 sm:text-base";

  return (
    <>
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph} className={paragraphClass}>
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
    <article className="flex flex-col rounded-2xl border border-pink-100 bg-white px-4 py-5 shadow-[0_1px_3px_rgba(255,71,133,0.06)] sm:px-5 sm:py-5">
      <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#FF4785]/75 sm:text-[11px]">
        {heading}
      </p>
      <p className="mt-2.5 text-[21px] font-extrabold leading-snug text-slate-800 sm:text-xl">
        {typeName}
      </p>
      <p className="mt-3 text-[17px] leading-relaxed text-slate-500 sm:mt-2.5 sm:text-sm">
        <span className="font-medium text-slate-500">
          {reasonLabel}
          {reasonLabel === "理由" ? "：" : ": "}
        </span>
        <span className="whitespace-pre-line">{reason}</span>
      </p>
    </article>
  );
}

function QuizResultView({
  result,
  quizTitle,
  onRetry,
  attemptId,
}: QuizResultProps) {
  const labels = UI_LABELS[result.locale];
  const [presentation] = useState<Presentation>(() => ({
    face: pickRandomFace(),
    mottoIndex: pickRandomMottoIndex(),
  }));
  const motto = result.mottos[presentation.mottoIndex];
  const { intro, profileBody } = splitBodyForHero(result.body);
  const sectionLabels = RESULT_SECTION_LABELS[result.locale];

  useEffect(() => {
    trackQuizResult(
      {
        locale: result.locale,
        quiz_id: result.quizId,
        result_type: result.typeId,
        variation_id: result.variationId,
      },
      `${attemptId}:${resultPresentationKey(result)}`,
    );
  }, [attemptId, result]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ① Result hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-b from-pink-50/60 via-pink-50/30 to-white px-4 py-7 ring-1 ring-pink-100/70 shadow-sm sm:px-6 sm:py-9">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full bg-pink-100/80 px-3.5 py-1 text-xs font-extrabold tracking-[0.22em] text-[#FF4785] sm:text-xs">
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
            <p className="mt-5 max-w-lg whitespace-pre-line text-left text-[17px] leading-relaxed text-slate-600 sm:mt-6 sm:text-center sm:text-base">
              {intro}
            </p>
          ) : null}
        </div>
      </section>

      {/* ② Type profile */}
      <section className="rounded-3xl border border-pink-100 bg-white px-5 py-6 shadow-[0_1px_4px_rgba(255,71,133,0.05)] sm:px-6 sm:py-7">
        <p className="mb-4 text-[17px] font-extrabold tracking-[0.16em] text-[#FF4785] sm:mb-5 sm:text-xs">
          {sectionLabels.typeProfile}
        </p>
        <div className="space-y-4 sm:space-y-5">
          <BodyParagraphs
            text={intro ? profileBody : result.body}
            variant="profile"
          />
        </div>
      </section>

      {/* ③ Compatibility */}
      <section className="space-y-3.5 sm:space-y-4">
        <h3 className="text-center text-[17px] font-extrabold tracking-[0.14em] text-slate-500 sm:text-xs">
          {sectionLabels.compatibility}
        </h3>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
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
        </div>
      </section>

      {/* ④ Motto */}
      <section className="rounded-3xl border border-pink-100/80 bg-pink-50/55 px-5 py-9 text-center shadow-[0_1px_4px_rgba(255,71,133,0.06)] sm:px-8 sm:py-11">
        <p className="text-sm font-extrabold tracking-[0.16em] text-[#FF4785] sm:text-sm">
          {labels.mottoHeading}
        </p>
        <p className="mx-auto mt-5 max-w-xl text-balance text-[1.625rem] font-extrabold leading-snug text-slate-800 sm:mt-6 sm:text-3xl">
          {motto}
        </p>
      </section>

      <div className="pt-6 sm:pt-8">
        <ResultActions
          locale={result.locale}
          displayName={result.displayName}
          quizTitle={quizTitle}
          quizId={result.quizId}
          resultType={result.typeId}
          onRetry={onRetry}
        />
      </div>

      <div className="mt-8 sm:mt-10">
        <AdSlot placement="result" locale={result.locale} />
      </div>
    </div>
  );
}

/** Remounts when the resolved result changes so face / motto randomise once. */
export function QuizResult({
  result,
  quizTitle,
  onRetry,
  attemptId,
}: QuizResultProps) {
  return (
    <QuizResultView
      key={`${resultPresentationKey(result)}:${attemptId}`}
      result={result}
      quizTitle={quizTitle}
      onRetry={onRetry}
      attemptId={attemptId}
    />
  );
}
