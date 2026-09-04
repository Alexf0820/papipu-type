import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { createTypeScriptModuleLoader } from "./ts-module-loader.mjs";

export const QUIZ_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

export function assertQuizId(quizId) {
  if (!QUIZ_ID_PATTERN.test(quizId)) {
    throw new Error(
      `Invalid quiz ID "${quizId}". Use lowercase letters, digits, and hyphens; it must start with a letter.`,
    );
  }
}

export function quizPaths(projectRoot, quizId) {
  const dataDirectory = resolve(projectRoot, "src", "data", "quizzes", quizId);
  return {
    dataDirectory,
    routeDirectory: resolve(projectRoot, "src", "app", "[locale]", quizId),
    ja: resolve(dataDirectory, "ja.ts"),
    en: resolve(dataDirectory, "en.ts"),
    resultsJa: resolve(dataDirectory, "results", "ja.ts"),
    resultsEn: resolve(dataDirectory, "results", "en.ts"),
  };
}

export function findQuizExport(moduleExports, quizId, locale) {
  const match = Object.values(moduleExports).find(
    (value) =>
      value &&
      typeof value === "object" &&
      value.id === quizId &&
      value.locale === locale &&
      Array.isArray(value.questions),
  );
  if (!match) throw new Error(`Could not find ${locale} quiz export for "${quizId}".`);
  return match;
}

export function findResultContentExport(moduleExports) {
  const match = Object.values(moduleExports).find(
    (value) => value && typeof value === "object" && !Array.isArray(value),
  );
  if (!match) throw new Error("Could not find result content export.");
  return match;
}

export function loadQuizData(projectRoot, quizId) {
  const paths = quizPaths(projectRoot, quizId);
  if (!existsSync(paths.ja) || !existsSync(paths.en)) {
    throw new Error(`Quiz data not found for "${quizId}".`);
  }

  const loader = createTypeScriptModuleLoader(projectRoot);
  const ja = findQuizExport(loader.load(paths.ja), quizId, "ja");
  const en = findQuizExport(loader.load(paths.en), quizId, "en");
  const resultJa = existsSync(paths.resultsJa)
    ? findResultContentExport(loader.load(paths.resultsJa))
    : undefined;
  const resultEn = existsSync(paths.resultsEn)
    ? findResultContentExport(loader.load(paths.resultsEn))
    : undefined;

  return { ja, en, resultJa, resultEn };
}

export function createSeededRandom(seed = 0x9e3779b9) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function percent(value, total) {
  return total === 0 ? 0 : (value / total) * 100;
}

export function maxMinPercent(counts, total) {
  const values = Object.values(counts).map((count) => percent(count, total));
  return {
    max: Math.max(...values),
    min: Math.min(...values),
    spread: Math.max(...values) - Math.min(...values),
  };
}
