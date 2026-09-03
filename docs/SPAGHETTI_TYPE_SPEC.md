# Spaghetti Type

## Production Version

Ver.0.2

## Quiz ID

`spaghetti`

## Structure

- 32-question pool
- 8 categories x 4 questions
- One question is selected from each category per diagnosis
- 8 questions total

## Scoring

- Main: +3
- Secondary: +1

## Type Tie-Break

1. Total score
2. Main selection count
3. Trait score
4. Deterministic hash

## Result Types

- `carbonara`
- `bolognese`
- `aglioOlio`
- `pesto`
- `arrabbiata`
- `seafood`
- `mushroom`
- `squidInk`

## Pre-Production Statistics

Monte Carlo: 1,000,000 runs

| Result Type | Final Distribution |
| --- | ---: |
| carbonara | 11.674% |
| bolognese | 14.692% |
| aglioOlio | 13.656% |
| pesto | 13.625% |
| arrabbiata | 11.007% |
| seafood | 11.375% |
| mushroom | 13.266% |
| squidInk | 10.705% |

Max-min: 3.987pp

Decision: Production approved.

Notes:

- No deterministic-hash bias was found; the hash-reached distribution range was 0.819pp.
- With a light answer-letter preference (30%), the largest baseline change was about 3pp.
- `q18` has the strongest local effect; `q07`, `q11`, and `q12` also have relatively large local effects.
- The current scoring remains unchanged to prioritize overall balance.
- Reconsider scoring in Ver.0.21 or later only if production user data shows a material bias.
