# Papipu Type New Quiz Workflow

## Purpose

`create-quiz` is a development helper for adding a new quiz without changing
the shared diagnosis engine. It creates the standard data, result-content,
route, and test files only. It does not create quiz copy, scoring decisions,
images, registry entries, or UI design.

The shared-engine source of truth remains
`docs/PAPIPU_TYPE_ENGINE_SPEC.md`.

## Existing Pattern

Camp Gear is the reference implementation. Spaghetti demonstrates the current
multi-quiz pattern:

- `definition.ts` owns IDs, traits, categories, and locale-independent scoring.
- `ja.ts` and `en.ts` own display text only.
- `results/ja.ts` and `results/en.ts` own localized result copy, compatibility,
  mottos, and the shared `visualKey`.
- `results/index.ts` returns localized result content.
- `src/app/[locale]/<quiz-id>/page.tsx` loads the registered quiz and renders
  the existing `QuizFlow`.
- `src/lib/type-engine/registry.ts` explicitly registers quiz and result data.
- `src/lib/visual/registry.ts`, `src/lib/visual/types.ts`, and
  `src/components/character/bodies/index.tsx` resolve `visualKey` to a Body
  and existing `CharacterFace`; each new type later supplies its own
  `faceTransform`.
- `src/lib/home/content.ts` explicitly adds the approved home card.

Registries and the home page are deliberately not edited by the generator:
they are small, high-impact integration points that need a code review and
approved content.

## Create A Scaffold

```bash
npm run create-quiz -- sushi --dry-run
npm run create-quiz -- sushi
```

The quiz ID must start with a lowercase letter and use only lowercase letters,
digits, and hyphens. Existing data or route directories stop the command before
any file is written.

The generator creates:

```text
src/data/quizzes/<quiz-id>/
  definition.ts
  ja.ts
  en.ts
  results/ja.ts
  results/en.ts
  results/index.ts
  <quiz-id>.test.ts
  README.md
src/app/[locale]/<quiz-id>/page.tsx
```

All generated TypeScript is multi-line and intentionally contains only empty
structural placeholders. Fill it exclusively with approved quiz content.

## Content And Integration Order

1. Receive the eight result IDs, eight trait IDs, 32 questions, 128 scoring
   assignments, and all JA/EN content.
2. Fill `definition.ts`; preserve the 8 categories by 4 questions and Main +3 /
   Secondary +1 shared model.
3. Fill localized question text and result content. Each result needs variations
   `a`, `b`, `c`, three mottos, good/bad compatibility, and matching JA/EN
   `visualKey` values.
4. Register both locales and result content in `src/lib/type-engine/registry.ts`.
5. After image handoff, add the `VisualKey` union members, Body components,
   visual registry entries, original assets, and per-type `faceTransform`.
   Reuse `smile`, `sweat-smile`, and `noon`; do not create faces in this flow.
6. Add only approved title, description, accessible label, and icon to
   `src/lib/home/content.ts`.
7. Add quiz-specific assertions to the generated test file.

## Validation

```bash
npm run validate-quiz -- sushi
```

This loads the actual JA/EN quiz data and checks: 32 questions, 8 categories
of 4, a/b/c/d choices, Main and Secondary IDs, eight result and trait IDs,
unique types, type/trait mapping, JA/EN structure and scoring parity, result
variation `a/b/c`, three mottos, compatibility targets, and nonempty
`visualKey` fields.

Run this only after all placeholders have been replaced. It does not mutate
the repository.

## Production Statistics

```bash
npm run verify-quiz -- sushi
```

This is a Node-only development tool, not engine code. It invokes the current
`sampleSessionQuestionIds`, `buildSessionQuiz`, `aggregateQuizScores`, and
`resolveResultType` modules. By default it runs one million uniform sessions
and 500,000 sessions for each A/B/C/D 40% and 30% answer-position scenario.
It reports final type rates, max-min spread, tie-break stage use, hash winners,
question/type deltas above +/-5pp, and 10,000 JA/EN parity cases.

Optional run counts make iterative authoring faster:

```bash
npm run verify-quiz -- sushi --runs 10000 --sensitivity-runs 5000
```

Use the full default run counts for production review. Statistical findings do
not authorize changing scoring; route them to the content owner.

## Final Checks

```bash
npm run validate-quiz -- sushi
npm run verify-quiz -- sushi
npm test
npm run lint
npx next typegen
npx tsc --noEmit
git diff --check
```
