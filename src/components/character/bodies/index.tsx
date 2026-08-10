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

/** Tent peg Ver.3 — Ver.2 with subtler ridge accent, no ground ellipse. */
export function PegBody({ face }: CharacterBodyProps) {
  const PINK = "#FF4785";
  const PALE = "#FFB8D0";

  return (
    <BodySvg face={face} faceTransform="translate(256 252) scale(0.54)">
      {/* Hammer head — flat striking surface */}
      <rect
        x={162}
        y={74}
        width={188}
        height={46}
        rx={14}
        fill={PINK}
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />

      {/* Head underside band */}
      <rect
        x={172}
        y={114}
        width={168}
        height={24}
        rx={10}
        fill={PALE}
        stroke={OUTLINE}
        strokeWidth={8}
      />

      {/* Rope hook — left side, clear of face / sweat (upper-right) */}
      <path
        d="M 162 96
           C 108 96 92 136 96 168
           C 100 198 128 208 148 192
           L 168 172
           C 148 182 124 172 122 148
           C 120 124 136 108 158 108
           L 162 108
           Z"
        fill={PALE}
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />

      {/* Shaft — slightly wider than a real peg so the face reads well */}
      <rect
        x={214}
        y={132}
        width={84}
        height={272}
        rx={24}
        fill={PINK}
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />

      {/* Forged ridge accent — slightly narrower than Ver.2 */}
      <rect
        x={245}
        y={152}
        width={22}
        height={232}
        rx={10}
        fill={PALE}
      />

      {/* Ground-penetrating tip */}
      <path
        d="M 214 404
           L 256 448
           L 298 404
           Z"
        fill={PINK}
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    </BodySvg>
  );
}

/** Tent Ver.2 — simple triangle camping tent. */
export function TentBody({ face }: CharacterBodyProps) {
  const ORANGE = "#D97742";
  const SAND = "#F0E6D2";
  const BASE = "#E8DCC8";

  return (
    <BodySvg face={face} faceTransform="translate(256 228) scale(0.50)">
      {/* Ground base edge */}
      <rect
        x={100}
        y={388}
        width={312}
        height={14}
        rx={7}
        fill={BASE}
        stroke={OUTLINE}
        strokeWidth={8}
      />

      {/* Main tent triangle */}
      <path
        d="M 256 76 L 404 384 L 108 384 Z"
        fill={ORANGE}
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />

      {/* Entrance — sand panel */}
      <path
        d="M 218 384
           L 218 318
           Q 256 296 294 318
           L 294 384
           Z"
        fill={SAND}
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinejoin="round"
      />
    </BodySvg>
  );
}

/** Camping lantern Ver.2 — outdoor green camping lantern silhouette. */
export function LanternBody({ face }: CharacterBodyProps) {
  const GREEN = "#3D8B5E";
  const CREAM = "#F5F0E6";
  const GLOW = "#FFF0A8";

  return (
    <BodySvg face={face} faceTransform="translate(256 258) scale(0.52)">
      {/* Simple U handle */}
      <path
        d="M 178 108
           Q 178 38 256 32
           Q 334 38 334 108
           L 318 108
           Q 318 50 256 46
           Q 194 50 194 108
           Z"
        fill={CREAM}
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />

      {/* Stable base */}
      <rect
        x={156}
        y={372}
        width={200}
        height={40}
        rx={16}
        fill={GREEN}
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <rect
        x={176}
        y={356}
        width={160}
        height={24}
        rx={10}
        fill={GREEN}
        stroke={OUTLINE}
        strokeWidth={8}
      />

      {/* Main body housing */}
      <rect
        x={164}
        y={152}
        width={184}
        height={210}
        rx={34}
        fill={CREAM}
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />

      {/* Glow chamber — enlarged pale yellow panel for the face */}
      <ellipse
        cx={256}
        cy={258}
        rx={74}
        ry={88}
        fill={GLOW}
        stroke={OUTLINE}
        strokeWidth={8}
      />

      {/* Top umbrella / cap */}
      <path
        d="M 148 152
           Q 148 108 256 94
           Q 364 108 364 152
           L 344 168
           Q 256 150 168 168
           Z"
        fill={GREEN}
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    </BodySvg>
  );
}

/** Chair body — chappy image asset (no SVG redraw). */
const CHAIR_BODY_SRC = "/characters/chair-body.jpg";

export function ChairBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 178) scale(0.47)">
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

/** Mummy sleeping bag. */
export function SleepingBagBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(290 195) scale(0.44)">
      <path
        d="M 120 320 Q 120 180 200 140 Q 280 110 360 140 Q 420 170 420 320 Q 420 380 256 390 Q 92 380 120 320 Z"
        fill="#14B8A6"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path
        d="M 200 140 Q 256 120 312 140"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <ellipse
        cx={256}
        cy={300}
        rx={80}
        ry={50}
        fill="#5EEAD4"
        stroke={OUTLINE}
        strokeWidth={6}
      />
    </BodySvg>
  );
}

/** Camping knife. */
export function KnifeBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(230 250) scale(0.42)">
      <rect
        x={280}
        y={300}
        width={56}
        height={120}
        rx={16}
        fill="#FFB8D0"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        transform="rotate(-30 308 360)"
      />
      <path
        d="M 180 380 L 300 160 L 340 200 L 220 420 Z"
        fill="#E2E8F0"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path
        d="M 300 160 L 340 200 L 360 180 L 320 140 Z"
        fill="#CBD5E1"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinejoin="round"
      />
    </BodySvg>
  );
}

/** Camp hammer. */
export function HammerBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 205) scale(0.48)">
      <rect
        x={236}
        y={240}
        width={40}
        height={180}
        rx={12}
        fill="#FFB8D0"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <rect
        x={140}
        y={150}
        width={232}
        height={100}
        rx={24}
        fill="#64748B"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <rect
        x={160}
        y={170}
        width={192}
        height={60}
        rx={12}
        fill="#94A3B8"
        stroke={OUTLINE}
        strokeWidth={6}
      />
    </BodySvg>
  );
}
