import type { Locale } from "@/lib/locale";
import { buildQuiz, type ChoiceScoring, type QuizScoringTable, type QuizText } from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const ICE_CREAM_QUIZ_ID = "ice-cream";
export const ICE_CREAM_TRAIT_IDS = [
  "natural",
  "passion",
  "expressive",
  "aesthetic",
  "playful",
  "compassion",
  "curiosity",
  "independence"
] as const;
export type IceCreamTraitId = (typeof ICE_CREAM_TRAIT_IDS)[number];
export const ICE_CREAM_RESULT_TYPE_IDS = [
  "vanilla",
  "chocolate",
  "strawberry",
  "matcha",
  "cookiesCream",
  "caramel",
  "rainbow",
  "sorbet"
] as const;
export type IceCreamResultTypeId = (typeof ICE_CREAM_RESULT_TYPE_IDS)[number];
export const ICE_CREAM_TYPE_TRAIT_MAP: Record<IceCreamResultTypeId, IceCreamTraitId> = {
  "vanilla": "natural",
  "chocolate": "passion",
  "strawberry": "expressive",
  "matcha": "aesthetic",
  "cookiesCream": "playful",
  "caramel": "compassion",
  "rainbow": "curiosity",
  "sorbet": "independence"
};
export const ICE_CREAM_QUESTION_IDS = [
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
export type IceCreamQuestionId = (typeof ICE_CREAM_QUESTION_IDS)[number];
export const ICE_CREAM_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type IceCreamChoiceId = (typeof ICE_CREAM_CHOICE_IDS)[number];
export const ICE_CREAM_CATEGORIES: readonly (readonly IceCreamQuestionId[])[] = [
  ["q01","q02","q03","q04"],
  ["q05","q06","q07","q08"],
  ["q09","q10","q11","q12"],
  ["q13","q14","q15","q16"],
  ["q17","q18","q19","q20"],
  ["q21","q22","q23","q24"],
  ["q25","q26","q27","q28"],
  ["q29","q30","q31","q32"],
];
export type IceCreamQuiz = Quiz<IceCreamResultTypeId, IceCreamTraitId>;
export type IceCreamText = QuizText<IceCreamQuestionId, IceCreamChoiceId>;
export const ICE_CREAM_RESULT_TYPES: Record<IceCreamResultTypeId, ResultTypeDefinition<IceCreamResultTypeId, IceCreamTraitId>> = {
  vanilla: { id: "vanilla" },
  chocolate: { id: "chocolate" },
  strawberry: { id: "strawberry" },
  matcha: { id: "matcha" },
  cookiesCream: { id: "cookiesCream" },
  caramel: { id: "caramel" },
  rainbow: { id: "rainbow" },
  sorbet: { id: "sorbet" },
};

function choice(mainType: IceCreamResultTypeId, secondaryType: IceCreamResultTypeId): ChoiceScoring<IceCreamResultTypeId, IceCreamTraitId> {
  return { mainType, secondaryType, traits: { [ICE_CREAM_TYPE_TRAIT_MAP[mainType]]: 1, [ICE_CREAM_TYPE_TRAIT_MAP[secondaryType]]: 1 } };
}

export const ICE_CREAM_SCORING: QuizScoringTable<IceCreamQuestionId, IceCreamChoiceId, IceCreamResultTypeId, IceCreamTraitId> = {
  q01: {
    a: choice("vanilla", "chocolate"),
    b: choice("strawberry", "matcha"),
    c: choice("cookiesCream", "caramel"),
    d: choice("rainbow", "sorbet"),
  },
  q02: {
    a: choice("chocolate", "cookiesCream"),
    b: choice("matcha", "rainbow"),
    c: choice("caramel", "vanilla"),
    d: choice("sorbet", "strawberry"),
  },
  q03: {
    a: choice("strawberry", "matcha"),
    b: choice("cookiesCream", "caramel"),
    c: choice("rainbow", "sorbet"),
    d: choice("vanilla", "chocolate"),
  },
  q04: {
    a: choice("matcha", "rainbow"),
    b: choice("caramel", "vanilla"),
    c: choice("sorbet", "strawberry"),
    d: choice("chocolate", "cookiesCream"),
  },
  q05: {
    a: choice("cookiesCream", "caramel"),
    b: choice("rainbow", "sorbet"),
    c: choice("vanilla", "chocolate"),
    d: choice("strawberry", "matcha"),
  },
  q06: {
    a: choice("caramel", "vanilla"),
    b: choice("sorbet", "strawberry"),
    c: choice("chocolate", "cookiesCream"),
    d: choice("matcha", "rainbow"),
  },
  q07: {
    a: choice("rainbow", "sorbet"),
    b: choice("vanilla", "chocolate"),
    c: choice("strawberry", "matcha"),
    d: choice("cookiesCream", "caramel"),
  },
  q08: {
    a: choice("sorbet", "strawberry"),
    b: choice("chocolate", "cookiesCream"),
    c: choice("matcha", "rainbow"),
    d: choice("caramel", "vanilla"),
  },
  q09: {
    a: choice("vanilla", "chocolate"),
    b: choice("strawberry", "matcha"),
    c: choice("cookiesCream", "caramel"),
    d: choice("rainbow", "sorbet"),
  },
  q10: {
    a: choice("chocolate", "cookiesCream"),
    b: choice("matcha", "rainbow"),
    c: choice("caramel", "vanilla"),
    d: choice("sorbet", "strawberry"),
  },
  q11: {
    a: choice("strawberry", "matcha"),
    b: choice("cookiesCream", "caramel"),
    c: choice("rainbow", "sorbet"),
    d: choice("vanilla", "chocolate"),
  },
  q12: {
    a: choice("matcha", "rainbow"),
    b: choice("caramel", "vanilla"),
    c: choice("sorbet", "strawberry"),
    d: choice("chocolate", "cookiesCream"),
  },
  q13: {
    a: choice("cookiesCream", "caramel"),
    b: choice("rainbow", "sorbet"),
    c: choice("vanilla", "chocolate"),
    d: choice("strawberry", "matcha"),
  },
  q14: {
    a: choice("caramel", "vanilla"),
    b: choice("sorbet", "strawberry"),
    c: choice("chocolate", "cookiesCream"),
    d: choice("matcha", "rainbow"),
  },
  q15: {
    a: choice("rainbow", "sorbet"),
    b: choice("vanilla", "chocolate"),
    c: choice("strawberry", "matcha"),
    d: choice("cookiesCream", "caramel"),
  },
  q16: {
    a: choice("sorbet", "strawberry"),
    b: choice("chocolate", "cookiesCream"),
    c: choice("matcha", "rainbow"),
    d: choice("caramel", "vanilla"),
  },
  q17: {
    a: choice("vanilla", "chocolate"),
    b: choice("strawberry", "matcha"),
    c: choice("cookiesCream", "caramel"),
    d: choice("rainbow", "sorbet"),
  },
  q18: {
    a: choice("chocolate", "cookiesCream"),
    b: choice("matcha", "rainbow"),
    c: choice("caramel", "vanilla"),
    d: choice("sorbet", "strawberry"),
  },
  q19: {
    a: choice("strawberry", "matcha"),
    b: choice("cookiesCream", "caramel"),
    c: choice("rainbow", "sorbet"),
    d: choice("vanilla", "chocolate"),
  },
  q20: {
    a: choice("matcha", "rainbow"),
    b: choice("caramel", "vanilla"),
    c: choice("sorbet", "strawberry"),
    d: choice("chocolate", "cookiesCream"),
  },
  q21: {
    a: choice("cookiesCream", "caramel"),
    b: choice("rainbow", "sorbet"),
    c: choice("vanilla", "chocolate"),
    d: choice("strawberry", "matcha"),
  },
  q22: {
    a: choice("caramel", "vanilla"),
    b: choice("sorbet", "strawberry"),
    c: choice("chocolate", "cookiesCream"),
    d: choice("matcha", "rainbow"),
  },
  q23: {
    a: choice("rainbow", "sorbet"),
    b: choice("vanilla", "chocolate"),
    c: choice("strawberry", "matcha"),
    d: choice("cookiesCream", "caramel"),
  },
  q24: {
    a: choice("sorbet", "strawberry"),
    b: choice("chocolate", "cookiesCream"),
    c: choice("matcha", "rainbow"),
    d: choice("caramel", "vanilla"),
  },
  q25: {
    a: choice("vanilla", "chocolate"),
    b: choice("strawberry", "matcha"),
    c: choice("cookiesCream", "caramel"),
    d: choice("rainbow", "sorbet"),
  },
  q26: {
    a: choice("chocolate", "cookiesCream"),
    b: choice("matcha", "rainbow"),
    c: choice("caramel", "vanilla"),
    d: choice("sorbet", "strawberry"),
  },
  q27: {
    a: choice("strawberry", "matcha"),
    b: choice("cookiesCream", "caramel"),
    c: choice("rainbow", "sorbet"),
    d: choice("vanilla", "chocolate"),
  },
  q28: {
    a: choice("matcha", "rainbow"),
    b: choice("caramel", "vanilla"),
    c: choice("sorbet", "strawberry"),
    d: choice("chocolate", "cookiesCream"),
  },
  q29: {
    a: choice("cookiesCream", "caramel"),
    b: choice("rainbow", "sorbet"),
    c: choice("vanilla", "chocolate"),
    d: choice("strawberry", "matcha"),
  },
  q30: {
    a: choice("caramel", "vanilla"),
    b: choice("sorbet", "strawberry"),
    c: choice("chocolate", "cookiesCream"),
    d: choice("matcha", "rainbow"),
  },
  q31: {
    a: choice("rainbow", "sorbet"),
    b: choice("vanilla", "chocolate"),
    c: choice("strawberry", "matcha"),
    d: choice("cookiesCream", "caramel"),
  },
  q32: {
    a: choice("sorbet", "strawberry"),
    b: choice("chocolate", "cookiesCream"),
    c: choice("matcha", "rainbow"),
    d: choice("caramel", "vanilla"),
  },
};

export function createIceCreamQuiz(locale: Locale, text: IceCreamText): IceCreamQuiz {
  return buildQuiz({ id: ICE_CREAM_QUIZ_ID, locale, questionIds: ICE_CREAM_QUESTION_IDS, choiceIds: ICE_CREAM_CHOICE_IDS, traitIds: ICE_CREAM_TRAIT_IDS, resultTypeIds: ICE_CREAM_RESULT_TYPE_IDS, typeTraitMap: ICE_CREAM_TYPE_TRAIT_MAP, resultTypes: ICE_CREAM_RESULT_TYPES, maxResultVariations: 3, categories: ICE_CREAM_CATEGORIES, scoring: ICE_CREAM_SCORING, text });
}
