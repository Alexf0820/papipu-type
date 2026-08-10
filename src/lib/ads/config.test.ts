import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getAdsenseClientId,
  getAdsenseSlotId,
  isAdsConfigured,
  shouldShowAdPlaceholders,
} from "@/lib/ads/config";

describe("ads config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns undefined when AdSense env vars are unset", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_SLOT_HOME", "");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_SLOT_RESULT", "");

    expect(getAdsenseClientId()).toBeUndefined();
    expect(getAdsenseSlotId("home")).toBeUndefined();
    expect(getAdsenseSlotId("result")).toBeUndefined();
  });

  it("requires enabled flag and both client and slot ids", () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID", "ca-pub-test");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_SLOT_HOME", "111");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_SLOT_RESULT", "222");

    expect(isAdsConfigured("home")).toBe(true);
    expect(isAdsConfigured("result")).toBe(true);
  });

  it("does not enable ads when the enabled flag is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID", "ca-pub-test");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_SLOT_HOME", "111");

    expect(isAdsConfigured("home")).toBe(false);
  });

  it("shows placeholders in development by default", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_AD_PLACEHOLDERS_ENABLED", "");

    expect(shouldShowAdPlaceholders()).toBe(true);
  });

  it("hides placeholders in production when unset", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_AD_PLACEHOLDERS_ENABLED", "");

    expect(shouldShowAdPlaceholders()).toBe(false);
  });
});
