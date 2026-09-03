import type { Locale } from "@/lib/locale";
import {
  buildQuiz,
  type ChoiceScoring,
  type QuizScoringTable,
  type QuizText,
} from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const SPAGHETTI_QUIZ_ID = "spaghetti";

export const SPAGHETTI_TRAIT_IDS = [
  "warmth",
  "stability",
  "independence",
  "individuality",
  "drive",
  "sociability",
  "reflection",
  "originality",
] as const;

export type SpaghettiTraitId = (typeof SPAGHETTI_TRAIT_IDS)[number];

export const SPAGHETTI_RESULT_TYPE_IDS = [
  "carbonara",
  "bolognese",
  "aglioOlio",
  "pesto",
  "arrabbiata",
  "seafood",
  "mushroom",
  "squidInk",
] as const;

export type SpaghettiResultTypeId = (typeof SPAGHETTI_RESULT_TYPE_IDS)[number];

export const SPAGHETTI_TYPE_TRAIT_MAP: Record<
  SpaghettiResultTypeId,
  SpaghettiTraitId
> = {
  carbonara: "warmth",
  bolognese: "stability",
  aglioOlio: "independence",
  pesto: "individuality",
  arrabbiata: "drive",
  seafood: "sociability",
  mushroom: "reflection",
  squidInk: "originality",
};

export const SPAGHETTI_QUESTION_IDS = [
  "q01", "q02", "q03", "q04", "q05", "q06", "q07", "q08",
  "q09", "q10", "q11", "q12", "q13", "q14", "q15", "q16",
  "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24",
  "q25", "q26", "q27", "q28", "q29", "q30", "q31", "q32",
] as const;

export type SpaghettiQuestionId = (typeof SPAGHETTI_QUESTION_IDS)[number];

export const SPAGHETTI_CHOICE_IDS = ["a", "b", "c", "d"] as const;

export type SpaghettiChoiceId = (typeof SPAGHETTI_CHOICE_IDS)[number];

export const SPAGHETTI_CATEGORIES: readonly (readonly SpaghettiQuestionId[])[] = [
  ["q01", "q02", "q03", "q04"],
  ["q05", "q06", "q07", "q08"],
  ["q09", "q10", "q11", "q12"],
  ["q13", "q14", "q15", "q16"],
  ["q17", "q18", "q19", "q20"],
  ["q21", "q22", "q23", "q24"],
  ["q25", "q26", "q27", "q28"],
  ["q29", "q30", "q31", "q32"],
];

export type SpaghettiQuiz = Quiz<SpaghettiResultTypeId, SpaghettiTraitId>;
export type SpaghettiText = QuizText<SpaghettiQuestionId, SpaghettiChoiceId>;

export const SPAGHETTI_RESULT_TYPES: Record<
  SpaghettiResultTypeId,
  ResultTypeDefinition<SpaghettiResultTypeId, SpaghettiTraitId>
> = {
  carbonara: { id: "carbonara" },
  bolognese: { id: "bolognese" },
  aglioOlio: { id: "aglioOlio" },
  pesto: { id: "pesto" },
  arrabbiata: { id: "arrabbiata" },
  seafood: { id: "seafood" },
  mushroom: { id: "mushroom" },
  squidInk: { id: "squidInk" },
};

/** Result copy is introduced in Phase 2. */
export const SPAGHETTI_MAX_RESULT_VARIATIONS = 0;

function choice(
  mainType: SpaghettiResultTypeId,
  secondaryType: SpaghettiResultTypeId,
): ChoiceScoring<SpaghettiResultTypeId, SpaghettiTraitId> {
  return {
    mainType,
    secondaryType,
    traits: {
      [SPAGHETTI_TYPE_TRAIT_MAP[mainType]]: 1,
      [SPAGHETTI_TYPE_TRAIT_MAP[secondaryType]]: 1,
    },
  };
}

type ChoiceRow = [
  SpaghettiResultTypeId, SpaghettiResultTypeId, SpaghettiResultTypeId, SpaghettiResultTypeId,
  SpaghettiResultTypeId, SpaghettiResultTypeId, SpaghettiResultTypeId, SpaghettiResultTypeId,
];

function questionChoices(
  row: ChoiceRow,
): Record<SpaghettiChoiceId, ChoiceScoring<SpaghettiResultTypeId, SpaghettiTraitId>> {
  return {
    a: choice(row[0], row[1]), b: choice(row[2], row[3]),
    c: choice(row[4], row[5]), d: choice(row[6], row[7]),
  };
}

/** Ver.0.2 judgement data shared by every locale. Main +3 / Secondary +1. */
export const SPAGHETTI_SCORING: QuizScoringTable<
  SpaghettiQuestionId, SpaghettiChoiceId, SpaghettiResultTypeId, SpaghettiTraitId
> = {
  q01: questionChoices(["aglioOlio", "mushroom", "seafood", "carbonara", "mushroom", "bolognese", "squidInk", "pesto"]),
  q02: questionChoices(["seafood", "arrabbiata", "carbonara", "mushroom", "arrabbiata", "seafood", "aglioOlio", "pesto"]),
  q03: questionChoices(["seafood", "bolognese", "aglioOlio", "pesto", "bolognese", "arrabbiata", "pesto", "squidInk"]),
  q04: questionChoices(["carbonara", "mushroom", "mushroom", "bolognese", "seafood", "carbonara", "bolognese", "aglioOlio"]),
  q05: questionChoices(["seafood", "arrabbiata", "pesto", "aglioOlio", "aglioOlio", "carbonara", "mushroom", "squidInk"]),
  q06: questionChoices(["seafood", "carbonara", "seafood", "arrabbiata", "squidInk", "pesto", "aglioOlio", "mushroom"]),
  q07: questionChoices(["squidInk", "seafood", "bolognese", "mushroom", "mushroom", "bolognese", "seafood", "arrabbiata"]),
  q08: questionChoices(["seafood", "arrabbiata", "pesto", "mushroom", "aglioOlio", "carbonara", "arrabbiata", "seafood"]),
  q09: questionChoices(["mushroom", "bolognese", "arrabbiata", "aglioOlio", "pesto", "squidInk", "carbonara", "bolognese"]),
  q10: questionChoices(["bolognese", "mushroom", "mushroom", "squidInk", "arrabbiata", "pesto", "aglioOlio", "bolognese"]),
  q11: questionChoices(["carbonara", "bolognese", "bolognese", "arrabbiata", "pesto", "seafood", "aglioOlio", "carbonara"]),
  q12: questionChoices(["mushroom", "carbonara", "mushroom", "pesto", "pesto", "squidInk", "arrabbiata", "aglioOlio"]),
  q13: questionChoices(["arrabbiata", "seafood", "carbonara", "aglioOlio", "bolognese", "mushroom", "squidInk", "seafood"]),
  q14: questionChoices(["bolognese", "mushroom", "arrabbiata", "seafood", "mushroom", "pesto", "aglioOlio", "bolognese"]),
  q15: questionChoices(["mushroom", "bolognese", "arrabbiata", "aglioOlio", "carbonara", "seafood", "squidInk", "pesto"]),
  q16: questionChoices(["mushroom", "bolognese", "aglioOlio", "carbonara", "arrabbiata", "pesto", "squidInk", "seafood"]),
  q17: questionChoices(["mushroom", "bolognese", "bolognese", "carbonara", "arrabbiata", "seafood", "pesto", "squidInk"]),
  q18: questionChoices(["aglioOlio", "bolognese", "seafood", "carbonara", "mushroom", "bolognese", "aglioOlio", "pesto"]),
  q19: questionChoices(["mushroom", "bolognese", "bolognese", "carbonara", "pesto", "seafood", "squidInk", "pesto"]),
  q20: questionChoices(["pesto", "seafood", "bolognese", "mushroom", "arrabbiata", "seafood", "pesto", "squidInk"]),
  q21: questionChoices(["carbonara", "bolognese", "mushroom", "aglioOlio", "arrabbiata", "pesto", "squidInk", "aglioOlio"]),
  q22: questionChoices(["carbonara", "mushroom", "bolognese", "aglioOlio", "seafood", "arrabbiata", "squidInk", "pesto"]),
  q23: questionChoices(["carbonara", "mushroom", "bolognese", "mushroom", "arrabbiata", "seafood", "pesto", "squidInk"]),
  q24: questionChoices(["carbonara", "bolognese", "aglioOlio", "mushroom", "seafood", "arrabbiata", "squidInk", "pesto"]),
  q25: questionChoices(["bolognese", "aglioOlio", "pesto", "mushroom", "arrabbiata", "seafood", "squidInk", "pesto"]),
  q26: questionChoices(["carbonara", "bolognese", "seafood", "mushroom", "squidInk", "pesto", "aglioOlio", "carbonara"]),
  q27: questionChoices(["carbonara", "aglioOlio", "bolognese", "mushroom", "pesto", "squidInk", "squidInk", "seafood"]),
  q28: questionChoices(["aglioOlio", "bolognese", "carbonara", "bolognese", "pesto", "aglioOlio", "squidInk", "pesto"]),
  q29: questionChoices(["bolognese", "mushroom", "seafood", "arrabbiata", "pesto", "aglioOlio", "arrabbiata", "seafood"]),
  q30: questionChoices(["mushroom", "bolognese", "aglioOlio", "pesto", "squidInk", "pesto", "carbonara", "bolognese"]),
  q31: questionChoices(["bolognese", "carbonara", "carbonara", "seafood", "seafood", "squidInk", "pesto", "aglioOlio"]),
  q32: questionChoices(["carbonara", "bolognese", "aglioOlio", "mushroom", "arrabbiata", "seafood", "squidInk", "pesto"]),
};

export function createSpaghettiQuiz(locale: Locale, text: SpaghettiText): SpaghettiQuiz {
  return buildQuiz({
    id: SPAGHETTI_QUIZ_ID, locale, questionIds: SPAGHETTI_QUESTION_IDS,
    choiceIds: SPAGHETTI_CHOICE_IDS, traitIds: SPAGHETTI_TRAIT_IDS,
    resultTypeIds: SPAGHETTI_RESULT_TYPE_IDS, typeTraitMap: SPAGHETTI_TYPE_TRAIT_MAP,
    resultTypes: SPAGHETTI_RESULT_TYPES, maxResultVariations: SPAGHETTI_MAX_RESULT_VARIATIONS,
    categories: SPAGHETTI_CATEGORIES, scoring: SPAGHETTI_SCORING, text,
  });
}
