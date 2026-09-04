#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertQuizId,
  createSeededRandom,
  loadQuizData,
  maxMinPercent,
  percent,
} from "./lib/quiz-tools.mjs";
import { createTypeScriptModuleLoader } from "./lib/ts-module-loader.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const STAGES = ["typeAlone", "mainCount", "trait", "hash"];
const LETTERS = ["a", "b", "c", "d"];

function parseArgs(args) {
  const rootIndex = args.indexOf("--root");
  const runsIndex = args.indexOf("--runs");
  const sensitivityRunsIndex = args.indexOf("--sensitivity-runs");
  const root = rootIndex >= 0 ? args[rootIndex + 1] : undefined;
  const parseRunCount = (index, fallback) => index < 0 ? fallback : Number(args[index + 1]);
  const quizId = args.find(
    (argument, index) =>
      argument !== "--root" &&
      argument !== "--runs" &&
      argument !== "--sensitivity-runs" &&
      (rootIndex < 0 || index !== rootIndex + 1) &&
      (runsIndex < 0 || index !== runsIndex + 1) &&
      (sensitivityRunsIndex < 0 || index !== sensitivityRunsIndex + 1) &&
      !argument.startsWith("--"),
  );
  if (!quizId) throw new Error("Usage: npm run verify-quiz -- <quiz-id> [--runs 1000000]");
  const runs = parseRunCount(runsIndex, 1_000_000);
  const sensitivityRuns = parseRunCount(sensitivityRunsIndex, 500_000);
  if (!Number.isInteger(runs) || runs <= 0 || !Number.isInteger(sensitivityRuns) || sensitivityRuns <= 0) {
    throw new Error("Run counts must be positive integers.");
  }
  return { quizId, root, runs, sensitivityRuns };
}

function emptyCounts(ids) {
  return Object.fromEntries(ids.map((id) => [id, 0]));
}

function pickLetter(random, weights) {
  const threshold = random();
  let running = 0;
  for (const letter of LETTERS) {
    running += weights[letter];
    if (threshold < running) return letter;
  }
  return "d";
}

function simulate({ quiz, sampleSessionQuestionIds, buildSessionQuiz, aggregateQuizScores, resolveResultType }, runs, weights, seed) {
  const random = createSeededRandom(seed);
  const counts = emptyCounts(quiz.resultTypeIds);
  const stageCounts = emptyCounts(STAGES);
  const questionCounts = Object.fromEntries(quiz.questions.map((question) => [question.id, emptyCounts(quiz.resultTypeIds)]));
  const hashCounts = emptyCounts(quiz.resultTypeIds);

  for (let run = 0; run < runs; run += 1) {
    const questionIds = sampleSessionQuestionIds(quiz.categories, random);
    const session = buildSessionQuiz(quiz, questionIds);
    const selections = session.questions.map((question) => ({
      questionId: question.id,
      choiceId: pickLetter(random, weights),
    }));
    const resolved = resolveResultType(session, selections, aggregateQuizScores(session, selections));
    counts[resolved.typeId] += 1;
    stageCounts[resolved.tieBreakStage] += 1;
    if (resolved.tieBreakStage === "hash") hashCounts[resolved.typeId] += 1;
    for (const questionId of questionIds) questionCounts[questionId][resolved.typeId] += 1;
  }

  return { counts, stageCounts, questionCounts, hashCounts };
}

function resultRows(counts, total) {
  return Object.entries(counts).map(([typeId, count]) => ({
    typeId,
    count,
    percent: Number(percent(count, total).toFixed(3)),
  }));
}

function questionInfluence(questionCounts, baseline, totalRuns) {
  const questionRuns = totalRuns / 4;
  const flagged = [];
  for (const [questionId, counts] of Object.entries(questionCounts)) {
    for (const [typeId, count] of Object.entries(counts)) {
      const delta = percent(count, questionRuns) - percent(baseline[typeId], totalRuns);
      if (Math.abs(delta) > 5) flagged.push({ questionId, typeId, delta: Number(delta.toFixed(3)) });
    }
  }
  return flagged.sort((left, right) => Math.abs(right.delta) - Math.abs(left.delta));
}

function logScenario(name, simulation, total) {
  console.log(`\n${name}`);
  console.table(resultRows(simulation.counts, total));
  const spread = maxMinPercent(simulation.counts, total);
  console.log(`max-min: ${spread.spread.toFixed(3)}pp`);
}

export function verifyQuiz(projectRoot, quizId, { runs = 1_000_000, sensitivityRuns = 500_000 } = {}) {
  const { ja, en } = loadQuizData(projectRoot, quizId);
  const loader = createTypeScriptModuleLoader(projectRoot);
  const sample = loader.load(resolve(projectRoot, "src/lib/type-engine/sampleQuestions.ts"));
  const scoring = loader.load(resolve(projectRoot, "src/lib/type-engine/scoring.ts"));
  const engine = { quiz: ja, ...sample, ...scoring };
  const uniform = { a: 0.25, b: 0.25, c: 0.25, d: 0.25 };
  const baseline = simulate(engine, runs, uniform, 0x11111111);

  console.log(`Final resolver verification for "${quizId}" (${runs.toLocaleString()} uniform runs)`);
  console.table(resultRows(baseline.counts, runs));
  const spread = maxMinPercent(baseline.counts, runs);
  console.log(`max: ${spread.max.toFixed(3)}%, min: ${spread.min.toFixed(3)}%, max-min: ${spread.spread.toFixed(3)}pp`);
  console.log("Tie-break stages:");
  console.table(resultRows(baseline.stageCounts, runs));
  console.log("Hash winners:");
  console.table(resultRows(baseline.hashCounts, baseline.stageCounts.hash));
  console.log("Question/type deltas over +/-5pp:");
  console.table(questionInfluence(baseline.questionCounts, baseline.counts, runs));

  const scenarios = [
    ["A 40%", { a: 0.4, b: 0.2, c: 0.2, d: 0.2 }],
    ["B 40%", { a: 0.2, b: 0.4, c: 0.2, d: 0.2 }],
    ["C 40%", { a: 0.2, b: 0.2, c: 0.4, d: 0.2 }],
    ["D 40%", { a: 0.2, b: 0.2, c: 0.2, d: 0.4 }],
    ["A 30%", { a: 0.3, b: 0.2333, c: 0.2333, d: 0.2334 }],
    ["B 30%", { a: 0.2333, b: 0.3, c: 0.2333, d: 0.2334 }],
    ["C 30%", { a: 0.2333, b: 0.2333, c: 0.3, d: 0.2334 }],
    ["D 30%", { a: 0.2333, b: 0.2333, c: 0.2334, d: 0.3 }],
  ];
  for (const [name, weights] of scenarios) {
    logScenario(name, simulate(engine, sensitivityRuns, weights, 0x22222222 + name.charCodeAt(0) + name.charCodeAt(2)), sensitivityRuns);
  }

  let parityFailures = 0;
  const parityRandom = createSeededRandom(0x33333333);
  for (let run = 0; run < 10_000; run += 1) {
    const questionIds = sample.sampleSessionQuestionIds(ja.categories, parityRandom);
    const jaSession = sample.buildSessionQuiz(ja, questionIds);
    const enSession = sample.buildSessionQuiz(en, questionIds);
    const selections = jaSession.questions.map((question) => ({ questionId: question.id, choiceId: pickLetter(parityRandom, uniform) }));
    const jaType = scoring.resolveResultType(jaSession, selections, scoring.aggregateQuizScores(jaSession, selections)).typeId;
    const enType = scoring.resolveResultType(enSession, selections, scoring.aggregateQuizScores(enSession, selections)).typeId;
    if (jaType !== enType) parityFailures += 1;
  }
  console.log(`JA/EN parity: ${10_000 - parityFailures}/10000 matched.`);

  return { baseline, parityFailures };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const { quizId, root, runs, sensitivityRuns } = parseArgs(process.argv.slice(2));
    assertQuizId(quizId);
    verifyQuiz(resolve(root ?? PROJECT_ROOT), quizId, { runs, sensitivityRuns });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
