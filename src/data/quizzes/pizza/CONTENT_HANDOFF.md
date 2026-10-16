> **2026-10-16 v1.1 update:** The owner explicitly authorized new Pizza content and reuse of the eight preserved originals. The populated `content/handoff.json` is now imported and integrated on the feature branch. The historical blank-content hold below is superseded only for authoring/integration. Preview/browser/face approval remains blocked; see `docs/pizza-type/verification-v1.1/summary.json`. No Production approval.

# Pizza Type: content and image handoff gate

Status: **blank scaffold only; not an authored, registered, or review-ready quiz**.

The internal quiz ID is `pizza`. `type01`–`type08` and
`trait01`–`trait08` are generator placeholders, not proposed or approved
Pizza Type concepts. Do not infer a result taxonomy or scoring from them.

## Pizza-only experiment: content owner dot1号

On 2026-10-03 the user explicitly delegated Pizza's eight types, traits,
questions, JA/EN copy, results, mottos, compatibility, and scoring design to
dot1号 as an experiment. Do not wait for ちゃっぴー for this quiz. Preserve
drafts, selected content, scoring, images, and verification results so a
future ちゃっぴー version can be compared. This exception does not change
the other five quizzes or the shared engine. Production remains unchanged.

Supply one complete `content/handoff.json` using the generated
schema (`schemaVersion: 1`, `quiz.id: "pizza"`). The implementation pass
must preserve the selected, versioned text and mappings exactly.

Required content:

1. Final JA/EN quiz title, eight stable result type IDs, eight stable trait
   IDs, and the approved one-to-one type/trait mapping. Replace all
   `typeNN`/`traitNN` placeholders consistently throughout the file.
2. Eight categories of four questions each, covering `q01`–`q32` once.
   Preserve this supplied question order unless the content owner approves
   a change.
3. All 32 question texts and all 128 answer-choice texts in both JA and EN.
   Every question has exactly the choice IDs `a`, `b`, `c`, and `d`.
4. All 128 locale-independent Main/Secondary assignments. Both targets
   must be valid result IDs and must differ. Do not introduce per-locale
   scoring or alter the shared Main +3 / Secondary +1 model.
5. For every result in each language: display name, the shared
   `pizza-<result-type>` visual key, complete variation bodies `a/b/c`,
   exactly three mottos, and GOOD/BAD target IDs and reasons. JA and EN
   must refer to the same visual keys and compatibility targets.
6. A clear authorship/version reference accompanying the file. Distinguish
   the user-authorized experiment, the content selected for Preview, and
   eventual Preview approval. A populated JSON file or passing validator
   does not itself establish Production approval.

Use stable ASCII JavaScript identifier-safe IDs (for example the pattern
`^[a-z][A-Za-z0-9]*$`) for result, trait, and question IDs because the
current importer emits some object keys without quotes. No example ID in
this document is a content recommendation. All required strings must
contain visible text; whitespace-only values are not acceptable even
where the current validator accepts them.

### Home-card copy is a separate deliverable

The current handoff schema does not contain Home copy. Supply approved
JA/EN two-line card titles (`line1`, `line2`), description, accessible
action label, genre icon, and the icon's JA/EN accessible labels separately.
Do not register the blank scaffold or add a ready-to-play Home card.

## Image gate: Codex W / コーデW

Content IDs must be settled before mapping images. Only approved originals
from `papipu-type-image/pizza/handoff/` may enter the application. Supply
eight originals plus an unambiguous filename → result ID → visual key
mapping and approval reference. File extensions must reflect the actual
originals; do not guess an extension or manufacture an asset.

The expected base-image style is a simple 3D object on a white background,
with no faces, hands, feet, or text. Inspect the actual pixels before
integration. Preserve the originals without image editing. Reuse existing
`CharacterFace` overlays (`smile`, `sweat-smile`, `noon`). Determine each
`faceTransform` only after inspecting that type's image and its rendered
overlay. Generic copied coordinates are not visual approval.

The image handoff location and approval are still pending; this scaffold
contains no Pizza images and requests no new image generation.

## Safe import and integration sequence

1. Preserve the authored artifact/version and check all of the
   requirements above, including trim-nonempty copy, ID safety, mapping
   uniqueness, JA/EN consistency, and exact source text.
2. Check the Pizza marker and run the read-only
   `validateContentHandoff(handoff, "pizza")` export from
   `scripts/lib/content-handoff.mjs`. Inspect every returned error.
3. Only after complete content review and validation, run
   `npm run import-quiz-content -- pizza`. This command writes five files.
   **It has no dry-run mode. Unknown flags, including `--dry-run`, do not
   prevent writes.** Inspect the generated diff against the selected versioned source.
4. After image approval, integrate only Pizza's originals, Body components,
   visual keys, visual registry, per-type face positions, quiz registry,
   approved Home copy, and quiz-specific tests. Keep existing copy, assets,
   engine, and scoring unchanged.
5. Run the checks below and review their outputs. Do not treat an exit code
   as content or statistical approval.
6. Only completed, checked content proceeds to feature-branch Preview and
   iPhone JA/EN review. Main integration and Production require explicit
   user approval after review.

## Verification expectations

Before readiness, run and retain results for:

- `npm run validate-quiz -- pizza`
- `npm run verify-quiz -- pizza` with full default run counts
- `npm test`
- `npm run test:scaffold`
- `npm run lint`
- `npx next typegen`
- `npx tsc --noEmit`
- `npm run build`
- `git diff --check`

The full statistical review includes one million uniform sessions, all
eight answer-position sensitivity scenarios (500,000 sessions each),
final distributions, max–min spread, Main counts by type and A/B/C/D
position, tie-break stages, hash winners, question deltas, and 10,000
JA/EN parity cases. Inspect `parityFailures` explicitly: the current
`verify-quiz` CLI can exit 0 even when it is nonzero and does not issue
a statistical-quality PASS. Main-count review and variation `a/b/c`
reachability need additional explicit checks. Record the Pizza content owner's
quality decision and any scoring revisions with their measured rationale;
never rebalance the existing five quizzes or alter the shared engine.

Preview review must cover JA/EN questions, all eight result visuals and
face positions, variation/motto/compatibility rendering, interrupted and
repeated answer/back/retry flows, Home navigation, and sharing. Passing
the blank scaffold's shape test only establishes that its structure can
load; it is not a content-readiness test.
