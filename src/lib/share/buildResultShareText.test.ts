import { describe, expect, it } from "vitest";

import {
  buildCampGearResultShareText,
  formatSharePayload,
} from "@/lib/share/buildResultShareText";

describe("buildCampGearResultShareText", () => {
  it("builds Japanese share copy with type name and brand", () => {
    expect(buildCampGearResultShareText("ja", "ナイフ")).toBe(
      "私は「ナイフタイプ」でした！\nあなたはどのキャンプ道具タイプ？\n\nPAPIPU TYPE",
    );
  });

  it("builds English share copy with type name and brand", () => {
    expect(buildCampGearResultShareText("en", "Knife")).toBe(
      "I'm the Knife Type!\nWhat camping gear type are you?\n\nPAPIPU TYPE",
    );
  });
});

describe("formatSharePayload", () => {
  it("appends the page URL after the share text", () => {
    expect(
      formatSharePayload("I'm the Knife Type!", "https://example.com/en/camp-gear"),
    ).toBe("I'm the Knife Type!\nhttps://example.com/en/camp-gear");
  });
});
