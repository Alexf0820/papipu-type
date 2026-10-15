#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, "docs/pizza-type/asset-manifest.json"), "utf8"));
const expectedTypes = ["margherita", "pepperoni", "quattroFormaggi", "mushroom", "seafood", "hawaiian", "veggie", "marinara"];
assert.equal(manifest.quizId, "pizza");
assert.equal(manifest.status, "RECOVERED_CANDIDATES_ONLY");
assert.equal(manifest.modifiedOriginalBytes, false);
assert.deepEqual(manifest.images.map((image) => image.typeId), expectedTypes);
assert.equal(new Set(manifest.images.map((image) => image.repositoryPath)).size, 8);
assert.equal(new Set(manifest.images.map((image) => image.sha256)).size, 8);
assert.equal(new Set(manifest.images.map((image) => image.candidateVisualKey)).size, 8);

for (const image of manifest.images) {
  assert.match(image.repositoryPath, /^public\/characters\/pizza-[a-z-]+\.png$/);
  const bytes = readFileSync(resolve(root, image.repositoryPath));
  assert.equal(bytes.length, image.byteLength);
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(bytes.subarray(12, 16).toString("ascii"), "IHDR");
  assert.equal(bytes.readUInt32BE(16), image.width);
  assert.equal(bytes.readUInt32BE(20), image.height);
  assert.equal(image.width, 1254);
  assert.equal(image.height, 1254);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), image.sha256);
  const gitBlob = createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
  assert.equal(gitBlob, image.gitBlobSha);
}

console.log(JSON.stringify({
  status: "RECOVERY_ASSETS_VALID_NOT_QUIZ_PASS",
  imageCount: 8,
  originalBytesVerified: true,
  dimensions: "1254x1254",
  quizIntegration: "HOLD_MANUSCRIPT_NOT_RECOVERED",
  rightsAndVisualApproval: "Not established by this byte-integrity script",
}, null, 2));
