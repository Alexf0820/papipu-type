import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { CAMP_GEAR_QUIZ_ID } from "@/data/quizzes/camp-gear/definition";
import { isValidLocale } from "@/lib/locale";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";

const CAMP_GEAR_PATH = `/${CAMP_GEAR_QUIZ_ID}`;

export function generateStaticParams() {
  return getQuizLocales(CAMP_GEAR_QUIZ_ID).map((locale) => ({ locale }));
}

export default async function CampGearPage({
  params,
}: PageProps<"/[locale]/camp-gear">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const quiz = getQuiz(CAMP_GEAR_QUIZ_ID, locale);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <SiteHeader locale={locale} path={CAMP_GEAR_PATH} />
      <main className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
          {quiz.title}
        </h1>
        <QuizFlow quiz={quiz} />
      </main>
    </div>
  );
}
