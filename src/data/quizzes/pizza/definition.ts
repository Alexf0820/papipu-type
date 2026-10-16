import type { Locale } from "@/lib/locale";
import { buildQuiz, type ChoiceScoring, type QuizScoringTable, type QuizText } from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const PIZZA_QUIZ_ID = "pizza";
export const PIZZA_TRAIT_IDS = [
  "steady",
  "initiative",
  "devotion",
  "observation",
  "coordination",
  "curiosity",
  "consideration",
  "simplicity"
] as const;
export type PizzaTraitId = (typeof PIZZA_TRAIT_IDS)[number];
export const PIZZA_RESULT_TYPE_IDS = [
  "margherita",
  "pepperoni",
  "quattroFormaggi",
  "mushroom",
  "seafood",
  "hawaiian",
  "veggie",
  "marinara"
] as const;
export type PizzaResultTypeId = (typeof PIZZA_RESULT_TYPE_IDS)[number];
export const PIZZA_TYPE_TRAIT_MAP: Record<PizzaResultTypeId, PizzaTraitId> = {
  "margherita": "steady",
  "pepperoni": "initiative",
  "quattroFormaggi": "devotion",
  "mushroom": "observation",
  "seafood": "coordination",
  "hawaiian": "curiosity",
  "veggie": "consideration",
  "marinara": "simplicity"
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
  "q32"
] as const;
export type PizzaQuestionId = (typeof PIZZA_QUESTION_IDS)[number];
export const PIZZA_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type PizzaChoiceId = (typeof PIZZA_CHOICE_IDS)[number];
export const PIZZA_CATEGORIES: readonly (readonly PizzaQuestionId[])[] = [
  ["q01","q02","q03","q04"],
  ["q05","q06","q07","q08"],
  ["q09","q10","q11","q12"],
  ["q13","q14","q15","q16"],
  ["q17","q18","q19","q20"],
  ["q21","q22","q23","q24"],
  ["q25","q26","q27","q28"],
  ["q29","q30","q31","q32"],
];
export type PizzaQuiz = Quiz<PizzaResultTypeId, PizzaTraitId>;
export type PizzaText = QuizText<PizzaQuestionId, PizzaChoiceId>;
export const PIZZA_RESULT_TYPES: Record<PizzaResultTypeId, ResultTypeDefinition<PizzaResultTypeId, PizzaTraitId>> = {
  margherita: { id: "margherita" },
  pepperoni: { id: "pepperoni" },
  quattroFormaggi: { id: "quattroFormaggi" },
  mushroom: { id: "mushroom" },
  seafood: { id: "seafood" },
  hawaiian: { id: "hawaiian" },
  veggie: { id: "veggie" },
  marinara: { id: "marinara" },
};

function choice(mainType: PizzaResultTypeId, secondaryType: PizzaResultTypeId): ChoiceScoring<PizzaResultTypeId, PizzaTraitId> {
  return { mainType, secondaryType, traits: { [PIZZA_TYPE_TRAIT_MAP[mainType]]: 1, [PIZZA_TYPE_TRAIT_MAP[secondaryType]]: 1 } };
}

export const PIZZA_SCORING: QuizScoringTable<PizzaQuestionId, PizzaChoiceId, PizzaResultTypeId, PizzaTraitId> = {
  q01: {
    a: choice("margherita", "veggie"),
    b: choice("pepperoni", "hawaiian"),
    c: choice("quattroFormaggi", "margherita"),
    d: choice("mushroom", "quattroFormaggi"),
  },
  q02: {
    a: choice("seafood", "pepperoni"),
    b: choice("hawaiian", "marinara"),
    c: choice("veggie", "seafood"),
    d: choice("marinara", "mushroom"),
  },
  q03: {
    a: choice("pepperoni", "hawaiian"),
    b: choice("quattroFormaggi", "margherita"),
    c: choice("mushroom", "quattroFormaggi"),
    d: choice("margherita", "veggie"),
  },
  q04: {
    a: choice("hawaiian", "marinara"),
    b: choice("veggie", "seafood"),
    c: choice("marinara", "mushroom"),
    d: choice("seafood", "pepperoni"),
  },
  q05: {
    a: choice("pepperoni", "hawaiian"),
    b: choice("quattroFormaggi", "margherita"),
    c: choice("mushroom", "quattroFormaggi"),
    d: choice("margherita", "veggie"),
  },
  q06: {
    a: choice("hawaiian", "marinara"),
    b: choice("veggie", "seafood"),
    c: choice("marinara", "mushroom"),
    d: choice("seafood", "pepperoni"),
  },
  q07: {
    a: choice("quattroFormaggi", "margherita"),
    b: choice("mushroom", "quattroFormaggi"),
    c: choice("margherita", "veggie"),
    d: choice("pepperoni", "hawaiian"),
  },
  q08: {
    a: choice("veggie", "seafood"),
    b: choice("marinara", "mushroom"),
    c: choice("seafood", "pepperoni"),
    d: choice("hawaiian", "marinara"),
  },
  q09: {
    a: choice("quattroFormaggi", "margherita"),
    b: choice("mushroom", "quattroFormaggi"),
    c: choice("margherita", "veggie"),
    d: choice("pepperoni", "hawaiian"),
  },
  q10: {
    a: choice("veggie", "seafood"),
    b: choice("marinara", "mushroom"),
    c: choice("seafood", "pepperoni"),
    d: choice("hawaiian", "marinara"),
  },
  q11: {
    a: choice("mushroom", "quattroFormaggi"),
    b: choice("margherita", "veggie"),
    c: choice("pepperoni", "hawaiian"),
    d: choice("quattroFormaggi", "margherita"),
  },
  q12: {
    a: choice("marinara", "mushroom"),
    b: choice("seafood", "pepperoni"),
    c: choice("hawaiian", "marinara"),
    d: choice("veggie", "seafood"),
  },
  q13: {
    a: choice("mushroom", "quattroFormaggi"),
    b: choice("margherita", "veggie"),
    c: choice("pepperoni", "hawaiian"),
    d: choice("quattroFormaggi", "margherita"),
  },
  q14: {
    a: choice("marinara", "mushroom"),
    b: choice("seafood", "pepperoni"),
    c: choice("hawaiian", "marinara"),
    d: choice("veggie", "seafood"),
  },
  q15: {
    a: choice("margherita", "veggie"),
    b: choice("pepperoni", "hawaiian"),
    c: choice("quattroFormaggi", "margherita"),
    d: choice("mushroom", "quattroFormaggi"),
  },
  q16: {
    a: choice("seafood", "pepperoni"),
    b: choice("hawaiian", "marinara"),
    c: choice("veggie", "seafood"),
    d: choice("marinara", "mushroom"),
  },
  q17: {
    a: choice("margherita", "veggie"),
    b: choice("pepperoni", "hawaiian"),
    c: choice("quattroFormaggi", "margherita"),
    d: choice("mushroom", "quattroFormaggi"),
  },
  q18: {
    a: choice("seafood", "pepperoni"),
    b: choice("hawaiian", "marinara"),
    c: choice("veggie", "seafood"),
    d: choice("marinara", "mushroom"),
  },
  q19: {
    a: choice("pepperoni", "hawaiian"),
    b: choice("quattroFormaggi", "margherita"),
    c: choice("mushroom", "quattroFormaggi"),
    d: choice("margherita", "veggie"),
  },
  q20: {
    a: choice("hawaiian", "marinara"),
    b: choice("veggie", "seafood"),
    c: choice("marinara", "mushroom"),
    d: choice("seafood", "pepperoni"),
  },
  q21: {
    a: choice("pepperoni", "hawaiian"),
    b: choice("quattroFormaggi", "margherita"),
    c: choice("mushroom", "quattroFormaggi"),
    d: choice("margherita", "veggie"),
  },
  q22: {
    a: choice("hawaiian", "marinara"),
    b: choice("veggie", "seafood"),
    c: choice("marinara", "mushroom"),
    d: choice("seafood", "pepperoni"),
  },
  q23: {
    a: choice("quattroFormaggi", "margherita"),
    b: choice("mushroom", "quattroFormaggi"),
    c: choice("margherita", "veggie"),
    d: choice("pepperoni", "hawaiian"),
  },
  q24: {
    a: choice("veggie", "seafood"),
    b: choice("marinara", "mushroom"),
    c: choice("seafood", "pepperoni"),
    d: choice("hawaiian", "marinara"),
  },
  q25: {
    a: choice("quattroFormaggi", "margherita"),
    b: choice("mushroom", "quattroFormaggi"),
    c: choice("margherita", "veggie"),
    d: choice("pepperoni", "hawaiian"),
  },
  q26: {
    a: choice("veggie", "seafood"),
    b: choice("marinara", "mushroom"),
    c: choice("seafood", "pepperoni"),
    d: choice("hawaiian", "marinara"),
  },
  q27: {
    a: choice("mushroom", "quattroFormaggi"),
    b: choice("margherita", "veggie"),
    c: choice("pepperoni", "hawaiian"),
    d: choice("quattroFormaggi", "margherita"),
  },
  q28: {
    a: choice("marinara", "mushroom"),
    b: choice("seafood", "pepperoni"),
    c: choice("hawaiian", "marinara"),
    d: choice("veggie", "seafood"),
  },
  q29: {
    a: choice("mushroom", "quattroFormaggi"),
    b: choice("margherita", "veggie"),
    c: choice("pepperoni", "hawaiian"),
    d: choice("quattroFormaggi", "margherita"),
  },
  q30: {
    a: choice("marinara", "mushroom"),
    b: choice("seafood", "pepperoni"),
    c: choice("hawaiian", "marinara"),
    d: choice("veggie", "seafood"),
  },
  q31: {
    a: choice("margherita", "veggie"),
    b: choice("pepperoni", "hawaiian"),
    c: choice("quattroFormaggi", "margherita"),
    d: choice("mushroom", "quattroFormaggi"),
  },
  q32: {
    a: choice("seafood", "pepperoni"),
    b: choice("hawaiian", "marinara"),
    c: choice("veggie", "seafood"),
    d: choice("marinara", "mushroom"),
  },
};

export function createPizzaQuiz(locale: Locale, text: PizzaText): PizzaQuiz {
  return buildQuiz({ id: PIZZA_QUIZ_ID, locale, questionIds: PIZZA_QUESTION_IDS, choiceIds: PIZZA_CHOICE_IDS, traitIds: PIZZA_TRAIT_IDS, resultTypeIds: PIZZA_RESULT_TYPE_IDS, typeTraitMap: PIZZA_TYPE_TRAIT_MAP, resultTypes: PIZZA_RESULT_TYPES, maxResultVariations: 3, categories: PIZZA_CATEGORIES, scoring: PIZZA_SCORING, text });
}
