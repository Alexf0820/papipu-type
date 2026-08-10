import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  resetQuizResultTrackingForTests,
  trackPageView,
  trackQuizResult,
  trackQuizStart,
  trackRetryClick,
  trackShareClick,
  trackSupportClick,
} from "@/lib/analytics/events";

describe("analytics events", () => {
  const gtag = vi.fn();

  beforeEach(() => {
    resetQuizResultTrackingForTests();
    gtag.mockClear();
    vi.stubGlobal("window", { gtag });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does not send events when GA ID is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");

    trackPageView("/ja", "ja");
    trackQuizStart({ locale: "ja", quiz_id: "camp-gear" });

    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends page_view with papipu_type app_name", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    trackPageView("/ja/camp-gear", "ja");

    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      app_name: "papipu_type",
      locale: "ja",
      page_path: "/ja/camp-gear",
    });
  });

  it("sends quiz_start with quiz_id and locale", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    trackQuizStart({ locale: "en", quiz_id: "camp-gear" });

    expect(gtag).toHaveBeenCalledWith("event", "quiz_start", {
      app_name: "papipu_type",
      locale: "en",
      quiz_id: "camp-gear",
    });
  });

  it("sends quiz_result once per dedupe key", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    const params = {
      locale: "ja" as const,
      quiz_id: "camp-gear",
      result_type: "peg",
      variation_id: "a",
    };

    trackQuizResult(params, "0:peg:a:[]");
    trackQuizResult(params, "0:peg:a:[]");

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "quiz_result", {
      app_name: "papipu_type",
      locale: "ja",
      quiz_id: "camp-gear",
      result_type: "peg",
      variation_id: "a",
    });
  });

  it("sends share_click with result_type and share_type", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    trackShareClick({
      locale: "ja",
      quiz_id: "camp-gear",
      result_type: "lantern",
      share_type: "copy",
    });

    expect(gtag).toHaveBeenCalledWith("event", "share_click", {
      app_name: "papipu_type",
      locale: "ja",
      quiz_id: "camp-gear",
      result_type: "lantern",
      share_type: "copy",
    });
  });

  it("sends retry_click with result_type", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    trackRetryClick({
      locale: "en",
      quiz_id: "camp-gear",
      result_type: "tent",
    });

    expect(gtag).toHaveBeenCalledWith("event", "retry_click", {
      app_name: "papipu_type",
      locale: "en",
      quiz_id: "camp-gear",
      result_type: "tent",
    });
  });

  it("sends support_click with support_type", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    trackSupportClick({ locale: "ja", support_type: "ofuse" });

    expect(gtag).toHaveBeenCalledWith("event", "support_click", {
      app_name: "papipu_type",
      locale: "ja",
      support_type: "ofuse",
    });
  });
});
