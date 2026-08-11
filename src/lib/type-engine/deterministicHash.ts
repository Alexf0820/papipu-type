import type { QuizSelection } from "./types";

/** FNV-1a 32-bit hash — stable across runs and platforms. */
export function stableHash(input: string): number {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

/** questionId-sorted canonical answer string (display order excluded). */
export function buildCanonicalAnswers(
  selections: readonly QuizSelection[],
): string {
  return [...selections]
    .sort((left, right) => left.questionId.localeCompare(right.questionId))
    .map((selection) => `${selection.questionId}:${selection.choiceId}`)
    .join("|");
}

export function buildTypeHashInput(
  quizId: string,
  selections: readonly QuizSelection[],
): string {
  return `type|${quizId}|${buildCanonicalAnswers(selections)}`;
}

export function buildVariationHashInput(
  quizId: string,
  resultTypeId: string,
  selections: readonly QuizSelection[],
): string {
  return `variation|${quizId}|${resultTypeId}|${buildCanonicalAnswers(selections)}`;
}

/** Pick one id from candidates using a salted hash. Candidates must be pre-sorted. */
export function pickHashedCandidate<T extends string>(
  candidates: readonly T[],
  hashInput: string,
): T {
  if (candidates.length === 0) {
    throw new Error("pickHashedCandidate requires at least one candidate");
  }

  const sorted = [...candidates].sort((left, right) => left.localeCompare(right));
  const index = stableHash(hashInput) % sorted.length;
  return sorted[index]!;
}
