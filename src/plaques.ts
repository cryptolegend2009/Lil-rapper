/**
 * Prize ladder (multiplier × bet); plaques replace “coins” in the feature UI.
 * Values from design: 1 … 5000 (13 steps).
 */
export const PLAQUE_VALUES = [
  1, 2, 5, 10, 15, 25, 50, 100, 150, 250, 500, 1000, 5000,
] as const;

export type PlaqueValue = (typeof PLAQUE_VALUES)[number];

/** Four metals used for presentation tiers (maps to value bands). */
export type PlaqueMetal = 'bronze' | 'copper' | 'silver' | 'platinum';

const ORDERED: readonly PlaqueValue[] = PLAQUE_VALUES;

/**
 * Map a prize value to a plaque metal (visual tier).
 * Bronze → lowest, platinum → highest band.
 */
export function metalForValue(value: PlaqueValue): PlaqueMetal {
  const i = ORDERED.indexOf(value);
  if (i < 0) return 'bronze';
  if (i <= 2) return 'bronze'; // 1,2,5
  if (i <= 5) return 'copper'; // 10,15,25
  if (i <= 8) return 'silver'; // 50,100,150
  return 'platinum'; // 250+
}

export type PlaquePick = {
  value: PlaqueValue;
  metal: PlaqueMetal;
};

export function plaquePick(value: PlaqueValue): PlaquePick {
  return { value, metal: metalForValue(value) };
}
