import {
  buildTypeHashInput,
  pickHashedCandidate,
} from "./deterministicHash";
import type { Quiz, QuizSelection } from "./types";
import {
  MAIN_TYPE_SCORE,
  SECONDARY_TYPE_SCORE,
} from "./types";

export type ScoreEntry<TId extends string = string> = {
  id: TId;
  score: number;
};

export type QuizScores<
  TType extends string = string,
  TTrait extends string = string,
> = {
  typeScores: Record<TType, number>;
  /** How many times each type was chosen as Main across the session. */
  mainCounts: Record<TType, number>;
  traitScores: Record<TTrait, number>;
  /** Highest score first. Ties are not broken here. */
  typeRanking: readonly ScoreEntry<TType>[];
  /** Highest score first. Ties are not broken here. */
  traitRanking: readonly ScoreEntry<TTrait>[];
};

export type ResolvedResultType<TType extends string = string> = {
  typeId: TType;
  typeScore: number;
  tieBreakStage:
    | "typeAlone"
    | "mainCount"
    | "trait"
    | "hash";
};

function rankScores<TId extends string>(
  ids: readonly TId[],
  scores: Record<TId, number>,
): ScoreEntry<TId>[] {
  return ids
    .map((id) => ({ id, score: scores[id] }))
    .sort((left, right) => right.score - left.score);
}

function filterTopCandidates<TId extends string>(
  candidates: readonly TId[],
  metric: (id: TId) => number,
): TId[] {
  const max = Math.max(...candidates.map(metric));
  return candidates.filter((id) => metric(id) === max);
}

/**
 * Resolve the winning result type using the 4-stage tie-break:
 * 1. Main×3 + Secondary×1 total
 * 2. Main selection count
 * 3. Corresponding trait score
 * 4. Deterministic hash (questionId-sorted answers, stable candidate order)
 */
export function resolveResultType<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  selections: readonly QuizSelection[],
  scores: QuizScores<TType, TTrait>,
): ResolvedResultType<TType> {
  const topScore = scores.typeRanking[0]?.score ?? 0;
  let candidates = quiz.resultTypeIds.filter(
    (typeId) => scores.typeScores[typeId] === topScore,
  );

  if (candidates.length === 1) {
    const typeId = candidates[0]!;
    return {
      typeId,
      typeScore: scores.typeScores[typeId],
      tieBreakStage: "typeAlone",
    };
  }

  candidates = filterTopCandidates(candidates, (typeId) => scores.mainCounts[typeId]);

  if (candidates.length === 1) {
    const typeId = candidates[0]!;
    return {
      typeId,
      typeScore: scores.typeScores[typeId],
      tieBreakStage: "mainCount",
    };
  }

  candidates = filterTopCandidates(
    candidates,
    (typeId) => scores.traitScores[quiz.typeTraitMap[typeId]],
  );

  if (candidates.length === 1) {
    const typeId = candidates[0]!;
    return {
      typeId,
      typeScore: scores.typeScores[typeId],
      tieBreakStage: "trait",
    };
  }

  const hashInput = buildTypeHashInput(quiz.id, selections);
  const typeId = pickHashedCandidate(candidates, hashInput);

  return {
    typeId,
    typeScore: scores.typeScores[typeId],
    tieBreakStage: "hash",
  };
}

export function findQuizChoice<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  selection: QuizSelection,
) {
  const question = quiz.questions.find(
    (candidate) => candidate.id === selection.questionId,
  );

  return question?.choices.find(
    (candidate) => candidate.id === selection.choiceId,
  );
}

export function isQuizComplete<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  selections: readonly QuizSelection[],
): boolean {
  return quiz.questions.every((question) =>
    selections.some((selection) => selection.questionId === question.id),
  );
}

/**
 * Sum Main (+3) and Secondary (+1) type scores, main counts, and trait scores.
 * Unanswered questions simply contribute nothing.
 */
export function aggregateQuizScores<
  TType extends string,
  TTrait extends string,
>(
  quiz: Quiz<TType, TTrait>,
  selections: readonly QuizSelection[],
): QuizScores<TType, TTrait> {
  const typeScores = Object.fromEntries(
    quiz.resultTypeIds.map((id) => [id, 0]),
  ) as Record<TType, number>;

  const mainCounts = Object.fromEntries(
    quiz.resultTypeIds.map((id) => [id, 0]),
  ) as Record<TType, number>;

  const traitScores = Object.fromEntries(
    quiz.traitIds.map((id) => [id, 0]),
  ) as Record<TTrait, number>;

  for (const selection of selections) {
    const choice = findQuizChoice(quiz, selection);
    if (!choice) {
      continue;
    }

    typeScores[choice.mainType] += MAIN_TYPE_SCORE;
    typeScores[choice.secondaryType] += SECONDARY_TYPE_SCORE;
    mainCounts[choice.mainType] += 1;

    for (const [traitId, score] of Object.entries(choice.traits)) {
      if (typeof score === "number") {
        traitScores[traitId as TTrait] += score;
      }
    }
  }

  return {
    typeScores,
    mainCounts,
    traitScores,
    typeRanking: rankScores(quiz.resultTypeIds, typeScores),
    traitRanking: rankScores(quiz.traitIds, traitScores),
  };
}
