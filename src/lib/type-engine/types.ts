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
  /** Result type this choice points at. */
  mainType: TType;
  /** Score added to `mainType` when this choice is picked. */
  mainScore: number;
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
 * Phase 1 registers no variations — bodies are not implemented yet.
 */
export type ResultVariation<TTrait extends string = string> = {
  id: string;
  /** Trait that must rank highest for this variation to be picked. */
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
  /** Traits this quiz aggregates. Declaration order breaks trait ties. */
  traitIds: readonly TTrait[];
  /** Result types this quiz can produce. Declaration order breaks type ties. */
  resultTypeIds: readonly TType[];
  resultTypes: Readonly<Record<TType, ResultTypeDefinition<TType, TTrait>>>;
  questions: readonly QuizQuestion<TType, TTrait>[];
  /** Upper bound of result variations one type may hold in a later phase. */
  maxResultVariations: number;
};

/** One answered question. */
export type QuizSelection = {
  questionId: string;
  choiceId: string;
};
