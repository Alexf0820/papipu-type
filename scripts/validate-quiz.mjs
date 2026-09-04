#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertQuizId, loadQuizData } from "./lib/quiz-tools.mjs";
import { createTypeScriptModuleLoader } from "./lib/ts-module-loader.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED_CHOICE_IDS = ["a", "b", "c", "d"];
const REQUIRED_VARIATIONS = ["a", "b", "c"];

function parseArgs(args) {
  const rootIndex = args.indexOf("--root");
  const root = rootIndex >= 0 ? args[rootIndex + 1] : undefined;
  const quizId = args.find(
    (argument, index) =>
      argument !== "--root" &&
      (rootIndex < 0 || index !== rootIndex + 1) &&
      !argument.startsWith("--"),
  );
  if (!quizId) throw new Error("Usage: npm run validate-quiz -- <quiz-id>");
  if (rootIndex >= 0 && !root) throw new Error("--root requires a directory path.");
  return { quizId, root };
}

function add(errors, condition, message) {
  if (!condition) errors.push(message);
}

function sameValues(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validateQuizShape(quiz, label, errors) {
  add(errors, quiz.questions.length === 32, `${label}: expected 32 questions, found ${quiz.questions.length}.`);
  add(errors, quiz.categories.length === 8, `${label}: expected 8 categories, found ${quiz.categories.length}.`);
  add(errors, quiz.resultTypeIds.length === 8, `${label}: expected 8 result types, found ${quiz.resultTypeIds.length}.`);
  add(errors, quiz.traitIds.length === 8, `${label}: expected 8 traits, found ${quiz.traitIds.length}.`);
  add(errors, new Set(quiz.resultTypeIds).size === quiz.resultTypeIds.length, `${label}: duplicate result type ID.`);

  const questionIds = new Set(quiz.questions.map((question) => question.id));
  for (const [index, category] of quiz.categories.entries()) {
    add(errors, category.length === 4, `${label}: category ${index + 1} must contain 4 questions.`);
    for (const questionId of category) {
      add(errors, questionIds.has(questionId), `${label}: category ${index + 1} references unknown ${questionId}.`);
    }
  }

  for (const question of quiz.questions) {
    const choiceIds = question.choices.map((choice) => choice.id);
    add(errors, sameValues(choiceIds, REQUIRED_CHOICE_IDS), `${label}: ${question.id} must contain a/b/c/d in order.`);
    for (const choice of question.choices) {
      add(errors, quiz.resultTypeIds.includes(choice.mainType), `${label}: ${question.id}:${choice.id} has invalid Main type.`);
      add(errors, quiz.resultTypeIds.includes(choice.secondaryType), `${label}: ${question.id}:${choice.id} has invalid Secondary type.`);
    }
  }

  for (const typeId of quiz.resultTypeIds) {
    add(errors, quiz.traitIds.includes(quiz.typeTraitMap[typeId]), `${label}: ${typeId} has no valid mapped trait.`);
  }
}

function validateResultContent(content, quiz, label, errors, isVisualKey) {
  add(errors, content !== undefined, `${label}: missing result content file.`);
  if (!content) return;

  for (const typeId of quiz.resultTypeIds) {
    const entry = content[typeId];
    add(errors, Boolean(entry), `${label}: missing result content for ${typeId}.`);
    if (!entry) continue;
    add(errors, typeof entry.displayName === "string" && entry.displayName.length > 0, `${label}: ${typeId} needs displayName.`);
    add(errors, typeof entry.visualKey === "string" && entry.visualKey.length > 0, `${label}: ${typeId} needs visualKey.`);
    add(errors, isVisualKey(entry.visualKey), `${label}: ${typeId} visualKey is not registered.`);
    add(errors, sameValues(Object.keys(entry.variations).sort(), REQUIRED_VARIATIONS), `${label}: ${typeId} must have variations a/b/c.`);
    add(errors, Array.isArray(entry.mottos) && entry.mottos.length === 3, `${label}: ${typeId} must have 3 mottos.`);
    for (const variationId of REQUIRED_VARIATIONS) {
      add(errors, typeof entry.variations[variationId]?.body === "string" && entry.variations[variationId].body.length > 0, `${label}: ${typeId} variation ${variationId} needs body.`);
    }
    for (const [index, motto] of entry.mottos.entries()) {
      add(errors, typeof motto === "string" && motto.length > 0, `${label}: ${typeId} motto ${index + 1} is empty.`);
    }
    add(errors, quiz.resultTypeIds.includes(entry.good.typeId), `${label}: ${typeId} has invalid good target.`);
    add(errors, quiz.resultTypeIds.includes(entry.bad.typeId), `${label}: ${typeId} has invalid bad target.`);
    add(errors, typeof entry.good.reason === "string" && entry.good.reason.length > 0, `${label}: ${typeId} good reason is empty.`);
    add(errors, typeof entry.bad.reason === "string" && entry.bad.reason.length > 0, `${label}: ${typeId} bad reason is empty.`);
  }
}

export function validateQuiz(projectRoot, quizId) {
  const { ja, en, resultJa, resultEn } = loadQuizData(projectRoot, quizId);
  const loader = createTypeScriptModuleLoader(projectRoot);
  const { isVisualKey } = loader.load(resolve(projectRoot, "src/lib/visual/registry.ts"));
  const errors = [];
  validateQuizShape(ja, "ja", errors);
  validateQuizShape(en, "en", errors);
  validateResultContent(resultJa, ja, "results/ja", errors, isVisualKey);
  validateResultContent(resultEn, en, "results/en", errors, isVisualKey);

  add(errors, sameValues(ja.resultTypeIds, en.resultTypeIds), "JA/EN: result type IDs differ.");
  add(errors, sameValues(ja.traitIds, en.traitIds), "JA/EN: trait IDs differ.");
  add(errors, sameValues(ja.categories, en.categories), "JA/EN: category IDs differ.");
  add(errors, sameValues(ja.typeTraitMap, en.typeTraitMap), "JA/EN: type/trait maps differ.");

  for (const question of ja.questions) {
    const englishQuestion = en.questions.find((candidate) => candidate.id === question.id);
    add(errors, Boolean(englishQuestion), `JA/EN: missing English question ${question.id}.`);
    if (!englishQuestion) continue;
    const jaScoring = question.choices.map(({ id, mainType, secondaryType }) => ({ id, mainType, secondaryType }));
    const enScoring = englishQuestion.choices.map(({ id, mainType, secondaryType }) => ({ id, mainType, secondaryType }));
    add(errors, sameValues(jaScoring, enScoring), `JA/EN: scoring differs for ${question.id}.`);
  }

  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const { quizId, root } = parseArgs(process.argv.slice(2));
    assertQuizId(quizId);
    const errors = validateQuiz(resolve(root ?? PROJECT_ROOT), quizId);
    if (errors.length > 0) {
      console.error(`Validation failed for "${quizId}":`);
      for (const error of errors) console.error(`- ${error}`);
      process.exitCode = 1;
    } else {
      console.log(`Validation passed for "${quizId}".`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
