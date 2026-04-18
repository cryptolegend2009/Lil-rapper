import type { Position } from '../grid.js';
import type { PlaqueMetal, PlaqueValue } from '../plaques.js';
import type { RawSymbol } from '../clusters.js';

/** Aligns with web-sdk cluster naming where helpful. */
export type GameType = 'basegame' | 'freegame';

export type BookEventReveal = {
  index: number;
  type: 'reveal';
  board: RawSymbol[][];
  paddingPositions: number[];
  anticipation: number[];
  gameType: GameType;
};

export type WinCluster = {
  symbol: string;
  win: number;
  positions: Position[];
};

export type BookEventWinInfo = {
  index: number;
  type: 'winInfo';
  totalWin: number;
  wins: WinCluster[];
};

export type BookEventHighlightClusters = {
  index: number;
  type: 'highlightClusters';
  /** Cells to tint behind symbols (e.g. semi-transparent quads per grid cell). */
  clusters: { symbol: string; positions: Position[] }[];
};

export type BookEventTumbleBoard = {
  index: number;
  type: 'tumbleBoard';
  explodingSymbols: Position[];
  newSymbols: RawSymbol[][];
};

/**
 * When a special feature symbol participates in a tumble, show plaque feature
 * (copper / silver / bronze / platinum) with ladder prizes — not coin pickups.
 */
export type BookEventPlaqueFeature = {
  index: number;
  type: 'plaqueFeature';
  /** One or more picks / reveals in the feature. */
  plaques: { metal: PlaqueMetal; value: PlaqueValue }[];
  /** Optional: grid cells involved (e.g. where FEATURE landed). */
  sourcePositions?: Position[];
};

export type BookEventSetTotalWin = {
  index: number;
  type: 'setTotalWin';
  amount: number;
};

export type BookEventFinalWin = {
  index: number;
  type: 'finalWin';
  amount: number;
};

export type BookEventLocal =
  | BookEventReveal
  | BookEventWinInfo
  | BookEventHighlightClusters
  | BookEventTumbleBoard
  | BookEventPlaqueFeature
  | BookEventSetTotalWin
  | BookEventFinalWin;

export type Book = {
  id: number;
  payoutMultiplier: number;
  events: BookEventLocal[];
  criteria?: string;
  baseGameWins?: number;
  freeGameWins?: number;
};
