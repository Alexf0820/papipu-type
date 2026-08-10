import { describe, expect, it } from "vitest";

import {
  getStaticPageCopy,
  getStaticPagePath,
  STATIC_PAGE_IDS,
  STATIC_PAGE_LABELS,
} from "@/lib/legal/staticPages";

describe("staticPages", () => {
  it("exposes footer link paths for all static pages", () => {
    expect(STATIC_PAGE_IDS).toEqual(["about", "privacy", "terms", "contact"]);
    expect(getStaticPagePath("about")).toBe("/about");
    expect(getStaticPagePath("contact")).toBe("/contact");
  });

  it("provides ja/en footer labels", () => {
    expect(STATIC_PAGE_LABELS.ja.contact).toBe("お問い合わせ");
    expect(STATIC_PAGE_LABELS.en.privacy).toBe("Privacy");
  });

  it("uses Papipu Type branding in about copy", () => {
    expect(getStaticPageCopy("ja", "about").title).toBe("About Papipu Type");
    expect(getStaticPageCopy("en", "about").sections[0]?.paragraphs[0]).toContain(
      "Papipu Type",
    );
  });
});
