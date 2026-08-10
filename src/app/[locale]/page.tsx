import Link from "next/link";
import { notFound } from "next/navigation";

import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { isValidLocale } from "@/lib/locale";
import { getQuiz } from "@/lib/type-engine/registry";

export default async function LocaleHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const campGear = getQuiz(CAMP_GEAR_QUIZ_ID, locale);

  return (
    <main className="coming-soon">
      <h1>Papipu Type</h1>
      <p className="tagline">What type are you?</p>
      <p>Coming soon.</p>
      {campGear ? (
        <p>
          <Link href={`/${locale}/${CAMP_GEAR_QUIZ_ID}`}>{campGear.title}</Link>
        </p>
      ) : null}
      <small>Project PapipupePopcorn</small>
    </main>
  );
}
