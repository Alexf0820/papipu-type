import { describe, expect, it } from "vitest";

import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import {
  CAMP_GEAR_QUESTION_IDS,
  CAMP_GEAR_SCORING,
} from "@/data/quizzes/camp-gear/definition";
import {
  aggregateQuizScores,
  findQuizChoice,
  isQuizComplete,
} from "@/lib/type-engine/scoring";
import type { QuizSelection } from "@/lib/type-engine/types";

const quiz = campGearQuizJa;

function answerAll(choiceId: string): QuizSelection[] {
  return CAMP_GEAR_QUESTION_IDS.map((questionId) => ({
    questionId,
    choiceId,
  }));
}

function total(scores: Record<string, number>): number {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}

describe("findQuizChoice", () => {
  it("resolves a selection to its choice", () => {
    const choice = findQuizChoice(quiz, { questionId: "q1", choiceId: "a" });

    expect(choice?.mainType).toBe("knife");
    expect(choice?.mainScore).toBe(2);
  });

  it("returns undefined for unknown ids", () => {
    expect(
      findQuizChoice(quiz, { questionId: "q99", choiceId: "a" }),
    ).toBeUndefined();
    expect(
      findQuizChoice(quiz, { questionId: "q1", choiceId: "z" }),
    ).toBeUndefined();
  });
});

describe("isQuizComplete", () => {
  it("is false while any question is unanswered", () => {
    expect(isQuizComplete(quiz, [])).toBe(false);
    expect(isQuizComplete(quiz, answerAll("a").slice(0, 5))).toBe(false);
  });

  it("is true once every question has an answer", () => {
    expect(isQuizComplete(quiz, answerAll("a"))).toBe(true);
  });
});

describe("aggregateQuizScores", () => {
  it("starts every type and trait at zero", () => {
    const scores = aggregateQuizScores(quiz, []);

    expect(total(scores.typeScores)).toBe(0);
    expect(total(scores.traitScores)).toBe(0);
    expect(Object.keys(scores.typeScores)).toEqual([...quiz.resultTypeIds]);
    expect(Object.keys(scores.traitScores)).toEqual([...quiz.traitIds]);
  });

  it("awards mainScore to the mainType of each answer", () => {
    const scores = aggregateQuizScores(quiz, answerAll("a"));

    expect(scores.typeScores).toEqual({
      peg: 4,
      tent: 2,
      lantern: 0,
      chair: 0,
      firePit: 2,
      sleepingBag: 0,
      knife: 4,
      hammer: 0,
    });
    expect(total(scores.typeScores)).toBe(12);
  });

  it("awards trait points to the traits of each answer", () => {
    const scores = aggregateQuizScores(quiz, answerAll("a"));

    expect(scores.traitScores).toEqual({
      supportive: 3,
      protective: 2,
      social: 1,
      relaxed: 0,
      passionate: 1,
      peaceful: 0,
      logical: 5,
      action: 0,
    });
    expect(scores.traitRanking[0]).toEqual({ id: "logical", score: 5 });
  });

  it("ignores selections that do not resolve to a choice", () => {
    const withJunk = [
      ...answerAll("a"),
      { questionId: "q1", choiceId: "z" },
      { questionId: "q99", choiceId: "a" },
    ];

    expect(aggregateQuizScores(quiz, withJunk).typeScores).toEqual(
      aggregateQuizScores(quiz, answerAll("a")).typeScores,
    );
  });

  it("breaks ties by declaration order", () => {
    // peg and knife both reach 4 here, and peg is declared first.
    // The Papipu Type tie-break rule itself is not defined yet.
    const ranking = aggregateQuizScores(quiz, answerAll("a")).typeRanking;

    expect(ranking[0]).toEqual({ id: "peg", score: 4 });
    expect(ranking[1]).toEqual({ id: "knife", score: 4 });
  });

  it("sorts rankings from highest to lowest score", () => {
    const { typeRanking, traitRanking } = aggregateQuizScores(
      quiz,
      answerAll("a"),
    );

    for (const ranking of [typeRanking, traitRanking]) {
      for (let index = 1; index < ranking.length; index += 1) {
        expect(ranking[index - 1].score).toBeGreaterThanOrEqual(
          ranking[index].score,
        );
      }
    }
  });
});

describe("re-answering a question", () => {
  const allA = answerAll("a");

  it("replaces the previous answer instead of adding to it", () => {
    const q1Replaced = allA.map((selection, index) =>
      index === 0 ? { ...selection, choiceId: "b" } : selection,
    );
    const before = aggregateQuizScores(quiz, allA);
    const after = aggregateQuizScores(quiz, q1Replaced);

    expect(total(after.typeScores)).toBe(12);
    expect(after.typeScores.knife).toBe(before.typeScores.knife - 2);
    expect(after.typeScores.hammer).toBe(before.typeScores.hammer + 2);
    expect(after.traitScores.logical).toBe(before.traitScores.logical - 2);
    expect(after.traitScores.action).toBe(before.traitScores.action + 2);
  });

  it("double counts only if a question appears twice, which the flow prevents", () => {
    const duplicated = [...allA, { questionId: "q1", choiceId: "b" }];

    expect(total(aggregateQuizScores(quiz, duplicated).typeScores)).toBe(14);
  });
});

describe("purity", () => {
  it("returns identical scores when called repeatedly", () => {
    const selections = answerAll("c");

    expect(aggregateQuizScores(quiz, selections)).toEqual(
      aggregateQuizScores(quiz, selections),
    );
  });

  it("does not mutate the shared scoring table", () => {
    const before = structuredClone(CAMP_GEAR_SCORING);

    aggregateQuizScores(quiz, answerAll("a"));
    aggregateQuizScores(quiz, answerAll("d"));

    expect(CAMP_GEAR_SCORING).toEqual(before);
  });

  it("does not mutate the selections it is given", () => {
    const selections = answerAll("a");
    const before = structuredClone(selections);

    aggregateQuizScores(quiz, selections);

    expect(selections).toEqual(before);
  });
});
