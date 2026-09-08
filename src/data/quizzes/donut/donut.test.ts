import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CharacterVisual } from "@/components/character/CharacterVisual";
import { FACE_EXPRESSIONS } from "@/components/character/types";
import { getQuiz, getQuizResultContent } from "@/lib/type-engine/registry";
import { getVisual } from "@/lib/visual/registry";

import {
  DONUT_CATEGORIES,
  DONUT_CHOICE_IDS,
  DONUT_QUESTION_IDS,
  DONUT_RESULT_TYPE_IDS,
} from "./definition";
import { donutQuizEn } from "./en";
import { donutQuizJa } from "./ja";
import { donutResultContentEn } from "./results/en";
import { donutResultContentJa } from "./results/ja";

describe("donut scaffold", () => {
  it("keeps the standard 8-category, 32-question shape", () => {
    expect(donutQuizJa.id).toBe("donut");
    expect(donutQuizEn.id).toBe("donut");
    expect(DONUT_QUESTION_IDS).toHaveLength(32);
    expect(DONUT_CATEGORIES).toHaveLength(8);
    expect(DONUT_CATEGORIES.every((category) => category.length === 4)).toBe(true);
    expect(donutQuizJa.questions).toHaveLength(32);
    expect(donutQuizJa.questions.every(
      (question) => question.choices.map((choice) => choice.id).join(",") === DONUT_CHOICE_IDS.join(","),
    )).toBe(true);
  });

  it("registers the quiz and result content for both locales", () => {
    for (const locale of ["ja", "en"] as const) {
      expect(getQuiz("donut", locale)?.questions).toHaveLength(32);
      expect(getQuizResultContent("donut", locale)).toBeDefined();
    }
  });

  it("registers every localized result visual and renders all face expressions", () => {
    for (const typeId of DONUT_RESULT_TYPE_IDS) {
      const jaVisualKey = donutResultContentJa[typeId]?.visualKey;
      const enVisualKey = donutResultContentEn[typeId]?.visualKey;
      expect(jaVisualKey).toBe(enVisualKey);
      expect(jaVisualKey).toBeTruthy();
      if (!jaVisualKey) throw new Error("Donut visualKey is required.");
      expect(getVisual(jaVisualKey)).toBeDefined();

      for (const expression of FACE_EXPRESSIONS) {
        const markup = renderToStaticMarkup(createElement(CharacterVisual, { visualKey: jaVisualKey, expression }));
        expect(markup).toContain("/characters/donut-");
      }
    }
  });
});
