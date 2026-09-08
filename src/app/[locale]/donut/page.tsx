import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { DONUT_QUIZ_ID } from "@/data/quizzes/donut/definition";
import { isValidLocale } from "@/lib/locale";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";

const DONUT_PATH = `/${DONUT_QUIZ_ID}`;

export function generateStaticParams() {
  return getQuizLocales(DONUT_QUIZ_ID).map((locale) => ({ locale }));
}

export default async function DonutPage({
  params,
}: PageProps<"/[locale]/donut">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const quiz = getQuiz(DONUT_QUIZ_ID, locale);
  if (!quiz) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <SiteHeader locale={locale} path={DONUT_PATH} />
      <main className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">{quiz.title}</h1>
        <QuizFlow quiz={quiz} />
      </main>
    </div>
  );
}
