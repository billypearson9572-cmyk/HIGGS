// Exact 5-from-7 hand evaluator for Texas Hold'em.
//
// We evaluate every 5-card combination out of the available cards (21 of them
// for a full 7-card hand) and keep the strongest. Each 5-card hand is reduced
// to a single comparable integer "score": the higher the score, the stronger
// the hand. This is exact, not an approximation.

import type { Card, Rank } from './cards';
import { rankLabel } from './cards';

export enum HandCategory {
  HighCard = 0,
  OnePair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
  Straight = 4,
  Flush = 5,
  FullHouse = 6,
  FourOfAKind = 7,
  StraightFlush = 8,
}

export const CATEGORY_NAMES: Record<HandCategory, string> = {
  [HandCategory.HighCard]: 'High card',
  [HandCategory.OnePair]: 'One pair',
  [HandCategory.TwoPair]: 'Two pair',
  [HandCategory.ThreeOfAKind]: 'Three of a kind',
  [HandCategory.Straight]: 'Straight',
  [HandCategory.Flush]: 'Flush',
  [HandCategory.FullHouse]: 'Full house',
  [HandCategory.FourOfAKind]: 'Four of a kind',
  [HandCategory.StraightFlush]: 'Straight flush',
};

export interface HandResult {
  category: HandCategory;
  categoryName: string;
  // Tiebreak ranks in priority order (e.g. [pairRank, k1, k2, k3]).
  tiebreakers: number[];
  // Single comparable integer. Larger beats smaller.
  score: number;
  // The five cards that make the best hand.
  cards: Card[];
}

// Pack category + up to five tiebreak ranks into one integer using base 16
// (every rank is <= 14, so each fits in a nibble). Stable and exact.
function packScore(category: HandCategory, tiebreakers: number[]): number {
  let score = category;
  for (let i = 0; i < 5; i++) {
    score = score * 16 + (tiebreakers[i] ?? 0);
  }
  return score;
}

// Detect a straight in a set of distinct ranks (descending). Returns the high
// card of the straight, or null. Handles the wheel (A-2-3-4-5 -> high card 5).
function straightHigh(distinctDesc: number[]): number | null {
  if (distinctDesc.length < 5) return null;
  for (let i = 0; i + 4 < distinctDesc.length; i++) {
    if (distinctDesc[i] - distinctDesc[i + 4] === 4) {
      return distinctDesc[i];
    }
  }
  // Wheel: ace counted as low. Need A,5,4,3,2 present.
  if (
    distinctDesc.includes(14) &&
    distinctDesc.includes(5) &&
    distinctDesc.includes(4) &&
    distinctDesc.includes(3) &&
    distinctDesc.includes(2)
  ) {
    return 5;
  }
  return null;
}

// Evaluate exactly five cards.
export function evaluateFive(cards: Card[]): HandResult {
  if (cards.length !== 5) {
    throw new Error(`evaluateFive expects 5 cards, got ${cards.length}`);
  }

  const ranks = cards.map((c) => c.rank).sort((a, b) => b - a);
  const distinctDesc = Array.from(new Set(ranks)).sort((a, b) => b - a);

  const isFlush = cards.every((c) => c.suit === cards[0].suit);
  const sHigh = straightHigh(distinctDesc);

  // Group ranks by count, ordered by (count desc, rank desc). The resulting
  // rank order doubles as the tiebreaker list for paired hands.
  const counts = new Map<number, number>();
  for (const r of ranks) counts.set(r, (counts.get(r) ?? 0) + 1);
  const groups = Array.from(counts.entries()).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0] - a[0];
  });
  const groupRanks = groups.map((g) => g[0]);
  const countPattern = groups.map((g) => g[1]).join('');

  let category: HandCategory;
  let tiebreakers: number[];

  if (sHigh !== null && isFlush) {
    category = HandCategory.StraightFlush;
    tiebreakers = [sHigh];
  } else if (countPattern.startsWith('4')) {
    category = HandCategory.FourOfAKind;
    tiebreakers = groupRanks; // [quad, kicker]
  } else if (countPattern === '32') {
    category = HandCategory.FullHouse;
    tiebreakers = groupRanks; // [trips, pair]
  } else if (isFlush) {
    category = HandCategory.Flush;
    tiebreakers = ranks; // all five, high to low
  } else if (sHigh !== null) {
    category = HandCategory.Straight;
    tiebreakers = [sHigh];
  } else if (countPattern.startsWith('3')) {
    category = HandCategory.ThreeOfAKind;
    tiebreakers = groupRanks; // [trips, k1, k2]
  } else if (countPattern.startsWith('22')) {
    category = HandCategory.TwoPair;
    tiebreakers = groupRanks; // [highPair, lowPair, kicker]
  } else if (countPattern.startsWith('2')) {
    category = HandCategory.OnePair;
    tiebreakers = groupRanks; // [pair, k1, k2, k3]
  } else {
    category = HandCategory.HighCard;
    tiebreakers = ranks; // all five, high to low
  }

  return {
    category,
    categoryName: CATEGORY_NAMES[category],
    tiebreakers,
    score: packScore(category, tiebreakers),
    cards: cards.slice(),
  };
}

// All k-combinations of indices [0..n).
function combinations(n: number, k: number): number[][] {
  const result: number[][] = [];
  const combo: number[] = [];
  const recurse = (start: number) => {
    if (combo.length === k) {
      result.push(combo.slice());
      return;
    }
    for (let i = start; i < n; i++) {
      combo.push(i);
      recurse(i + 1);
      combo.pop();
    }
  };
  recurse(0);
  return result;
}

// Evaluate the best 5-card hand from 5, 6, or 7 cards.
export function evaluateBest(cards: Card[]): HandResult {
  if (cards.length < 5 || cards.length > 7) {
    throw new Error(`evaluateBest expects 5-7 cards, got ${cards.length}`);
  }
  if (cards.length === 5) return evaluateFive(cards);

  let best: HandResult | null = null;
  for (const combo of combinations(cards.length, 5)) {
    const five = combo.map((i) => cards[i]);
    const result = evaluateFive(five);
    if (best === null || result.score > best.score) {
      best = result;
    }
  }
  return best as HandResult;
}

// Compare two hands. >0 if a wins, <0 if b wins, 0 if tied (split pot).
export function compareHands(a: Card[], b: Card[]): number {
  return evaluateBest(a).score - evaluateBest(b).score;
}

// Human-readable description, e.g. "Full house, kings full of nines".
export function describeHand(result: HandResult): string {
  const r = (n: number) => rankLabel(n as Rank);
  const t = result.tiebreakers;
  switch (result.category) {
    case HandCategory.StraightFlush:
      return t[0] === 14 ? 'Royal flush' : `Straight flush, ${r(t[0])} high`;
    case HandCategory.FourOfAKind:
      return `Four of a kind, ${r(t[0])}s`;
    case HandCategory.FullHouse:
      return `Full house, ${r(t[0])}s full of ${r(t[1])}s`;
    case HandCategory.Flush:
      return `Flush, ${r(t[0])} high`;
    case HandCategory.Straight:
      return `Straight, ${r(t[0])} high`;
    case HandCategory.ThreeOfAKind:
      return `Three of a kind, ${r(t[0])}s`;
    case HandCategory.TwoPair:
      return `Two pair, ${r(t[0])}s and ${r(t[1])}s`;
    case HandCategory.OnePair:
      return `One pair, ${r(t[0])}s`;
    default:
      return `High card, ${r(t[0])}`;
  }
}
