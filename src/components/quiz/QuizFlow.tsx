"use client";

import { useState } from "react";

import { UI_LABELS } from "@/lib/brand/labels";
import { aggregateQuizScores } from "@/lib/type-engine/scoring";
import type { Quiz, QuizSelection } from "@/lib/type-engine/types";

type QuizFlowProps = {
  quiz: Quiz;
};

/**
 * question id -> chosen choice id. Keyed by question so that re-answering
 * replaces the previous answer instead of adding a second one.
 */
type AnswerMap = Record<string, string>;

/** Box metrics stay identical between states so going back never shifts layout. */
const CHOICE_CLASS =
  "w-full rounded-2xl px-5 py-4 text-left text-[15px] font-semibold text-slate-700 ring-1 transition sm:text-base";
const CHOICE_UNSELECTED_CLASS = "bg-white ring-pink-100 hover:bg-pink-50";
const CHOICE_SELECTED_CLASS = "bg-pink-50 ring-pink-500";

/** Answers in question order, skipping questions that are still unanswered. */
function toSelections(quiz: Quiz, answers: AnswerMap): QuizSelection[] {
  return quiz.questions
    .filter((question) => answers[question.id] !== undefined)
    .map((question) => ({
      questionId: question.id,
      choiceId: answers[question.id],
    }));
}

export function QuizFlow({ quiz }: QuizFlowProps) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const totalQuestions = quiz.questions.length;
  const question = quiz.questions[questionIndex];

  if (!question) {
    const selections = toSelections(quiz, answers);
    const scores = aggregateQuizScores(quiz, selections);

    // Phase 1 stops here: the result screen, result copy and character SVGs
    // are not implemented yet, so only raw engine output is shown.
    return (
      <section className="space-y-3">
        <pre className="overflow-x-auto rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 ring-1 ring-slate-200">
          {JSON.stringify(
            {
              quizId: quiz.id,
              locale: quiz.locale,
              selections,
              topType: scores.typeRanking[0],
              typeRanking: scores.typeRanking,
              traitRanking: scores.traitRanking,
            },
            null,
            2,
          )}
        </pre>
      </section>
    );
  }

  function handleSelect(choiceId: string) {
    setAnswers((current) => ({ ...current, [question.id]: choiceId }));
    setQuestionIndex((current) => current + 1);
  }

  function handleBack() {
    setQuestionIndex((current) => Math.max(0, current - 1));
  }

  return (
    <section className="space-y-5">
      <p className="text-sm font-semibold tabular-nums text-slate-400">
        {questionIndex + 1} / {totalQuestions}
      </p>
      <h2 className="text-xl font-extrabold leading-snug text-slate-800 sm:text-2xl">
        {question.text}
      </h2>
      <ul className="space-y-3">
        {question.choices.map((choice) => (
          <li key={choice.id}>
            <button
              type="button"
              onClick={() => handleSelect(choice.id)}
              className={`${CHOICE_CLASS} ${
                answers[question.id] === choice.id
                  ? CHOICE_SELECTED_CLASS
                  : CHOICE_UNSELECTED_CLASS
              }`}
            >
              {choice.text}
            </button>
          </li>
        ))}
      </ul>
      {questionIndex > 0 ? (
        <button
          type="button"
          onClick={handleBack}
          className="text-sm font-medium text-pink-500 transition hover:underline"
        >
          {UI_LABELS[quiz.locale].previousQuestion}
        </button>
      ) : null}
    </section>
  );
}
