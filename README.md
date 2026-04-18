# Cluster slot — local math + Storybook books (5×6)

Defines **5 reels × 6 rows**, **cluster wins** (4-way connectivity, **minimum 5** matching symbols), **cell highlights** for wins, and a **plaque feature** (bronze / copper / silver / platinum) with prize ladder  
`1, 2, 5, 10, 15, 25, 50, 100, 150, 250, 500, 1000, 5000` when the **`FEATURE`** symbol is present (stand-in for your special symbol that tumbles in).

## Playable sample (no Node)

Open [`playable/index.html`](playable/index.html) in your browser (double-click, or **File → Open**). Choose a sample book or **Random sample**, then **Spin** to step through reveal → cluster highlights → wins → tumble (book 201) → **plaque feature** modal.

If the browser blocks local scripts, serve the folder instead, for example: `npx --yes serve playable` or Python `python -m http.server` from the `playable` directory.

### GitHub Pages (easier setup — branch only)

This repo does **not** require choosing **“GitHub Actions”** as the Pages source (that option is missing or confusing for some accounts).

1. Wait for **[Publish gh-pages branch](https://github.com/cryptolegend2009/Lil-rapper/actions/workflows/publish-gh-pages.yml)** to finish green on `main` (it copies `playable/` into the **`gh-pages`** branch).
2. Open **[Settings → Pages](https://github.com/cryptolegend2009/Lil-rapper/settings/pages)**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch **`gh-pages`**, folder **`/ (root)`**, then **Save**.

Your site: **[https://cryptolegend2009.github.io/Lil-rapper/](https://cryptolegend2009.github.io/Lil-rapper/)**

#### If you still can’t set up Pages

- **No “Settings” tab** — you need **admin** on the repo (owner or collaborator with admin). Forks: you’re admin on your fork; the upstream repo’s Settings are not yours.
- **Fork** — enable Pages on **your** fork: same **Settings → Pages** on `yourname/Lil-rapper`. If GitHub shows that Pages are disabled for forks, use the CDN link below or host elsewhere.
- **Organization repo** — an org owner may have disabled Pages; ask them or use the CDN link.
- **Workflow permissions** — **Settings → Actions → General → Workflow permissions** → allow **Read and write** (so `GITHUB_TOKEN` can push `gh-pages`).

#### No Pages — try in the browser anyway (no repo settings)

GitHub and jsDelivr serve raw `index.html` with **`Content-Type: text/plain`**, so the browser **shows the source** instead of running the game. That is normal; it is not a broken file.

Use one of these instead:

- **HTML preview (works in the browser, no Pages):**  
  **[https://htmlpreview.github.io/?https://github.com/cryptolegend2009/Lil-rapper/blob/main/playable/index.html](https://htmlpreview.github.io/?https://github.com/cryptolegend2009/Lil-rapper/blob/main/playable/index.html)**  
  (Loads the same file through a small preview wrapper so it runs as a real page.)

- **Drag-and-drop host (free HTTPS, correct MIME):** open **[Netlify Drop](https://app.netlify.com/drop)** and drop your local **`playable`** folder (zip or folder). You get a random `https://something.netlify.app` URL that runs the game normally.

Re-run the branch workflow: **Actions → Publish gh-pages branch → Run workflow**.

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
