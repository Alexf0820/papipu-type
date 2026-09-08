import type { Locale } from "@/lib/locale";
import { buildQuiz, type ChoiceScoring, type QuizScoringTable, type QuizText } from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const DONUT_QUIZ_ID = "donut";
export const DONUT_TRAIT_IDS = [
  "balance",
  "focus",
  "empathy",
  "craft",
  "service",
  "depth",
  "care",
  "adaptability"
] as const;
export type DonutTraitId = (typeof DONUT_TRAIT_IDS)[number];
export const DONUT_RESULT_TYPE_IDS = [
  "glazed",
  "chocolate",
  "strawberry",
  "oldFashioned",
  "sprinkle",
  "creamFilled",
  "cinnamon",
  "mochi"
] as const;
export type DonutResultTypeId = (typeof DONUT_RESULT_TYPE_IDS)[number];
export const DONUT_TYPE_TRAIT_MAP: Record<DonutResultTypeId, DonutTraitId> = {
  "glazed": "balance",
  "chocolate": "focus",
  "strawberry": "empathy",
  "oldFashioned": "craft",
  "sprinkle": "service",
  "creamFilled": "depth",
  "cinnamon": "care",
  "mochi": "adaptability"
};
export const DONUT_QUESTION_IDS = [
  "q01",
  "q02",
  "q03",
  "q04",
  "q05",
  "q06",
  "q07",
  "q08",
  "q09",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
  "q15",
  "q16",
  "q17",
  "q18",
  "q19",
  "q20",
  "q21",
  "q22",
  "q23",
  "q24",
  "q25",
  "q26",
  "q27",
  "q28",
  "q29",
  "q30",
  "q31",
  "q32"
] as const;
export type DonutQuestionId = (typeof DONUT_QUESTION_IDS)[number];
export const DONUT_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type DonutChoiceId = (typeof DONUT_CHOICE_IDS)[number];
export const DONUT_CATEGORIES: readonly (readonly DonutQuestionId[])[] = [
  ["q01","q02","q03","q04"],
  ["q05","q06","q07","q08"],
  ["q09","q10","q11","q12"],
  ["q13","q14","q15","q16"],
  ["q17","q18","q19","q20"],
  ["q21","q22","q23","q24"],
  ["q25","q26","q27","q28"],
  ["q29","q30","q31","q32"],
];
export type DonutQuiz = Quiz<DonutResultTypeId, DonutTraitId>;
export type DonutText = QuizText<DonutQuestionId, DonutChoiceId>;
export const DONUT_RESULT_TYPES: Record<DonutResultTypeId, ResultTypeDefinition<DonutResultTypeId, DonutTraitId>> = {
  glazed: { id: "glazed" },
  chocolate: { id: "chocolate" },
  strawberry: { id: "strawberry" },
  oldFashioned: { id: "oldFashioned" },
  sprinkle: { id: "sprinkle" },
  creamFilled: { id: "creamFilled" },
  cinnamon: { id: "cinnamon" },
  mochi: { id: "mochi" },
};

function choice(mainType: DonutResultTypeId, secondaryType: DonutResultTypeId): ChoiceScoring<DonutResultTypeId, DonutTraitId> {
  return { mainType, secondaryType, traits: { [DONUT_TYPE_TRAIT_MAP[mainType]]: 1, [DONUT_TYPE_TRAIT_MAP[secondaryType]]: 1 } };
}

export const DONUT_SCORING: QuizScoringTable<DonutQuestionId, DonutChoiceId, DonutResultTypeId, DonutTraitId> = {
  q01: {
    a: choice("glazed", "oldFashioned"),
    b: choice("strawberry", "creamFilled"),
    c: choice("sprinkle", "mochi"),
    d: choice("cinnamon", "chocolate"),
  },
  q02: {
    a: choice("chocolate", "cinnamon"),
    b: choice("oldFashioned", "glazed"),
    c: choice("creamFilled", "strawberry"),
    d: choice("mochi", "sprinkle"),
  },
  q03: {
    a: choice("strawberry", "creamFilled"),
    b: choice("sprinkle", "mochi"),
    c: choice("cinnamon", "chocolate"),
    d: choice("glazed", "oldFashioned"),
  },
  q04: {
    a: choice("oldFashioned", "glazed"),
    b: choice("creamFilled", "strawberry"),
    c: choice("mochi", "sprinkle"),
    d: choice("chocolate", "cinnamon"),
  },
  q05: {
    a: choice("sprinkle", "mochi"),
    b: choice("cinnamon", "chocolate"),
    c: choice("glazed", "oldFashioned"),
    d: choice("strawberry", "creamFilled"),
  },
  q06: {
    a: choice("creamFilled", "strawberry"),
    b: choice("mochi", "sprinkle"),
    c: choice("chocolate", "cinnamon"),
    d: choice("oldFashioned", "glazed"),
  },
  q07: {
    a: choice("cinnamon", "chocolate"),
    b: choice("glazed", "oldFashioned"),
    c: choice("strawberry", "creamFilled"),
    d: choice("sprinkle", "mochi"),
  },
  q08: {
    a: choice("mochi", "sprinkle"),
    b: choice("chocolate", "cinnamon"),
    c: choice("oldFashioned", "glazed"),
    d: choice("creamFilled", "strawberry"),
  },
  q09: {
    a: choice("glazed", "oldFashioned"),
    b: choice("strawberry", "creamFilled"),
    c: choice("sprinkle", "mochi"),
    d: choice("cinnamon", "chocolate"),
  },
  q10: {
    a: choice("chocolate", "cinnamon"),
    b: choice("oldFashioned", "glazed"),
    c: choice("creamFilled", "strawberry"),
    d: choice("mochi", "sprinkle"),
  },
  q11: {
    a: choice("strawberry", "creamFilled"),
    b: choice("sprinkle", "mochi"),
    c: choice("cinnamon", "chocolate"),
    d: choice("glazed", "oldFashioned"),
  },
  q12: {
    a: choice("oldFashioned", "glazed"),
    b: choice("creamFilled", "strawberry"),
    c: choice("mochi", "sprinkle"),
    d: choice("chocolate", "cinnamon"),
  },
  q13: {
    a: choice("sprinkle", "mochi"),
    b: choice("cinnamon", "chocolate"),
    c: choice("glazed", "oldFashioned"),
    d: choice("strawberry", "creamFilled"),
  },
  q14: {
    a: choice("creamFilled", "strawberry"),
    b: choice("mochi", "sprinkle"),
    c: choice("chocolate", "cinnamon"),
    d: choice("oldFashioned", "glazed"),
  },
  q15: {
    a: choice("cinnamon", "chocolate"),
    b: choice("glazed", "oldFashioned"),
    c: choice("strawberry", "creamFilled"),
    d: choice("sprinkle", "mochi"),
  },
  q16: {
    a: choice("mochi", "sprinkle"),
    b: choice("chocolate", "cinnamon"),
    c: choice("oldFashioned", "glazed"),
    d: choice("creamFilled", "strawberry"),
  },
  q17: {
    a: choice("glazed", "oldFashioned"),
    b: choice("strawberry", "creamFilled"),
    c: choice("sprinkle", "mochi"),
    d: choice("cinnamon", "chocolate"),
  },
  q18: {
    a: choice("chocolate", "cinnamon"),
    b: choice("oldFashioned", "glazed"),
    c: choice("creamFilled", "strawberry"),
    d: choice("mochi", "sprinkle"),
  },
  q19: {
    a: choice("strawberry", "creamFilled"),
    b: choice("sprinkle", "mochi"),
    c: choice("cinnamon", "chocolate"),
    d: choice("glazed", "oldFashioned"),
  },
  q20: {
    a: choice("oldFashioned", "glazed"),
    b: choice("creamFilled", "strawberry"),
    c: choice("mochi", "sprinkle"),
    d: choice("chocolate", "cinnamon"),
  },
  q21: {
    a: choice("sprinkle", "mochi"),
    b: choice("cinnamon", "chocolate"),
    c: choice("glazed", "oldFashioned"),
    d: choice("strawberry", "creamFilled"),
  },
  q22: {
    a: choice("creamFilled", "strawberry"),
    b: choice("mochi", "sprinkle"),
    c: choice("chocolate", "cinnamon"),
    d: choice("oldFashioned", "glazed"),
  },
  q23: {
    a: choice("cinnamon", "chocolate"),
    b: choice("glazed", "oldFashioned"),
    c: choice("strawberry", "creamFilled"),
    d: choice("sprinkle", "mochi"),
  },
  q24: {
    a: choice("mochi", "sprinkle"),
    b: choice("chocolate", "cinnamon"),
    c: choice("oldFashioned", "glazed"),
    d: choice("creamFilled", "strawberry"),
  },
  q25: {
    a: choice("glazed", "oldFashioned"),
    b: choice("strawberry", "creamFilled"),
    c: choice("sprinkle", "mochi"),
    d: choice("cinnamon", "chocolate"),
  },
  q26: {
    a: choice("chocolate", "cinnamon"),
    b: choice("oldFashioned", "glazed"),
    c: choice("creamFilled", "strawberry"),
    d: choice("mochi", "sprinkle"),
  },
  q27: {
    a: choice("strawberry", "creamFilled"),
    b: choice("sprinkle", "mochi"),
    c: choice("cinnamon", "chocolate"),
    d: choice("glazed", "oldFashioned"),
  },
  q28: {
    a: choice("oldFashioned", "glazed"),
    b: choice("creamFilled", "strawberry"),
    c: choice("mochi", "sprinkle"),
    d: choice("chocolate", "cinnamon"),
  },
  q29: {
    a: choice("sprinkle", "mochi"),
    b: choice("cinnamon", "chocolate"),
    c: choice("glazed", "oldFashioned"),
    d: choice("strawberry", "creamFilled"),
  },
  q30: {
    a: choice("creamFilled", "strawberry"),
    b: choice("mochi", "sprinkle"),
    c: choice("chocolate", "cinnamon"),
    d: choice("oldFashioned", "glazed"),
  },
  q31: {
    a: choice("cinnamon", "chocolate"),
    b: choice("glazed", "oldFashioned"),
    c: choice("strawberry", "creamFilled"),
    d: choice("sprinkle", "mochi"),
  },
  q32: {
    a: choice("mochi", "sprinkle"),
    b: choice("chocolate", "cinnamon"),
    c: choice("oldFashioned", "glazed"),
    d: choice("creamFilled", "strawberry"),
  },
};

export function createDonutQuiz(locale: Locale, text: DonutText): DonutQuiz {
  return buildQuiz({ id: DONUT_QUIZ_ID, locale, questionIds: DONUT_QUESTION_IDS, choiceIds: DONUT_CHOICE_IDS, traitIds: DONUT_TRAIT_IDS, resultTypeIds: DONUT_RESULT_TYPE_IDS, typeTraitMap: DONUT_TYPE_TRAIT_MAP, resultTypes: DONUT_RESULT_TYPES, maxResultVariations: 3, categories: DONUT_CATEGORIES, scoring: DONUT_SCORING, text });
}
