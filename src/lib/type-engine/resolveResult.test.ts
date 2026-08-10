import { describe, expect, it } from "vitest";

import {
  CAMP_GEAR_QUESTION_IDS,
  CAMP_GEAR_RESULT_TYPE_IDS,
} from "@/data/quizzes/camp-gear/definition";
import { campGearQuizEn } from "@/data/quizzes/camp-gear/en";
import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import { getCampGearResultContent } from "@/data/quizzes/camp-gear/results";
import { resolveCampGearResult } from "@/lib/type-engine/resolveResult";
import type { QuizSelection } from "@/lib/type-engine/types";

function answerAll(
  choiceId: string,
  questions: typeof campGearQuizJa.questions,
): QuizSelection[] {
  return questions.map((question) => ({
    questionId: question.id,
    choiceId,
  }));
}

describe("resolveCampGearResult", () => {
  const allA = answerAll("a", campGearQuizJa.questions);

  it("resolves the top type from scoring", () => {
    const result = resolveCampGearResult(campGearQuizJa, allA);

    expect(result.typeId).toBe("peg");
    expect(result.typeScore).toBe(4);
  });

  it("returns locale-appropriate display copy", () => {
    const ja = resolveCampGearResult(campGearQuizJa, allA);
    const en = resolveCampGearResult(campGearQuizEn, allA);

    expect(ja.locale).toBe("ja");
    expect(ja.displayName).toBe("ペグ");
    expect(en.locale).toBe("en");
    expect(en.displayName).toBe("Tent Peg");
  });

  it("picks the same type for identical answers across locales", () => {
    const ja = resolveCampGearResult(campGearQuizJa, allA);
    const en = resolveCampGearResult(campGearQuizEn, allA);

    expect(ja.typeId).toBe(en.typeId);
    expect(ja.variationId).toBe(en.variationId);
  });

  it("does not mix locales in body text", () => {
    const ja = resolveCampGearResult(campGearQuizJa, allA);
    const en = resolveCampGearResult(campGearQuizEn, allA);

    expect(ja.body).toBe(
      getCampGearResultContent("ja").peg.variations[ja.variationId].body,
    );
    expect(en.body).toBe(
      getCampGearResultContent("en").peg.variations[en.variationId].body,
    );
    expect(ja.body).not.toBe(en.body);
  });

  it("assigns a visualKey for every result type", () => {
    for (const typeId of CAMP_GEAR_RESULT_TYPE_IDS) {
      const content = getCampGearResultContent("ja")[typeId];
      expect(content.visualKey).toBe(`camp-gear-${typeId}`);
    }
  });

  it("includes good and bad compatibility from the same locale", () => {
    const result = resolveCampGearResult(campGearQuizJa, allA);

    expect(result.good.displayName).toBe("テント");
    expect(result.good.typeId).toBe("tent");
    expect(result.bad.displayName).toBe("ハンマー");
    expect(result.bad.typeId).toBe("hammer");
  });

  it("exposes three motto candidates", () => {
    const result = resolveCampGearResult(campGearQuizJa, allA);

    expect(result.mottos).toHaveLength(3);
  });

  it("retains debug data without exposing it in display fields", () => {
    const result = resolveCampGearResult(campGearQuizJa, allA);

    expect(result.debug.selections).toHaveLength(CAMP_GEAR_QUESTION_IDS.length);
    expect(result.debug.scores.typeRanking[0].id).toBe("peg");
    expect(result).not.toHaveProperty("typeRanking");
  });

  it("updates debug scores when an answer is replaced without double counting", () => {
    const q1B = allA.map((selection, index) =>
      index === 0 ? { ...selection, choiceId: "b" as const } : selection,
    );
    const before = resolveCampGearResult(campGearQuizJa, allA);
    const after = resolveCampGearResult(campGearQuizJa, q1B);

    expect(after.debug.selections[0].choiceId).toBe("b");
    expect(after.debug.scores.typeScores.hammer).toBe(
      before.debug.scores.typeScores.hammer + 2,
    );
    expect(after.debug.scores.typeScores.knife).toBe(
      before.debug.scores.typeScores.knife - 2,
    );
    const totalBefore = Object.values(before.debug.scores.typeScores).reduce(
      (sum, score) => sum + score,
      0,
    );
    const totalAfter = Object.values(after.debug.scores.typeScores).reduce(
      (sum, score) => sum + score,
      0,
    );
    expect(totalAfter).toBe(totalBefore);
  });
});
