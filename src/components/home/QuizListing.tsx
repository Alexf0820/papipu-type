import { ComingSoonCard } from "@/components/home/ComingSoonCard";
import { QuizCard } from "@/components/home/QuizCard";
import { HOME_COMING_SOON_CARD_COUNT, HOME_QUIZZES } from "@/lib/home/content";
import type { Locale } from "@/lib/locale";
import { getQuiz } from "@/lib/type-engine/registry";

type QuizListingProps = {
  locale: Locale;
};

export function QuizListing({ locale }: QuizListingProps) {
  const quizzes = HOME_QUIZZES.flatMap((entry) => {
    const quiz = getQuiz(entry.id, locale);
    if (!quiz) {
      return [];
    }

    return [
      {
        id: entry.id,
        title: quiz.title,
        description: entry.description[locale],
      },
    ];
  });

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          locale={locale}
          quizId={quiz.id}
          title={quiz.title}
          description={quiz.description}
        />
      ))}

      {Array.from({ length: HOME_COMING_SOON_CARD_COUNT }, (_, index) => (
        <ComingSoonCard key={`coming-soon-${index}`} locale={locale} index={index} />
      ))}
    </section>
  );
}
