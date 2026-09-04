import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { SUSHI_QUIZ_ID } from "@/data/quizzes/sushi/definition";
import { isValidLocale } from "@/lib/locale";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";

const SUSHI_PATH = `/${SUSHI_QUIZ_ID}`;

export function generateStaticParams() {
  return getQuizLocales(SUSHI_QUIZ_ID).map((locale) => ({ locale }));
}

export default async function SushiPage({
  params,
}: PageProps<"/[locale]/sushi">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const quiz = getQuiz(SUSHI_QUIZ_ID, locale);
  if (!quiz) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <SiteHeader locale={locale} path={SUSHI_PATH} />
      <main className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">{quiz.title}</h1>
        <QuizFlow quiz={quiz} />
      </main>
    </div>
  );
}
