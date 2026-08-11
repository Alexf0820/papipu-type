import {
  getCampGearResultContent,
} from "@/data/quizzes/camp-gear/results";
import type { ResultVariationId } from "@/data/quizzes/camp-gear/results/types";
import type { Locale } from "@/lib/locale";

import {
  aggregateQuizScores,
  resolveResultType,
  type QuizScores,
} from "./scoring";
import type { Quiz, QuizSelection } from "./types";
import { pickResultVariationByHash } from "./variation";

export type ResolvedQuizResult = {
  locale: Locale;
  quizId: string;
  typeId: string;
  typeScore: number;
  variationId: ResultVariationId;
  displayName: string;
  visualKey: string;
  body: string;
  good: {
    typeId: string;
    displayName: string;
    reason: string;
  };
  bad: {
    typeId: string;
    displayName: string;
    reason: string;
  };
  mottos: readonly [string, string, string];
  /** Retained for dev / tst reuse — not shown to end users. */
  debug: {
    selections: readonly QuizSelection[];
    scores: QuizScores;
    tieBreakStage: string;
  };
};

function compatibilityDisplayName(
  locale: Locale,
  typeId: string,
): string {
  const matched =
    getCampGearResultContent(locale)[
      typeId as keyof ReturnType<typeof getCampGearResultContent>
    ];
  return matched.displayName;
}

/**
 * Resolve a completed quiz into display-ready result data.
 * Deterministic for type, variation, and copy. Face / motto randomness is
 * handled separately on the client after this returns.
 */
export function resolveCampGearResult(
  quiz: Quiz,
  selections: readonly QuizSelection[],
): ResolvedQuizResult {
  const scores = aggregateQuizScores(quiz, selections);
  const resolvedType = resolveResultType(quiz, selections, scores);
  const typeId = resolvedType.typeId;
  const typeScore = resolvedType.typeScore;
  const content = getCampGearResultContent(quiz.locale)[
    typeId as keyof ReturnType<typeof getCampGearResultContent>
  ];
  const variationId = pickResultVariationByHash(quiz.id, typeId, selections);

  return {
    locale: quiz.locale,
    quizId: quiz.id,
    typeId,
    typeScore,
    variationId,
    displayName: content.displayName,
    visualKey: content.visualKey,
    body: content.variations[variationId].body,
    good: {
      typeId: content.good.typeId,
      displayName: compatibilityDisplayName(quiz.locale, content.good.typeId),
      reason: content.good.reason,
    },
    bad: {
      typeId: content.bad.typeId,
      displayName: compatibilityDisplayName(quiz.locale, content.bad.typeId),
      reason: content.bad.reason,
    },
    mottos: content.mottos,
    debug: {
      selections,
      scores,
      tieBreakStage: resolvedType.tieBreakStage,
    },
  };
}
