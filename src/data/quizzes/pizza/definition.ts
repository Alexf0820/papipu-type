import type { Locale } from "@/lib/locale";
import {
  buildQuiz,
  type ChoiceScoring,
  type QuizScoringTable,
  type QuizText,
} from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const PIZZA_QUIZ_ID = "pizza";

// Replace every placeholder ID with the approved quiz data before registration.
export const PIZZA_TRAIT_IDS = [
  "trait01",
  "trait02",
  "trait03",
  "trait04",
  "trait05",
  "trait06",
  "trait07",
  "trait08",
] as const;
export type PizzaTraitId = (typeof PIZZA_TRAIT_IDS)[number];

export const PIZZA_RESULT_TYPE_IDS = [
  "type01",
  "type02",
  "type03",
  "type04",
  "type05",
  "type06",
  "type07",
  "type08",
] as const;
export type PizzaResultTypeId = (typeof PIZZA_RESULT_TYPE_IDS)[number];

export const PIZZA_TYPE_TRAIT_MAP: Record<PizzaResultTypeId, PizzaTraitId> = {
  type01: "trait01",
  type02: "trait02",
  type03: "trait03",
  type04: "trait04",
  type05: "trait05",
  type06: "trait06",
  type07: "trait07",
  type08: "trait08",
};

export const PIZZA_QUESTION_IDS = [
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
  "q32",
] as const;
export type PizzaQuestionId = (typeof PIZZA_QUESTION_IDS)[number];

export const PIZZA_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type PizzaChoiceId = (typeof PIZZA_CHOICE_IDS)[number];

export const PIZZA_CATEGORIES: readonly (readonly PizzaQuestionId[])[] = [
  ["q01", "q02", "q03", "q04"],
  ["q05", "q06", "q07", "q08"],
  ["q09", "q10", "q11", "q12"],
  ["q13", "q14", "q15", "q16"],
  ["q17", "q18", "q19", "q20"],
  ["q21", "q22", "q23", "q24"],
  ["q25", "q26", "q27", "q28"],
  ["q29", "q30", "q31", "q32"],
];

export type PizzaQuiz = Quiz<PizzaResultTypeId, PizzaTraitId>;
export type PizzaText = QuizText<PizzaQuestionId, PizzaChoiceId>;

export const PIZZA_RESULT_TYPES: Record<
  PizzaResultTypeId,
  ResultTypeDefinition<PizzaResultTypeId, PizzaTraitId>
> = {
  type01: { id: "type01" },
  type02: { id: "type02" },
  type03: { id: "type03" },
  type04: { id: "type04" },
  type05: { id: "type05" },
  type06: { id: "type06" },
  type07: { id: "type07" },
  type08: { id: "type08" },
};

// Main/Secondary values are deliberately blank until approved scoring arrives.
function pendingChoice(): ChoiceScoring<PizzaResultTypeId, PizzaTraitId> {
  return {
    mainType: "" as PizzaResultTypeId,
    secondaryType: "" as PizzaResultTypeId,
    traits: {},
  };
}

export const PIZZA_SCORING: QuizScoringTable<
  PizzaQuestionId,
  PizzaChoiceId,
  PizzaResultTypeId,
  PizzaTraitId
> = {
  q01: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q02: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q03: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q04: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q05: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q06: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q07: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q08: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q09: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q10: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q11: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q12: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q13: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q14: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q15: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q16: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q17: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q18: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q19: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q20: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q21: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q22: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q23: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q24: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q25: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q26: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q27: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q28: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q29: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q30: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q31: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
  q32: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },
};

export function createPizzaQuiz(
  locale: Locale,
  text: PizzaText,
): PizzaQuiz {
  return buildQuiz({
    id: PIZZA_QUIZ_ID,
    locale,
    questionIds: PIZZA_QUESTION_IDS,
    choiceIds: PIZZA_CHOICE_IDS,
    traitIds: PIZZA_TRAIT_IDS,
    resultTypeIds: PIZZA_RESULT_TYPE_IDS,
    typeTraitMap: PIZZA_TYPE_TRAIT_MAP,
    resultTypes: PIZZA_RESULT_TYPES,
    maxResultVariations: 3,
    categories: PIZZA_CATEGORIES,
    scoring: PIZZA_SCORING,
    text,
  });
}
