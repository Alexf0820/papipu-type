"use client";

import { useEffect, useRef } from "react";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  getAdsenseClientId,
  getAdsenseSlotId,
  isAdsConfigured,
  shouldShowAdPlaceholders,
  type AdPlacement,
} from "@/lib/ads/config";
import type { Locale } from "@/lib/locale";

type AdSlotProps = {
  placement: AdPlacement;
  locale: Locale;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

function loadAdsenseScript(clientId: string) {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector('script[data-adsense-client="true"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.adsenseClient = "true";
  document.head.appendChild(script);
}

function AdSenseUnit({
  clientId,
  slotId,
  className = "",
}: {
  clientId: string;
  slotId: string;
  className?: string;
}) {
  const pushedRef = useRef(false);

  useEffect(() => {
    loadAdsenseScript(clientId);

    if (pushedRef.current) {
      return;
    }

    pushedRef.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore AdSense push failures when the script is still loading.
    }
  }, [clientId, slotId]);

  return (
    <div className={`mx-auto w-full max-w-3xl ${className}`.trim()}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdSlot({ placement, locale: _locale, className = "" }: AdSlotProps) {
  void _locale;

  const clientId = getAdsenseClientId();
  const slotId = getAdsenseSlotId(placement);

  if (isAdsConfigured(placement) && clientId && slotId) {
    return (
      <AdSenseUnit clientId={clientId} slotId={slotId} className={className} />
    );
  }

  if (shouldShowAdPlaceholders()) {
    return <AdPlaceholder responsive className={className} />;
  }

  return null;
}
