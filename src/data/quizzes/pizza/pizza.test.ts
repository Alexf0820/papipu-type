import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { getQuiz, getQuizResultContent } from "@/lib/type-engine/registry";
import { resolveQuizResult } from "@/lib/type-engine/resolveResult";
import { buildSessionQuiz, sampleSessionQuestionIds } from "@/lib/type-engine/sampleQuestions";
import { getVisual } from "@/lib/visual/registry";
import handoff from "./content/handoff.json";
import manifest from "../../../../docs/pizza-type/asset-manifest.json";

function seededRandom() {
  let state = 0x50495a5a;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}

describe("Pizza integration", () => {
  it("imports every question and result exactly from the versioned bilingual handoff", () => {
    for (const locale of ["ja", "en"] as const) {
      const quiz = getQuiz("pizza", locale)!;
      const results = getQuizResultContent("pizza", locale)!;
      expect(quiz.categories).toEqual(handoff.quiz.categories);
      expect(quiz.questions).toHaveLength(32);
      for (const question of quiz.questions) {
        const source = handoff.quiz.questions[question.id as keyof typeof handoff.quiz.questions];
        expect(question.text).toBe(source[locale].text);
        expect(question.choices.map(c => c.id)).toEqual(["a", "b", "c", "d"]);
        for (const choice of question.choices) {
          const letter = choice.id as "a" | "b" | "c" | "d";
          expect(choice.text).toBe(source[locale].choices[letter]);
          expect(choice.mainType).toBe(source.scoring[letter].mainType);
          expect(choice.secondaryType).toBe(source.scoring[letter].secondaryType);
        }
      }
      expect(results).toEqual(handoff.results[locale]);
      for (const result of Object.values(results)) expect(getVisual(result.visualKey!)).toBeDefined();
    }
  });

  it("retains all eight exact originals including their PNG dimensions", () => {
    for (const asset of manifest.images) {
      const bytes = readFileSync(asset.repositoryPath);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(asset.sha256);
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([1254, 1254]);
    }
  });

  it("completes 10,000 eight-question sessions with JA/EN type and variation parity and reaches all 24 bodies", () => {
    const random = seededRandom();
    const ja = getQuiz("pizza", "ja")!;
    const en = getQuiz("pizza", "en")!;
    const reached = new Set<string>();
    for (let run = 0; run < 10000; run++) {
      const ids = sampleSessionQuestionIds(ja.categories!, random);
      expect(ids).toHaveLength(8);
      expect(ja.categories!.every(category => category.filter(id => ids.includes(id)).length === 1)).toBe(true);
      const selections = ids.map(questionId => ({ questionId, choiceId: "abcd"[Math.floor(random() * 4)] }));
      const a = resolveQuizResult(buildSessionQuiz(ja, ids), selections, getQuizResultContent("pizza", "ja")!);
      const b = resolveQuizResult(buildSessionQuiz(en, ids), selections, getQuizResultContent("pizza", "en")!);
      expect([a.typeId, a.variationId, a.good.typeId, a.bad.typeId, a.visualKey]).toEqual([b.typeId, b.variationId, b.good.typeId, b.bad.typeId, b.visualKey]);
      expect(a.mottos).toHaveLength(3);
      expect(a.good.reason.trim()).not.toBe("");
      expect(a.bad.reason.trim()).not.toBe("");
      reached.add(`${a.typeId}:${a.variationId}`);
    }
    expect(reached.size).toBe(24);
  });
});
