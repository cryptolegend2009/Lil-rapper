import type { Board } from '../clusters.js';
import type { Book } from './types.js';
import { buildSampleSpinBook } from './buildBook.js';

/** 5 reels × 6 rows — each inner array is one reel, bottom to top or as in your SDK config. */
function reel(...names: string[]): import('../clusters.js').RawSymbol[] {
  return names.map((name) => ({ name }));
}

/**
 * Book A: one big cluster of `A` (5+), no FEATURE.
 */
export const boardSimpleCluster: Board = [
  reel('A', 'B', 'C', 'D', 'E', 'F'),
  reel('B', 'A', 'A', 'A', 'A', 'A'),
  reel('C', 'A', 'H1', 'H2', 'L1', 'L2'),
  reel('D', 'A', 'L3', 'L4', 'L5', 'H3'),
  reel('E', 'A', 'B', 'C', 'D', 'E'),
];

/**
 * Book B: FEATURE symbol present — should queue `plaqueFeature` after reveal (local helper).
 */
export const boardWithFeature: Board = [
  reel('L1', 'L2', 'L3', 'L4', 'L5', 'H1'),
  reel('L2', 'FEATURE', 'H2', 'H3', 'L1', 'L2'),
  reel('L3', 'H1', 'H2', 'H3', 'L3', 'L4'),
  reel('L4', 'L5', 'H1', 'H2', 'H3', 'L5'),
  reel('L5', 'H1', 'H2', 'H3', 'L1', 'L2'),
];

/**
 * Book C: cluster of `H1` plus FEATURE elsewhere — highlights clusters; plaque feature from FEATURE.
 */
export const boardClusterAndFeature: Board = [
  reel('H1', 'H1', 'H1', 'H1', 'H1', 'L1'),
  reel('H1', 'L2', 'L3', 'L4', 'L5', 'H2'),
  reel('H1', 'FEATURE', 'L1', 'L2', 'L3', 'H3'),
  reel('H1', 'L4', 'L5', 'H1', 'H2', 'L1'),
  reel('H1', 'L2', 'L3', 'L4', 'L5', 'H2'),
];

export const sampleBookSimple: Book = buildSampleSpinBook(boardSimpleCluster, 101);
export const sampleBookFeature: Book = buildSampleSpinBook(boardWithFeature, 102);
export const sampleBookClusterFeature: Book = buildSampleSpinBook(boardClusterAndFeature, 103);

export const allSampleBooks: Book[] = [sampleBookSimple, sampleBookFeature, sampleBookClusterFeature];
