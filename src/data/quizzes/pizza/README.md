> **2026-10-16 v1.1 update:** The owner explicitly authorized new Pizza content and reuse of the eight preserved originals. The populated `content/handoff.json` is now imported and integrated on the feature branch. The historical blank-content hold below is superseded only for authoring/integration. Preview/browser/face approval remains blocked; see `docs/pizza-type/verification-v1.1/summary.json`. No Production approval.

# pizza Quiz Content Checklist

This scaffold intentionally contains no authored quiz content. Replace every placeholder only with approved content.

1. Put approved scoring, JA/EN questions, and JA/EN result content in `content/handoff.json`.
2. Run `npm run import-quiz-content -- pizza`. It validates all input before replacing `definition.ts`, `ja.ts`, `en.ts`, and both result files.
3. Keep each visual key as `pizza-<result-type>`; after image handoff, manually add the VisualKey union, Body, visual registry entry, and faceTransform.
4. Manually register both locales and both result-content maps in `src/lib/type-engine/registry.ts`.
5. Manually add the approved home-card title, description, accessible labels, and icon in `src/lib/home/content.ts`.
6. Run `npm run validate-quiz -- pizza` and `npm run verify-quiz -- pizza` before production review.
