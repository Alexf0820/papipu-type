import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_CHOICE_IDS,
  CAMP_GEAR_MAX_RESULT_VARIATIONS,
  CAMP_GEAR_QUESTION_IDS,
  CAMP_GEAR_RESULT_TYPE_IDS,
  CAMP_GEAR_TRAIT_IDS,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";
import { aggregateQuizScores } from "@/lib/type-engine/scoring";
import type { QuizSelection } from "@/lib/type-engine/types";

const locales = [
  ["ja", campGearQuizJa],
  ["en", campGearQuizEn],
] as const;

/** Every possible way to answer the quiz: 4 choices ^ 6 questions = 4096. */
function everyAnswerCombination(): QuizSelection[][] {
  let combinations: QuizSelection[][] = [[]];

  for (const questionId of CAMP_GEAR_QUESTION_IDS) {
    combinations = combinations.flatMap((partial) =>
      CAMP_GEAR_CHOICE_IDS.map((choiceId) => [
        ...partial,
        { questionId, choiceId },
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
    expect(quiz.maxResultVariations).toBe(CAMP_GEAR_MAX_RESULT_VARIATIONS);
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

  it("scores every choice at mainScore 2 with at least one trait point", () => {
    for (const question of quiz.questions) {
      for (const choice of question.choices) {
        expect(choice.mainScore).toBe(2);
        expect(CAMP_GEAR_RESULT_TYPE_IDS).toContain(choice.mainType);

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
          mainScore: enChoice.mainScore,
          traits: enChoice.traits,
        }).toEqual({
          id: jaChoice.id,
          mainType: jaChoice.mainType,
          mainScore: jaChoice.mainScore,
          traits: jaChoice.traits,
        });
      });
    });
  });

  it("uses different display text for the title and every choice", () => {
    expect(campGearQuizEn.title).not.toBe(campGearQuizJa.title);

    campGearQuizJa.questions.forEach((jaQuestion, questionIndex) => {
      const enQuestion = campGearQuizEn.questions[questionIndex];

      expect(enQuestion.text).not.toBe(jaQuestion.text);

      jaQuestion.choices.forEach((jaChoice, choiceIndex) => {
        expect(enQuestion.choices[choiceIndex].text).not.toBe(jaChoice.text);
      });
    });
  });

  it("judges all 4096 answer combinations identically", () => {
    const combinations = everyAnswerCombination();
    expect(combinations).toHaveLength(4096);

    for (const selections of combinations) {
      const ja = aggregateQuizScores(campGearQuizJa, selections);
      const en = aggregateQuizScores(campGearQuizEn, selections);

      expect(en).toEqual(ja);
    }
  });

  it("always totals 12 type points across a full run", () => {
    for (const selections of everyAnswerCombination()) {
      const { typeScores } = aggregateQuizScores(campGearQuizJa, selections);
      const sum = Object.values(typeScores).reduce(
        (accumulator, score) => accumulator + score,
        0,
      );

      expect(sum).toBe(12);
    }
  });
});
