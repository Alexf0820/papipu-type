"use client";

import { useEffect, useRef, useState } from "react";

import { UI_LABELS } from "@/lib/brand/labels";
import { resolveCampGearResult } from "@/lib/type-engine/resolveResult";
import { aggregateQuizScores } from "@/lib/type-engine/scoring";
import type { Quiz, QuizSelection } from "@/lib/type-engine/types";

import { QuizResult } from "./QuizResult";

type QuizFlowProps = {
  quiz: Quiz;
};

/**
 * question id -> chosen choice id. Keyed by question so that re-answering
 * replaces the previous answer instead of adding a second one.
 */
type AnswerMap = Record<string, string>;

const BRAND_PINK = "#FF4785";
const ADVANCE_DELAY_MS = 160;

/** Box metrics stay identical between states so going back never shifts layout. */
const CHOICE_CLASS =
  "w-full cursor-pointer rounded-2xl border bg-white px-5 py-[1.125rem] text-left text-[15px] font-semibold leading-snug text-slate-700 shadow-sm transition-[transform,background-color,border-color,box-shadow] duration-150 touch-manipulation sm:px-6 sm:py-5 sm:text-base";
const CHOICE_UNSELECTED_CLASS =
  "border-pink-200/90 hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50/70 hover:shadow-md active:scale-[0.99] active:border-[#FF4785] active:bg-pink-50 active:shadow-sm";
const CHOICE_SELECTED_CLASS =
  "border-[#FF4785] bg-pink-50 shadow-md ring-1 ring-pink-200/80";

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
  const [pendingChoiceId, setPendingChoiceId] = useState<string | null>(null);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalQuestions = quiz.questions.length;
  const question = quiz.questions[questionIndex];
  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  if (!question) {
    const selections = toSelections(quiz, answers);

    if (quiz.id === "camp-gear") {
      const result = resolveCampGearResult(quiz, selections);
      return <QuizResult result={result} />;
    }

    // Fallback for quizzes without a result screen yet (dev only).
    const scores = aggregateQuizScores(quiz, selections);
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
    if (pendingChoiceId) {
      return;
    }

    setPendingChoiceId(choiceId);
    setAnswers((current) => ({ ...current, [question.id]: choiceId }));

    advanceTimeoutRef.current = setTimeout(() => {
      setQuestionIndex((current) => current + 1);
      setPendingChoiceId(null);
    }, ADVANCE_DELAY_MS);
  }

  function handleBack() {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }

    setPendingChoiceId(null);
    setQuestionIndex((current) => Math.max(0, current - 1));
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-b from-pink-50/50 via-white to-white px-4 py-6 ring-1 ring-pink-100/70 sm:px-6 sm:py-7">
      <div className="space-y-2">
        <p className="text-sm font-semibold tabular-nums text-slate-500">
          {questionIndex + 1} / {totalQuestions}
        </p>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-pink-100/70"
          role="progressbar"
          aria-valuenow={questionIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
          aria-label={`${questionIndex + 1} / ${totalQuestions}`}
        >
          <div
            className="h-full rounded-full transition-[width] duration-300 ease-out"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: BRAND_PINK,
            }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-5 sm:mt-7">
        <h2 className="text-[1.35rem] font-extrabold leading-snug text-slate-800 sm:text-[1.625rem]">
          {question.text}
        </h2>

        <ul className="space-y-3.5 sm:space-y-4">
          {question.choices.map((choice) => {
            const isSelected =
              answers[question.id] === choice.id ||
              pendingChoiceId === choice.id;

            return (
              <li key={choice.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(choice.id)}
                  disabled={pendingChoiceId !== null}
                  className={`${CHOICE_CLASS} ${
                    isSelected ? CHOICE_SELECTED_CLASS : CHOICE_UNSELECTED_CLASS
                  } disabled:cursor-default`}
                >
                  {choice.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {questionIndex > 0 ? (
        <button
          type="button"
          onClick={handleBack}
          className="mt-6 text-sm font-medium text-pink-500 transition hover:underline sm:mt-7"
        >
          {UI_LABELS[quiz.locale].previousQuestion}
        </button>
      ) : null}
    </section>
  );
}
