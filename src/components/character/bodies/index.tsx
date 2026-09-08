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
const SPAGHETTI_BODY_SRCS = {
  carbonara: "/characters/spaghetti-carbonara.png",
  bolognese: "/characters/spaghetti-bolognese.png",
  aglioOlio: "/characters/spaghetti-aglio-e-olio.png",
  pesto: "/characters/spaghetti-pesto.png",
  arrabbiata: "/characters/spaghetti-arrabbiata.png",
  seafood: "/characters/spaghetti-seafood.png",
  mushroom: "/characters/spaghetti-mushroom.png",
  squidInk: "/characters/spaghetti-squid-ink.png",
} as const;

const SUSHI_BODY_SRCS = {
  tuna: "/characters/sushi-tuna.jpg",
  salmon: "/characters/sushi-salmon.png",
  shrimp: "/characters/sushi-shrimp.png",
  egg: "/characters/sushi-egg.png",
  salmonRoe: "/characters/sushi-salmon-roe.png",
  eel: "/characters/sushi-eel.png",
  sushiRoll: "/characters/sushi-sushi-roll.png",
  squid: "/characters/sushi-squid.png",
} as const;

const ICE_CREAM_BODY_SRCS = {
  vanilla: "/characters/ice-cream-vanilla.png",
  chocolate: "/characters/ice-cream-chocolate.png",
  strawberry: "/characters/ice-cream-strawberry.png",
  matcha: "/characters/ice-cream-matcha.png",
  cookiesCream: "/characters/ice-cream-cookies-cream.png",
  caramel: "/characters/ice-cream-caramel.png",
  rainbow: "/characters/ice-cream-rainbow.png",
  sorbet: "/characters/ice-cream-sorbet.png",
} as const;

const DONUT_BODY_SRCS = {
  glazed: "/characters/donut-glazed.png",
  chocolate: "/characters/donut-chocolate.png",
  strawberry: "/characters/donut-strawberry.png",
  oldFashioned: "/characters/donut-old-fashioned.png",
  sprinkle: "/characters/donut-sprinkle.png",
  creamFilled: "/characters/donut-cream-filled.png",
  cinnamon: "/characters/donut-cinnamon.png",
  mochi: "/characters/donut-mochi.png",
} as const;

function SpaghettiBody({
  face,
  src,
  faceTransform,
}: CharacterBodyProps & { src: string; faceTransform: string }) {
  return (
    <BodySvg face={face} faceTransform={faceTransform}>
      <image
        href={src}
        x={0}
        y={0}
        width={512}
        height={512}
        preserveAspectRatio="xMidYMid meet"
      />
    </BodySvg>
  );
}

export function SpaghettiCarbonaraBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.carbonara} faceTransform="translate(257 264) scale(0.44)" />;
}

export function SpaghettiBologneseBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.bolognese} faceTransform="translate(255 264) scale(0.44)" />;
}

export function SpaghettiAglioOlioBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.aglioOlio} faceTransform="translate(255 264) scale(0.42)" />;
}

export function SpaghettiPestoBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.pesto} faceTransform="translate(256 264) scale(0.43)" />;
}

export function SpaghettiArrabbiataBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.arrabbiata} faceTransform="translate(256 268) scale(0.43)" />;
}

export function SpaghettiSeafoodBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.seafood} faceTransform="translate(258 275) scale(0.40)" />;
}

export function SpaghettiMushroomBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.mushroom} faceTransform="translate(256 270) scale(0.42)" />;
}

export function SpaghettiSquidInkBody({ face }: CharacterBodyProps) {
  return <SpaghettiBody face={face} src={SPAGHETTI_BODY_SRCS.squidInk} faceTransform="translate(256 267) scale(0.43)" />;
}

function SushiBody({ face, src, faceTransform }: CharacterBodyProps & { src: string; faceTransform: string }) {
  return <BodySvg face={face} faceTransform={faceTransform}><image href={src} x={0} y={0} width={512} height={512} preserveAspectRatio="xMidYMid meet" /></BodySvg>;
}

export function SushiTunaBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.tuna} faceTransform="translate(260 263) rotate(5) scale(0.42)" />; }
export function SushiSalmonBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.salmon} faceTransform="translate(260 263) rotate(5) scale(0.42)" />; }
export function SushiShrimpBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.shrimp} faceTransform="translate(250 258) rotate(4) scale(0.40)" />; }
export function SushiEggBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.egg} faceTransform="translate(255 258) scale(0.42)" />; }
export function SushiSalmonRoeBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.salmonRoe} faceTransform="translate(258 290) scale(0.41)" />; }
export function SushiEelBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.eel} faceTransform="translate(260 265) rotate(5) scale(0.42)" />; }
export function SushiSushiRollBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.sushiRoll} faceTransform="translate(255 276) scale(0.40)" />; }
export function SushiSquidBody({ face }: CharacterBodyProps) { return <SushiBody face={face} src={SUSHI_BODY_SRCS.squid} faceTransform="translate(260 264) rotate(5) scale(0.42)" />; }

function IceCreamBody({ face, src }: CharacterBodyProps & { src: string }) {
  return <BodySvg face={face} faceTransform="translate(256 365) scale(0.42)"><image href={src} x={0} y={0} width={512} height={512} preserveAspectRatio="xMidYMid meet" /></BodySvg>;
}

export function IceCreamVanillaBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.vanilla} />; }
export function IceCreamChocolateBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.chocolate} />; }
export function IceCreamStrawberryBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.strawberry} />; }
export function IceCreamMatchaBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.matcha} />; }
export function IceCreamCookiesCreamBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.cookiesCream} />; }
export function IceCreamCaramelBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.caramel} />; }
export function IceCreamRainbowBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.rainbow} />; }
export function IceCreamSorbetBody({ face }: CharacterBodyProps) { return <IceCreamBody face={face} src={ICE_CREAM_BODY_SRCS.sorbet} />; }

function DonutBody({ face, src, faceTransform = "translate(256 315) scale(0.42)" }: CharacterBodyProps & { src: string; faceTransform?: string }) {
  return <BodySvg face={face} faceTransform={faceTransform}><image href={src} x={0} y={0} width={512} height={512} preserveAspectRatio="xMidYMid meet" /></BodySvg>;
}

export function DonutGlazedBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.glazed} />; }
export function DonutChocolateBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.chocolate} faceTransform="translate(256 345) scale(0.42)" />; }
export function DonutStrawberryBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.strawberry} />; }
export function DonutOldFashionedBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.oldFashioned} />; }
export function DonutSprinkleBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.sprinkle} />; }
export function DonutCreamFilledBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.creamFilled} faceTransform="translate(245 300) scale(0.44)" />; }
export function DonutCinnamonBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.cinnamon} />; }
export function DonutMochiBody({ face }: CharacterBodyProps) { return <DonutBody face={face} src={DONUT_BODY_SRCS.mochi} faceTransform="translate(256 325) scale(0.42)" />; }

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
