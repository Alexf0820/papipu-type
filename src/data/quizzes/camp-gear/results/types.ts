import type { CampGearResultTypeId } from "@/data/quizzes/camp-gear/definition";
import type { ResultVariationId } from "@/lib/type-engine/variation";

export type { ResultVariationId } from "@/lib/type-engine/variation";

export type CompatibilityContent = {
  /** Result type id of the matched / mismatched character. */
  typeId: CampGearResultTypeId;
  reason: string;
};

export type ResultTypeContent = {
  displayName: string;
  /** Passed to the visual registry — never a direct file path. */
  visualKey: string;
  variations: Record<ResultVariationId, { body: string }>;
  good: CompatibilityContent;
  bad: CompatibilityContent;
  /** Three motto / philosophy candidates; one is picked at display time. */
  mottos: readonly [string, string, string];
};

export type CampGearResultContent = Record<
  CampGearResultTypeId,
  ResultTypeContent
>;
