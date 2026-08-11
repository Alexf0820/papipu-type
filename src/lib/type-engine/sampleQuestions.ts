import type { Quiz, QuizQuestion } from "./types";

/** Fisher–Yates shuffle (mutates a copy). */
export function shuffleIds<T extends string>(
  ids: readonly T[],
  random: () => number = Math.random,
): T[] {
  const shuffled = [...ids];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex]!,
      shuffled[index]!,
    ];
  }

  return shuffled;
}

/** Draw one question id from each category group. */
export function sampleQuestionIdsFromCategories(
  categories: readonly (readonly string[])[],
  random: () => number = Math.random,
): string[] {
  return categories.map((category) => {
    const index = Math.floor(random() * category.length);
    return category[index]!;
  });
}

/** Sample 8 unique question ids (one per category) and shuffle display order. */
export function sampleSessionQuestionIds(
  categories: readonly (readonly string[])[],
  random: () => number = Math.random,
): string[] {
  const picked = sampleQuestionIdsFromCategories(categories, random);
  return shuffleIds(picked, random);
}

/** Build a session quiz containing only the sampled questions in display order. */
export function buildSessionQuiz<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  questionIds: readonly string[],
): Quiz<TType, TTrait> {
  const pool = new Map(quiz.questions.map((question) => [question.id, question]));

  return {
    ...quiz,
    questions: questionIds.map((questionId) => {
      const question = pool.get(questionId);
      if (!question) {
        throw new Error(`Unknown question id: ${questionId}`);
      }
      return question;
    }),
  };
}

export function sampleSessionQuiz<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  random: () => number = Math.random,
): Quiz<TType, TTrait> {
  if (!quiz.categories || quiz.categories.length === 0) {
    return quiz;
  }

  const questionIds = sampleSessionQuestionIds(quiz.categories, random);
  return buildSessionQuiz(quiz, questionIds);
}

export function getSessionQuestions<TType extends string, TTrait extends string>(
  quiz: Quiz<TType, TTrait>,
  questionIds: readonly string[],
): readonly QuizQuestion<TType, TTrait>[] {
  return buildSessionQuiz(quiz, questionIds).questions;
}
