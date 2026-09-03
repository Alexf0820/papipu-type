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
};

export function getVisual(key: string): VisualDefinition | undefined {
  return VISUALS[key as VisualKey];
}

export function isVisualKey(key: string): key is VisualKey {
  return key in VISUALS;
}
