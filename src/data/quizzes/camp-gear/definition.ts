import type { Locale } from "@/lib/locale";
import {
  buildQuiz,
  type ChoiceScoring,
  type QuizScoringTable,
  type QuizText,
} from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const CAMP_GEAR_QUIZ_ID = "camp-gear";

export const CAMP_GEAR_TRAIT_IDS = [
  "supportive",
  "protective",
  "social",
  "relaxed",
  "passionate",
  "peaceful",
  "logical",
  "action",
] as const;

export type CampGearTraitId = (typeof CAMP_GEAR_TRAIT_IDS)[number];

export const CAMP_GEAR_RESULT_TYPE_IDS = [
  "peg",
  "tent",
  "lantern",
  "chair",
  "firePit",
  "sleepingBag",
  "knife",
  "hammer",
] as const;

export type CampGearResultTypeId = (typeof CAMP_GEAR_RESULT_TYPE_IDS)[number];

export const CAMP_GEAR_TYPE_TRAIT_MAP: Record<
  CampGearResultTypeId,
  CampGearTraitId
> = {
  peg: "supportive",
  tent: "protective",
  lantern: "social",
  chair: "relaxed",
  firePit: "passionate",
  sleepingBag: "peaceful",
  knife: "logical",
  hammer: "action",
};

export const CAMP_GEAR_QUESTION_IDS = [
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

export type CampGearQuestionId = (typeof CAMP_GEAR_QUESTION_IDS)[number];

export const CAMP_GEAR_CHOICE_IDS = ["a", "b", "c", "d"] as const;

export type CampGearChoiceId = (typeof CAMP_GEAR_CHOICE_IDS)[number];

/** 8 categories × 4 questions — one question drawn from each per session. */
export const CAMP_GEAR_CATEGORIES: readonly (readonly CampGearQuestionId[])[] =
  [
    ["q01", "q02", "q03", "q04"],
    ["q05", "q06", "q07", "q08"],
    ["q09", "q10", "q11", "q12"],
    ["q13", "q14", "q15", "q16"],
    ["q17", "q18", "q19", "q20"],
    ["q21", "q22", "q23", "q24"],
    ["q25", "q26", "q27", "q28"],
    ["q29", "q30", "q31", "q32"],
  ];

export type CampGearQuiz = Quiz<CampGearResultTypeId, CampGearTraitId>;

export type CampGearText = QuizText<CampGearQuestionId, CampGearChoiceId>;

export const CAMP_GEAR_RESULT_TYPES: Record<
  CampGearResultTypeId,
  ResultTypeDefinition<CampGearResultTypeId, CampGearTraitId>
> = {
  peg: { id: "peg" },
  tent: { id: "tent" },
  lantern: { id: "lantern" },
  chair: { id: "chair" },
  firePit: { id: "firePit" },
  sleepingBag: { id: "sleepingBag" },
  knife: { id: "knife" },
  hammer: { id: "hammer" },
};

export const CAMP_GEAR_MAX_RESULT_VARIATIONS = 3;

function choice(
  mainType: CampGearResultTypeId,
  secondaryType: CampGearResultTypeId,
): ChoiceScoring<
  CampGearResultTypeId,
  CampGearTraitId
> {
  return {
    mainType,
    secondaryType,
    traits: {
      [CAMP_GEAR_TYPE_TRAIT_MAP[mainType]]: 1,
      [CAMP_GEAR_TYPE_TRAIT_MAP[secondaryType]]: 1,
    },
  };
}

type ChoiceRow = [
  CampGearResultTypeId,
  CampGearResultTypeId,
  CampGearResultTypeId,
  CampGearResultTypeId,
  CampGearResultTypeId,
  CampGearResultTypeId,
  CampGearResultTypeId,
  CampGearResultTypeId,
];

/** Build four choices (a–d) from eight type pairs (main/secondary × 4). */
function questionChoices(row: ChoiceRow): Record<
  CampGearChoiceId,
  ChoiceScoring<CampGearResultTypeId, CampGearTraitId>
> {
  return {
    a: choice(row[0], row[1]),
    b: choice(row[2], row[3]),
    c: choice(row[4], row[5]),
    d: choice(row[6], row[7]),
  };
}

/**
 * Ver.2.2 judgement data shared by every locale.
 * Main +3 / Secondary +1; traits +1 each from type-trait mapping.
 */
export const CAMP_GEAR_SCORING: QuizScoringTable<
  CampGearQuestionId,
  CampGearChoiceId,
  CampGearResultTypeId,
  CampGearTraitId
> = {
  q01: questionChoices(["peg", "knife", "hammer", "tent", "firePit", "lantern", "sleepingBag", "chair"]),
  q02: questionChoices(["peg", "knife", "firePit", "hammer", "lantern", "tent", "sleepingBag", "chair"]),
  q03: questionChoices(["chair", "lantern", "peg", "knife", "firePit", "lantern", "sleepingBag", "chair"]),
  q04: questionChoices(["hammer", "peg", "tent", "knife", "firePit", "lantern", "sleepingBag", "chair"]),
  q05: questionChoices(["peg", "knife", "firePit", "hammer", "tent", "peg", "lantern", "tent"]),
  q06: questionChoices(["peg", "knife", "firePit", "hammer", "peg", "knife", "lantern", "tent"]),
  q07: questionChoices(["peg", "knife", "firePit", "hammer", "lantern", "tent", "sleepingBag", "chair"]),
  q08: questionChoices(["peg", "knife", "firePit", "hammer", "lantern", "tent", "sleepingBag", "chair"]),
  q09: questionChoices(["tent", "peg", "peg", "knife", "lantern", "tent", "chair", "firePit"]),
  q10: questionChoices(["tent", "knife", "hammer", "peg", "firePit", "lantern", "sleepingBag", "chair"]),
  q11: questionChoices(["tent", "peg", "hammer", "knife", "firePit", "lantern", "sleepingBag", "chair"]),
  q12: questionChoices(["peg", "knife", "sleepingBag", "chair", "lantern", "firePit", "lantern", "tent"]),
  q13: questionChoices(["tent", "peg", "hammer", "peg", "tent", "knife", "chair", "firePit"]),
  q14: questionChoices(["peg", "knife", "firePit", "hammer", "tent", "peg", "chair", "lantern"]),
  q15: questionChoices(["peg", "knife", "hammer", "tent", "lantern", "knife", "sleepingBag", "chair"]),
  q16: questionChoices(["peg", "knife", "firePit", "hammer", "lantern", "firePit", "sleepingBag", "chair"]),
  q17: questionChoices(["peg", "knife", "firePit", "hammer", "lantern", "firePit", "sleepingBag", "chair"]),
  q18: questionChoices(["knife", "peg", "firePit", "hammer", "lantern", "tent", "sleepingBag", "chair"]),
  q19: questionChoices(["knife", "peg", "firePit", "hammer", "chair", "lantern", "sleepingBag", "chair"]),
  q20: questionChoices(["knife", "peg", "firePit", "hammer", "lantern", "tent", "sleepingBag", "chair"]),
  q21: questionChoices(["tent", "peg", "knife", "peg", "lantern", "firePit", "sleepingBag", "chair"]),
  q22: questionChoices(["knife", "peg", "hammer", "firePit", "lantern", "tent", "sleepingBag", "chair"]),
  q23: questionChoices(["knife", "peg", "hammer", "tent", "tent", "lantern", "sleepingBag", "chair"]),
  q24: questionChoices(["knife", "peg", "hammer", "peg", "lantern", "firePit", "chair", "sleepingBag"]),
  q25: questionChoices(["knife", "peg", "hammer", "firePit", "tent", "lantern", "chair", "sleepingBag"]),
  q26: questionChoices(["knife", "peg", "hammer", "firePit", "tent", "lantern", "chair", "firePit"]),
  q27: questionChoices(["knife", "peg", "hammer", "firePit", "lantern", "tent", "chair", "sleepingBag"]),
  q28: questionChoices(["knife", "sleepingBag", "firePit", "hammer", "tent", "lantern", "chair", "sleepingBag"]),
  q29: questionChoices(["knife", "peg", "hammer", "tent", "tent", "lantern", "chair", "sleepingBag"]),
  q30: questionChoices(["knife", "peg", "hammer", "firePit", "tent", "peg", "chair", "sleepingBag"]),
  q31: questionChoices(["knife", "peg", "hammer", "firePit", "lantern", "firePit", "chair", "sleepingBag"]),
  q32: questionChoices(["hammer", "peg", "tent", "lantern", "knife", "peg", "chair", "sleepingBag"]),
};

/** Build the camp-gear quiz for one locale from the shared judgement data. */
export function createCampGearQuiz(
  locale: Locale,
  text: CampGearText,
): CampGearQuiz {
  return buildQuiz({
    id: CAMP_GEAR_QUIZ_ID,
    locale,
    questionIds: CAMP_GEAR_QUESTION_IDS,
    choiceIds: CAMP_GEAR_CHOICE_IDS,
    traitIds: CAMP_GEAR_TRAIT_IDS,
    resultTypeIds: CAMP_GEAR_RESULT_TYPE_IDS,
    typeTraitMap: CAMP_GEAR_TYPE_TRAIT_MAP,
    resultTypes: CAMP_GEAR_RESULT_TYPES,
    maxResultVariations: CAMP_GEAR_MAX_RESULT_VARIATIONS,
    categories: CAMP_GEAR_CATEGORIES,
    scoring: CAMP_GEAR_SCORING,
    text,
  });
}
