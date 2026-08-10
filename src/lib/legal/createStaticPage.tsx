import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { StaticPageView } from "@/components/StaticPageView";
import {
  createStaticPageMetadata,
  type StaticPageId,
} from "@/lib/legal/staticPages";
import { isValidLocale } from "@/lib/locale";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export function createStaticPage(pageId: StaticPageId) {
  async function generateMetadata({ params }: PageParams) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
      return {};
    }

    return createStaticPageMetadata(locale, pageId);
  }

  async function Page({ params }: PageParams) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
      notFound();
    }

    return (
      <div className="relative min-h-full bg-[#FFF8F0]">
        <div className="relative mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex-1">
            <StaticPageView locale={locale} pageId={pageId} />
          </div>
          <SiteFooter locale={locale} />
        </div>
      </div>
    );
  }

  return { generateMetadata, Page };
}
