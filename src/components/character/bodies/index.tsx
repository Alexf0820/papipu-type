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

/** A-frame tent. */
export function TentBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 215) scale(0.48)">
      <rect
        x={96}
        y={360}
        width={320}
        height={20}
        rx={6}
        fill="#E8DCC8"
        stroke={OUTLINE}
        strokeWidth={8}
      />
      <path
        d="M 256 90 L 420 380 L 92 380 Z"
        fill="#14B8A6"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path
        d="M 256 90 L 256 380"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d="M 160 380 L 256 90 L 352 380"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </BodySvg>
  );
}

/** Camping lantern. */
export function LanternBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 235) scale(0.46)">
      <path
        d="M 220 110 L 220 90 Q 256 70 292 90 L 292 110"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <rect
        x={196}
        y={110}
        width={120}
        height={36}
        rx={10}
        fill="#FFB8D0"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <rect
        x={176}
        y={146}
        width={160}
        height={200}
        rx={28}
        fill="#FFF7ED"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <rect
        x={196}
        y={346}
        width={120}
        height={40}
        rx={12}
        fill="#FF4785"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <ellipse
        cx={256}
        cy={246}
        rx={56}
        ry={70}
        fill="#FDE68A"
        stroke={OUTLINE}
        strokeWidth={6}
      />
    </BodySvg>
  );
}

/** Folding camp chair. */
export function ChairBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 195) scale(0.5)">
      <path
        d="M 140 380 L 200 280 L 312 280 L 372 380"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 200 280 L 180 380 M 312 280 L 332 380"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <rect
        x={168}
        y={160}
        width={176}
        height={130}
        rx={20}
        fill="#FF4785"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <rect
        x={188}
        y={290}
        width={136}
        height={24}
        rx={8}
        fill="#FFB8D0"
        stroke={OUTLINE}
        strokeWidth={8}
      />
      <path
        d="M 168 160 L 148 380 M 344 160 L 364 380"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinecap="round"
      />
    </BodySvg>
  );
}

/** Fire pit bowl. */
export function FirePitBody({ face }: CharacterBodyProps) {
  return (
    <BodySvg face={face} faceTransform="translate(256 225) scale(0.48)">
      <ellipse
        cx={256}
        cy={400}
        rx={140}
        ry={28}
        fill="#E8DCC8"
        stroke={OUTLINE}
        strokeWidth={8}
      />
      <path
        d="M 120 280 L 140 380 L 372 380 L 392 280 Z"
        fill="#64748B"
        stroke={OUTLINE}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <ellipse
        cx={256}
        cy={280}
        rx={136}
        ry={36}
        fill="#475569"
        stroke={OUTLINE}
        strokeWidth={STROKE}
      />
      <path
        d="M 200 260 L 210 220 L 230 250 L 250 200 L 270 250 L 290 215 L 310 260"
        fill="#FF4785"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinejoin="round"
      />
      <path
        d="M 160 380 L 150 420 M 352 380 L 362 420"
        stroke={OUTLINE}
        strokeWidth={8}
        strokeLinecap="round"
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
