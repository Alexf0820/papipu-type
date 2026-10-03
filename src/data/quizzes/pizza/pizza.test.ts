import { describe, expect, it } from "vitest";

import {
  PIZZA_CATEGORIES,
  PIZZA_CHOICE_IDS,
  PIZZA_QUESTION_IDS,
} from "./definition";
import { pizzaQuizEn } from "./en";
import { pizzaQuizJa } from "./ja";

describe("pizza scaffold", () => {
  it("keeps the standard 8-category, 32-question shape", () => {
    expect(pizzaQuizJa.id).toBe("pizza");
    expect(pizzaQuizEn.id).toBe("pizza");
    expect(PIZZA_QUESTION_IDS).toHaveLength(32);
    expect(PIZZA_CATEGORIES).toHaveLength(8);
    expect(PIZZA_CATEGORIES.every((category) => category.length === 4)).toBe(true);
    expect(pizzaQuizJa.questions).toHaveLength(32);
    expect(pizzaQuizJa.questions.every(
      (question) => question.choices.map((choice) => choice.id).join(",") === PIZZA_CHOICE_IDS.join(","),
    )).toBe(true);
  });
});
