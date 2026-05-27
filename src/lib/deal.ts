// Helpers for dealing random spots to the practice tools.

import type { Card } from './cards';
import { freshDeck, shuffle } from './cards';
import { compareHands, evaluateFive, type HandResult } from './evaluator';

export interface RankingMatchup {
  handA: Card[];
  handB: Card[];
  resultA: HandResult;
  resultB: HandResult;
  // 'A' | 'B' | 'tie'
  winner: 'A' | 'B' | 'tie';
}

// Deal two distinct five-card hands from one shuffled deck for the Hand
// Ranking Trainer. No card is shared between the two hands.
export function dealRankingMatchup(rng: () => number = Math.random): RankingMatchup {
  const deck = shuffle(freshDeck(), rng);
  const handA = deck.slice(0, 5);
  const handB = deck.slice(5, 10);
  const resultA = evaluateFive(handA);
  const resultB = evaluateFive(handB);
  const cmp = compareHands(handA, handB);
  const winner = cmp > 0 ? 'A' : cmp < 0 ? 'B' : 'tie';
  return { handA, handB, resultA, resultB, winner };
}
