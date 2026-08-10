import type { Locale } from "@/lib/locale";

import type {
  Quiz,
  QuizChoice,
  ResultTypeDefinition,
  TraitScoreMap,
} from "./types";

/**
 * Judgement data is locale independent: every locale of a quiz shares one
 * scoring table and only supplies its own display text.
 */

export type ChoiceScoring<
  TType extends string = string,
  TTrait extends string = string,
> = {
  mainType: TType;
  mainScore: number;
  traits: TraitScoreMap<TTrait>;
};

/** question id -> choice id -> scoring. Shared by all locales of a quiz. */
export type QuizScoringTable<
  TQuestion extends string = string,
  TChoice extends string = string,
  TType extends string = string,
  TTrait extends string = string,
> = Record<TQuestion, Record<TChoice, ChoiceScoring<TType, TTrait>>>;

/** The only part of a quiz that differs between locales. */
export type QuizText<
  TQuestion extends string = string,
  TChoice extends string = string,
> = {
  title: string;
  questions: Record<
    TQuestion,
    {
      text: string;
      choices: Record<TChoice, string>;
    }
  >;
};

export type BuildQuizParams<
  TQuestion extends string,
  TChoice extends string,
  TType extends string,
  TTrait extends string,
> = {
  id: string;
  locale: Locale;
  /** Question order shown to the user. */
  questionIds: readonly TQuestion[];
  /** Choice order shown within every question. */
  choiceIds: readonly TChoice[];
  traitIds: readonly TTrait[];
  resultTypeIds: readonly TType[];
  resultTypes: Readonly<Record<TType, ResultTypeDefinition<TType, TTrait>>>;
  maxResultVariations: number;
  scoring: QuizScoringTable<TQuestion, TChoice, TType, TTrait>;
  text: QuizText<TQuestion, TChoice>;
};

/** Combine a shared scoring table with one locale's text into a Quiz. */
export function buildQuiz<
  TQuestion extends string,
  TChoice extends string,
  TType extends string,
  TTrait extends string,
>(
  params: BuildQuizParams<TQuestion, TChoice, TType, TTrait>,
): Quiz<TType, TTrait> {
  return {
    id: params.id,
    locale: params.locale,
    title: params.text.title,
    traitIds: params.traitIds,
    resultTypeIds: params.resultTypeIds,
    resultTypes: params.resultTypes,
    maxResultVariations: params.maxResultVariations,
    questions: params.questionIds.map((questionId) => {
      const questionText = params.text.questions[questionId];

      return {
        id: questionId,
        text: questionText.text,
        choices: params.choiceIds.map(
          (choiceId): QuizChoice<TType, TTrait> => ({
            id: choiceId,
            text: questionText.choices[choiceId],
            ...params.scoring[questionId][choiceId],
          }),
        ),
      };
    }),
  };
}
