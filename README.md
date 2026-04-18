# Cluster slot — local math + Storybook books (5×6)

Defines **5 reels × 6 rows**, **cluster wins** (4-way connectivity, **minimum 5** matching symbols), **cell highlights** for wins, and a **plaque feature** (bronze / copper / silver / platinum) with prize ladder  
`1, 2, 5, 10, 15, 25, 50, 100, 150, 250, 500, 1000, 5000` when the **`FEATURE`** symbol is present (stand-in for your special symbol that tumbles in).

## Playable sample (no Node)

Open [`playable/index.html`](playable/index.html) in your browser (double-click, or **File → Open**). Choose a sample book or **Random sample**, then **Spin** to step through reveal → cluster highlights → wins → tumble (book 201) → **plaque feature** modal.

If the browser blocks local scripts, serve the folder instead, for example: `npx --yes serve playable` or Python `python -m http.server` from the `playable` directory.

### GitHub Pages (your own URL)

The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) uses GitHub’s official **Pages** actions (Node **24**, no deprecated Node 20 composite steps) and uploads the **`playable/`** folder as the site artifact.

**One-time setup:** in the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** (not “Deploy from a branch”). If you previously used the **`gh-pages`** branch, switch the source to **GitHub Actions** after this workflow is on `main`.

Site URL (same pattern):

`https://cryptolegend2009.github.io/Lil-rapper/`

Wait for the **Deploy GitHub Pages** workflow to finish under **Actions**, then open that URL.

### Troubleshooting Pages

1. **Source must be GitHub Actions**  
   [Settings → Pages](https://github.com/cryptolegend2009/Lil-rapper/settings/pages) → **Build and deployment** → **Source** → **GitHub Actions** → Save.  
   If it is still **Deploy from a branch** (`gh-pages`), the Actions deploy will not publish your artifact to the site URL.

2. **Workflow stuck “Waiting for approval”**  
   [Settings → Environments](https://github.com/cryptolegend2009/Lil-rapper/settings/environments) → **github-pages** → remove **Required reviewers** (or approve the pending deployment in the Actions run).

3. **Read the failing step**  
   [Actions → Deploy GitHub Pages](https://github.com/cryptolegend2009/Lil-rapper/actions/workflows/deploy-pages.yml) → open the latest run → expand the red step; search that error text in [GitHub Pages troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#troubleshooting-publishing-with-a-custom-github-actions-workflow).

4. **Retry without a new commit**  
   In Actions, open **Deploy GitHub Pages** → **Run workflow** (manual run is enabled).

5. **Site URL**  
   [https://cryptolegend2009.github.io/Lil-rapper/](https://cryptolegend2009.github.io/Lil-rapper/) (can take a minute after a green deploy).

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
