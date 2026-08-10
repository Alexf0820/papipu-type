import type { ResultVariationId } from "@/data/quizzes/camp-gear/results/types";

const VARIATION_ORDER: readonly ResultVariationId[] = ["a", "b", "c"];

/**
 * Pick a body variation from trait scores using per-type trait groups.
 *
 * Each group's score is the sum of its member trait scores. The group with
 * the highest total wins. Ties fall back to declaration order (a → b → c),
 * matching the engine's existing tie-break approach.
 */
export function pickResultVariation<TTrait extends string>(
  traitScores: Record<TTrait, number>,
  groups: Record<ResultVariationId, readonly TTrait[]>,
): ResultVariationId {
  let best: ResultVariationId = "a";
  let bestScore = -1;

  for (const variationId of VARIATION_ORDER) {
    const score = groups[variationId].reduce(
      (sum, traitId) => sum + (traitScores[traitId] ?? 0),
      0,
    );

    if (score > bestScore) {
      bestScore = score;
      best = variationId;
    }
  }

  return best;
}
