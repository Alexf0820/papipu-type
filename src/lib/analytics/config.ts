/** GA4 app identifier — sent on every event. */
export const GA_APP_NAME = "papipu_type";

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return id || undefined;
}

/** Load gtag only when a measurement ID is configured. */
export function shouldLoadGoogleAnalytics(): boolean {
  return Boolean(getGaMeasurementId());
}
