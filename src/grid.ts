/** 5 reels × 6 rows (visible), matching web-sdk cluster-style boards: board[reel][row]. */
export const REELS = 5;
export const ROWS = 6;

export type Position = { reel: number; row: number };

export function inBounds(p: Position): boolean {
  return p.reel >= 0 && p.reel < REELS && p.row >= 0 && p.row < ROWS;
}
