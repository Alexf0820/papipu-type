import type { FaceExpression } from "./types";

type CharacterFaceProps = {
  expression: FaceExpression;
};

/** Papipu Type official Face Base ver.1 — no face outline, parts only. */
export function CharacterFace({ expression }: CharacterFaceProps) {
  if (expression === "noon") {
    return (
      <g>
        <path
          d="M -38 -19 L -14 -19"
          stroke="#202124"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 14 -19 L 38 -19"
          stroke="#202124"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M -30 5 L -18 5"
          stroke="#202124"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 18 5 L 30 5"
          stroke="#202124"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 0 15 C -6 23 -8 31 -8 38"
          stroke="#202124"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M -26 57 L 26 57"
          stroke="#202124"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <ellipse
          cx={-52}
          cy={38}
          rx={16}
          ry={9}
          fill="#F6BFC0"
          opacity={0.85}
        />
        <ellipse
          cx={52}
          cy={38}
          rx={16}
          ry={9}
          fill="#F6BFC0"
          opacity={0.85}
        />
      </g>
    );
  }

  return (
    <g>
      <circle cx={-32} cy={-17} r={10} fill="#202124" />
      <circle cx={32} cy={-17} r={10} fill="#202124" />
      <path
        d="M -28 19 C -15 35 15 35 28 19"
        stroke="#202124"
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={-54} cy={15} rx={14} ry={8} fill="#F6BFC0" opacity={0.9} />
      <ellipse cx={54} cy={15} rx={14} ry={8} fill="#F6BFC0" opacity={0.9} />
      {expression === "sweat-smile" ? (
        <path
          d="M 55 -54 C 62 -46 66 -39 66 -33 C 66 -25 61 -20 54 -20 C 47 -20 42 -25 42 -33 C 42 -39 46 -46 55 -54 Z"
          fill="#8ED2F4"
          stroke="#202124"
          strokeWidth={4.5}
        />
      ) : null}
    </g>
  );
}
