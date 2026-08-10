import type {
  CampGearResultTypeId,
  CampGearTraitId,
} from "@/data/quizzes/camp-gear/definition";

import type { ResultVariationId } from "./types";

/**
 * Per-type trait groups for body variation (a / b / c).
 * Stored separately from display text so rules can change without touching copy.
 */
export type VariationTraitGroups = Record<
  ResultVariationId,
  readonly CampGearTraitId[]
>;

export const CAMP_GEAR_VARIATION_RULES: Record<
  CampGearResultTypeId,
  VariationTraitGroups
> = {
  peg: {
    a: ["supportive", "protective", "social"],
    b: ["action", "passionate"],
    c: ["logical", "peaceful", "relaxed"],
  },
  tent: {
    a: ["protective", "supportive"],
    b: ["social", "passionate"],
    c: ["logical", "peaceful", "relaxed", "action"],
  },
  lantern: {
    a: ["social", "protective", "supportive"],
    b: ["peaceful", "relaxed"],
    c: ["passionate", "action", "logical"],
  },
  chair: {
    a: ["relaxed"],
    b: ["peaceful", "social"],
    c: ["logical", "action", "supportive", "protective", "passionate"],
  },
  firePit: {
    a: ["social"],
    b: ["passionate", "action"],
    c: ["relaxed", "peaceful", "logical", "supportive", "protective"],
  },
  sleepingBag: {
    a: ["supportive", "protective"],
    b: ["peaceful", "social"],
    c: ["relaxed", "logical", "action", "passionate"],
  },
  knife: {
    a: ["logical"],
    b: ["relaxed", "peaceful"],
    c: ["social", "action", "passionate", "supportive", "protective"],
  },
  hammer: {
    a: ["action"],
    b: ["supportive", "protective", "social"],
    c: ["passionate", "logical", "relaxed", "peaceful"],
  },
};
