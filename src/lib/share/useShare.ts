"use client";

import { useCallback, useState } from "react";

import { UI_LABELS } from "@/lib/brand/labels";
import type { Locale } from "@/lib/locale";

import { formatSharePayload } from "./buildResultShareText";

export type ShareParams = {
  title: string;
  text: string;
  url: string;
};

export type ShareMethod = "native" | "clipboard" | "cancelled" | "failed";

/** @internal Exported for unit tests. */
export function buildSharePayloads(shareText: string, absoluteUrl: string) {
  const payload = formatSharePayload(shareText, absoluteUrl);
  return { native: payload, clipboard: payload };
}

/** @internal Exported for unit tests. */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Clipboard API can fail on non-secure origins (e.g. LAN dev over HTTP).
    }
  }

  if (typeof document === "undefined") {
    return false;
  }

  // execCommand fallback — positioned for iOS Safari over HTTP (LAN dev).
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "2em";
  textarea.style.height = "2em";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    if (typeof textarea.setSelectionRange === "function") {
      textarea.setSelectionRange(0, text.length);
    }
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export function useShare(locale: Locale) {
  const [copied, setCopied] = useState(false);
  const copiedLabel = UI_LABELS[locale].shareCopied;

  const share = useCallback(
    async ({ title, text, url }: ShareParams): Promise<ShareMethod> => {
      const absoluteUrl =
        url.startsWith("http") || typeof window === "undefined"
          ? url
          : `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
      const { native, clipboard } = buildSharePayloads(text, absoluteUrl);

      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        try {
          await navigator.share({ title, text: native });
          return "native";
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return "cancelled";
          }
        }
      }

      if (await copyTextToClipboard(clipboard)) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return "clipboard";
      }

      return "failed";
    },
    [],
  );

  return { share, copied, copiedLabel };
}
