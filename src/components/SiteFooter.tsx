import { ParentProjectLink } from "@/components/ParentProjectLink";
import type { Locale } from "@/lib/locale";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  void locale;

  return (
    <footer className="mt-12 border-t border-pink-100/80 pt-6 text-center">
      <ParentProjectLink className="text-xs font-semibold tracking-wide text-orange-400 transition hover:text-orange-500 hover:underline" />
    </footer>
  );
}
