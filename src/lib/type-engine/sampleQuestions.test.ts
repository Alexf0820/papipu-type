import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_CATEGORIES,
  CAMP_GEAR_QUESTION_IDS,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import {
  buildSessionQuiz,
  sampleQuestionIdsFromCategories,
  sampleSessionQuestionIds,
  shuffleIds,
} from "@/lib/type-engine/sampleQuestions";

function pseudoRandom(values: number[]) {
  let index = 0;
  return () => {
    const value = values[index % values.length]!;
    index += 1;
    return value;
  };
}

describe("sampleQuestionIdsFromCategories", () => {
  it("picks one question from each category", () => {
    const random = pseudoRandom([0, 0.25, 0.5, 0.75, 0, 0.25, 0.5, 0.75]);
    const picked = sampleQuestionIdsFromCategories(CAMP_GEAR_CATEGORIES, random);

    expect(picked).toHaveLength(8);
    expect(new Set(picked).size).toBe(8);
    expect(picked[0]).toBe("q01");
    expect(picked[1]).toBe("q06");
    expect(picked[2]).toBe("q11");
    expect(picked[3]).toBe("q16");
    expect(picked[4]).toBe("q17");
    expect(picked[5]).toBe("q22");
    expect(picked[6]).toBe("q27");
    expect(picked[7]).toBe("q32");
  });
});

describe("sampleSessionQuestionIds", () => {
  it("returns 8 unique ids", () => {
    const ids = sampleSessionQuestionIds(CAMP_GEAR_CATEGORIES, () => 0.99);
    expect(ids).toHaveLength(8);
    expect(new Set(ids).size).toBe(8);
  });
});

describe("shuffleIds", () => {
  it("preserves all ids", () => {
    const input = ["q01", "q02", "q03"] as const;
    const random = pseudoRandom([0, 0, 0.5]);
    expect(shuffleIds(input, random).sort()).toEqual([...input].sort());
  });
});

describe("buildSessionQuiz", () => {
  it("builds an 8-question session from the full pool", () => {
    const questionIds = CAMP_GEAR_CATEGORIES.map((category) => category[0]!);
    const session = buildSessionQuiz(campGearQuizJa, questionIds);

    expect(session.questions).toHaveLength(8);
    expect(session.questions.map((question) => question.id)).toEqual(
      questionIds,
    );
    expect(campGearQuizJa.questions).toHaveLength(CAMP_GEAR_QUESTION_IDS.length);
  });
});
