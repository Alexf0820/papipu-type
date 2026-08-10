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
    <section className="space-y-2 rounded-2xl bg-white px-5 py-4 ring-1 ring-pink-100">
      <h3 className="text-sm font-extrabold tracking-wide text-[#FF4785]">
        {heading}
      </h3>
      <p className="text-base font-bold text-slate-800">{typeName}</p>
      <p className="text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-slate-700">
          {reasonLabel}
          {reasonLabel === "理由" ? "：" : ": "}
        </span>
        <span className="whitespace-pre-line">{reason}</span>
      </p>
    </section>
  );
}

function QuizResultView({ result }: QuizResultProps) {
  const labels = UI_LABELS[result.locale];
  const [presentation] = useState<Presentation>(() => ({
    face: pickRandomFace(),
    mottoIndex: pickRandomMottoIndex(),
  }));
  const motto = result.mottos[presentation.mottoIndex];

  return (
    <section className="space-y-6">
      <h2 className="text-center text-2xl font-extrabold leading-snug text-slate-800 sm:text-3xl">
        {resultTypeTitle(result.locale, result.displayName)}
      </h2>

      <CharacterVisual
        visualKey={result.visualKey}
        expression={presentation.face}
      />

      <div className="space-y-4">
        <BodyParagraphs text={result.body} />
      </div>

      <CompatibilityBlock
        heading={labels.compatibilityGood}
        typeName={compatibilityTypeLabel(result.locale, result.good.displayName)}
        reasonLabel={labels.compatibilityReason}
        reason={result.good.reason}
      />

      <CompatibilityBlock
        heading={labels.compatibilityBad}
        typeName={compatibilityTypeLabel(result.locale, result.bad.displayName)}
        reasonLabel={labels.compatibilityReason}
        reason={result.bad.reason}
      />

      <section className="space-y-3 pt-2 text-center">
        <h3 className="text-lg font-extrabold tracking-wide text-[#FF4785] sm:text-xl">
          {labels.mottoHeading}
        </h3>
        <p className="text-2xl font-extrabold leading-snug text-slate-800 sm:text-3xl">
          {motto}
        </p>
      </section>
    </section>
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
