import { REELS, ROWS, type Position } from './grid.js';

export type RawSymbol = { name: string; multiplier?: number; scatter?: boolean };

/** Board[reel][row], 5×6. */
export type Board = RawSymbol[][];

const NEIGHBOURS: Position[] = [
  { reel: 1, row: 0 },
  { reel: -1, row: 0 },
  { reel: 0, row: 1 },
  { reel: 0, row: -1 },
];

function key(p: Position): string {
  return `${p.reel},${p.row}`;
}

/**
 * Finds all clusters of identical `name` with size >= `minSize` (default 5).
 * Uses 4-way connectivity (orthogonal), standard for cluster slots.
 */
export function findClusters(
  board: Board,
  minSize = 5,
): { symbol: string; positions: Position[]; size: number }[] {
  const visited = new Set<string>();
  const clusters: { symbol: string; positions: Position[]; size: number }[] = [];

  for (let r = 0; r < REELS; r++) {
    for (let row = 0; row < ROWS; row++) {
      const start: Position = { reel: r, row };
      if (visited.has(key(start))) continue;
      const sym = board[r]?.[row]?.name;
      if (sym === undefined) continue;

      const queue: Position[] = [start];
      const component: Position[] = [];
      visited.add(key(start));

      while (queue.length) {
        const p = queue.pop()!;
        component.push(p);
        for (const d of NEIGHBOURS) {
          const n: Position = { reel: p.reel + d.reel, row: p.row + d.row };
          if (n.reel < 0 || n.reel >= REELS || n.row < 0 || n.row >= ROWS) continue;
          const k = key(n);
          if (visited.has(k)) continue;
          if (board[n.reel]?.[n.row]?.name !== sym) continue;
          visited.add(k);
          queue.push(n);
        }
      }

      if (component.length >= minSize) {
        clusters.push({ symbol: sym, positions: component, size: component.length });
      }
    }
  }

  return clusters;
}
