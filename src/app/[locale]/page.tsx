import { notFound } from "next/navigation";

import { AdSlot } from "@/components/AdSlot";
import { HomeHero } from "@/components/home/HomeHero";
import { HomePageDecorations } from "@/components/home/HomePageDecorations";
import { QuizListing } from "@/components/home/QuizListing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isValidLocale } from "@/lib/locale";

export default async function LocaleHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-svh bg-gradient-to-b from-[#fff8f0] via-pink-50/35 to-white">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        <HomePageDecorations />
        <SiteHeader locale={locale} path="" />
        <main className="relative z-10 space-y-8 sm:space-y-10">
          <HomeHero locale={locale} />
          <QuizListing locale={locale} />
          <div className="mt-2 sm:mt-4">
            <AdSlot placement="home" locale={locale} />
          </div>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
