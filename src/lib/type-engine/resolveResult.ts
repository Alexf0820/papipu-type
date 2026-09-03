import {
  getCampGearResultContent,
} from "@/data/quizzes/camp-gear/results";
import type { Locale } from "@/lib/locale";

import {
  aggregateQuizScores,
  resolveResultType,
  type QuizScores,
} from "./scoring";
import type { Quiz, QuizSelection } from "./types";
import {
  pickResultVariationByHash,
  type ResultVariationId,
} from "./variation";

export type QuizResultContent = Record<
  string,
  {
    displayName: string;
    /** Omitted until a quiz has its Phase 3 character visual. */
    visualKey?: string;
    variations: Record<ResultVariationId, { body: string }>;
    good: { typeId: string; reason: string };
    bad: { typeId: string; reason: string };
    mottos: readonly [string, string, string];
  }
>;

export type ResolvedQuizResult = {
  locale: Locale;
  quizId: string;
  typeId: string;
  typeScore: number;
  variationId: ResultVariationId;
  displayName: string;
  visualKey?: string;
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

/**
 * Resolve a completed quiz into display-ready result data using its registered
 * locale content. Diagnosis rules remain entirely in the shared engine.
 * Deterministic for type, variation, and copy. Face / motto randomness is
 * handled separately on the client after this returns.
 */
export function resolveQuizResult(
  quiz: Quiz,
  selections: readonly QuizSelection[],
  resultContent: QuizResultContent,
): ResolvedQuizResult {
  const scores = aggregateQuizScores(quiz, selections);
  const resolvedType = resolveResultType(quiz, selections, scores);
  const typeId = resolvedType.typeId;
  const typeScore = resolvedType.typeScore;
  const content = resultContent[typeId];
  if (!content) throw new Error(`Missing result content for ${quiz.id}:${typeId}`);
  const variationId = pickResultVariationByHash(quiz.id, typeId, selections);

  const compatibilityDisplayName = (compatibilityTypeId: string) => {
    const matched = resultContent[compatibilityTypeId];
    if (!matched) throw new Error(`Missing compatibility content for ${quiz.id}:${compatibilityTypeId}`);
    return matched.displayName;
  };

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
      displayName: compatibilityDisplayName(content.good.typeId),
      reason: content.good.reason,
    },
    bad: {
      typeId: content.bad.typeId,
      displayName: compatibilityDisplayName(content.bad.typeId),
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

/** Backward-compatible camp-gear entry point retained for existing callers. */
export function resolveCampGearResult(
  quiz: Quiz,
  selections: readonly QuizSelection[],
): ResolvedQuizResult {
  return resolveQuizResult(
    quiz,
    selections,
    getCampGearResultContent(quiz.locale),
  );
}
