import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getGaMeasurementId,
  shouldLoadGoogleAnalytics,
} from "@/lib/analytics/config";

describe("analytics config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns undefined when GA ID is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");

    expect(getGaMeasurementId()).toBeUndefined();
    expect(shouldLoadGoogleAnalytics()).toBe(false);
  });

  it("loads analytics only when GA ID is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");

    expect(getGaMeasurementId()).toBe("G-TEST123");
    expect(shouldLoadGoogleAnalytics()).toBe(true);
  });
});
