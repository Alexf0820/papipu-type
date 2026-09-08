import {
  ChairBody,
  FirePitBody,
  HammerBody,
  KnifeBody,
  LanternBody,
  PegBody,
  SleepingBagBody,
  TentBody,
  SpaghettiAglioOlioBody,
  SpaghettiArrabbiataBody,
  SpaghettiBologneseBody,
  SpaghettiCarbonaraBody,
  SpaghettiMushroomBody,
  SpaghettiPestoBody,
  SpaghettiSeafoodBody,
  SpaghettiSquidInkBody,
  SushiEelBody, SushiEggBody, SushiSalmonBody, SushiSalmonRoeBody, SushiShrimpBody, SushiSquidBody, SushiSushiRollBody, SushiTunaBody,
  IceCreamCaramelBody, IceCreamChocolateBody, IceCreamCookiesCreamBody, IceCreamMatchaBody, IceCreamRainbowBody, IceCreamSorbetBody, IceCreamStrawberryBody, IceCreamVanillaBody,
  DonutChocolateBody, DonutCinnamonBody, DonutCreamFilledBody, DonutGlazedBody, DonutMochiBody, DonutOldFashionedBody, DonutSprinkleBody, DonutStrawberryBody,
} from "@/components/character/bodies";

import type { VisualDefinition, VisualKey } from "./types";

/**
 * Visual registry. Result data references visualKey; this map resolves it to
 * a renderable body component. Swap entries here to change visuals without
 * touching quiz logic or result copy.
 */
const VISUALS: Record<VisualKey, VisualDefinition> = {
  "camp-gear-peg": { Body: PegBody },
  "camp-gear-tent": { Body: TentBody },
  "camp-gear-lantern": { Body: LanternBody },
  "camp-gear-chair": { Body: ChairBody },
  "camp-gear-firePit": { Body: FirePitBody },
  "camp-gear-sleepingBag": { Body: SleepingBagBody },
  "camp-gear-knife": { Body: KnifeBody },
  "camp-gear-hammer": { Body: HammerBody },
  "spaghetti-carbonara": { Body: SpaghettiCarbonaraBody },
  "spaghetti-bolognese": { Body: SpaghettiBologneseBody },
  "spaghetti-aglio-e-olio": { Body: SpaghettiAglioOlioBody },
  "spaghetti-pesto": { Body: SpaghettiPestoBody },
  "spaghetti-arrabbiata": { Body: SpaghettiArrabbiataBody },
  "spaghetti-seafood": { Body: SpaghettiSeafoodBody },
  "spaghetti-mushroom": { Body: SpaghettiMushroomBody },
  "spaghetti-squid-ink": { Body: SpaghettiSquidInkBody },
  "sushi-tuna": { Body: SushiTunaBody }, "sushi-salmon": { Body: SushiSalmonBody }, "sushi-shrimp": { Body: SushiShrimpBody }, "sushi-egg": { Body: SushiEggBody },
  "sushi-salmon-roe": { Body: SushiSalmonRoeBody }, "sushi-eel": { Body: SushiEelBody }, "sushi-sushi-roll": { Body: SushiSushiRollBody }, "sushi-squid": { Body: SushiSquidBody },
  "ice-cream-vanilla": { Body: IceCreamVanillaBody },
  "ice-cream-chocolate": { Body: IceCreamChocolateBody },
  "ice-cream-strawberry": { Body: IceCreamStrawberryBody },
  "ice-cream-matcha": { Body: IceCreamMatchaBody },
  "ice-cream-cookies-cream": { Body: IceCreamCookiesCreamBody },
  "ice-cream-caramel": { Body: IceCreamCaramelBody },
  "ice-cream-rainbow": { Body: IceCreamRainbowBody },
  "ice-cream-sorbet": { Body: IceCreamSorbetBody },
  "donut-glazed": { Body: DonutGlazedBody },
  "donut-chocolate": { Body: DonutChocolateBody },
  "donut-strawberry": { Body: DonutStrawberryBody },
  "donut-old-fashioned": { Body: DonutOldFashionedBody },
  "donut-sprinkle": { Body: DonutSprinkleBody },
  "donut-cream-filled": { Body: DonutCreamFilledBody },
  "donut-cinnamon": { Body: DonutCinnamonBody },
  "donut-mochi": { Body: DonutMochiBody },
};

export function getVisual(key: string): VisualDefinition | undefined {
  return VISUALS[key as VisualKey];
}

export function isVisualKey(key: string): key is VisualKey {
  return key in VISUALS;
}
