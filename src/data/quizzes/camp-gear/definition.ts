import type { Locale } from "@/lib/locale";
import {
  buildQuiz,
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

export const CAMP_GEAR_QUESTION_IDS = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
] as const;

export type CampGearQuestionId = (typeof CAMP_GEAR_QUESTION_IDS)[number];

export const CAMP_GEAR_CHOICE_IDS = ["a", "b", "c", "d"] as const;

export type CampGearChoiceId = (typeof CAMP_GEAR_CHOICE_IDS)[number];

export type CampGearQuiz = Quiz<CampGearResultTypeId, CampGearTraitId>;

export type CampGearText = QuizText<CampGearQuestionId, CampGearChoiceId>;

/** Phase 1 registers no variations — variation bodies are not implemented yet. */
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

/**
 * Judgement data shared by every locale. Never duplicate or vary this per
 * locale — locales supply display text only.
 */
export const CAMP_GEAR_SCORING: QuizScoringTable<
  CampGearQuestionId,
  CampGearChoiceId,
  CampGearResultTypeId,
  CampGearTraitId
> = {
  q1: {
    a: { mainType: "knife", mainScore: 2, traits: { logical: 2 } },
    b: { mainType: "hammer", mainScore: 2, traits: { action: 2 } },
    c: { mainType: "lantern", mainScore: 2, traits: { social: 2 } },
    d: { mainType: "chair", mainScore: 2, traits: { relaxed: 2 } },
  },
  q2: {
    a: { mainType: "knife", mainScore: 2, traits: { logical: 2 } },
    b: { mainType: "hammer", mainScore: 2, traits: { action: 2 } },
    c: {
      mainType: "tent",
      mainScore: 2,
      traits: { protective: 1, social: 1 },
    },
    d: {
      mainType: "sleepingBag",
      mainScore: 2,
      traits: { peaceful: 1, relaxed: 1 },
    },
  },
  q3: {
    a: {
      mainType: "firePit",
      mainScore: 2,
      traits: { passionate: 1, social: 1 },
    },
    b: {
      mainType: "lantern",
      mainScore: 2,
      traits: { social: 1, peaceful: 1 },
    },
    c: { mainType: "sleepingBag", mainScore: 2, traits: { peaceful: 2 } },
    d: {
      mainType: "chair",
      mainScore: 2,
      traits: { relaxed: 1, peaceful: 1 },
    },
  },
  q4: {
    a: { mainType: "peg", mainScore: 2, traits: { supportive: 2 } },
    b: {
      mainType: "knife",
      mainScore: 2,
      traits: { logical: 1, supportive: 1 },
    },
    c: { mainType: "hammer", mainScore: 2, traits: { action: 2 } },
    d: { mainType: "chair", mainScore: 2, traits: { relaxed: 2 } },
  },
  q5: {
    a: { mainType: "tent", mainScore: 2, traits: { protective: 2 } },
    b: {
      mainType: "peg",
      mainScore: 2,
      traits: { supportive: 1, logical: 1 },
    },
    c: {
      mainType: "firePit",
      mainScore: 2,
      traits: { passionate: 1, social: 1 },
    },
    d: { mainType: "sleepingBag", mainScore: 2, traits: { peaceful: 2 } },
  },
  q6: {
    a: {
      mainType: "peg",
      mainScore: 2,
      traits: { supportive: 1, logical: 1 },
    },
    b: { mainType: "firePit", mainScore: 2, traits: { passionate: 2 } },
    c: {
      mainType: "tent",
      mainScore: 2,
      traits: { protective: 1, supportive: 1 },
    },
    d: {
      mainType: "lantern",
      mainScore: 2,
      traits: { peaceful: 1, relaxed: 1 },
    },
  },
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
    resultTypes: CAMP_GEAR_RESULT_TYPES,
    maxResultVariations: CAMP_GEAR_MAX_RESULT_VARIATIONS,
    scoring: CAMP_GEAR_SCORING,
    text,
  });
}
