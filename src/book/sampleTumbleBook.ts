import type { RawSymbol } from '../clusters.js';
import { plaquePick } from '../plaques.js';
import type { Book } from './types.js';

const cell = (name: string): RawSymbol => ({ name });

/**
 * After a tumble, FEATURE lands at reel 2, row 2 — triggers plaque UI in the same book.
 * Hook `tumbleBoard` to your explode / slide / settle emitter chain, then `plaqueFeature`.
 */
export const sampleTumblePlaqueBook: Book = {
  id: 201,
  payoutMultiplier: 12.5,
  events: [
    {
      index: 0,
      type: 'reveal',
      board: boardBefore(),
      paddingPositions: [0, 0, 0, 0, 0],
      anticipation: [0, 0, 0, 0, 0],
      gameType: 'basegame',
    },
    {
      index: 1,
      type: 'highlightClusters',
      clusters: [
        {
          symbol: 'L1',
          positions: [
            { reel: 0, row: 0 },
            { reel: 0, row: 1 },
            { reel: 1, row: 0 },
            { reel: 1, row: 1 },
            { reel: 2, row: 0 },
          ],
        },
      ],
    },
    {
      index: 2,
      type: 'winInfo',
      totalWin: 2.5,
      wins: [
        {
          symbol: 'L1',
          win: 2.5,
          positions: [
            { reel: 0, row: 0 },
            { reel: 0, row: 1 },
            { reel: 1, row: 0 },
            { reel: 1, row: 1 },
            { reel: 2, row: 0 },
          ],
        },
      ],
    },
    {
      index: 3,
      type: 'tumbleBoard',
      explodingSymbols: [
        { reel: 0, row: 0 },
        { reel: 0, row: 1 },
        { reel: 1, row: 0 },
        { reel: 1, row: 1 },
        { reel: 2, row: 0 },
      ],
      /** Incoming symbols per reel after gravity (math-sdk fills this). */
      newSymbols: [
        [cell('H3')],
        [cell('H2')],
        [cell('FEATURE')],
        [],
        [],
      ],
    },
    {
      index: 4,
      type: 'reveal',
      board: boardAfter(),
      paddingPositions: [0, 0, 0, 0, 0],
      anticipation: [0, 0, 0, 0, 0],
      gameType: 'basegame',
    },
    {
      index: 5,
      type: 'plaqueFeature',
      plaques: [plaquePick(50), plaquePick(250)].map((p) => ({
        metal: p.metal,
        value: p.value,
      })),
      sourcePositions: [{ reel: 2, row: 2 }],
    },
    { index: 6, type: 'setTotalWin', amount: 12.5 },
    { index: 7, type: 'finalWin', amount: 12.5 },
  ],
};

function boardBefore(): RawSymbol[][] {
  return [
    [cell('L1'), cell('H1'), cell('L3'), cell('L4'), cell('L5'), cell('H3')],
    [cell('L1'), cell('L2'), cell('L3'), cell('L4'), cell('L5'), cell('H3')],
    [cell('L1'), cell('L2'), cell('L3'), cell('H1'), cell('H2'), cell('H3')],
    [cell('L3'), cell('L4'), cell('L5'), cell('H1'), cell('H2'), cell('H3')],
    [cell('L4'), cell('L5'), cell('H1'), cell('H2'), cell('H3'), cell('L1')],
  ];
}

function boardAfter(): RawSymbol[][] {
  return [
    [cell('H1'), cell('H1'), cell('L3'), cell('L4'), cell('L5'), cell('H3')],
    [cell('H2'), cell('L2'), cell('L3'), cell('L4'), cell('L5'), cell('H3')],
    [cell('L2'), cell('L2'), cell('FEATURE'), cell('H1'), cell('H2'), cell('H3')],
    [cell('L3'), cell('L4'), cell('L5'), cell('H1'), cell('H2'), cell('H3')],
    [cell('L4'), cell('L5'), cell('H1'), cell('H2'), cell('H3'), cell('L1')],
  ];
}
