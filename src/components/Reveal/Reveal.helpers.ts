export type RevealDelay = 0 | 1 | 2 | 3 | 4 | 5;

const DELAYS: RevealDelay[] = [0, 1, 2, 3, 4, 5];

export function staggerDelay(index: number, columns = 4): RevealDelay {
  return DELAYS[index % Math.min(columns, DELAYS.length)];
}
