import type { Locale } from "@/lib/locale";

/**
 * Papipu Type engine data model.
 *
 * Question count, choice count, trait count and result type count are all
 * defined by the quiz data — the engine never hardcodes them. A quiz can
 * declare its own id unions so authoring mistakes fail at compile time.
 */

export type TraitScoreMap<TTrait extends string = string> = Partial<
  Record<TTrait, number>
>;

export type QuizChoice<
  TType extends string = string,
  TTrait extends string = string,
> = {
  id: string;
  text: string;
  /** Result type this choice points at as the main answer. */
  mainType: TType;
  /** Result type awarded as secondary (+1). */
  secondaryType: TType;
  /** Scores added to traits when this choice is picked. */
  traits: TraitScoreMap<TTrait>;
};

export type QuizQuestion<
  TType extends string = string,
  TTrait extends string = string,
> = {
  id: string;
  text: string;
  choices: readonly QuizChoice<TType, TTrait>[];
};

/**
 * Reserved slot for a result variation inside one result type.
 */
export type ResultVariation<TTrait extends string = string> = {
  id: string;
  /** Legacy field from trait-based variation — unused by hash selection. */
  traitId?: TTrait;
};

export type ResultTypeDefinition<
  TType extends string = string,
  TTrait extends string = string,
> = {
  id: TType;
  variations?: readonly ResultVariation<TTrait>[];
};

export type Quiz<
  TType extends string = string,
  TTrait extends string = string,
> = {
  id: string;
  locale: Locale;
  title: string;
  /** Traits this quiz aggregates. */
  traitIds: readonly TTrait[];
  /** Result types this quiz can produce. */
  resultTypeIds: readonly TType[];
  /** Maps each result type to its trait for tie-break stage 3. */
  typeTraitMap: Readonly<Record<TType, TTrait>>;
  resultTypes: Readonly<Record<TType, ResultTypeDefinition<TType, TTrait>>>;
  /** Full question pool (32 questions for camp-gear). */
  questions: readonly QuizQuestion<TType, TTrait>[];
  /**
   * Category groups for session sampling — one question id is drawn from each
   * inner array per diagnosis run.
   */
  categories: readonly (readonly string[])[];
  /** Upper bound of result variations one type may hold. */
  maxResultVariations: number;
};

/** One answered question. */
export type QuizSelection = {
  questionId: string;
  choiceId: string;
};

export const MAIN_TYPE_SCORE = 3;
export const SECONDARY_TYPE_SCORE = 1;
