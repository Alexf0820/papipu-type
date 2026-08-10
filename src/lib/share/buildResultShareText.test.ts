import { describe, expect, it } from "vitest";

import {
  buildCampGearResultShareText,
  buildQuizStartPath,
  formatSharePayload,
} from "@/lib/share/buildResultShareText";

describe("buildCampGearResultShareText", () => {
  it("builds Japanese share copy with type name", () => {
    expect(buildCampGearResultShareText("ja", "ナイフ")).toBe(
      "私のパピプは「ナイフタイプ」でした！🍿\nあなたもパピプってみる？",
    );
  });

  it("builds English share copy with type name", () => {
    expect(buildCampGearResultShareText("en", "Knife")).toBe(
      "My Papipu is the Knife type! 🍿\nWhat's your Papipu?",
    );
  });
});

describe("buildQuizStartPath", () => {
  it("points to the quiz entry URL for the locale", () => {
    expect(buildQuizStartPath("ja", "camp-gear")).toBe("/ja/camp-gear");
    expect(buildQuizStartPath("en", "camp-gear")).toBe("/en/camp-gear");
  });
});

describe("formatSharePayload", () => {
  it("appends the quiz start URL after the share text", () => {
    expect(
      formatSharePayload(
        "My Papipu is the Knife type! 🍿",
        "https://example.com/en/camp-gear",
      ),
    ).toBe("My Papipu is the Knife type! 🍿\nhttps://example.com/en/camp-gear");
  });
});
