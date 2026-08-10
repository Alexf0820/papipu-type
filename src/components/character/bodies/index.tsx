import type { ReactNode } from "react";

import type { CharacterBodyProps } from "../types";

const OUTLINE = "#202124";
const STROKE = 10;

function BodySvg({
  face,
  faceTransform,
  children,
}: CharacterBodyProps & {
  faceTransform: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {children}
      <g transform={faceTransform}>{face}</g>
    </svg>
  );
}

/** Tent peg — forged peg image asset (no SVG redraw). */
const PEG_BODY_SRC = "/characters/peg-body.jpg";

export function PegBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg
      face={face}
      faceTransform="translate(258 188) rotate(22) scale(0.43)"
    >
      <image
        href={PEG_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Tent — image asset (no SVG redraw). */
const TENT_BODY_SRC = "/characters/tent-body.jpg";

export function TentBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(335 248) rotate(3) scale(0.48)">
      <image
        href={TENT_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Lantern — image asset (no SVG redraw). */
const LANTERN_BODY_SRC = "/characters/lantern-body.jpg";

export function LanternBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 232) scale(0.62)">
      <image
        href={LANTERN_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Chair body — chappy image asset (no SVG redraw). */
const CHAIR_BODY_SRC = "/characters/chair-body.jpg";

export function ChairBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg
      face={face}
      faceTransform="translate(282 148) rotate(7) scale(0.46)"
    >
      <image
        href={CHAIR_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Fire pit body — ChatGPT image asset (no SVG redraw). */
const FIRE_PIT_BODY_SRC = "/characters/fire-pit-body.jpg";

export function FirePitBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 270) scale(0.44)">
      <image
        href={FIRE_PIT_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Sleeping bag — image asset (no SVG redraw). */
const SLEEPING_BAG_BODY_SRC = "/characters/sleeping-bag-body.jpg";

export function SleepingBagBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg
      face={face}
      faceTransform="translate(283 128) rotate(22) scale(0.44)"
    >
      <image
        href={SLEEPING_BAG_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Knife — image asset (no SVG redraw). */
const KNIFE_BODY_SRC = "/characters/knife-body.jpg";

export function KnifeBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg
      face={face}
      faceTransform="translate(294 298) rotate(29) scale(0.42)"
    >
      <image
        href={KNIFE_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

/** Hammer — image asset (no SVG redraw). */
const HAMMER_BODY_SRC = "/characters/hammer-body.jpg";

export function HammerBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg
      face={face}
      faceTransform="translate(290 279) rotate(30) scale(0.44)"
    >
      <image
        href={HAMMER_BODY_SRC}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}
