import { describe, expect, it } from "vitest";

import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { HOME_COPY, HOME_QUIZZES } from "@/lib/home/content";
import { getQuiz } from "@/lib/type-engine/registry";

describe("home page content", () => {
  it("lists camp-gear with locale copy for both languages", () => {
    expect(HOME_QUIZZES).toHaveLength(1);
    expect(HOME_QUIZZES[0]?.id).toBe(CAMP_GEAR_QUIZ_ID);

    for (const locale of ["ja", "en"] as const) {
      const quiz = getQuiz(CAMP_GEAR_QUIZ_ID, locale);
      expect(quiz?.title).toBeTruthy();
      expect(HOME_QUIZZES[0]?.description[locale]).toBeTruthy();
      expect(HOME_COPY[locale].heroTitle).toBeTruthy();
      expect(HOME_COPY[locale].heroMainCta).toBeTruthy();
      expect(HOME_COPY[locale].takeQuiz).toBeTruthy();
      expect(HOME_COPY[locale].comingSoonLabel).toBeTruthy();
      expect(HOME_COPY[locale].comingSoonDescription).toBeTruthy();
    }
  });
});
