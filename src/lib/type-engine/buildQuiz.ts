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
  secondaryType: TType;
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
  questions: Partial<
    Record<
      TQuestion,
      {
        text: string;
        choices: Partial<Record<TChoice, string>>;
      }
    >
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
  /** Full pool question ids in stable definition order. */
  questionIds: readonly TQuestion[];
  /** Choice order shown within every question. */
  choiceIds: readonly TChoice[];
  traitIds: readonly TTrait[];
  resultTypeIds: readonly TType[];
  typeTraitMap: Readonly<Record<TType, TTrait>>;
  resultTypes: Readonly<Record<TType, ResultTypeDefinition<TType, TTrait>>>;
  maxResultVariations: number;
  categories: readonly (readonly TQuestion[])[];
  scoring: QuizScoringTable<TQuestion, TChoice, TType, TTrait>;
  text: QuizText<TQuestion, TChoice>;
};

function choiceText(
  questionId: string,
  choiceId: string,
  provided: string | undefined,
): string {
  return provided ?? choiceId.toUpperCase();
}

function questionText(questionId: string, provided: string | undefined): string {
  return provided ?? questionId.toUpperCase();
}

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
    typeTraitMap: params.typeTraitMap,
    resultTypes: params.resultTypes,
    maxResultVariations: params.maxResultVariations,
    categories: params.categories,
    questions: params.questionIds.map((questionId) => {
      const questionTextEntry = params.text.questions[questionId];

      return {
        id: questionId,
        text: questionText(questionId, questionTextEntry?.text),
        choices: params.choiceIds.map(
          (choiceId): QuizChoice<TType, TTrait> => ({
            id: choiceId,
            text: choiceText(
              questionId,
              choiceId,
              questionTextEntry?.choices?.[choiceId],
            ),
            ...params.scoring[questionId][choiceId],
          }),
        ),
      };
    }),
  };
}
