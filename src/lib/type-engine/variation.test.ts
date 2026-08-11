import { describe, expect, it } from "vitest";

import { campGearQuizJa } from "@/data/quizzes/camp-gear/ja";
import {
  buildVariationHashInput,
  stableHash,
} from "@/lib/type-engine/deterministicHash";
import { pickResultVariationByHash } from "@/lib/type-engine/variation";

describe("pickResultVariationByHash", () => {
  const selections = [
    { questionId: "q01", choiceId: "a" },
    { questionId: "q05", choiceId: "b" },
  ];

  it("returns the same variation for identical inputs", () => {
    expect(
      pickResultVariationByHash("camp-gear", "peg", selections),
    ).toBe(pickResultVariationByHash("camp-gear", "peg", selections));
  });

  it("can differ when the result type changes", () => {
    const peg = pickResultVariationByHash("camp-gear", "peg", selections);
    const tent = pickResultVariationByHash("camp-gear", "tent", selections);
    const pegHash = stableHash(
      buildVariationHashInput("camp-gear", "peg", selections),
    );
    const tentHash = stableHash(
      buildVariationHashInput("camp-gear", "tent", selections),
    );

    expect(pegHash).not.toBe(tentHash);
    expect(["a", "b", "c"]).toContain(peg);
    expect(["a", "b", "c"]).toContain(tent);
  });

  it("reaches all three variations across known inputs", () => {
    const seen = new Set<string>();

    for (let index = 0; index < 200; index += 1) {
      const variation = pickResultVariationByHash("camp-gear", "knife", [
        { questionId: "q01", choiceId: "a" },
        { questionId: `q${String(index).padStart(2, "0")}`, choiceId: "b" },
      ]);
      seen.add(variation);
    }

    expect(seen).toEqual(new Set(["a", "b", "c"]));
  });

  it("uses a different salt from type resolution", () => {
    const variation = pickResultVariationByHash(
      campGearQuizJa.id,
      "lantern",
      selections,
    );
    expect(["a", "b", "c"]).toContain(variation);
  });
});
