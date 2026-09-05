# ice-cream Quiz Content Checklist

This scaffold intentionally contains no authored quiz content. Replace every placeholder only with approved content.

1. Put approved scoring, JA/EN questions, and JA/EN result content in `content/handoff.json`.
2. Run `npm run import-quiz-content -- ice-cream`. It validates all input before replacing `definition.ts`, `ja.ts`, `en.ts`, and both result files.
3. Keep each visual key as `ice-cream-<result-type>`; after image handoff, manually add the VisualKey union, Body, visual registry entry, and faceTransform.
4. Manually register both locales and both result-content maps in `src/lib/type-engine/registry.ts`.
5. Manually add the approved home-card title, description, accessible labels, and icon in `src/lib/home/content.ts`.
6. Run `npm run validate-quiz -- ice-cream` and `npm run verify-quiz -- ice-cream` before production review.
