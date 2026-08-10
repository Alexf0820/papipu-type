"use client";

import { trackRetryClick, trackShareClick } from "@/lib/analytics/events";
import { UI_LABELS } from "@/lib/brand/labels";
import type { Locale } from "@/lib/locale";
import {
  buildCampGearResultShareText,
  formatSharePayload,
} from "@/lib/share/buildResultShareText";
import { useShare } from "@/lib/share/useShare";
import { buildXShareUrl } from "@/lib/share/xShare";

type ResultActionsProps = {
  locale: Locale;
  displayName: string;
  quizTitle: string;
  quizId: string;
  resultType: string;
  onRetry: () => void;
};

const SHARE_BUTTON_CLASS =
  "w-full rounded-full bg-[#FF4785] px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-[#e63d75] active:scale-[0.99] touch-manipulation sm:w-auto sm:min-w-[220px] sm:px-8";
const RETRY_BUTTON_CLASS =
  "w-full rounded-full border border-pink-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-pink-50 active:scale-[0.99] touch-manipulation sm:w-auto sm:min-w-[220px] sm:px-8";

export function ResultActions({
  locale,
  displayName,
  quizTitle,
  quizId,
  resultType,
  onRetry,
}: ResultActionsProps) {
  const labels = UI_LABELS[locale];
  const { share, copied, copiedLabel } = useShare(locale);

  async function handleShare() {
    const url = window.location.href;
    const text = buildCampGearResultShareText(locale, displayName);
    const method = await share({ title: quizTitle, text, url });

    if (method === "native") {
      trackShareClick({
        locale,
        quiz_id: quizId,
        result_type: resultType,
        share_type: "native",
      });
      return;
    }

    if (method === "clipboard") {
      trackShareClick({
        locale,
        quiz_id: quizId,
        result_type: resultType,
        share_type: "copy",
      });
      return;
    }

    if (method === "cancelled") {
      return;
    }

    const xUrl = buildXShareUrl(formatSharePayload(text, url));
    window.open(xUrl, "_blank", "noopener,noreferrer");
    trackShareClick({
      locale,
      quiz_id: quizId,
      result_type: resultType,
      share_type: "x",
    });
  }

  function handleRetry() {
    trackRetryClick({ locale, quiz_id: quizId, result_type: resultType });
    onRetry();
  }

  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
      <button type="button" onClick={handleShare} className={SHARE_BUTTON_CLASS}>
        {copied ? copiedLabel : labels.shareResult}
      </button>
      <button type="button" onClick={handleRetry} className={RETRY_BUTTON_CLASS}>
        {labels.tryAgain}
      </button>
    </section>
  );
}
