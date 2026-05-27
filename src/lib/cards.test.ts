import { describe, it, expect } from 'vitest';
import {
  freshDeck,
  parseCard,
  parseCards,
  cardCode,
  shuffle,
  removeCards,
} from './cards';

describe('cards', () => {
  it('builds a 52-card deck with no duplicates', () => {
    const deck = freshDeck();
    expect(deck).toHaveLength(52);
    const codes = new Set(deck.map(cardCode));
    expect(codes.size).toBe(52);
  });

  it('parses card codes round-trip', () => {
    expect(cardCode(parseCard('As'))).toBe('As');
    expect(cardCode(parseCard('Td'))).toBe('Td');
    expect(cardCode(parseCard('2c'))).toBe('2c');
    expect(parseCard('kh')).toEqual({ rank: 13, suit: 'h' });
  });

  it('rejects invalid codes', () => {
    expect(() => parseCard('Xs')).toThrow();
    expect(() => parseCard('Az')).toThrow();
    expect(() => parseCard('A')).toThrow();
  });

  it('parses a list of cards', () => {
    expect(parseCards('As Ks Qs')).toHaveLength(3);
  });

  it('shuffle preserves all cards (is a permutation)', () => {
    const deck = freshDeck();
    let seed = 42;
    const rng = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const shuffled = shuffle(deck, rng);
    expect(shuffled).toHaveLength(52);
    expect(new Set(shuffled.map(cardCode)).size).toBe(52);
  });

  it('removes known cards from a deck', () => {
    const deck = freshDeck();
    const remaining = removeCards(deck, parseCards('As Kd'));
    expect(remaining).toHaveLength(50);
    expect(remaining.map(cardCode)).not.toContain('As');
    expect(remaining.map(cardCode)).not.toContain('Kd');
  });
});
