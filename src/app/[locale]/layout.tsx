import { notFound } from "next/navigation";

import { isValidLocale } from "@/lib/locale";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <>{children}</>;
}
