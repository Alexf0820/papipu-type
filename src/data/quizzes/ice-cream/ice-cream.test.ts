import { describe, expect, it } from "vitest";

import {
  ICE_CREAM_CATEGORIES,
  ICE_CREAM_CHOICE_IDS,
  ICE_CREAM_QUESTION_IDS,
  ICE_CREAM_RESULT_TYPE_IDS,
} from "./definition";
import { iceCreamQuizEn } from "./en";
import { iceCreamQuizJa } from "./ja";
import { iceCreamResultContentEn } from "./results/en";
import { iceCreamResultContentJa } from "./results/ja";
import { getVisual } from "@/lib/visual/registry";

describe("ice-cream scaffold", () => {
  it("keeps the standard 8-category, 32-question shape", () => {
    expect(iceCreamQuizJa.id).toBe("ice-cream");
    expect(iceCreamQuizEn.id).toBe("ice-cream");
    expect(ICE_CREAM_QUESTION_IDS).toHaveLength(32);
    expect(ICE_CREAM_CATEGORIES).toHaveLength(8);
    expect(ICE_CREAM_CATEGORIES.every((category) => category.length === 4)).toBe(true);
    expect(iceCreamQuizJa.questions).toHaveLength(32);
    expect(iceCreamQuizJa.questions.every(
      (question) => question.choices.map((choice) => choice.id).join(",") === ICE_CREAM_CHOICE_IDS.join(","),
    )).toBe(true);
  });

  it("registers every localized result visual", () => {
    for (const typeId of ICE_CREAM_RESULT_TYPE_IDS) {
      const jaResult = iceCreamResultContentJa[typeId];
      const enResult = iceCreamResultContentEn[typeId];
      expect(jaResult).toBeDefined();
      expect(enResult).toBeDefined();
      const jaVisualKey = jaResult?.visualKey;
      const enVisualKey = enResult?.visualKey;
      expect(jaVisualKey).toBeTruthy();
      expect(enVisualKey).toBeTruthy();
      if (!jaVisualKey || !enVisualKey) throw new Error("Ice Cream visualKey is required.");
      expect(getVisual(jaVisualKey)).toBeDefined();
      expect(getVisual(enVisualKey)).toBeDefined();
    }
  });
});
