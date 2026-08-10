import type { VisualKey } from "@/lib/visual/types";

export const DEV_CHARACTER_IDS = [
  "peg",
  "tent",
  "lantern",
  "chair",
  "firePit",
  "sleepingBag",
  "knife",
  "hammer",
] as const;

export type DevCharacterId = (typeof DEV_CHARACTER_IDS)[number];

export type DevCharacterEntry = {
  id: DevCharacterId;
  visualKey: VisualKey;
};

/** Dev preview slug → visual registry key. */
export const DEV_CHARACTERS: readonly DevCharacterEntry[] =
  DEV_CHARACTER_IDS.map((id) => ({
    id,
    visualKey: `camp-gear-${id}` as VisualKey,
  }));

export function isDevCharacterId(id: string): id is DevCharacterId {
  return (DEV_CHARACTER_IDS as readonly string[]).includes(id);
}

export function getDevCharacter(id: string): DevCharacterEntry | undefined {
  return DEV_CHARACTERS.find((entry) => entry.id === id);
}

/** Dev-only routes return 404 in production builds. */
export function isDevPreviewEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}
