import { describe, expect, it } from "vitest";

import { CAMP_GEAR_TRAIT_IDS } from "@/data/quizzes/camp-gear/definition";
import { CAMP_GEAR_VARIATION_RULES } from "@/data/quizzes/camp-gear/results";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { aggregateQuizScores } from "@/lib/type-engine/scoring";
import { pickResultVariation } from "@/lib/type-engine/variation";

function traitScores(
  overrides: Partial<Record<(typeof CAMP_GEAR_TRAIT_IDS)[number], number>>,
) {
  return Object.fromEntries(
    CAMP_GEAR_TRAIT_IDS.map((id) => [id, overrides[id] ?? 0]),
  ) as Record<(typeof CAMP_GEAR_TRAIT_IDS)[number], number>;
}

describe("pickResultVariation", () => {
  it("picks variation a when its trait group has the highest total", () => {
    const scores = traitScores({
      supportive: 3,
      protective: 2,
      action: 1,
    });

    expect(
      pickResultVariation(scores, CAMP_GEAR_VARIATION_RULES.peg),
    ).toBe("a");
  });

  it("picks variation b when its trait group wins", () => {
    const scores = traitScores({
      action: 4,
      passionate: 2,
      logical: 1,
    });

    expect(
      pickResultVariation(scores, CAMP_GEAR_VARIATION_RULES.peg),
    ).toBe("b");
  });

  it("picks variation c when its trait group wins", () => {
    const scores = traitScores({
      logical: 3,
      peaceful: 2,
      relaxed: 1,
    });

    expect(
      pickResultVariation(scores, CAMP_GEAR_VARIATION_RULES.peg),
    ).toBe("c");
  });

  it("breaks ties by declaration order (a before b before c)", () => {
    const scores = traitScores({
      supportive: 2,
      action: 2,
      logical: 2,
    });

    expect(
      pickResultVariation(scores, CAMP_GEAR_VARIATION_RULES.peg),
    ).toBe("a");
  });

  it("defaults to a when every trait score is zero", () => {
    expect(
      pickResultVariation(traitScores({}), CAMP_GEAR_VARIATION_RULES.chair),
    ).toBe("a");
  });
});

describe("pickResultVariation per type", () => {
  it("uses knife variation a when logical dominates", () => {
    expect(
      pickResultVariation(
        traitScores({ logical: 5 }),
        CAMP_GEAR_VARIATION_RULES.knife,
      ),
    ).toBe("a");
  });

  it("uses hammer variation a when action dominates", () => {
    expect(
      pickResultVariation(
        traitScores({ action: 4 }),
        CAMP_GEAR_VARIATION_RULES.hammer,
      ),
    ).toBe("a");
  });

  it("uses chair variation a when relaxed dominates", () => {
    expect(
      pickResultVariation(
        traitScores({ relaxed: 3 }),
        CAMP_GEAR_VARIATION_RULES.chair,
      ),
    ).toBe("a");
  });
});

describe("pickResultVariation from quiz scores", () => {
  it("picks the same variation for the same answers every time", () => {
    const selections = campGearQuizJa.questions.map((question) => ({
      questionId: question.id,
      choiceId: "a" as const,
    }));

    const scores = aggregateQuizScores(campGearQuizJa, selections);
    const first = pickResultVariation(
      scores.traitScores,
      CAMP_GEAR_VARIATION_RULES.peg,
    );
    const second = pickResultVariation(
      scores.traitScores,
      CAMP_GEAR_VARIATION_RULES.peg,
    );

    expect(first).toBe(second);
  });
});
