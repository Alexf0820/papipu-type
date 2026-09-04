import type { Locale } from "@/lib/locale";
import { buildQuiz, type ChoiceScoring, type QuizScoringTable, type QuizText } from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const SUSHI_QUIZ_ID = "sushi";
export const SUSHI_TRAIT_IDS = ["reliability", "warmth", "sociability", "calm", "curiosity", "drive", "harmony", "individuality"] as const;
export type SushiTraitId = (typeof SUSHI_TRAIT_IDS)[number];
export const SUSHI_RESULT_TYPE_IDS = ["tuna", "salmon", "shrimp", "egg", "salmonRoe", "eel", "sushiRoll", "squid"] as const;
export type SushiResultTypeId = (typeof SUSHI_RESULT_TYPE_IDS)[number];
export const SUSHI_TYPE_TRAIT_MAP: Record<SushiResultTypeId, SushiTraitId> = {
  tuna: "reliability", salmon: "warmth", shrimp: "sociability", egg: "calm",
  salmonRoe: "curiosity", eel: "drive", sushiRoll: "harmony", squid: "individuality",
};
export const SUSHI_QUESTION_IDS = [
  "q01", "q02", "q03", "q04", "q05", "q06", "q07", "q08",
  "q09", "q10", "q11", "q12", "q13", "q14", "q15", "q16",
  "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24",
  "q25", "q26", "q27", "q28", "q29", "q30", "q31", "q32",
] as const;
export type SushiQuestionId = (typeof SUSHI_QUESTION_IDS)[number];
export const SUSHI_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type SushiChoiceId = (typeof SUSHI_CHOICE_IDS)[number];
export const SUSHI_CATEGORIES: readonly (readonly SushiQuestionId[])[] = [
  ["q01", "q02", "q03", "q04"], ["q05", "q06", "q07", "q08"],
  ["q09", "q10", "q11", "q12"], ["q13", "q14", "q15", "q16"],
  ["q17", "q18", "q19", "q20"], ["q21", "q22", "q23", "q24"],
  ["q25", "q26", "q27", "q28"], ["q29", "q30", "q31", "q32"],
];
export type SushiQuiz = Quiz<SushiResultTypeId, SushiTraitId>;
export type SushiText = QuizText<SushiQuestionId, SushiChoiceId>;
export const SUSHI_RESULT_TYPES: Record<SushiResultTypeId, ResultTypeDefinition<SushiResultTypeId, SushiTraitId>> = {
  tuna: { id: "tuna" }, salmon: { id: "salmon" }, shrimp: { id: "shrimp" }, egg: { id: "egg" },
  salmonRoe: { id: "salmonRoe" }, eel: { id: "eel" }, sushiRoll: { id: "sushiRoll" }, squid: { id: "squid" },
};
function choice(mainType: SushiResultTypeId, secondaryType: SushiResultTypeId): ChoiceScoring<SushiResultTypeId, SushiTraitId> {
  return { mainType, secondaryType, traits: { [SUSHI_TYPE_TRAIT_MAP[mainType]]: 1, [SUSHI_TYPE_TRAIT_MAP[secondaryType]]: 1 } };
}
type ChoiceRow = [SushiResultTypeId, SushiResultTypeId, SushiResultTypeId, SushiResultTypeId, SushiResultTypeId, SushiResultTypeId, SushiResultTypeId, SushiResultTypeId];
function questionChoices(row: ChoiceRow): Record<SushiChoiceId, ChoiceScoring<SushiResultTypeId, SushiTraitId>> {
  return { a: choice(row[0], row[1]), b: choice(row[2], row[3]), c: choice(row[4], row[5]), d: choice(row[6], row[7]) };
}

/** Ver.0.1 judgement data shared by every locale. Main +3 / Secondary +1. */
export const SUSHI_SCORING: QuizScoringTable<SushiQuestionId, SushiChoiceId, SushiResultTypeId, SushiTraitId> = {
  q01: questionChoices(["tuna", "squid", "salmonRoe", "squid", "shrimp", "egg", "shrimp", "salmon"]),
  q02: questionChoices(["salmonRoe", "squid", "salmon", "shrimp", "sushiRoll", "salmon", "egg", "eel"]),
  q03: questionChoices(["egg", "squid", "shrimp", "salmon", "sushiRoll", "tuna", "salmonRoe", "shrimp"]),
  q04: questionChoices(["shrimp", "salmonRoe", "egg", "salmon", "tuna", "salmon", "shrimp", "salmonRoe"]),
  q05: questionChoices(["salmon", "sushiRoll", "egg", "squid", "salmonRoe", "shrimp", "eel", "tuna"]),
  q06: questionChoices(["squid", "salmonRoe", "salmonRoe", "shrimp", "tuna", "sushiRoll", "sushiRoll", "salmon"]),
  q07: questionChoices(["sushiRoll", "tuna", "shrimp", "salmonRoe", "squid", "salmonRoe", "egg", "salmon"]),
  q08: questionChoices(["eel", "salmonRoe", "shrimp", "salmon", "egg", "squid", "salmonRoe", "egg"]),
  q09: questionChoices(["shrimp", "salmon", "sushiRoll", "tuna", "squid", "salmonRoe", "eel", "salmonRoe"]),
  q10: questionChoices(["eel", "salmon", "tuna", "egg", "eel", "tuna", "salmonRoe", "shrimp"]),
  q11: questionChoices(["salmon", "sushiRoll", "egg", "squid", "eel", "shrimp", "sushiRoll", "tuna"]),
  q12: questionChoices(["tuna", "sushiRoll", "squid", "salmonRoe", "eel", "salmonRoe", "salmon", "shrimp"]),
  q13: questionChoices(["sushiRoll", "salmon", "egg", "salmon", "sushiRoll", "tuna", "eel", "shrimp"]),
  q14: questionChoices(["shrimp", "salmon", "eel", "squid", "tuna", "sushiRoll", "squid", "salmonRoe"]),
  q15: questionChoices(["salmonRoe", "squid", "salmon", "tuna", "egg", "tuna", "sushiRoll", "salmon"]),
  q16: questionChoices(["tuna", "sushiRoll", "eel", "salmonRoe", "salmon", "shrimp", "squid", "egg"]),
  q17: questionChoices(["shrimp", "salmon", "sushiRoll", "tuna", "squid", "salmonRoe", "tuna", "eel"]),
  q18: questionChoices(["egg", "squid", "sushiRoll", "salmon", "shrimp", "salmon", "sushiRoll", "tuna"]),
  q19: questionChoices(["sushiRoll", "tuna", "tuna", "sushiRoll", "egg", "squid", "shrimp", "eel"]),
  q20: questionChoices(["sushiRoll", "shrimp", "salmonRoe", "squid", "sushiRoll", "egg", "tuna", "salmon"]),
  q21: questionChoices(["salmon", "salmonRoe", "squid", "salmonRoe", "egg", "tuna", "salmonRoe", "shrimp"]),
  q22: questionChoices(["squid", "salmonRoe", "salmon", "egg", "salmonRoe", "shrimp", "tuna", "eel"]),
  q23: questionChoices(["tuna", "egg", "squid", "eel", "salmonRoe", "shrimp", "salmon", "sushiRoll"]),
  q24: questionChoices(["salmonRoe", "shrimp", "tuna", "egg", "salmon", "tuna", "squid", "eel"]),
  q25: questionChoices(["egg", "squid", "eel", "tuna", "shrimp", "salmon", "shrimp", "salmonRoe"]),
  q26: questionChoices(["egg", "tuna", "eel", "shrimp", "squid", "tuna", "salmon", "sushiRoll"]),
  q27: questionChoices(["squid", "salmonRoe", "shrimp", "eel", "salmon", "egg", "egg", "salmon"]),
  q28: questionChoices(["salmonRoe", "squid", "sushiRoll", "tuna", "eel", "tuna", "salmon", "egg"]),
  q29: questionChoices(["salmon", "shrimp", "squid", "salmonRoe", "salmonRoe", "egg", "tuna", "egg"]),
  q30: questionChoices(["squid", "salmonRoe", "tuna", "sushiRoll", "salmon", "shrimp", "eel", "tuna"]),
  q31: questionChoices(["eel", "tuna", "salmonRoe", "squid", "shrimp", "salmon", "egg", "tuna"]),
  q32: questionChoices(["eel", "shrimp", "salmon", "egg", "tuna", "sushiRoll", "squid", "salmonRoe"]),
};
export function createSushiQuiz(locale: Locale, text: SushiText): SushiQuiz {
  return buildQuiz({ id: SUSHI_QUIZ_ID, locale, questionIds: SUSHI_QUESTION_IDS, choiceIds: SUSHI_CHOICE_IDS, traitIds: SUSHI_TRAIT_IDS, resultTypeIds: SUSHI_RESULT_TYPE_IDS, typeTraitMap: SUSHI_TYPE_TRAIT_MAP, resultTypes: SUSHI_RESULT_TYPES, maxResultVariations: 3, categories: SUSHI_CATEGORIES, scoring: SUSHI_SCORING, text });
}
