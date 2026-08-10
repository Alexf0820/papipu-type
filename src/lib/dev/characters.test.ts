import { describe, expect, it } from "vitest";

import {
  DEV_CHARACTER_IDS,
  DEV_CHARACTERS,
  getDevCharacter,
  isDevCharacterId,
} from "@/lib/dev/characters";
import { getVisual } from "@/lib/visual/registry";

describe("dev character preview config", () => {
  it("lists all eight camp-gear characters", () => {
    expect(DEV_CHARACTER_IDS).toHaveLength(8);
    expect(DEV_CHARACTERS).toHaveLength(8);
  });

  it("maps each slug to a registered visual", () => {
    for (const entry of DEV_CHARACTERS) {
      expect(isDevCharacterId(entry.id)).toBe(true);
      expect(getDevCharacter(entry.id)).toEqual(entry);
      expect(getVisual(entry.visualKey)?.Body).toBeTypeOf("function");
    }
  });
});
