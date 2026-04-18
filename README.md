# Cluster slot — local math + Storybook books (5×6)

Defines **5 reels × 6 rows**, **cluster wins** (4-way connectivity, **minimum 5** matching symbols), **cell highlights** for wins, and a **plaque feature** (bronze / copper / silver / platinum) with prize ladder  
`1, 2, 5, 10, 15, 25, 50, 100, 150, 250, 500, 1000, 5000` when the **`FEATURE`** symbol is present (stand-in for your special symbol that tumbles in).

## Layout

- Board shape matches Stake **web-sdk** cluster style: `board[reel][row]`, `Position = { reel, row }`.

## New book event

- **`highlightClusters`** — drive UI to tint/highlight **squares behind** each winning cluster (before or with `winInfo`).

- **`plaqueFeature`** — show the “coin” UI as **plaques** with `metal` + `value` (not coin sprites).

When you integrate into [web-sdk](https://github.com/StakeEngine/web-sdk/) `apps/cluster`, add these to `typesBookEvent.ts`, handle them in `bookEventHandlerMap`, and point Storybook data at `sampleBooks.ts` (or copy arrays into `src/stories/data/`).

## Scripts

```bash
npm install
npm run check
```

## Files to copy into web-sdk

- `src/book/types.ts` → merge event unions with your app’s `BookEvent`.
- `src/clusters.ts`, `src/plaques.ts`, `src/grid.ts` → `src/game/` or a small `math/` folder.
- `src/book/sampleBooks.ts` → `src/stories/data/base_books.ts` (adapt imports).

Win amounts in `buildBook.ts` are **placeholders** for local Storybook; replace with outputs from [math-sdk](https://github.com/StakeEngine/math-sdk/) for production.
