import type { ResultVariationId } from "@/data/quizzes/camp-gear/results/types";

import {
  buildVariationHashInput,
  stableHash,
} from "./deterministicHash";
import type { QuizSelection } from "./types";

const VARIATION_IDS: readonly ResultVariationId[] = ["a", "b", "c"];

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
  const index = stableHash(hashInput) % VARIATION_IDS.length;
  return VARIATION_IDS[index]!;
}
