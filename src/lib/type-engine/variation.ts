import {
  buildVariationHashInput,
  stableHash,
} from "./deterministicHash";
import type { QuizSelection } from "./types";

export const RESULT_VARIATION_IDS = ["a", "b", "c"] as const;

export type ResultVariationId = (typeof RESULT_VARIATION_IDS)[number];

/**
 * Pick a body variation (a/b/c) via deterministic hash.
 * Uses a separate salt from type resolution.
 */
export function pickResultVariationByHash(
  quizId: string,
  resultTypeId: string,
  selections: readonly QuizSelection[],
): ResultVariationId {
  const hashInput = buildVariationHashInput(quizId, resultTypeId, selections);
  const index = stableHash(hashInput) % RESULT_VARIATION_IDS.length;
  return RESULT_VARIATION_IDS[index]!;
}
