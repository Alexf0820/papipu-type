import { afterEach, describe, expect, it, vi } from "vitest";

import { copyTextToClipboard } from "@/lib/share/useShare";

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
