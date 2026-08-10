import { GA_APP_NAME } from "@/lib/analytics/config";
import { sendGtagEvent } from "@/lib/analytics/gtag";
import type { Locale } from "@/lib/locale";

export type ShareType = "native" | "x" | "copy";

type ResultAnalyticsParams = {
  locale: Locale;
  quiz_id?: string;
};

export function trackShareClick(
  params: ResultAnalyticsParams & { share_type: ShareType },
): void {
  sendGtagEvent("share_click", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    share_type: params.share_type,
    ...(params.quiz_id ? { quiz_id: params.quiz_id } : {}),
  });
}

export function trackRetryClick(params: ResultAnalyticsParams): void {
  sendGtagEvent("retry_click", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    ...(params.quiz_id ? { quiz_id: params.quiz_id } : {}),
  });
}
