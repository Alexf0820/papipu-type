import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";

import { runCreateQuiz } from "./create-quiz.mjs";
import { runImportQuizContent } from "./import-quiz-content.mjs";

function validHandoff(quizId) {
  const typeIds = Array.from({ length: 8 }, (_, index) => `result${index + 1}`);
  const traitIds = Array.from({ length: 8 }, (_, index) => `trait${index + 1}`);
  const questionIds = Array.from({ length: 32 }, (_, index) => `q${String(index + 1).padStart(2, "0")}`);
  const choiceIds = ["a", "b", "c", "d"];
  const question = (questionId, questionIndex) => ({
    scoring: Object.fromEntries(choiceIds.map((choiceId, choiceIndex) => [choiceId, {
      mainType: typeIds[(questionIndex + choiceIndex) % typeIds.length],
      secondaryType: typeIds[(questionIndex + choiceIndex + 1) % typeIds.length],
    }])),
    ja: { text: `JA ${questionId}`, choices: Object.fromEntries(choiceIds.map((choiceId) => [choiceId, `JA ${questionId} ${choiceId}`])) },
    en: { text: `EN ${questionId}`, choices: Object.fromEntries(choiceIds.map((choiceId) => [choiceId, `EN ${questionId} ${choiceId}`])) },
  });
  const result = (locale, typeId) => ({
    displayName: `${locale} ${typeId}`,
    visualKey: `${quizId}-${typeId}`,
    variations: { a: { body: `${locale} ${typeId} a` }, b: { body: `${locale} ${typeId} b` }, c: { body: `${locale} ${typeId} c` } },
    mottos: [`${locale} ${typeId} 1`, `${locale} ${typeId} 2`, `${locale} ${typeId} 3`],
    good: { typeId: typeIds[(typeIds.indexOf(typeId) + 1) % typeIds.length], reason: `${locale} good` },
    bad: { typeId: typeIds[(typeIds.indexOf(typeId) + 2) % typeIds.length], reason: `${locale} bad` },
  });
  return {
    schemaVersion: 1,
    quiz: {
      id: quizId,
      title: { ja: "JA title", en: "EN title" },
      resultTypeIds: typeIds,
      traitIds,
      typeTraitMap: Object.fromEntries(typeIds.map((typeId, index) => [typeId, traitIds[index]])),
      categories: Array.from({ length: 8 }, (_, index) => questionIds.slice(index * 4, index * 4 + 4)),
      questions: Object.fromEntries(questionIds.map((questionId, index) => [questionId, question(questionId, index)])),
    },
    results: {
      ja: Object.fromEntries(typeIds.map((typeId) => [typeId, result("JA", typeId)])),
      en: Object.fromEntries(typeIds.map((typeId) => [typeId, result("EN", typeId)])),
    },
  };
}

function handoffPath(root, quizId) {
  return resolve(root, "src/data/quizzes", quizId, "content/handoff.json");
}

test("create-quiz dry run leaves the filesystem unchanged", () => {
  const root = mkdtempSync(resolve(tmpdir(), "papipu-scaffold-"));
  try {
    const result = runCreateQuiz(["test-quiz", "--dry-run", "--root", root]);
    assert.equal(result.files.length, 11);
    assert.equal(existsSync(resolve(root, "src/data/quizzes/test-quiz")), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("create-quiz creates the expected readable structure and refuses overwrite", () => {
  const root = mkdtempSync(resolve(tmpdir(), "papipu-scaffold-"));
  try {
    runCreateQuiz(["test-quiz", "--root", root]);
    const definition = resolve(root, "src/data/quizzes/test-quiz/definition.ts");
    const resultJa = resolve(root, "src/data/quizzes/test-quiz/results/ja.ts");
    const route = resolve(root, "src/app/[locale]/test-quiz/page.tsx");
    assert.equal(existsSync(definition), true);
    assert.equal(existsSync(resultJa), true);
    assert.equal(existsSync(route), true);
    assert.equal(existsSync(handoffPath(root, "test-quiz")), true);
    assert.match(readFileSync(resultJa, "utf8"), /variations: \{\n      a:/);
    assert.throws(() => runCreateQuiz(["test-quiz", "--root", root]), /refusing to overwrite/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("import-quiz-content validates a complete handoff before atomically replacing quiz data", () => {
  const root = mkdtempSync(resolve(tmpdir(), "papipu-scaffold-"));
  try {
    runCreateQuiz(["test-quiz", "--root", root]);
    writeFileSync(handoffPath(root, "test-quiz"), `${JSON.stringify(validHandoff("test-quiz"), null, 2)}\n`);
    runImportQuizContent(["test-quiz", "--root", root]);
    const definition = readFileSync(resolve(root, "src/data/quizzes/test-quiz/definition.ts"), "utf8");
    const ja = readFileSync(resolve(root, "src/data/quizzes/test-quiz/ja.ts"), "utf8");
    const resultEn = readFileSync(resolve(root, "src/data/quizzes/test-quiz/results/en.ts"), "utf8");
    assert.match(definition, /result1/);
    assert.match(ja, /JA q01/);
    assert.match(resultEn, /EN result1 a/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("import-quiz-content rejects malformed handoffs without partial formal-file writes", () => {
  const root = mkdtempSync(resolve(tmpdir(), "papipu-scaffold-"));
  try {
    runCreateQuiz(["test-quiz", "--root", root]);
    const targets = ["definition.ts", "ja.ts", "en.ts", "results/ja.ts", "results/en.ts"].map((file) => resolve(root, "src/data/quizzes/test-quiz", file));
    const before = targets.map((target) => readFileSync(target, "utf8"));
    const handoff = validHandoff("test-quiz");
    delete handoff.results.en.result8;
    handoff.quiz.questions.q01.scoring.a.mainType = "unknown";
    delete handoff.quiz.questions.q02.en.choices.d;
    writeFileSync(handoffPath(root, "test-quiz"), `${JSON.stringify(handoff, null, 2)}\n`);
    assert.throws(() => runImportQuizContent(["test-quiz", "--root", root]), /validation failed/);
    assert.deepEqual(targets.map((target) => readFileSync(target, "utf8")), before);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("import-quiz-content refuses non-scaffold quiz directories", () => {
  const root = mkdtempSync(resolve(tmpdir(), "papipu-scaffold-"));
  try {
    const quizDirectory = resolve(root, "src/data/quizzes/existing-quiz");
    mkdirSync(quizDirectory, { recursive: true });
    writeFileSync(resolve(quizDirectory, "definition.ts"), "export {};\n", { encoding: "utf8", flag: "w" });
    assert.throws(() => runImportQuizContent(["existing-quiz", "--root", root]), /refusing to overwrite/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("create-quiz rejects invalid and existing quiz IDs", () => {
  assert.throws(() => runCreateQuiz(["Sushi", "--dry-run"]), /Invalid quiz ID/);
  assert.throws(() => runCreateQuiz(["spaghetti", "--dry-run"]), /already exists/);
});
