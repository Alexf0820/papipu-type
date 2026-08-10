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
  | "camp-gear-hammer";

export type VisualDefinition = {
  /** SVG body today; WebP or animated SVG can replace this later. */
  Body: ComponentType<CharacterBodyProps>;
};
