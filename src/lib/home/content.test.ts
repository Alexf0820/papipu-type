import { describe, expect, it } from "vitest";

import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { SPAGHETTI_QUIZ_ID } from "@/data/quizzes/spaghetti/definition";
import { HOME_COPY, HOME_QUIZZES } from "@/lib/home/content";
import { getQuiz } from "@/lib/type-engine/registry";

describe("home page content", () => {
  it("lists Camp Gear and Spaghetti with locale copy for both languages", () => {
    expect(HOME_QUIZZES).toHaveLength(2);
    expect(HOME_QUIZZES[0]?.id).toBe(CAMP_GEAR_QUIZ_ID);
    expect(HOME_QUIZZES[1]?.id).toBe(SPAGHETTI_QUIZ_ID);

    for (const locale of ["ja", "en"] as const) {
      const quiz = getQuiz(CAMP_GEAR_QUIZ_ID, locale);
      expect(quiz?.title).toBeTruthy();
      expect(HOME_QUIZZES[0]?.description[locale]).toBeTruthy();
      expect(HOME_QUIZZES[0]?.cardTitle[locale].line1).toBeTruthy();
      expect(HOME_QUIZZES[0]?.cardTitle[locale].line2).toBeTruthy();
      expect(HOME_COPY[locale].heroTitle).toBeTruthy();
      expect(HOME_COPY[locale].heroMainCta).toBeTruthy();
      expect(HOME_COPY[locale].takeQuiz).toBeTruthy();
      expect(HOME_COPY[locale].comingSoonLabel).toBeTruthy();
      expect(HOME_COPY[locale].comingSoonDescription).toBeTruthy();
    }
  });

  it("uses the approved Spaghetti card copy and accessible labels", () => {
    const spaghetti = HOME_QUIZZES.find((entry) => entry.id === SPAGHETTI_QUIZ_ID);
    expect(spaghetti?.cardTitle.ja).toEqual({ line1: "スパゲッティ", line2: "タイプ診断" });
    expect(spaghetti?.cardTitle.en).toEqual({ line1: "Spaghetti", line2: "Type" });
    expect(spaghetti?.description.ja).toBe("もしあなたがスパゲッティだったら？");
    expect(spaghetti?.description.en).toBe("What if you were spaghetti?");
    expect(spaghetti?.accessibleLabel).toEqual({
      ja: "スパゲッティタイプ診断を始める",
      en: "Start the Spaghetti Type quiz",
    });
  });
});
