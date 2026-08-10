"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackPageView } from "@/lib/analytics/events";
import { isValidLocale } from "@/lib/locale";

function resolveLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isValidLocale(segment) ? segment : "en";
}

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    trackPageView(pathname, resolveLocaleFromPathname(pathname));
  }, [pathname]);

  return null;
}
