# Papipu Type — Common Diagnosis Engine Specification

**Version:** Ver.2.2 (as implemented in camp-gear)  
**Status:** Single Source of Truth (正本)  
**Last updated:** 2026-08-11

---

## IMPORTANT — Read Before Changing Anything

- **Before adding or modifying any Papipu Type quiz**, read this document in full.
- **Do not change the common diagnosis engine specification** without explicit instruction.
- **Do not confuse camp-gear–specific details with engine-wide rules.** camp-gear is the first quiz on this engine; its scoring table and content are quiz data, not engine logic.
- **When adding a new quiz**, add quiz data and register it. Do **not** rebuild the common engine per quiz.
- **Creative content** (question text, choice text, result copy, mottos, compatibility copy) is authored on the **ChatGPT side**.
- **Cursor / Codex / AI agents** handle **implementation, tests, statistical verification, and accurate data reflection** only.
- **AI must not** invent, improve, rephrase, or supplement question/result copy on its own.

If this spec and the code disagree, treat the code as the current runtime truth and update this document after an intentional spec change.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Shared Engine / Quiz Data Separation](#2-shared-engine--quiz-data-separation)
3. [Question Pool](#3-question-pool)
4. [Client-side Sampling / SSR](#4-client-side-sampling--ssr)
5. [Retry](#5-retry)
6. [Scoring](#6-scoring)
7. [Trait](#7-trait)
8. [Result Type Resolution](#8-result-type-resolution)
9. [Deterministic Hash](#9-deterministic-hash)
10. [Type Hash Salt](#10-type-hash-salt)
11. [Variation](#11-variation)
12. [Variation Hash](#12-variation-hash)
13. [Random Presentation Elements](#13-random-presentation-elements)
14. [Localization](#14-localization)
15. [Adding a New Quiz](#15-adding-a-new-quiz)
16. [Source File Map](#16-source-file-map)
17. [Required Tests](#17-required-tests)
18. [Rejected Approaches (Historical)](#18-rejected-approaches-historical)
19. [camp-gear Reference (Quiz-Specific)](#19-camp-gear-reference-quiz-specific)

---

## 1. Purpose

Papipu Type is a service that runs multiple “What ○○ Type Are You?” quizzes on **one shared diagnosis engine**.

Examples (current and planned):

- `camp-gear` (implemented)
- `bread` (planned)
- `pasta` (planned)
- `sushi` (planned)
- future quizzes

**Architecture principle:** one common engine + per-quiz data — **not** a separate engine per quiz.

---

## 2. Shared Engine / Quiz Data Separation

### Common engine responsibilities

| Responsibility | Primary module |
|---|---|
| Question sampling (1 per category) | `src/lib/type-engine/sampleQuestions.ts` |
| Display-order shuffle | `src/lib/type-engine/sampleQuestions.ts` |
| Answer state (UI layer) | `src/components/quiz/QuizFlow.tsx` |
| Main / Secondary scoring | `src/lib/type-engine/scoring.ts` |
| Result Type resolution + tie-break | `src/lib/type-engine/scoring.ts` |
| Deterministic hash | `src/lib/type-engine/deterministicHash.ts` |
| Variation selection (hash) | `src/lib/type-engine/variation.ts` |
| Quiz assembly (scoring + locale text) | `src/lib/type-engine/buildQuiz.ts` |
| Quiz registry | `src/lib/type-engine/registry.ts` |

### Quiz data responsibilities

Each quiz provides:

| Data | Typical location (camp-gear example) |
|---|---|
| `quizId` | `src/data/quizzes/camp-gear/definition.ts` |
| 8 categories × 4 questions = 32 questions | `CAMP_GEAR_CATEGORIES`, `CAMP_GEAR_SCORING` |
| 4 choices per question (`a`–`d`) | scoring table + locale files |
| Main Type / Secondary Type per choice | `CAMP_GEAR_SCORING` |
| trait mapping per choice | derived in scoring table |
| 8 Result Types | `CAMP_GEAR_RESULT_TYPE_IDS` |
| Variation bodies `a` / `b` / `c` | `src/data/quizzes/camp-gear/results/` |
| Compatibility (good / bad) | `src/data/quizzes/camp-gear/results/` |
| Mottos | `src/data/quizzes/camp-gear/results/` |
| Character visuals | `src/lib/visual/registry.ts` + SVG bodies |
| JA / EN display text | `ja.ts`, `en.ts` |

The engine **does not** hardcode question count, type count, or trait count. Those come from quiz data (`src/lib/type-engine/types.ts`).

---

## 3. Question Pool

Each quiz has:

```
8 categories × 4 questions = 32 questions
```

Per diagnosis session:

1. Pick **one random question from each category** → 8 questions total
2. **Shuffle** the 8 selected questions for display order

This is **not** “pick any 8 from 32 at random.” Every category is represented exactly once.

### Why

- Different questions each run → replay value
- Category coverage stays balanced → measurement axes do not drift

### camp-gear category layout

```ts
// src/data/quizzes/camp-gear/definition.ts — CAMP_GEAR_CATEGORIES
[q01–q04], [q05–q08], [q09–q12], [q13–q16],
[q17–q20], [q21–q24], [q25–q28], [q29–q32]
```

### Implementation

- `sampleQuestionIdsFromCategories()` — one pick per inner array
- `shuffleIds()` — Fisher–Yates shuffle
- `sampleSessionQuestionIds()` — pick + shuffle
- `buildSessionQuiz()` — subset full pool to session questions

See `src/lib/type-engine/sampleQuestions.ts`.

---

## 4. Client-side Sampling / SSR

**Do not** sample questions during SSR / SSG using `Math.random()`.

### Reasons

- Prevents Next.js **hydration mismatch** (server HTML ≠ client first paint)
- Prevents a fixed question set being baked into static HTML

### When sampling runs

| Event | Where |
|---|---|
| First visit / mount | `useEffect` in `QuizFlow` (client only) |
| Retry (“もう一度診断する”) | `attemptId` change retriggers the same `useEffect` |

### Current implementation

```tsx
// src/components/quiz/QuizFlow.tsx
useEffect(() => {
  startTransition(() => {
    setSessionQuestionIds(sampleSessionQuestionIds(quiz.categories));
  });
}, [quiz.categories, attemptId]);
```

Until `sessionQuestionIds` is set, the UI renders a **neutral empty shell** (no questions), then hydrates with the sampled set. Scoring / Type / Variation logic is unaffected.

### What uses `Math.random()`

- Question sampling and shuffle (`sampleQuestions.ts`, via `QuizFlow`)
- Face expression and motto index (`src/lib/result/presentation.ts`)

**Type / Variation never use `Math.random()`.**

---

## 5. Retry

“Try again” / “もう一度診断する” resets the session and re-samples.

| Action | Implementation |
|---|---|
| Clear answers | `setAnswers({})` |
| Reset question index | `setQuestionIndex(0)` |
| Bump attempt id | `setAttemptId(n => n + 1)` |
| Re-sample 8 questions | `useEffect` depends on `attemptId` |
| Re-shuffle display order | inside `sampleSessionQuestionIds()` |

**Note:** Retry does **not** guarantee a completely different 8-question set. Overlap is allowed.

Face / motto randomness also resets via `attemptId` on `QuizResult` remount key.

---

## 6. Scoring

Each answered choice awards:

| Target | Points | Meaning |
|---|---:|---|
| **Main Type** | **+3** | Primary type expressed by this answer |
| **Secondary Type** | **+1** | Secondary type also present in this answer |

Constants: `MAIN_TYPE_SCORE = 3`, `SECONDARY_TYPE_SCORE = 1` in `src/lib/type-engine/types.ts`.

### Secondary Type role

Secondary is **not** used for Variation judgment.

It smooths Result Type scoring so that 8-question sessions produce more nuanced totals than Main-only scoring.

### Per session totals

- 8 questions × (3 + 1) = **32 type points** distributed across all result types
- `mainCounts[type]` = how many times that type was chosen as Main in the session

Implementation: `aggregateQuizScores()` in `src/lib/type-engine/scoring.ts`.

---

## 7. Trait

Each Result Type maps to one trait (quiz-defined via `typeTraitMap`).

### camp-gear mapping

| Type | Trait |
|---|---|
| peg | supportive |
| tent | protective |
| lantern | social |
| chair | relaxed |
| firePit | passionate |
| sleepingBag | peaceful |
| knife | logical |
| hammer | action |

Defined in `CAMP_GEAR_TYPE_TRAIT_MAP` (`src/data/quizzes/camp-gear/definition.ts`).

Each choice adds trait points (typically +1 to Main’s trait and +1 to Secondary’s trait) in the scoring table.

### Tie-break role

Traits are **kept for backward compatibility** and used in **Result Type Step 3**.

**Ver.2.2 Monte Carlo (1M runs, Method A):** trait tie-break resolves **~0%** of remaining ties. Do not design new features assuming trait tie-break will decide outcomes.

---

## 8. Result Type Resolution

After all 8 session questions are answered, resolve the Result Type in **four steps**:

### Step 1 — Total type score

Sum `Main×3 + Secondary×1` per type. Highest score wins.

### Step 2 — Main count (if tied on Step 1)

Among tied types, compare how many times each was chosen as **Main**. Highest Main count wins.

### Step 3 — Trait score (if still tied)

Among remaining tied types, compare each type’s **corresponding trait** total (`typeTraitMap[type]` → `traitScores[trait]`).

### Step 4 — Deterministic hash (if still tied)

Pick one type from remaining candidates using hash (see §9).

### Hard rules

- **Never** use `resultTypeIds` declaration order as tie-break
- **Never** use array index order as tie-break
- **Never** use `Math.random()` for final Result Type
- `typeRanking` sorts by score only; ties are **not** broken in ranking itself

Implementation: `resolveResultType()` in `src/lib/type-engine/scoring.ts`.

Debug field `tieBreakStage`: `"typeAlone" | "mainCount" | "trait" | "hash"`.

### Ver.2.2 statistics (camp-gear, reference)

Approximate rates under uniform A/B/C/D answers (1M Monte Carlo):

| Stage | ~Rate |
|---|---:|
| Step 1 alone | ~78.9% |
| Step 2 resolves | ~1.6% |
| Step 3 resolves | ~0.0% |
| Step 4 (hash) | remainder (~18.8% of all runs) |

---

## 9. Deterministic Hash

Used for **Step 4 Result Type tie-break** and **Variation selection**.

### Algorithm

**FNV-1a 32-bit** — `stableHash()` in `src/lib/type-engine/deterministicHash.ts`:

```
offset basis = 2166136261
for each char: hash ^= charCode; hash *= 16777619
return hash >>> 0  (unsigned 32-bit)
```

### Canonical answers

Built from actual session `questionId` + `choiceId` pairs:

1. Sort by `questionId` (locale-aware string sort)
2. Format: `q03:c|q08:a|q11:d|...`
3. **Display order (shuffle order) is NOT included**

Same 8 questions + same answers → same canonical string → same hash outcome, regardless of UI question order.

### Type tie-break pick

```
hashInput = "type|" + quizId + "|" + canonicalAnswers
candidates = tied types sorted alphabetically
winner = candidates[ stableHash(hashInput) % candidates.length ]
```

Implementation: `buildTypeHashInput()`, `pickHashedCandidate()`.

---

## 10. Type Hash Salt

Type resolution and Variation selection **must use different hash namespaces** (salts):

| Purpose | Prefix |
|---|---|
| Result Type Step 4 | `type\|` |
| Variation a/b/c | `variation\|` |

This prevents Type and Variation from being correlated to the same hash residue.

---

## 11. Variation

### What Variation is

Variation `a` / `b` / `c` are **three alternate result body texts** for the same Result Type.

Variation is **not** an additional personality sub-diagnosis.

### What Variation is not

Do **not** select Variation by:

- trait group totals
- Secondary Type dominance
- per-type trait rules
- `Math.random()`

`src/data/quizzes/camp-gear/results/variationRules.ts` is **legacy / unused** — kept for reference only. The engine uses hash selection (`pickResultVariationByHash`).

### Why hash won (summary)

Statistical verification (Ver.2.2) tested trait-based and Secondary-based Variation rules. They showed:

- extreme concentration on one variation for some types
- increased unresolved rates
- strong structural correlation with Secondary patterns

**Final spec:** after Result Type is fixed, pick `a` / `b` / `c` by deterministic hash.

### Purpose

- Same type, different copy
- Friends less likely to get identical text
- Higher replay value alongside random 8-question sessions

Variation choice has **no diagnostic meaning**.

---

## 12. Variation Hash

After Result Type `typeId` is known:

```
hashInput = "variation|" + quizId + "|" + typeId + "|" + canonicalAnswers
index     = stableHash(hashInput) % 3

0 → a
1 → b
2 → c
```

Implementation: `buildVariationHashInput()`, `pickResultVariationByHash()` in `src/lib/type-engine/variation.ts`.

Same inputs → same Variation always.

---

## 13. Random Presentation Elements

These are **independent of diagnosis logic**:

| Element | Mechanism | File |
|---|---|---|
| Face expression | `Math.random()` on client mount | `src/lib/result/presentation.ts`, `QuizResult.tsx` |
| Motto index (1 of 3) | `Math.random()` on client mount | same |

Rules:

- Do **not** feed face/motto randomness into Type or Variation
- Do **not** change this behavior without explicit instruction
- `resultPresentationKey()` uses resolved result + selections for React remount / GA dedupe — not for Type/Variation

---

## 14. Localization

**Judgment data is locale-independent.**

Shared across JA / EN:

- `questionId`
- `choiceId` (`a`–`d`)
- `mainType` / `secondaryType`
- `categories`
- scoring table (`CAMP_GEAR_SCORING` for camp-gear)

Locale files (`ja.ts`, `en.ts`) hold **display text only**:

- quiz title
- question text
- choice text

**JA and EN must produce identical Type and Variation** for the same selections.

Assembly: `buildQuiz()` merges `QuizScoringTable` + `QuizText` → `Quiz`.

Missing locale text falls back to question/choice ID strings (`Q07`, `A`) — production quizzes should define all 32 questions before ship.

---

## 15. Adding a New Quiz

Example: adding `bread`.

### 1. Create quiz data directory

```
src/data/quizzes/bread/
  definition.ts      # quizId, types, traits, categories, CAMP_GEAR_SCORING equivalent
  ja.ts              # Japanese display text only
  en.ts              # English display text only
  results/
    types.ts
    ja.ts            # result bodies, compatibility, mottos
    en.ts
    index.ts
  bread.test.ts      # structure + JA/EN scoring parity
```

### 2. Define scoring in `definition.ts`

- 32 question IDs
- `categories`: 8 arrays × 4 question IDs
- `QuizScoringTable`: every question × 4 choices with `mainType`, `secondaryType`, `traits`
- `typeTraitMap`: each result type → trait
- `createBreadQuiz(locale, text)` calling `buildQuiz()`

**Do not duplicate scoring in `ja.ts` / `en.ts`.**

### 3. Author locale text

- ChatGPT / human authors provide `ja.ts` and `en.ts` text
- AI agents copy text accurately — no rewording

### 4. Author result content

- 8 types × 3 variation bodies + compatibility + mottos + visual keys
- Register visuals in `src/lib/visual/registry.ts` if new bodies are needed

### 5. Register quiz

```ts
// src/lib/type-engine/registry.ts
const QUIZZES = {
  ...
  bread: { ja: breadQuizJa, en: breadQuizEn },
};
```

### 6. Add route page

```
src/app/[locale]/bread/page.tsx
```

Mirror `camp-gear/page.tsx`: load quiz from registry, render `QuizFlow`.

### 7. Wire result resolver

Currently camp-gear uses `resolveCampGearResult()` (`src/lib/type-engine/resolveResult.ts`).

For new quizzes, either:

- add `resolveBreadResult()` following the same pattern, or
- generalize to `resolveQuizResult(quiz, selections, resultContent)` when multiple quizzes ship

Engine modules (`scoring`, `deterministicHash`, `variation`, `sampleQuestions`) should remain shared.

### 8. Tests (see §17)

### 9. Statistical verification (recommended before launch)

Run Monte Carlo on new scoring table:

- 8-type distribution spread
- tie-break stage rates
- Variation a/b/c reachability

Use temp scripts outside the repo or dedicated test utilities — do not commit one-off verification unless requested.

---

## 16. Source File Map

### Common engine

| File | Role |
|---|---|
| `src/lib/type-engine/types.ts` | Core types, score constants |
| `src/lib/type-engine/buildQuiz.ts` | Merge scoring + locale text |
| `src/lib/type-engine/sampleQuestions.ts` | Category sample + shuffle + session quiz |
| `src/lib/type-engine/scoring.ts` | Aggregate scores, resolve Result Type |
| `src/lib/type-engine/deterministicHash.ts` | FNV-1a, canonical answers, hash inputs |
| `src/lib/type-engine/variation.ts` | Variation hash selection |
| `src/lib/type-engine/resolveResult.ts` | camp-gear result assembly (quiz-specific for now) |
| `src/lib/type-engine/registry.ts` | Quiz lookup by id + locale |
| `src/components/quiz/QuizFlow.tsx` | Client UI, sampling, answers, retry |
| `src/components/quiz/QuizResult.tsx` | Result display |
| `src/lib/result/presentation.ts` | Face / motto randomness |

### Tests

| File | Role |
|---|---|
| `src/lib/type-engine/scoring.test.ts` | Scoring + tie-break |
| `src/lib/type-engine/deterministicHash.test.ts` | Hash stability + salts |
| `src/lib/type-engine/sampleQuestions.test.ts` | Sampling rules |
| `src/lib/type-engine/variation.test.ts` | Variation hash |
| `src/lib/type-engine/resolveResult.test.ts` | End-to-end resolve |
| `src/data/quizzes/camp-gear/campGear.test.ts` | Structure + JA/EN parity |

---

## 17. Required Tests

Any engine change should keep these properties green:

| Requirement | Covered by |
|---|---|
| Exactly 1 question per category, 8 total | `sampleQuestions.test.ts` |
| No duplicate questions in session | `sampleQuestions.test.ts` |
| Retry re-samples (via `attemptId`) | `QuizFlow` + manual QA |
| No SSR sampling / hydration mismatch | `QuizFlow` client-only `useEffect` |
| Main +3 / Secondary +1 | `scoring.test.ts`, `campGear.test.ts` |
| No declaration-order tie-break | `scoring.test.ts`, `deterministicHash.test.ts` |
| Hash stable for same inputs | `deterministicHash.test.ts` |
| Type hash ≠ Variation hash | `deterministicHash.test.ts`, `variation.test.ts` |
| Same inputs → same Type + Variation | `resolveResult.test.ts`, `variation.test.ts` |
| JA/EN identical judgment | `campGear.test.ts` |
| Variation a/b/c reachable | `variation.test.ts` |

Run:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

---

## 18. Rejected Approaches (Historical)

Documented so future agents do not re-introduce them without new statistical approval.

| Approach | Why rejected |
|---|---|
| Fixed 6 questions | Low replay value; same questions every run |
| `mainScore +2` only (no Secondary) | Coarser scoring; legacy pre–Ver.2.2 |
| `resultTypeIds` order tie-break | Caused peg/tent bias (~2–3× spread vs knife/hammer) |
| Variation by trait groups | Skewed distribution (e.g. knife-A 74%+); not cosmetic |
| Variation by Secondary Type | Strong type correlation; high unresolved in some designs |
| Variation Ver.4 per-type Secondary→A/B/C maps | 21%+ unresolved; hammer-A 80%+ |
| Hash includes display order | Same answers could change Type when shuffle order changes |
| SSR / SSG question sampling | Hydration mismatch risk |

---

## 19. camp-gear Reference (Quiz-Specific)

These are **quiz data**, not engine rules.

| Item | Value |
|---|---|
| `quizId` | `camp-gear` |
| Scoring version | **Ver.2.2** |
| Question IDs | `q01`–`q32` |
| Choices | `a`, `b`, `c`, `d` |
| Result types | peg, tent, lantern, chair, firePit, sleepingBag, knife, hammer |
| Scoring table | `CAMP_GEAR_SCORING` in `definition.ts` |
| JA text | `src/data/quizzes/camp-gear/ja.ts` |
| EN text | `src/data/quizzes/camp-gear/en.ts` |
| Result copy | `src/data/quizzes/camp-gear/results/` |

### Ver.2.2 type balance (reference stats)

Under uniform random answers, 1M Monte Carlo, Method A + Step 4 hash:

- Spread ~4.6 pp (lantern ~12.7% – chair ~8.1%)
- ~18.75% of runs reach hash tie-break
- Approved for implementation

Other quizzes must run their own balance verification before launch.

---

## Change Log

| Date | Change |
|---|---|
| 2026-08-11 | Initial spec document (Ver.2.2 engine as implemented in camp-gear) |
