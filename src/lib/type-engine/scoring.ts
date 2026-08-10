import type { Quiz, QuizChoice, QuizSelection } from "./types";

export type ScoreEntry<TId extends string = string> = {
  id: TId;
  score: number;
};

export type QuizScores<
  TType extends string = string,
  TTrait extends string = string,
> = {
  typeScores: Record<TType, number>;
  traitScores: Record<TTrait, number>;
  /**
   * Highest score first. Equal scores keep `quiz.resultTypeIds` order —
   * the tie-break rule for Papipu Type is not defined yet.
   */
  typeRanking: readonly ScoreEntry<TType>[];
  /** Highest score first. Equal scores keep `quiz.traitIds` order. */
  traitRanking: readonly ScoreEntry<TTrait>[];
};

export function findQuizChoice<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  selection: QuizSelection,
): QuizChoice<TType, TTrait> | undefined {
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

function rankScores<TId extends string>(
  ids: readonly TId[],
  scores: Record<TId, number>,
): ScoreEntry<TId>[] {
  return ids
    .map((id, index) => ({ id, score: scores[id], index }))
    .sort((left, right) =>
      right.score === left.score
        ? left.index - right.index
        : right.score - left.score,
    )
    .map(({ id, score }) => ({ id, score }));
}

/**
 * Sum main type scores and trait scores across the given selections.
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

  const traitScores = Object.fromEntries(
    quiz.traitIds.map((id) => [id, 0]),
  ) as Record<TTrait, number>;

  for (const selection of selections) {
    const choice = findQuizChoice(quiz, selection);
    if (!choice) {
      continue;
    }

    typeScores[choice.mainType] += choice.mainScore;

    for (const [traitId, score] of Object.entries(choice.traits)) {
      if (typeof score === "number") {
        traitScores[traitId as TTrait] += score;
      }
    }
  }

  return {
    typeScores,
    traitScores,
    typeRanking: rankScores(quiz.resultTypeIds, typeScores),
    traitRanking: rankScores(quiz.traitIds, traitScores),
  };
}
