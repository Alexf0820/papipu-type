import { FACE_EXPRESSIONS, type FaceExpression } from "@/components/character/types";

export function pickRandomFace(): FaceExpression {
  const index = Math.floor(Math.random() * FACE_EXPRESSIONS.length);
  return FACE_EXPRESSIONS[index];
}

export function pickRandomMottoIndex(): 0 | 1 | 2 {
  return Math.floor(Math.random() * 3) as 0 | 1 | 2;
}

/** Stable key so presentation randomness resets when the resolved result changes. */
export function resultPresentationKey(result: {
  typeId: string;
  variationId: string;
  debug: { selections: readonly { questionId: string; choiceId: string }[] };
}): string {
  return `${result.typeId}:${result.variationId}:${JSON.stringify(result.debug.selections)}`;
}
