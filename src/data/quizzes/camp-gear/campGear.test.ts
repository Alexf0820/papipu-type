import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_CATEGORIES,
  CAMP_GEAR_CHOICE_IDS,
  CAMP_GEAR_MAX_RESULT_VARIATIONS,
  CAMP_GEAR_QUESTION_IDS,
  CAMP_GEAR_RESULT_TYPE_IDS,
  CAMP_GEAR_TRAIT_IDS,
  CAMP_GEAR_TYPE_TRAIT_MAP,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";
import { buildSessionQuiz } from "@/lib/type-engine/sampleQuestions";
import { aggregateQuizScores } from "@/lib/type-engine/scoring";
import {
  MAIN_TYPE_SCORE,
  SECONDARY_TYPE_SCORE,
} from "@/lib/type-engine/types";

const locales = [
  ["ja", campGearQuizJa],
  ["en", campGearQuizEn],
] as const;

const firstCategorySession = buildSessionQuiz(
  campGearQuizJa,
  CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
);

/** Every possible way to answer one 8-question session: 4^8 = 65536. */
function everySessionAnswerCombination(): { questionId: string; choiceId: string }[][] {
  let combinations: { questionId: string; choiceId: string }[][] = [[]];

  for (const question of firstCategorySession.questions) {
    combinations = combinations.flatMap((partial) =>
      CAMP_GEAR_CHOICE_IDS.map((choiceId) => [
        ...partial,
        { questionId: question.id, choiceId },
      ]),
    );
  }

  return combinations;
}

describe.each(locales)("camp-gear %s structure", (locale, quiz) => {
  it("is registered under its locale", () => {
    expect(getQuiz("camp-gear", locale)).toBe(quiz);
    expect(getQuizLocales("camp-gear")).toContain(locale);
  });

  it("declares the shared ids in the shared order", () => {
    expect(quiz.locale).toBe(locale);
    expect(quiz.questions.map((question) => question.id)).toEqual([
      ...CAMP_GEAR_QUESTION_IDS,
    ]);
    expect(quiz.traitIds).toEqual([...CAMP_GEAR_TRAIT_IDS]);
    expect(quiz.resultTypeIds).toEqual([...CAMP_GEAR_RESULT_TYPE_IDS]);
    expect(quiz.typeTraitMap).toEqual(CAMP_GEAR_TYPE_TRAIT_MAP);
    expect(quiz.maxResultVariations).toBe(CAMP_GEAR_MAX_RESULT_VARIATIONS);
    expect(quiz.categories).toHaveLength(8);
  });

  it("gives every question the shared choices in the shared order", () => {
    for (const question of quiz.questions) {
      expect(question.choices.map((choice) => choice.id)).toEqual([
        ...CAMP_GEAR_CHOICE_IDS,
      ]);
    }
  });

  it("has non-empty text everywhere", () => {
    expect(quiz.title.length).toBeGreaterThan(0);

    for (const question of quiz.questions) {
      expect(question.text.length).toBeGreaterThan(0);

      for (const choice of question.choices) {
        expect(choice.text.length).toBeGreaterThan(0);
      }
    }
  });

  it("assigns main and secondary types with trait points on every choice", () => {
    for (const question of quiz.questions) {
      for (const choice of question.choices) {
        expect(CAMP_GEAR_RESULT_TYPE_IDS).toContain(choice.mainType);
        expect(CAMP_GEAR_RESULT_TYPE_IDS).toContain(choice.secondaryType);

        const traitTotal = Object.values(choice.traits).reduce(
          (sum, score) => sum + (score ?? 0),
          0,
        );
        expect(traitTotal).toBe(2);

        for (const traitId of Object.keys(choice.traits)) {
          expect(CAMP_GEAR_TRAIT_IDS).toContain(traitId);
        }
      }
    }
  });
});

describe("camp-gear ja/en parity", () => {
  it("shares judgement data for every choice", () => {
    campGearQuizJa.questions.forEach((jaQuestion, questionIndex) => {
      const enQuestion = campGearQuizEn.questions[questionIndex];

      jaQuestion.choices.forEach((jaChoice, choiceIndex) => {
        const enChoice = enQuestion.choices[choiceIndex];

        expect({
          id: enChoice.id,
          mainType: enChoice.mainType,
          secondaryType: enChoice.secondaryType,
          traits: enChoice.traits,
        }).toEqual({
          id: jaChoice.id,
          mainType: jaChoice.mainType,
          secondaryType: jaChoice.secondaryType,
          traits: jaChoice.traits,
        });
      });
    });
  });

  it("uses different display text for authored questions and choices", () => {
    expect(campGearQuizEn.title).not.toBe(campGearQuizJa.title);

    for (const questionId of ["q01", "q02", "q03", "q04", "q05", "q06"] as const) {
      const jaQuestion = campGearQuizJa.questions.find(
        (question) => question.id === questionId,
      )!;
      const enQuestion = campGearQuizEn.questions.find(
        (question) => question.id === questionId,
      )!;

      expect(enQuestion.text).not.toBe(jaQuestion.text);

      jaQuestion.choices.forEach((jaChoice, choiceIndex) => {
        expect(enQuestion.choices[choiceIndex]!.text).not.toBe(jaChoice.text);
      });
    }
  });

  it("judges all 65536 session answer combinations identically", () => {
    const combinations = everySessionAnswerCombination();
    expect(combinations).toHaveLength(65536);

    const enSession = buildSessionQuiz(
      campGearQuizEn,
      CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
    );

    for (const selections of combinations) {
      const ja = aggregateQuizScores(firstCategorySession, selections);
      const en = aggregateQuizScores(enSession, selections);

      expect(en).toEqual(ja);
    }
  });

  it("always totals 32 type points across a full 8-question session", () => {
    for (const selections of everySessionAnswerCombination()) {
      const { typeScores } = aggregateQuizScores(
        firstCategorySession,
        selections,
      );
      const sum = Object.values(typeScores).reduce(
        (accumulator, score) => accumulator + score,
        0,
      );

      expect(sum).toBe(8 * (MAIN_TYPE_SCORE + SECONDARY_TYPE_SCORE));
    }
  });
});
