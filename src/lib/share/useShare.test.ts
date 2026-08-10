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
  const expectedPayload = `${JA_SHARE_TEXT}\n${SHARE_URL}`;

  it("builds native share payload with URL once after the share text", () => {
    const { native } = buildSharePayloads(JA_SHARE_TEXT, SHARE_URL);

    expect(native).toBe(expectedPayload);
    expect(native.startsWith(JA_SHARE_TEXT)).toBe(true);
    expect(native.endsWith(SHARE_URL)).toBe(true);
    expect(native.match(/https:\/\/www\.papiputype\.com\/ja\/camp-gear/g)).toHaveLength(
      1,
    );
  });

  it("builds clipboard payload with URL once after the share text", () => {
    const { clipboard } = buildSharePayloads(JA_SHARE_TEXT, SHARE_URL);

    expect(clipboard).toBe(expectedPayload);
    expect(clipboard.startsWith(JA_SHARE_TEXT)).toBe(true);
    expect(clipboard.endsWith(SHARE_URL)).toBe(true);
    expect(clipboard.match(/https:\/\/www\.papiputype\.com\/ja\/camp-gear/g)).toHaveLength(
      1,
    );
  });

  it("uses the same completed payload for native share and clipboard", () => {
    const { native, clipboard } = buildSharePayloads(JA_SHARE_TEXT, SHARE_URL);

    expect(native).toBe(clipboard);
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
