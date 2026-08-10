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

export function useShare(locale: Locale) {
  const [copied, setCopied] = useState(false);
  const copiedLabel = UI_LABELS[locale].shareCopied;

  const share = useCallback(
    async ({ title, text, url }: ShareParams): Promise<ShareMethod> => {
      const absoluteUrl =
        url.startsWith("http") || typeof window === "undefined"
          ? url
          : `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
      const body = formatSharePayload(text, absoluteUrl);

      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        try {
          await navigator.share({ title, text: body, url: absoluteUrl });
          return "native";
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return "cancelled";
          }
        }
      }

      try {
        await navigator.clipboard.writeText(body);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return "clipboard";
      } catch {
        return "failed";
      }
    },
    [],
  );

  return { share, copied, copiedLabel };
}
