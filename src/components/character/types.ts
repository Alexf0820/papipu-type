import type { ReactNode } from "react";

export type FaceExpression = "smile" | "sweat-smile" | "noon";

export const FACE_EXPRESSIONS: readonly FaceExpression[] = [
  "smile",
  "sweat-smile",
  "noon",
];

export type CharacterBodyProps = {
  face: ReactNode;
};
