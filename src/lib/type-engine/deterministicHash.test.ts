import { describe, expect, it } from "vitest";

import {
  buildCanonicalAnswers,
  buildTypeHashInput,
  buildVariationHashInput,
  pickHashedCandidate,
  stableHash,
} from "@/lib/type-engine/deterministicHash";
import type { QuizSelection } from "@/lib/type-engine/types";

describe("stableHash", () => {
  it("returns the same value for the same input", () => {
    expect(stableHash("camp-gear|q01:a|q02:b")).toBe(
      stableHash("camp-gear|q01:a|q02:b"),
    );
  });

  it("returns different values for different inputs", () => {
    expect(stableHash("type|camp-gear|q01:a")).not.toBe(
      stableHash("variation|camp-gear|peg|q01:a"),
    );
  });
});

describe("buildCanonicalAnswers", () => {
  it("sorts by questionId regardless of answer order", () => {
    const forward: QuizSelection[] = [
      { questionId: "q03", choiceId: "c" },
      { questionId: "q01", choiceId: "a" },
      { questionId: "q02", choiceId: "b" },
    ];
    const reverse: QuizSelection[] = [
      { questionId: "q01", choiceId: "a" },
      { questionId: "q02", choiceId: "b" },
      { questionId: "q03", choiceId: "c" },
    ];

    expect(buildCanonicalAnswers(forward)).toBe("q01:a|q02:b|q03:c");
    expect(buildCanonicalAnswers(reverse)).toBe("q01:a|q02:b|q03:c");
  });
});

describe("hash salts", () => {
  const selections: QuizSelection[] = [{ questionId: "q01", choiceId: "a" }];

  it("uses separate salts for type and variation", () => {
    expect(buildTypeHashInput("camp-gear", selections)).toBe(
      "type|camp-gear|q01:a",
    );
    expect(buildVariationHashInput("camp-gear", "peg", selections)).toBe(
      "variation|camp-gear|peg|q01:a",
    );
  });
});

describe("pickHashedCandidate", () => {
  it("picks deterministically from sorted candidates", () => {
    const candidates = ["knife", "peg"] as const;
    const input = "type|camp-gear|q01:a|q02:b";

    expect(pickHashedCandidate(candidates, input)).toBe(
      pickHashedCandidate(["peg", "knife"], input),
    );
  });

  it("does not depend on declaration order of the input array", () => {
    const input = "type|camp-gear|q05:d|q12:a";
    const first = pickHashedCandidate(["tent", "peg", "knife"], input);
    const second = pickHashedCandidate(["knife", "peg", "tent"], input);

    expect(first).toBe(second);
  });
});
