"use client";

import { trackSupportClick } from "@/lib/analytics/events";
import { SUPPORT_LINKS } from "@/lib/analytics/support";
import type { Locale } from "@/lib/locale";

type SupportLinkProps = {
  locale: Locale;
  className?: string;
  children: React.ReactNode;
};

export function SupportLink({ locale, className, children }: SupportLinkProps) {
  const { href, supportType } = SUPPORT_LINKS[locale];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackSupportClick({ locale, support_type: supportType })
      }
    >
      {children}
    </a>
  );
}
