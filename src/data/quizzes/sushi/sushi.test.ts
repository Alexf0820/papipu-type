import { describe, expect, it } from "vitest";

import {
  SUSHI_CATEGORIES,
  SUSHI_CHOICE_IDS,
  SUSHI_QUESTION_IDS,
} from "./definition";
import { sushiQuizEn } from "./en";
import { sushiQuizJa } from "./ja";

describe("sushi scaffold", () => {
  it("keeps the standard 8-category, 32-question shape", () => {
    expect(sushiQuizJa.id).toBe("sushi");
    expect(sushiQuizEn.id).toBe("sushi");
    expect(SUSHI_QUESTION_IDS).toHaveLength(32);
    expect(SUSHI_CATEGORIES).toHaveLength(8);
    expect(SUSHI_CATEGORIES.every((category) => category.length === 4)).toBe(true);
    expect(sushiQuizJa.questions).toHaveLength(32);
    expect(sushiQuizJa.questions.every(
      (question) => question.choices.map((choice) => choice.id).join(",") === SUSHI_CHOICE_IDS.join(","),
    )).toBe(true);
  });
});
