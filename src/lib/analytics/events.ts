import { GA_APP_NAME } from "@/lib/analytics/config";
import { sendGtagEvent } from "@/lib/analytics/gtag";
import type { Locale } from "@/lib/locale";

type QuizAnalyticsParams = {
  locale: Locale;
  quiz_id: string;
};

type ResultAnalyticsParams = QuizAnalyticsParams & {
  result_type: string;
};

const sentQuizResultKeys = new Set<string>();

export function trackPageView(pagePath: string, locale: Locale): void {
  sendGtagEvent("page_view", {
    app_name: GA_APP_NAME,
    locale,
    page_path: pagePath,
  });
}

export function trackQuizStart(params: QuizAnalyticsParams): void {
  sendGtagEvent("quiz_start", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    quiz_id: params.quiz_id,
  });
}

export function trackQuizResult(
  params: QuizAnalyticsParams & {
    result_type: string;
    variation_id: string;
  },
  dedupeKey?: string,
): void {
  if (dedupeKey) {
    if (sentQuizResultKeys.has(dedupeKey)) {
      return;
    }

    sentQuizResultKeys.add(dedupeKey);
  }

  sendGtagEvent("quiz_result", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    quiz_id: params.quiz_id,
    result_type: params.result_type,
    variation_id: params.variation_id,
  });
}

export type ShareType = "native" | "x" | "copy";

export function trackShareClick(
  params: ResultAnalyticsParams & { share_type: ShareType },
): void {
  sendGtagEvent("share_click", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    quiz_id: params.quiz_id,
    result_type: params.result_type,
    share_type: params.share_type,
  });
}

export function trackRetryClick(params: ResultAnalyticsParams): void {
  sendGtagEvent("retry_click", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    quiz_id: params.quiz_id,
    result_type: params.result_type,
  });
}

export type SupportType = "ofuse" | "buy_me_a_coffee";

export function trackSupportClick(params: {
  locale: Locale;
  support_type: SupportType;
}): void {
  sendGtagEvent("support_click", {
    app_name: GA_APP_NAME,
    locale: params.locale,
    support_type: params.support_type,
  });
}

/** @internal Test helper — clears quiz_result dedupe cache. */
export function resetQuizResultTrackingForTests(): void {
  sentQuizResultKeys.clear();
}
