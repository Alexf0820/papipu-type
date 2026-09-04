import {
  existsSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";

import { assertQuizId, quizPaths } from "./quiz-tools.mjs";

const CHOICE_IDS = ["a", "b", "c", "d"];
const VARIATION_IDS = ["a", "b", "c"];

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function add(errors, condition, message) {
  if (!condition) errors.push(message);
}

function hasKeys(value, expected) {
  return isRecord(value) && JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...expected].sort());
}

function nonEmpty(value) {
  return typeof value === "string" && value.length > 0;
}

function pascalCase(quizId) {
  return quizId.replace(/(^|-)([a-z0-9])/g, (_, _dash, character) => character.toUpperCase());
}

function identifier(quizId) {
  return quizId.replace(/-([a-z])/g, (_, character) => character.toUpperCase());
}

function constantCase(quizId) {
  return quizId.replace(/-/g, "_").toUpperCase();
}

/** Validates source content only; it does not mutate quiz files. */
export function validateContentHandoff(handoff, quizId) {
  const errors = [];
  add(errors, isRecord(handoff), "handoff must be a JSON object.");
  if (!isRecord(handoff)) return errors;
  add(errors, handoff.schemaVersion === 1, "schemaVersion must be 1.");
  const quiz = handoff.quiz;
  add(errors, isRecord(quiz), "quiz is required.");
  if (!isRecord(quiz)) return errors;
  add(errors, quiz.id === quizId, `quiz.id must equal \"${quizId}\".`);
  add(errors, isRecord(quiz.title) && nonEmpty(quiz.title.ja) && nonEmpty(quiz.title.en), "quiz.title needs nonempty ja/en strings.");

  const types = quiz.resultTypeIds;
  const traits = quiz.traitIds;
  add(errors, Array.isArray(types) && types.length === 8 && types.every(nonEmpty) && new Set(types).size === 8, "resultTypeIds must contain 8 unique nonempty IDs.");
  add(errors, Array.isArray(traits) && traits.length === 8 && traits.every(nonEmpty) && new Set(traits).size === 8, "traitIds must contain 8 unique nonempty IDs.");
  if (!Array.isArray(types) || !Array.isArray(traits)) return errors;

  add(errors, hasKeys(quiz.typeTraitMap, types), "typeTraitMap must map every result type exactly once.");
  if (isRecord(quiz.typeTraitMap)) {
    for (const typeId of types) add(errors, traits.includes(quiz.typeTraitMap[typeId]), `typeTraitMap.${typeId} must reference a trait ID.`);
  }

  add(errors, Array.isArray(quiz.categories) && quiz.categories.length === 8, "categories must contain 8 categories.");
  const categoryIds = Array.isArray(quiz.categories) ? quiz.categories.flat() : [];
  add(errors, categoryIds.length === 32 && new Set(categoryIds).size === 32, "categories must contain 32 unique question IDs.");
  if (Array.isArray(quiz.categories)) {
    quiz.categories.forEach((category, index) => add(errors, Array.isArray(category) && category.length === 4, `category ${index + 1} must contain 4 question IDs.`));
  }
  add(errors, hasKeys(quiz.questions, categoryIds), "questions must match the 32 category question IDs exactly.");

  if (isRecord(quiz.questions)) {
    for (const questionId of categoryIds) {
      const question = quiz.questions[questionId];
      add(errors, isRecord(question), `${questionId} is missing.`);
      if (!isRecord(question)) continue;
      add(errors, hasKeys(question.scoring, CHOICE_IDS), `${questionId}.scoring must contain a/b/c/d.`);
      for (const locale of ["ja", "en"]) {
        const localized = question[locale];
        add(errors, isRecord(localized) && nonEmpty(localized.text), `${questionId}.${locale}.text is required.`);
        add(errors, isRecord(localized) && hasKeys(localized.choices, CHOICE_IDS), `${questionId}.${locale}.choices must contain a/b/c/d.`);
        if (isRecord(localized?.choices)) {
          for (const choiceId of CHOICE_IDS) add(errors, nonEmpty(localized.choices[choiceId]), `${questionId}.${locale}.${choiceId} is required.`);
        }
      }
      if (isRecord(question.scoring)) {
        for (const choiceId of CHOICE_IDS) {
          const score = question.scoring[choiceId];
          add(errors, isRecord(score) && types.includes(score.mainType), `${questionId}.${choiceId} has an invalid Main type.`);
          add(errors, isRecord(score) && types.includes(score.secondaryType), `${questionId}.${choiceId} has an invalid Secondary type.`);
          add(errors, !isRecord(score) || score.mainType !== score.secondaryType, `${questionId}.${choiceId} Main and Secondary must differ.`);
        }
      }
    }
  }

  add(errors, isRecord(handoff.results), "results is required.");
  if (!isRecord(handoff.results)) return errors;
  for (const locale of ["ja", "en"]) {
    const content = handoff.results[locale];
    add(errors, hasKeys(content, types), `results.${locale} must match the 8 result type IDs exactly.`);
    if (!isRecord(content)) continue;
    for (const typeId of types) {
      const entry = content[typeId];
      add(errors, isRecord(entry), `results.${locale}.${typeId} is missing.`);
      if (!isRecord(entry)) continue;
      add(errors, nonEmpty(entry.displayName), `results.${locale}.${typeId}.displayName is required.`);
      add(errors, nonEmpty(entry.visualKey), `results.${locale}.${typeId}.visualKey is required.`);
      add(errors, isRecord(entry.variations) && hasKeys(entry.variations, VARIATION_IDS), `results.${locale}.${typeId} needs variations a/b/c.`);
      if (isRecord(entry.variations)) {
        for (const variationId of VARIATION_IDS) add(errors, nonEmpty(entry.variations[variationId]?.body), `results.${locale}.${typeId}.${variationId} body is required.`);
      }
      add(errors, Array.isArray(entry.mottos) && entry.mottos.length === 3 && entry.mottos.every(nonEmpty), `results.${locale}.${typeId} needs 3 nonempty mottos.`);
      for (const key of ["good", "bad"]) {
        const compatibility = entry[key];
        add(errors, isRecord(compatibility) && types.includes(compatibility.typeId), `results.${locale}.${typeId}.${key} has an invalid target.`);
        add(errors, isRecord(compatibility) && nonEmpty(compatibility.reason), `results.${locale}.${typeId}.${key}.reason is required.`);
      }
    }
  }
  return errors;
}

function renderDefinition(handoff) {
  const { quiz } = handoff;
  const name = pascalCase(quiz.id);
  const constant = constantCase(quiz.id);
  const questionIds = quiz.categories.flat();
  const resultTypes = quiz.resultTypeIds.map((typeId) => `  ${typeId}: { id: ${JSON.stringify(typeId)} },`).join("\n");
  const categories = quiz.categories.map((category) => `  ${JSON.stringify(category)},`).join("\n");
  const scoring = questionIds.map((questionId) => {
    const choices = CHOICE_IDS.map((choiceId) => {
      const score = quiz.questions[questionId].scoring[choiceId];
      return `    ${choiceId}: choice(${JSON.stringify(score.mainType)}, ${JSON.stringify(score.secondaryType)}),`;
    }).join("\n");
    return `  ${questionId}: {\n${choices}\n  },`;
  }).join("\n");
  return `import type { Locale } from "@/lib/locale";
import { buildQuiz, type ChoiceScoring, type QuizScoringTable, type QuizText } from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const ${constant}_QUIZ_ID = ${JSON.stringify(quiz.id)};
export const ${constant}_TRAIT_IDS = ${JSON.stringify(quiz.traitIds, null, 2)} as const;
export type ${name}TraitId = (typeof ${constant}_TRAIT_IDS)[number];
export const ${constant}_RESULT_TYPE_IDS = ${JSON.stringify(quiz.resultTypeIds, null, 2)} as const;
export type ${name}ResultTypeId = (typeof ${constant}_RESULT_TYPE_IDS)[number];
export const ${constant}_TYPE_TRAIT_MAP: Record<${name}ResultTypeId, ${name}TraitId> = ${JSON.stringify(quiz.typeTraitMap, null, 2)};
export const ${constant}_QUESTION_IDS = ${JSON.stringify(questionIds, null, 2)} as const;
export type ${name}QuestionId = (typeof ${constant}_QUESTION_IDS)[number];
export const ${constant}_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type ${name}ChoiceId = (typeof ${constant}_CHOICE_IDS)[number];
export const ${constant}_CATEGORIES: readonly (readonly ${name}QuestionId[])[] = [
${categories}
];
export type ${name}Quiz = Quiz<${name}ResultTypeId, ${name}TraitId>;
export type ${name}Text = QuizText<${name}QuestionId, ${name}ChoiceId>;
export const ${constant}_RESULT_TYPES: Record<${name}ResultTypeId, ResultTypeDefinition<${name}ResultTypeId, ${name}TraitId>> = {
${resultTypes}
};

function choice(mainType: ${name}ResultTypeId, secondaryType: ${name}ResultTypeId): ChoiceScoring<${name}ResultTypeId, ${name}TraitId> {
  return { mainType, secondaryType, traits: { [${constant}_TYPE_TRAIT_MAP[mainType]]: 1, [${constant}_TYPE_TRAIT_MAP[secondaryType]]: 1 } };
}

export const ${constant}_SCORING: QuizScoringTable<${name}QuestionId, ${name}ChoiceId, ${name}ResultTypeId, ${name}TraitId> = {
${scoring}
};

export function create${name}Quiz(locale: Locale, text: ${name}Text): ${name}Quiz {
  return buildQuiz({ id: ${constant}_QUIZ_ID, locale, questionIds: ${constant}_QUESTION_IDS, choiceIds: ${constant}_CHOICE_IDS, traitIds: ${constant}_TRAIT_IDS, resultTypeIds: ${constant}_RESULT_TYPE_IDS, typeTraitMap: ${constant}_TYPE_TRAIT_MAP, resultTypes: ${constant}_RESULT_TYPES, maxResultVariations: 3, categories: ${constant}_CATEGORIES, scoring: ${constant}_SCORING, text });
}
`;
}

function renderLocale(handoff, locale) {
  const { quiz } = handoff;
  const name = pascalCase(quiz.id);
  const constant = constantCase(quiz.id);
  const suffix = locale === "ja" ? "Ja" : "En";
  const text = {
    title: quiz.title[locale],
    questions: Object.fromEntries(quiz.categories.flat().map((questionId) => [questionId, quiz.questions[questionId][locale]])),
  };
  return `import { create${name}Quiz, type ${name}Text } from "./definition";

const ${constant}_TEXT_${locale.toUpperCase()}: ${name}Text = ${JSON.stringify(text, null, 2)};

export const ${identifier(quiz.id)}Quiz${suffix} = create${name}Quiz(${JSON.stringify(locale)}, ${constant}_TEXT_${locale.toUpperCase()});
`;
}

function renderResults(handoff, locale) {
  return `import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

export const ${identifier(handoff.quiz.id)}ResultContent${locale === "ja" ? "Ja" : "En"}: QuizResultContent = ${JSON.stringify(handoff.results[locale], null, 2)};
`;
}

export function renderImportedQuizFiles(handoff) {
  return {
    definition: renderDefinition(handoff),
    ja: renderLocale(handoff, "ja"),
    en: renderLocale(handoff, "en"),
    resultsJa: renderResults(handoff, "ja"),
    resultsEn: renderResults(handoff, "en"),
  };
}

/** Writes fully staged files, then swaps each target atomically with rollback on error. */
export function replaceQuizFilesAtomically(projectRoot, quizId, files) {
  const paths = quizPaths(projectRoot, quizId);
  const targets = {
    definition: resolve(paths.dataDirectory, "definition.ts"),
    ja: paths.ja,
    en: paths.en,
    resultsJa: paths.resultsJa,
    resultsEn: paths.resultsEn,
  };
  const staging = mkdtempSync(resolve(paths.dataDirectory, ".content-import-"));
  const replaced = [];
  try {
    for (const [key, target] of Object.entries(targets)) {
      if (!existsSync(target)) throw new Error(`Missing scaffold target: ${target}`);
      writeFileSync(resolve(staging, `${key}.next`), files[key], "utf8");
      writeFileSync(resolve(staging, `${key}.backup`), readFileSync(target));
    }
    for (const [key, target] of Object.entries(targets)) {
      renameSync(resolve(staging, `${key}.next`), target);
      replaced.push(key);
    }
  } catch (error) {
    for (const key of replaced.reverse()) {
      writeFileSync(targets[key], readFileSync(resolve(staging, `${key}.backup`)));
    }
    throw error;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

export function loadContentHandoff(projectRoot, quizId) {
  assertQuizId(quizId);
  const paths = quizPaths(projectRoot, quizId);
  const marker = resolve(paths.dataDirectory, "content", ".scaffold.json");
  const handoffPath = resolve(paths.dataDirectory, "content", "handoff.json");
  if (!existsSync(marker) || !existsSync(handoffPath)) {
    throw new Error(`Quiz \"${quizId}\" has no Scaffold Ver.0.2 content handoff; refusing to overwrite existing quiz data.`);
  }
  const markerData = JSON.parse(readFileSync(marker, "utf8"));
  if (markerData.quizId !== quizId || markerData.schemaVersion !== 1) throw new Error(`Invalid Scaffold marker for \"${quizId}\".`);
  return { handoffPath, handoff: JSON.parse(readFileSync(handoffPath, "utf8")) };
}
