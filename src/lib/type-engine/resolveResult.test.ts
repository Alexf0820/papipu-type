import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_CATEGORIES,
  CAMP_GEAR_RESULT_TYPE_IDS,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { getCampGearResultContent } from "@/data/quizzes/camp-gear/results";
import { buildSessionQuiz } from "@/lib/type-engine/sampleQuestions";
import { resolveCampGearResult } from "@/lib/type-engine/resolveResult";
import type { QuizSelection } from "@/lib/type-engine/types";

const sessionQuiz = buildSessionQuiz(
  campGearQuizJa,
  CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
);

function answerAll(choiceId: string): QuizSelection[] {
  return sessionQuiz.questions.map((question) => ({
    questionId: question.id,
    choiceId,
  }));
}

describe("resolveCampGearResult", () => {
  const allA = answerAll("a");

  it("resolves the top type from scoring", () => {
    const result = resolveCampGearResult(sessionQuiz, allA);

    expect(result.typeId).toBe("peg");
    expect(result.typeScore).toBeGreaterThan(0);
  });

  it("returns locale-appropriate display copy", () => {
    const enSession = buildSessionQuiz(
      campGearQuizEn,
      CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
    );
    const ja = resolveCampGearResult(sessionQuiz, allA);
    const en = resolveCampGearResult(enSession, allA);

    expect(ja.locale).toBe("ja");
    expect(ja.displayName).toBe("ペグ");
    expect(en.locale).toBe("en");
    expect(en.displayName).toBe("Tent Peg");
  });

  it("picks the same type and variation for identical answers across locales", () => {
    const enSession = buildSessionQuiz(
      campGearQuizEn,
      CAMP_GEAR_CATEGORIES.map((category) => category[0]!),
    );
    const ja = resolveCampGearResult(sessionQuiz, allA);
    const en = resolveCampGearResult(enSession, allA);

    expect(ja.typeId).toBe(en.typeId);
    expect(ja.variationId).toBe(en.variationId);
  });

  it("does not mix locales in body text", () => {
    const result = resolveCampGearResult(sessionQuiz, allA);

    expect(result.body).toBe(
      getCampGearResultContent("ja")[result.typeId as keyof ReturnType<typeof getCampGearResultContent>].variations[result.variationId].body,
    );
  });

  it("assigns a visualKey for every result type", () => {
    for (const typeId of CAMP_GEAR_RESULT_TYPE_IDS) {
      const content = getCampGearResultContent("ja")[typeId];
      expect(content.visualKey).toBe(`camp-gear-${typeId}`);
    }
  });

  it("includes good and bad compatibility from the same locale", () => {
    const result = resolveCampGearResult(sessionQuiz, allA);

    expect(result.good.displayName.length).toBeGreaterThan(0);
    expect(result.bad.displayName.length).toBeGreaterThan(0);
  });

  it("exposes three motto candidates", () => {
    const result = resolveCampGearResult(sessionQuiz, allA);

    expect(result.mottos).toHaveLength(3);
  });

  it("retains debug data without exposing it in display fields", () => {
    const result = resolveCampGearResult(sessionQuiz, allA);

    expect(result.debug.selections).toHaveLength(8);
    expect(result.debug.scores.mainCounts).toBeDefined();
    expect(result).not.toHaveProperty("typeRanking");
  });

  it("updates debug scores when an answer is replaced without double counting", () => {
    const q1B = allA.map((selection) =>
      selection.questionId === "q01"
        ? { ...selection, choiceId: "b" as const }
        : selection,
    );
    const before = resolveCampGearResult(sessionQuiz, allA);
    const after = resolveCampGearResult(sessionQuiz, q1B);

    expect(after.debug.selections[0]!.choiceId).toBe("b");
    expect(after.debug.scores.typeScores.hammer).toBe(
      before.debug.scores.typeScores.hammer + 3,
    );
  });

  it("picks the same variation for the same answers every time", () => {
    const first = resolveCampGearResult(sessionQuiz, allA);
    const second = resolveCampGearResult(sessionQuiz, allA);

    expect(first.variationId).toBe(second.variationId);
  });
});
