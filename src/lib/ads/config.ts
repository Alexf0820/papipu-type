export type AdPlacement = "home" | "result";

export type AdPlaceholderSize = "leaderboard" | "rectangle" | "mobile";

function readEnvFlag(name: string): boolean | undefined {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return undefined;
  }
  return value === "1" || value === "true";
}

export function getAdsenseClientId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  return id || undefined;
}

export function getAdsenseSlotId(placement: AdPlacement): string | undefined {
  const envKey =
    placement === "home"
      ? "NEXT_PUBLIC_ADSENSE_SLOT_HOME"
      : "NEXT_PUBLIC_ADSENSE_SLOT_RESULT";
  const id = process.env[envKey]?.trim();
  return id || undefined;
}

/** Whether a placement is configured for live AdSense rendering. */
export function isAdsConfigured(placement: AdPlacement): boolean {
  if (readEnvFlag("NEXT_PUBLIC_ADS_ENABLED") !== true) {
    return false;
  }

  return Boolean(getAdsenseClientId() && getAdsenseSlotId(placement));
}

/**
 * Dev / verification placeholder boxes.
 * Default: on in development, off in production when unset.
 */
export function shouldShowAdPlaceholders(): boolean {
  const placeholders = readEnvFlag("NEXT_PUBLIC_AD_PLACEHOLDERS_ENABLED");
  if (placeholders === false) {
    return false;
  }
  if (placeholders === true) {
    return true;
  }

  return process.env.NODE_ENV === "development";
}
