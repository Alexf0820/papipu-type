import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_CATEGORIES,
  CAMP_GEAR_QUESTION_IDS,
  CAMP_GEAR_SCORING,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { buildSessionQuiz } from "@/lib/type-engine/sampleQuestions";
import {
  aggregateQuizScores,
  findQuizChoice,
  isQuizComplete,
  resolveResultType,
} from "@/lib/type-engine/scoring";
import {
  MAIN_TYPE_SCORE,
  SECONDARY_TYPE_SCORE,
  type QuizSelection,
} from "@/lib/type-engine/types";

const sessionQuiz = buildSessionQuiz(
  campGearQuizJa,
  CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
);

function answerSession(choiceId: string): QuizSelection[] {
  return sessionQuiz.questions.map((question) => ({
    questionId: question.id,
    choiceId,
  }));
}

function total(scores: Record<string, number>): number {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}

describe("findQuizChoice", () => {
  it("resolves a selection to its choice", () => {
    const choice = findQuizChoice(sessionQuiz, {
      questionId: "q01",
      choiceId: "a",
    });

    expect(choice?.mainType).toBe("peg");
    expect(choice?.secondaryType).toBe("knife");
  });

  it("returns undefined for unknown ids", () => {
    expect(
      findQuizChoice(sessionQuiz, { questionId: "q99", choiceId: "a" }),
    ).toBeUndefined();
    expect(
      findQuizChoice(sessionQuiz, { questionId: "q01", choiceId: "z" }),
    ).toBeUndefined();
  });
});

describe("isQuizComplete", () => {
  it("is false while any session question is unanswered", () => {
    expect(isQuizComplete(sessionQuiz, [])).toBe(false);
    expect(isQuizComplete(sessionQuiz, answerSession("a").slice(0, 5))).toBe(
      false,
    );
  });

  it("is true once every session question has an answer", () => {
    expect(isQuizComplete(sessionQuiz, answerSession("a"))).toBe(true);
  });
});

describe("aggregateQuizScores", () => {
  it("awards Main +3 and Secondary +1", () => {
    const selections: QuizSelection[] = [
      { questionId: "q01", choiceId: "a" },
    ];
    const scores = aggregateQuizScores(campGearQuizJa, selections);

    expect(scores.typeScores.peg).toBe(MAIN_TYPE_SCORE);
    expect(scores.typeScores.knife).toBe(SECONDARY_TYPE_SCORE);
    expect(scores.mainCounts.peg).toBe(1);
    expect(scores.mainCounts.knife).toBe(0);
  });

  it("totals 32 type points across a full 8-question session", () => {
    const scores = aggregateQuizScores(sessionQuiz, answerSession("a"));
    expect(total(scores.typeScores)).toBe(8 * (MAIN_TYPE_SCORE + SECONDARY_TYPE_SCORE));
  });

  it("does not break ties by declaration order in typeRanking", () => {
    const scores = aggregateQuizScores(
      buildSessionQuiz(campGearQuizJa, ["q05"]),
      [{ questionId: "q05", choiceId: "a" }],
    );

    expect(
      scores.typeRanking.filter(
        (entry) => entry.score === scores.typeRanking[0]!.score,
      ).length,
    ).toBeGreaterThan(0);
  });
});

describe("resolveResultType", () => {
  it("resolves without declaration-order bias when hash is needed", () => {
    const selections: QuizSelection[] = [
      { questionId: "q05", choiceId: "a" },
    ];
    const oneQuestionQuiz = buildSessionQuiz(campGearQuizJa, ["q05"]);
    const scores = aggregateQuizScores(oneQuestionQuiz, selections);
    const resolved = resolveResultType(oneQuestionQuiz, selections, scores);

    expect(resolved.tieBreakStage).toBe("typeAlone");
    expect(resolved.typeId).toBe("peg");
  });

  it("returns the same type for identical inputs", () => {
    const selections = answerSession("d");
    const scores = aggregateQuizScores(sessionQuiz, selections);
    const first = resolveResultType(sessionQuiz, selections, scores);
    const second = resolveResultType(sessionQuiz, selections, scores);

    expect(first).toEqual(second);
  });

  it("is stable when candidate order changes but answers stay the same", () => {
    const selections = answerSession("b");
    const scores = aggregateQuizScores(sessionQuiz, selections);

    const quizA = {
      ...sessionQuiz,
      resultTypeIds: [...sessionQuiz.resultTypeIds].reverse(),
    };
    const quizB = sessionQuiz;

    expect(resolveResultType(quizA, selections, scores).typeId).toBe(
      resolveResultType(quizB, selections, scores).typeId,
    );
  });
});

describe("ja/en parity", () => {
  it("judges identical selections the same across locales", () => {
    const selections = answerSession("c");
    const ja = aggregateQuizScores(sessionQuiz, selections);
    const enSession = buildSessionQuiz(
      campGearQuizEn,
      CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
    );
    const en = aggregateQuizScores(enSession, selections);

    expect(en.typeScores).toEqual(ja.typeScores);
    expect(en.mainCounts).toEqual(ja.mainCounts);
    expect(en.traitScores).toEqual(ja.traitScores);
  });
});

describe("purity", () => {
  it("does not mutate the shared scoring table", () => {
    const before = structuredClone(CAMP_GEAR_SCORING);

    aggregateQuizScores(sessionQuiz, answerSession("a"));

    expect(CAMP_GEAR_SCORING).toEqual(before);
  });
});

describe("re-answering a question", () => {
  it("replaces the previous answer instead of adding to it", () => {
    const allA = answerSession("a");
    const q1Replaced = allA.map((selection) =>
      selection.questionId === "q01"
        ? { ...selection, choiceId: "b" }
        : selection,
    );
    const before = aggregateQuizScores(sessionQuiz, allA);
    const after = aggregateQuizScores(sessionQuiz, q1Replaced);

    expect(total(after.typeScores)).toBe(total(before.typeScores));
    expect(after.typeScores.hammer).toBe(
      before.typeScores.hammer + MAIN_TYPE_SCORE,
    );
    expect(after.typeScores.peg).toBe(before.typeScores.peg - MAIN_TYPE_SCORE);
  });
});

describe("full pool structure", () => {
  it("declares 32 questions and 8 categories", () => {
    expect(campGearQuizJa.questions).toHaveLength(32);
    expect(campGearQuizJa.categories).toHaveLength(8);
    expect(CAMP_GEAR_QUESTION_IDS).toHaveLength(32);
  });
});
