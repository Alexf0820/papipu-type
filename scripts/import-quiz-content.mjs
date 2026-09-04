#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadContentHandoff,
  renderImportedQuizFiles,
  replaceQuizFilesAtomically,
  validateContentHandoff,
} from "./lib/content-handoff.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(args) {
  const rootIndex = args.indexOf("--root");
  const root = rootIndex >= 0 ? args[rootIndex + 1] : undefined;
  const quizId = args.find(
    (argument, index) => argument !== "--root" && (rootIndex < 0 || index !== rootIndex + 1) && !argument.startsWith("--"),
  );
  if (!quizId) throw new Error("Usage: npm run import-quiz-content -- <quiz-id>");
  if (rootIndex >= 0 && !root) throw new Error("--root requires a directory path.");
  return { quizId, root };
}

/** Import approved structured content only after the entire handoff is valid. */
export function runImportQuizContent(args, defaultRoot = PROJECT_ROOT) {
  const { quizId, root } = parseArgs(args);
  const projectRoot = resolve(root ?? defaultRoot);
  const { handoffPath, handoff } = loadContentHandoff(projectRoot, quizId);
  const errors = validateContentHandoff(handoff, quizId);
  if (errors.length > 0) {
    throw new Error(`Content handoff validation failed for \"${quizId}\":\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }
  replaceQuizFilesAtomically(projectRoot, quizId, renderImportedQuizFiles(handoff));
  console.log(`Imported approved content for \"${quizId}\" from ${handoffPath}.`);
  console.log("Validated all input before replacing definition, JA/EN questions, and JA/EN result content.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    runImportQuizContent(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
