import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildSharePayloads,
  copyTextToClipboard,
} from "@/lib/share/useShare";

function mockDocument(execCommandResult: boolean) {
  const textarea = {
    value: "",
    style: {} as CSSStyleDeclaration,
    focus: vi.fn(),
    select: vi.fn(),
    setAttribute: vi.fn(),
    setSelectionRange: vi.fn(),
  };

  return {
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    },
    createElement: vi.fn(() => textarea),
    execCommand: vi.fn(() => execCommandResult),
  };
}

const JA_SHARE_TEXT =
  "私のパピプは「ハンマータイプ」でした！🍿\nあなたもパピプってみる？";
const SHARE_URL = "https://www.papiputype.com/ja/camp-gear";

describe("buildSharePayloads", () => {
  it("passes share text without URL for native share", () => {
    const { native } = buildSharePayloads(JA_SHARE_TEXT, SHARE_URL);

    expect(native.text).toBe(JA_SHARE_TEXT);
    expect(native.url).toBe(SHARE_URL);
    expect(native.text).not.toContain("https://");
  });

  it("includes the URL once in clipboard fallback text", () => {
    const { clipboard } = buildSharePayloads(JA_SHARE_TEXT, SHARE_URL);

    expect(clipboard).toBe(`${JA_SHARE_TEXT}\n${SHARE_URL}`);
    expect(clipboard.match(/https:\/\/www\.papiputype\.com\/ja\/camp-gear/g)).toHaveLength(
      1,
    );
  });
});

describe("copyTextToClipboard", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses Clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    await expect(copyTextToClipboard("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
  });

  it("falls back to execCommand when Clipboard API fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("blocked"));
    const doc = mockDocument(true);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    vi.stubGlobal("document", doc);

    await expect(copyTextToClipboard("fallback text")).resolves.toBe(true);
    expect(doc.execCommand).toHaveBeenCalledWith("copy");
  });

  it("returns false when every copy method fails", async () => {
    const doc = mockDocument(false);
    vi.stubGlobal("navigator", {});
    vi.stubGlobal("document", doc);

    await expect(copyTextToClipboard("nope")).resolves.toBe(false);
  });
});
