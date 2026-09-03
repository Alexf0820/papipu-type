import { describe, expect, it } from "vitest";

import {
  SPAGHETTI_CATEGORIES,
  SPAGHETTI_CHOICE_IDS,
  SPAGHETTI_QUESTION_IDS,
  SPAGHETTI_RESULT_TYPE_IDS,
  SPAGHETTI_TRAIT_IDS,
  SPAGHETTI_TYPE_TRAIT_MAP,
} from "@/data/quizzes/spaghetti/definition";
import { spaghettiQuizJa } from "@/data/quizzes/spaghetti/ja";
import { spaghettiQuizEn } from "@/data/quizzes/spaghetti/en";
import { getSpaghettiResultContent } from "@/data/quizzes/spaghetti/results";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";
import { buildSessionQuiz, sampleSessionQuiz } from "@/lib/type-engine/sampleQuestions";
import { resolveQuizResult } from "@/lib/type-engine/resolveResult";
import { aggregateQuizScores, resolveResultType } from "@/lib/type-engine/scoring";
import { getVisual } from "@/lib/visual/registry";

const EXPECTED_MAIN_COUNTS = {
  carbonara: 16, bolognese: 16, aglioOlio: 17, pesto: 16,
  arrabbiata: 16, seafood: 15, mushroom: 16, squidInk: 16,
};

const EXPECTED_VISUAL_KEYS = {
  carbonara: "spaghetti-carbonara",
  bolognese: "spaghetti-bolognese",
  aglioOlio: "spaghetti-aglio-e-olio",
  pesto: "spaghetti-pesto",
  arrabbiata: "spaghetti-arrabbiata",
  seafood: "spaghetti-seafood",
  mushroom: "spaghetti-mushroom",
  squidInk: "spaghetti-squid-ink",
};

describe("spaghetti Phase 1", () => {
  it("registers complete Japanese and English quiz data", () => {
    expect(getQuiz("spaghetti", "ja")).toBe(spaghettiQuizJa);
    expect(getQuiz("spaghetti", "en")).toBe(spaghettiQuizEn);
    expect(getQuizLocales("spaghetti")).toEqual(["ja", "en"]);
  });

  it("has the Ver.0.2 pool, categories, traits, and complete Japanese text", () => {
    expect(spaghettiQuizJa.questions.map((question) => question.id)).toEqual([...SPAGHETTI_QUESTION_IDS]);
    expect(spaghettiQuizJa.categories).toEqual(SPAGHETTI_CATEGORIES);
    expect(spaghettiQuizJa.categories).toHaveLength(8);
    expect(spaghettiQuizJa.categories.every((category) => category.length === 4)).toBe(true);
    expect(spaghettiQuizJa.resultTypeIds).toEqual([...SPAGHETTI_RESULT_TYPE_IDS]);
    expect(spaghettiQuizJa.traitIds).toEqual([...SPAGHETTI_TRAIT_IDS]);
    expect(spaghettiQuizJa.typeTraitMap).toEqual(SPAGHETTI_TYPE_TRAIT_MAP);

    for (const question of spaghettiQuizJa.questions) {
      expect(question.text).not.toBe(question.id.toUpperCase());
      expect(question.choices.map((choice) => choice.id)).toEqual([...SPAGHETTI_CHOICE_IDS]);
      for (const choice of question.choices) expect(choice.text).not.toBe(choice.id.toUpperCase());
    }
  });

  it("keeps the approved Main counts and traits for all 128 choices", () => {
    const mainCounts = Object.fromEntries(SPAGHETTI_RESULT_TYPE_IDS.map((id) => [id, 0]));
    for (const question of spaghettiQuizJa.questions) for (const choice of question.choices) {
      expect(SPAGHETTI_RESULT_TYPE_IDS).toContain(choice.mainType);
      expect(SPAGHETTI_RESULT_TYPE_IDS).toContain(choice.secondaryType);
      mainCounts[choice.mainType] += 1;
      expect(choice.traits).toEqual({
        [SPAGHETTI_TYPE_TRAIT_MAP[choice.mainType]]: 1,
        [SPAGHETTI_TYPE_TRAIT_MAP[choice.secondaryType]]: 1,
      });
    }
    expect(mainCounts).toEqual(EXPECTED_MAIN_COUNTS);
  });

  it("samples one question per category into an eight-question session", () => {
    const session = sampleSessionQuiz(spaghettiQuizJa, () => 0);
    expect(session.questions).toHaveLength(8);
    expect(new Set(session.questions.map((question) => question.id)).size).toBe(8);
    expect(session.questions.map((question) => question.id)).toEqual(["q05", "q09", "q13", "q17", "q21", "q25", "q29", "q01"]);
  });

  it("scores Main +3 and Secondary +1, and resolves all eight types", () => {
    const session = buildSessionQuiz(spaghettiQuizJa, SPAGHETTI_CATEGORIES.map((category) => category[0]!));
    const allA = session.questions.map((question) => ({ questionId: question.id, choiceId: "a" }));
    const scores = aggregateQuizScores(session, allA);
    expect(Object.values(scores.typeScores).reduce((sum, score) => sum + score, 0)).toBe(32);

    const seen = new Set<string>();
    let combinations = [[]] as { questionId: string; choiceId: string }[][];
    for (const question of session.questions) combinations = combinations.flatMap((partial) => SPAGHETTI_CHOICE_IDS.map((choiceId) => [...partial, { questionId: question.id, choiceId }]));
    for (const selections of combinations) seen.add(resolveResultType(session, selections, aggregateQuizScores(session, selections)).typeId);
    expect([...seen].sort()).toEqual([...SPAGHETTI_RESULT_TYPE_IDS].sort());
  });

  it("keeps JA and EN judgement, result type, and variation identical", () => {
    const ids = SPAGHETTI_CATEGORIES.map((category) => category[0]!);
    const ja = buildSessionQuiz(spaghettiQuizJa, ids);
    const en = buildSessionQuiz(spaghettiQuizEn, ids);
    const selections = ja.questions.map((question) => ({ questionId: question.id, choiceId: "a" }));
    const jaResult = resolveQuizResult(ja, selections, getSpaghettiResultContent("ja"));
    const enResult = resolveQuizResult(en, selections, getSpaghettiResultContent("en"));
    expect(enResult.typeId).toBe(jaResult.typeId);
    expect(enResult.variationId).toBe(jaResult.variationId);
    for (const typeId of SPAGHETTI_RESULT_TYPE_IDS) {
      for (const locale of ["ja", "en"] as const) {
        const content = getSpaghettiResultContent(locale)[typeId]!;
        expect(Object.keys(content.variations).sort()).toEqual(["a", "b", "c"]);
        expect(content.mottos).toHaveLength(3);
        expect(content.good.reason.length).toBeGreaterThan(0);
        expect(content.bad.reason.length).toBeGreaterThan(0);
      }
    }
  });

  it("maps every localized result to the shared Spaghetti visual registry", () => {
    for (const typeId of SPAGHETTI_RESULT_TYPE_IDS) {
      const visualKey = EXPECTED_VISUAL_KEYS[typeId];
      expect(getSpaghettiResultContent("ja")[typeId]?.visualKey).toBe(visualKey);
      expect(getSpaghettiResultContent("en")[typeId]?.visualKey).toBe(visualKey);
      expect(getVisual(visualKey)).toBeDefined();
    }
  });
});
