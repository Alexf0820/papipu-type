import { getGaMeasurementId } from "@/lib/analytics/config";

type GtagCommand = "config" | "event" | "js" | "set";

type GtagFn = (
  command: GtagCommand,
  targetOrEventName: string | Date,
  params?: Record<string, string>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function sendGtagEvent(
  eventName: string,
  params: Record<string, string>,
): void {
  if (typeof window === "undefined" || !getGaMeasurementId()) {
    return;
  }

  window.gtag?.("event", eventName, params);
}
