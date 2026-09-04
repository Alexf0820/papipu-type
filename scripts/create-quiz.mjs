#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertQuizId, quizPaths } from "./lib/quiz-tools.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const QUESTION_IDS = Array.from({ length: 32 }, (_, index) => `q${String(index + 1).padStart(2, "0")}`);
const TYPE_IDS = Array.from({ length: 8 }, (_, index) => `type${String(index + 1).padStart(2, "0")}`);
const TRAIT_IDS = Array.from({ length: 8 }, (_, index) => `trait${String(index + 1).padStart(2, "0")}`);

function pascalCase(quizId) {
  return quizId.replace(/(^|-)([a-z0-9])/g, (_, _dash, character) => character.toUpperCase());
}

function constantCase(quizId) {
  return quizId.replace(/-/g, "_").toUpperCase();
}

function renderDefinition(quizId) {
  const name = pascalCase(quizId);
  const constant = constantCase(quizId);
  const questions = QUESTION_IDS.map((id) => `  "${id}",`).join("\n");
  const types = TYPE_IDS.map((id) => `  "${id}",`).join("\n");
  const traits = TRAIT_IDS.map((id) => `  "${id}",`).join("\n");
  const categories = Array.from({ length: 8 }, (_, category) => {
    const ids = QUESTION_IDS.slice(category * 4, category * 4 + 4)
      .map((id) => `"${id}"`)
      .join(", ");
    return `  [${ids}],`;
  }).join("\n");
  const typeMap = TYPE_IDS.map((id, index) => `  ${id}: "${TRAIT_IDS[index]}",`).join("\n");
  const resultTypes = TYPE_IDS.map((id) => `  ${id}: { id: "${id}" },`).join("\n");
  const scoringRows = QUESTION_IDS.map(
    (questionId) => `  ${questionId}: {
    a: pendingChoice(),
    b: pendingChoice(),
    c: pendingChoice(),
    d: pendingChoice(),
  },`,
  ).join("\n");

  return `import type { Locale } from "@/lib/locale";
import {
  buildQuiz,
  type ChoiceScoring,
  type QuizScoringTable,
  type QuizText,
} from "@/lib/type-engine/buildQuiz";
import type { Quiz, ResultTypeDefinition } from "@/lib/type-engine/types";

export const ${constant}_QUIZ_ID = "${quizId}";

// Replace every placeholder ID with the approved quiz data before registration.
export const ${constant}_TRAIT_IDS = [
${traits}
] as const;
export type ${name}TraitId = (typeof ${constant}_TRAIT_IDS)[number];

export const ${constant}_RESULT_TYPE_IDS = [
${types}
] as const;
export type ${name}ResultTypeId = (typeof ${constant}_RESULT_TYPE_IDS)[number];

export const ${constant}_TYPE_TRAIT_MAP: Record<${name}ResultTypeId, ${name}TraitId> = {
${typeMap}
};

export const ${constant}_QUESTION_IDS = [
${questions}
] as const;
export type ${name}QuestionId = (typeof ${constant}_QUESTION_IDS)[number];

export const ${constant}_CHOICE_IDS = ["a", "b", "c", "d"] as const;
export type ${name}ChoiceId = (typeof ${constant}_CHOICE_IDS)[number];

export const ${constant}_CATEGORIES: readonly (readonly ${name}QuestionId[])[] = [
${categories}
];

export type ${name}Quiz = Quiz<${name}ResultTypeId, ${name}TraitId>;
export type ${name}Text = QuizText<${name}QuestionId, ${name}ChoiceId>;

export const ${constant}_RESULT_TYPES: Record<
  ${name}ResultTypeId,
  ResultTypeDefinition<${name}ResultTypeId, ${name}TraitId>
> = {
${resultTypes}
};

// Main/Secondary values are deliberately blank until approved scoring arrives.
function pendingChoice(): ChoiceScoring<${name}ResultTypeId, ${name}TraitId> {
  return {
    mainType: "" as ${name}ResultTypeId,
    secondaryType: "" as ${name}ResultTypeId,
    traits: {},
  };
}

export const ${constant}_SCORING: QuizScoringTable<
  ${name}QuestionId,
  ${name}ChoiceId,
  ${name}ResultTypeId,
  ${name}TraitId
> = {
${scoringRows}
};

export function create${name}Quiz(
  locale: Locale,
  text: ${name}Text,
): ${name}Quiz {
  return buildQuiz({
    id: ${constant}_QUIZ_ID,
    locale,
    questionIds: ${constant}_QUESTION_IDS,
    choiceIds: ${constant}_CHOICE_IDS,
    traitIds: ${constant}_TRAIT_IDS,
    resultTypeIds: ${constant}_RESULT_TYPE_IDS,
    typeTraitMap: ${constant}_TYPE_TRAIT_MAP,
    resultTypes: ${constant}_RESULT_TYPES,
    maxResultVariations: 3,
    categories: ${constant}_CATEGORIES,
    scoring: ${constant}_SCORING,
    text,
  });
}
`;
}

function renderLocale(quizId, locale) {
  const name = pascalCase(quizId);
  const constant = constantCase(quizId);
  const questionEntries = QUESTION_IDS.map(
    (questionId) => `    ${questionId}: {
      text: "",
      choices: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
    },`,
  ).join("\n");
  const suffix = locale === "ja" ? "Ja" : "En";

  return `import { create${name}Quiz, type ${name}Text } from "./definition";

// Display text only. Copy approved ${locale === "ja" ? "in Japanese" : "in English"} belongs here.
const ${constant}_TEXT_${locale.toUpperCase()}: ${name}Text = {
  title: "",
  questions: {
${questionEntries}
  },
};

export const ${quizId.replace(/-([a-z])/g, (_, character) => character.toUpperCase())}Quiz${suffix} = create${name}Quiz(
  "${locale}",
  ${constant}_TEXT_${locale.toUpperCase()},
);
`;
}

function renderResults(quizId, locale) {
  const identifier = quizId.replace(/-([a-z])/g, (_, character) => character.toUpperCase());
  const entries = TYPE_IDS.map(
    (typeId) => `  ${typeId}: {
    displayName: "",
    visualKey: "${quizId}-${typeId}",
    variations: {
      a: { body: "" },
      b: { body: "" },
      c: { body: "" },
    },
    mottos: ["", "", ""],
    good: { typeId: "", reason: "" },
    bad: { typeId: "", reason: "" },
  },`,
  ).join("\n");
  const suffix = locale === "ja" ? "Ja" : "En";
  return `import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

// Replace only with approved ${locale === "ja" ? "Japanese" : "English"} result content.
export const ${identifier}ResultContent${suffix}: QuizResultContent = {
${entries}
};
`;
}

function renderResultsIndex(quizId) {
  const identifier = quizId.replace(/-([a-z])/g, (_, character) => character.toUpperCase());
  const constant = constantCase(quizId);
  const name = pascalCase(quizId);
  return `import type { Locale } from "@/lib/locale";
import type { QuizResultContent } from "@/lib/type-engine/resolveResult";

import { ${identifier}ResultContentEn } from "./en";
import { ${identifier}ResultContentJa } from "./ja";

const ${constant}_RESULT_CONTENT: Record<Locale, QuizResultContent> = {
  ja: ${identifier}ResultContentJa,
  en: ${identifier}ResultContentEn,
};

export function get${name}ResultContent(locale: Locale): QuizResultContent {
  return ${constant}_RESULT_CONTENT[locale];
}
`;
}

function renderRoute(quizId) {
  const name = pascalCase(quizId);
  const constant = constantCase(quizId);
  return `import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { ${constant}_QUIZ_ID } from "@/data/quizzes/${quizId}/definition";
import { isValidLocale } from "@/lib/locale";
import { getQuiz, getQuizLocales } from "@/lib/type-engine/registry";

const ${constant}_PATH = \`/\${${constant}_QUIZ_ID}\`;

export function generateStaticParams() {
  return getQuizLocales(${constant}_QUIZ_ID).map((locale) => ({ locale }));
}

export default async function ${name}Page({
  params,
}: PageProps<"/[locale]/${quizId}">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const quiz = getQuiz(${constant}_QUIZ_ID, locale);
  if (!quiz) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <SiteHeader locale={locale} path={${constant}_PATH} />
      <main className="space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">{quiz.title}</h1>
        <QuizFlow quiz={quiz} />
      </main>
    </div>
  );
}
`;
}

function renderTest(quizId) {
  const constant = constantCase(quizId);
  const identifier = quizId.replace(/-([a-z])/g, (_, character) => character.toUpperCase());
  return `import { describe, expect, it } from "vitest";

import {
  ${constant}_CATEGORIES,
  ${constant}_CHOICE_IDS,
  ${constant}_QUESTION_IDS,
} from "./definition";
import { ${identifier}QuizEn } from "./en";
import { ${identifier}QuizJa } from "./ja";

describe("${quizId} scaffold", () => {
  it("keeps the standard 8-category, 32-question shape", () => {
    expect(${identifier}QuizJa.id).toBe("${quizId}");
    expect(${identifier}QuizEn.id).toBe("${quizId}");
    expect(${constant}_QUESTION_IDS).toHaveLength(32);
    expect(${constant}_CATEGORIES).toHaveLength(8);
    expect(${constant}_CATEGORIES.every((category) => category.length === 4)).toBe(true);
    expect(${identifier}QuizJa.questions).toHaveLength(32);
    expect(${identifier}QuizJa.questions.every(
      (question) => question.choices.map((choice) => choice.id).join(",") === ${constant}_CHOICE_IDS.join(","),
    )).toBe(true);
  });
});
`;
}

function renderReadme(quizId) {
  return `# ${quizId} Quiz Content Checklist

This scaffold intentionally contains no authored quiz content. Replace every placeholder only with approved content.

1. Put approved scoring, JA/EN questions, and JA/EN result content in \`content/handoff.json\`.
2. Run \`npm run import-quiz-content -- ${quizId}\`. It validates all input before replacing \`definition.ts\`, \`ja.ts\`, \`en.ts\`, and both result files.
3. Keep each visual key as \`${quizId}-<result-type>\`; after image handoff, manually add the VisualKey union, Body, visual registry entry, and faceTransform.
4. Manually register both locales and both result-content maps in \`src/lib/type-engine/registry.ts\`.
5. Manually add the approved home-card title, description, accessible labels, and icon in \`src/lib/home/content.ts\`.
6. Run \`npm run validate-quiz -- ${quizId}\` and \`npm run verify-quiz -- ${quizId}\` before production review.
`;
}

function renderHandoff(quizId) {
  const categories = Array.from({ length: 8 }, (_, category) =>
    QUESTION_IDS.slice(category * 4, category * 4 + 4),
  );
  const questions = Object.fromEntries(QUESTION_IDS.map((questionId) => [questionId, {
    scoring: Object.fromEntries(["a", "b", "c", "d"].map((choiceId) => [choiceId, { mainType: "", secondaryType: "" }])),
    ja: { text: "", choices: { a: "", b: "", c: "", d: "" } },
    en: { text: "", choices: { a: "", b: "", c: "", d: "" } },
  }]));
  const resultEntry = () => ({
    displayName: "",
    visualKey: "",
    variations: { a: { body: "" }, b: { body: "" }, c: { body: "" } },
    mottos: ["", "", ""],
    good: { typeId: "", reason: "" },
    bad: { typeId: "", reason: "" },
  });
  const results = Object.fromEntries(TYPE_IDS.map((typeId) => [typeId, resultEntry()]));
  return `${JSON.stringify({
    schemaVersion: 1,
    quiz: {
      id: quizId,
      title: { ja: "", en: "" },
      resultTypeIds: TYPE_IDS,
      traitIds: TRAIT_IDS,
      typeTraitMap: Object.fromEntries(TYPE_IDS.map((typeId, index) => [typeId, TRAIT_IDS[index]])),
      categories,
      questions,
    },
    results: { ja: results, en: structuredClone(results) },
  }, null, 2)}\n`;
}

export function scaffoldFiles(projectRoot, quizId) {
  const paths = quizPaths(projectRoot, quizId);
  return [
    [resolve(paths.dataDirectory, "definition.ts"), renderDefinition(quizId)],
    [paths.ja, renderLocale(quizId, "ja")],
    [paths.en, renderLocale(quizId, "en")],
    [paths.resultsJa, renderResults(quizId, "ja")],
    [paths.resultsEn, renderResults(quizId, "en")],
    [resolve(paths.dataDirectory, "results", "index.ts"), renderResultsIndex(quizId)],
    [resolve(paths.dataDirectory, `${quizId}.test.ts`), renderTest(quizId)],
    [resolve(paths.dataDirectory, "README.md"), renderReadme(quizId)],
    [resolve(paths.dataDirectory, "content", ".scaffold.json"), `${JSON.stringify({ quizId, schemaVersion: 1 }, null, 2)}\n`],
    [resolve(paths.dataDirectory, "content", "handoff.json"), renderHandoff(quizId)],
    [resolve(paths.routeDirectory, "page.tsx"), renderRoute(quizId)],
  ];
}

function parseArgs(args) {
  const dryRun = args.includes("--dry-run");
  const rootIndex = args.indexOf("--root");
  const root = rootIndex >= 0 ? args[rootIndex + 1] : undefined;
  const quizId = args.find(
    (argument, index) =>
      argument !== "--root" &&
      (rootIndex < 0 || index !== rootIndex + 1) &&
      !argument.startsWith("--"),
  );

  if (!quizId) throw new Error("Usage: npm run create-quiz -- <quiz-id> [--dry-run]");
  if (rootIndex >= 0 && !root) throw new Error("--root requires a directory path.");
  return { quizId, dryRun, root };
}

export function runCreateQuiz(args, defaultRoot = PROJECT_ROOT) {
  const { quizId, dryRun, root } = parseArgs(args);
  assertQuizId(quizId);
  const projectRoot = resolve(root ?? defaultRoot);
  const paths = quizPaths(projectRoot, quizId);

  if (existsSync(paths.dataDirectory) || existsSync(paths.routeDirectory)) {
    throw new Error(`Quiz "${quizId}" already exists; refusing to overwrite it.`);
  }

  const files = scaffoldFiles(projectRoot, quizId);
  if (dryRun) {
    console.log(`Dry run: ${files.length} files would be created for "${quizId}":`);
    for (const [filePath] of files) console.log(`  ${relative(projectRoot, filePath)}`);
    return { files, dryRun: true };
  }

  for (const [filePath, content] of files) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, "utf8");
  }
  console.log(`Created ${files.length} scaffold files for "${quizId}".`);
  console.log("No registry, visual, Body, or home-card file was changed automatically.");
  return { files, dryRun: false };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    runCreateQuiz(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
