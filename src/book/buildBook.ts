import { findClusters, type Board } from '../clusters.js';
import { plaquePick, type PlaqueValue } from '../plaques.js';
import type { Book, BookEventLocal, WinCluster } from './types.js';

const FEATURE = 'FEATURE';

export type BuildWinInfoOptions = {
  /** Multiplier applied to arbitrary win numbers for local testing. */
  bet?: number;
};

/**
 * Derives winInfo + highlightClusters from the board using 5+ clusters.
 * Win amounts here are placeholders for Storybook; math-sdk would supply real pays.
 */
export function clustersFromBoard(board: Board, options: BuildWinInfoOptions = {}): {
  wins: WinCluster[];
  highlight: { symbol: string; positions: import('../grid.js').Position[] }[];
} {
  const bet = options.bet ?? 1;
  const found = findClusters(board, 5);
  const wins: WinCluster[] = [];
  const highlight: { symbol: string; positions: import('../grid.js').Position[] }[] = [];

  for (const c of found) {
    if (c.symbol === FEATURE) continue;
    const base = c.size * 0.1 * bet;
    wins.push({
      symbol: c.symbol,
      win: Math.round(base * 100) / 100,
      positions: c.positions,
    });
    highlight.push({ symbol: c.symbol, positions: c.positions });
  }

  return { wins, highlight };
}

/**
 * Returns true if FEATURE symbol appears (e.g. after tumble) to trigger plaque UI.
 */
export function boardHasFeatureSymbol(board: Board): boolean {
  for (const reel of board) {
    for (const cell of reel) {
      if (cell?.name === FEATURE) return true;
    }
  }
  return false;
}

/** Example plaque picks for local story — replace with math output. */
export function samplePlaqueValues(): PlaqueValue[] {
  return [25, 100, 500];
}

/**
 * Build a minimal ordered event list: reveal → highlight → winInfo → optional plaque feature → totals.
 */
export function buildSampleSpinBook(board: Board, id = 1): Book {
  const { wins, highlight } = clustersFromBoard(board);
  const events: BookEventLocal[] = [];
  let idx = 0;

  events.push({
    index: idx++,
    type: 'reveal',
    board,
    paddingPositions: [0, 0, 0, 0, 0],
    anticipation: [0, 0, 0, 0, 0],
    gameType: 'basegame',
  });

  if (highlight.length) {
    events.push({
      index: idx++,
      type: 'highlightClusters',
      clusters: highlight,
    });
  }

  const totalWin = wins.reduce((s, w) => s + w.win, 0);
  if (wins.length) {
    events.push({
      index: idx++,
      type: 'winInfo',
      totalWin,
      wins,
    });
  }

  if (boardHasFeatureSymbol(board)) {
    const picks = samplePlaqueValues().map((v) => {
      const p = plaquePick(v);
      return { metal: p.metal, value: p.value };
    });
    events.push({
      index: idx++,
      type: 'plaqueFeature',
      plaques: picks,
    });
  }

  events.push({
    index: idx++,
    type: 'setTotalWin',
    amount: totalWin,
  });
  events.push({
    index: idx++,
    type: 'finalWin',
    amount: totalWin,
  });

  return {
    id,
    payoutMultiplier: totalWin,
    events,
  };
}
