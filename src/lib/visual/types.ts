import type { ComponentType } from "react";

import type { CharacterBodyProps } from "@/components/character/types";

/** Keys used by result data — never a direct asset path. */
export type VisualKey =
  | "camp-gear-peg"
  | "camp-gear-tent"
  | "camp-gear-lantern"
  | "camp-gear-chair"
  | "camp-gear-firePit"
  | "camp-gear-sleepingBag"
  | "camp-gear-knife"
  | "camp-gear-hammer"
  | "spaghetti-carbonara"
  | "spaghetti-bolognese"
  | "spaghetti-aglio-e-olio"
  | "spaghetti-pesto"
  | "spaghetti-arrabbiata"
  | "spaghetti-seafood"
  | "spaghetti-mushroom"
  | "spaghetti-squid-ink"
  | "sushi-tuna" | "sushi-salmon" | "sushi-shrimp" | "sushi-egg"
  | "sushi-salmon-roe" | "sushi-eel" | "sushi-sushi-roll" | "sushi-squid";

export type VisualDefinition = {
  /** SVG body today; WebP or animated SVG can replace this later. */
  Body: ComponentType<CharacterBodyProps>;
};
