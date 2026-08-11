import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_CATEGORIES,
  CAMP_GEAR_CHOICE_IDS,
  CAMP_GEAR_RESULT_TYPE_IDS,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { getCampGearResultContent } from "@/data/quizzes/camp-gear/results";
import { FACE_EXPRESSIONS } from "@/components/character/types";
import { getVisual, isVisualKey } from "@/lib/visual/registry";
import { buildSessionQuiz } from "@/lib/type-engine/sampleQuestions";
import { resolveCampGearResult } from "@/lib/type-engine/resolveResult";
import type { QuizSelection } from "@/lib/type-engine/types";

function everySessionAnswerCombination(
  questionIds: readonly string[],
): QuizSelection[][] {
  let combinations: QuizSelection[][] = [[]];
  const quiz = buildSessionQuiz(campGearQuizJa, questionIds);

  for (const question of quiz.questions) {
    combinations = combinations.flatMap((partial) =>
      CAMP_GEAR_CHOICE_IDS.map((choiceId) => [
        ...partial,
        { questionId: question.id, choiceId },
      ]),
    );
  }

  return combinations;
}

describe("Phase 2 result coverage", () => {
  const sessionIds = CAMP_GEAR_CATEGORIES.map((category) => category[0]!);
  const sessionQuiz = buildSessionQuiz(campGearQuizJa, sessionIds);

  it("can resolve every result type from at least one answer path", () => {
    const seen = new Set<string>();

    for (const selections of everySessionAnswerCombination(sessionIds)) {
      seen.add(resolveCampGearResult(sessionQuiz, selections).typeId);
    }

    expect([...seen].sort()).toEqual([...CAMP_GEAR_RESULT_TYPE_IDS].sort());
  });

  it("registers a visual for every result type visualKey", () => {
    for (const typeId of CAMP_GEAR_RESULT_TYPE_IDS) {
      for (const locale of ["ja", "en"] as const) {
        const content = getCampGearResultContent(locale)[typeId];
        expect(isVisualKey(content.visualKey)).toBe(true);
        expect(getVisual(content.visualKey)?.Body).toBeTypeOf("function");
      }
    }
  });

  it("resolves body, compatibility, and mottos for every type", () => {
    for (const typeId of CAMP_GEAR_RESULT_TYPE_IDS) {
      const matching = everySessionAnswerCombination(sessionIds).find(
        (candidate) =>
          resolveCampGearResult(sessionQuiz, candidate).typeId === typeId,
      );
      expect(matching).toBeDefined();

      const ja = resolveCampGearResult(sessionQuiz, matching!);
      const enSession = buildSessionQuiz(
        campGearQuizEn,
        sessionIds,
      );
      const en = resolveCampGearResult(enSession, matching!);

      expect(ja.body.length).toBeGreaterThan(0);
      expect(ja.good.reason.length).toBeGreaterThan(0);
      expect(ja.bad.reason.length).toBeGreaterThan(0);
      expect(ja.mottos).toHaveLength(3);
      expect(en.body.length).toBeGreaterThan(0);
      expect(ja.locale).toBe("ja");
      expect(en.locale).toBe("en");
      expect(ja.body).not.toBe(en.body);
    }
  });

  it("supports all three face expressions", () => {
    expect(FACE_EXPRESSIONS).toEqual(["smile", "sweat-smile", "noon"]);
  });

  it("does not expose debug fields through resolveCampGearResult top level", () => {
    const result = resolveCampGearResult(
      sessionQuiz,
      sessionQuiz.questions.map((question) => ({
        questionId: question.id,
        choiceId: "d",
      })),
    );

    expect(result.debug).toBeDefined();
    expect(result).not.toHaveProperty("typeRanking");
    expect(result).not.toHaveProperty("traitRanking");
  });
});
