# sushi Quiz Content Checklist

This scaffold intentionally contains no authored quiz content. Replace every placeholder only with approved content.

1. Fill eight result-type IDs and eight trait IDs in `definition.ts`.
2. Fill the one-to-one type/trait map and all 128 Main/Secondary scoring entries.
3. Fill Japanese and English title, questions, and choices in `ja.ts` and `en.ts`.
4. Fill result display names, three variations, three mottos, and compatibility in both result files.
5. Keep each visual key as `sushi-<result-type>`; after image handoff, manually add the VisualKey union, Body, visual registry entry, and faceTransform.
6. Manually register both locales and both result-content maps in `src/lib/type-engine/registry.ts`.
7. Manually add the approved home-card title, description, accessible labels, and icon in `src/lib/home/content.ts`.
8. Run `npm run validate-quiz -- sushi` and `npm run verify-quiz -- sushi` before production review.
