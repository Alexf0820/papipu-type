import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";

import { runCreateQuiz } from "./create-quiz.mjs";

test("create-quiz dry run leaves the filesystem unchanged", () => {
  const root = mkdtempSync(resolve(tmpdir(), "papipu-scaffold-"));
  try {
    const result = runCreateQuiz(["test-quiz", "--dry-run", "--root", root]);
    assert.equal(result.files.length, 9);
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
    assert.match(readFileSync(resultJa, "utf8"), /variations: \{\n      a:/);
    assert.throws(() => runCreateQuiz(["test-quiz", "--root", root]), /refusing to overwrite/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("create-quiz rejects invalid and existing quiz IDs", () => {
  assert.throws(() => runCreateQuiz(["Sushi", "--dry-run"]), /Invalid quiz ID/);
  assert.throws(() => runCreateQuiz(["spaghetti", "--dry-run"]), /already exists/);
});
