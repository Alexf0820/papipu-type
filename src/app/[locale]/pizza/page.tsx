import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { PIZZA_QUIZ_ID } from "@/data/quizzes/pizza/definition";
import { isValidLocale } from "@/lib/locale";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";

const PIZZA_PATH = `/${PIZZA_QUIZ_ID}`;

export function generateStaticParams() {
  return getQuizLocales(PIZZA_QUIZ_ID).map((locale) => ({ locale }));
}

export default async function PizzaPage({
  params,
}: PageProps<"/[locale]/pizza">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const quiz = getQuiz(PIZZA_QUIZ_ID, locale);
  if (!quiz) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <SiteHeader locale={locale} path={PIZZA_PATH} />
      <main className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">{quiz.title}</h1>
        <QuizFlow quiz={quiz} />
      </main>
    </div>
  );
}
