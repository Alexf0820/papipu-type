# Pizza Type v1.1 — preserved draft handoff

Status: **STOP: Preview access denied; not ready for owner iPhone approval.**

The owner explicitly authorized new content under dot1 oversight and reuse of the eight saved originals. The prior blank-content recovery hold is superseded for this Pizza-only authoring pass. No historical approved manuscript was found or replaced. Existing five quizzes and common engine behavior are preserved.

## Deliverables

- `src/data/quizzes/pizza/content/handoff.json`: complete 8 types/traits, 32 questions/128 choices, JA/EN, Main/Secondary, 24 variation bodies and 24 mottos per language, compatibility reasons, visual keys, Home copy and authorship.
- Handoff SHA256: `9f0bab91308e99fa540e87023af33eed214b59b9e5a990d1471175b0c11e0681`.
- Importer generated all five runtime data files. Independent QA confirmed exact output equality.
- Quiz registry, visual registry/types, eight Body components and Home card appended. Existing JA/EN Pizza routes use the shared QuizFlow/QuizResult/CharacterFace and sharing/retry implementation.
- All eight original PNGs remain unchanged (1254×1254, matching historical SHA256). Original provenance manifest and readback records retained. Original prompts remain unavailable; embedded signatures were not cryptographically verified.
- Original pixels inspected. Front-crust face coordinates are **provisional**, pending actual rendered inspection. No image edits, generation or compression.

## Evidence

See `verification-v1.1/summary.json`, `runtime.json`, and command logs. The initial checkpoint was pushed as `da796e0c927bc4bb85426e13d47ec88a4aafc0df` and remote matched.

Full default statistics: 1,000,000 uniform sessions plus eight position scenarios at 500,000 each. Uniform result rates 12.439–12.551%, spread 0.112pp. Sensitivity spreads 0.111–0.204pp. Question ±5pp display flags: zero. Type parity 10,000/10,000. Additional final-text runtime testing reached every type×variation and matched type/variation/compatibility between locales. Existing five quizzes each passed 1,000 runtime parity sessions. This is **not** an overall statistical PASS: no formal acceptance thresholds are established, and the ±5pp marker is only a display flag.

109 tests; 6 Scaffold tests; lint 0 errors with two preexisting unused-constant warnings; typegen; tsc; validate-quiz; verify-quiz; diff check; build completed. JA/EN routes returned local HTTP 200. Local HTTP and Node tests do not establish browser rendering or interaction correctness.

Independent editorial QA reviewed the complete bilingual manuscript and 49 recorded refinements. No major contradictions or translation reversals found. Independent structural QA found no blocking code issues. Longer EN choices require actual layout review.

## STOP / remaining work

Chromium was absent. Its download returned 403 `Domain forbidden`; the installer internally retried before the termination request was processed. No manual retry after denial. Vercel inspection then returned scope authorization 403; no CLI fallback, auth change or further Vercel attempt was made.

Consequently these are **unverified**: final Git Preview READY and matching branch SHA; JA/EN direct Preview URLs; all eight rendered faces; browser eight-question completion and back/repeated answer/retry; Share; GOOD/BAD/Motto/variation rendering; five-quiz browser regression; actual Safari and owner iPhone review. Do not describe the earlier checkpoint's GitHub Vercel success status as final Preview READY. Do not invent direct Preview URLs.

Preserved draft may be resumed only when the stopped access paths are available/authorized. Complete actual Preview and visual checks before handing the owner an iPhone review candidate. Stop again for owner review. No main merge, Production deploy, paid resource creation, secret/auth change, or other repository edits were performed. Human relay requests during this pass: 0.
