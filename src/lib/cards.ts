// Core card model for Texas Hold'em.
// Ranks run 2..14 where 11=J, 12=Q, 13=K, 14=A. Suits are single letters.

export type Suit = 'c' | 'd' | 'h' | 's';

export const SUITS: Suit[] = ['c', 'd', 'h', 's'];

// Rank numeric values. Ace is high (14) by default; the evaluator also treats
// it as low when detecting the 5-4-3-2-A "wheel" straight.
export const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
export type Rank = (typeof RANKS)[number];

export interface Card {
  rank: Rank;
  suit: Suit;
}

const RANK_TO_LABEL: Record<number, string> = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: 'T',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

const LABEL_TO_RANK: Record<string, Rank> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const SUIT_SYMBOL: Record<Suit, string> = {
  c: '♣', // clubs
  d: '♦', // diamonds
  h: '♥', // hearts
  s: '♠', // spades
};

const SUIT_NAME: Record<Suit, string> = {
  c: 'clubs',
  d: 'diamonds',
  h: 'hearts',
  s: 'spades',
};

export function rankLabel(rank: Rank): string {
  return RANK_TO_LABEL[rank];
}

export function suitSymbol(suit: Suit): string {
  return SUIT_SYMBOL[suit];
}

export function suitName(suit: Suit): string {
  return SUIT_NAME[suit];
}

export function isRedSuit(suit: Suit): boolean {
  return suit === 'd' || suit === 'h';
}

// Compact code such as "As" (ace of spades) or "Td" (ten of diamonds).
export function cardCode(card: Card): string {
  return `${RANK_TO_LABEL[card.rank]}${card.suit}`;
}

export function cardLabel(card: Card): string {
  return `${RANK_TO_LABEL[card.rank]}${SUIT_SYMBOL[card.suit]}`;
}

// Parse a single code like "Kh" into a Card. Throws on bad input.
export function parseCard(code: string): Card {
  const trimmed = code.trim();
  if (trimmed.length < 2) {
    throw new Error(`Invalid card code: "${code}"`);
  }
  const rankPart = trimmed.slice(0, trimmed.length - 1).toUpperCase();
  const suitPart = trimmed.slice(-1).toLowerCase();
  const rank = LABEL_TO_RANK[rankPart];
  if (rank === undefined) {
    throw new Error(`Invalid rank in card code: "${code}"`);
  }
  if (!SUITS.includes(suitPart as Suit)) {
    throw new Error(`Invalid suit in card code: "${code}"`);
  }
  return { rank, suit: suitPart as Suit };
}

// Parse a space-separated list such as "As Ks Qs".
export function parseCards(codes: string): Card[] {
  return codes
    .split(/\s+/)
    .filter((c) => c.length > 0)
    .map(parseCard);
}

export function cardsEqual(a: Card, b: Card): boolean {
  return a.rank === b.rank && a.suit === b.suit;
}

// A fresh, ordered 52-card deck.
export function freshDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

// Fisher-Yates shuffle. Accepts an injectable RNG for deterministic tests.
export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Remove a set of cards from a deck (e.g. known hole/board cards).
export function removeCards(deck: Card[], toRemove: Card[]): Card[] {
  return deck.filter((d) => !toRemove.some((r) => cardsEqual(d, r)));
}
