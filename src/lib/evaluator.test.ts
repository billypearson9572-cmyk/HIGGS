import { describe, it, expect } from 'vitest';
import { parseCards } from './cards';
import {
  evaluateFive,
  evaluateBest,
  compareHands,
  describeHand,
  HandCategory,
} from './evaluator';

const cat = (codes: string) => evaluateFive(parseCards(codes)).category;

describe('evaluateFive: categories', () => {
  it('royal / straight flush', () => {
    expect(cat('As Ks Qs Js Ts')).toBe(HandCategory.StraightFlush);
    expect(cat('9h 8h 7h 6h 5h')).toBe(HandCategory.StraightFlush);
  });

  it('four of a kind', () => {
    expect(cat('Ac Ad Ah As Kd')).toBe(HandCategory.FourOfAKind);
  });

  it('full house', () => {
    expect(cat('Kc Kd Kh 9s 9d')).toBe(HandCategory.FullHouse);
  });

  it('flush', () => {
    expect(cat('Ah Jh 8h 5h 2h')).toBe(HandCategory.Flush);
  });

  it('straight', () => {
    expect(cat('9c 8d 7h 6s 5c')).toBe(HandCategory.Straight);
  });

  it('wheel straight (A-2-3-4-5) is a five-high straight', () => {
    const r = evaluateFive(parseCards('Ac 2d 3h 4s 5c'));
    expect(r.category).toBe(HandCategory.Straight);
    expect(r.tiebreakers[0]).toBe(5); // five high, not ace high
  });

  it('three of a kind', () => {
    expect(cat('Qc Qd Qh 9s 4d')).toBe(HandCategory.ThreeOfAKind);
  });

  it('two pair', () => {
    expect(cat('Jc Jd 4h 4s 9d')).toBe(HandCategory.TwoPair);
  });

  it('one pair', () => {
    expect(cat('Tc Td 8h 5s 2d')).toBe(HandCategory.OnePair);
  });

  it('high card', () => {
    expect(cat('Ac Jd 8h 5s 2d')).toBe(HandCategory.HighCard);
  });

  it('ace-high straight is not a wheel', () => {
    const r = evaluateFive(parseCards('Ac Kd Qh Js Tc'));
    expect(r.category).toBe(HandCategory.Straight);
    expect(r.tiebreakers[0]).toBe(14);
  });
});

describe('evaluateFive: tiebreakers within a category', () => {
  it('higher pair beats lower pair', () => {
    expect(compareHands(parseCards('Ac Ad 5h 4s 2d'), parseCards('Kc Kd Qh Js 9d'))).toBeGreaterThan(0);
  });

  it('kicker decides equal pairs', () => {
    expect(compareHands(parseCards('Ac Ad Kh 4s 2d'), parseCards('As Ah Qh Js 9d'))).toBeGreaterThan(0);
  });

  it('higher full house wins', () => {
    expect(compareHands(parseCards('Ac Ad Ah 2s 2d'), parseCards('Kc Kd Kh Qs Qd'))).toBeGreaterThan(0);
  });

  it('higher flush wins on second card', () => {
    expect(compareHands(parseCards('Ah Kh 8h 5h 2h'), parseCards('Ah Qh 8h 5h 2h'))).toBeGreaterThan(0);
  });

  it('identical hands tie', () => {
    expect(compareHands(parseCards('Ac Kc Qc Jc 9c'), parseCards('Ah Kh Qh Jh 9h'))).toBe(0);
  });
});

describe('category ordering', () => {
  it('respects the standard ranking ladder', () => {
    const order = [
      'As Ks Qs Js Ts', // straight flush
      'Ac Ad Ah As Kd', // quads
      'Kc Kd Kh 9s 9d', // full house
      'Ah Jh 8h 5h 2h', // flush
      '9c 8d 7h 6s 5c', // straight
      'Qc Qd Qh 9s 4d', // trips
      'Jc Jd 4h 4s 9d', // two pair
      'Tc Td 8h 5s 2d', // one pair
      'Ac Jd 8h 5s 2d', // high card
    ];
    const scores = order.map((c) => evaluateFive(parseCards(c)).score);
    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]).toBeGreaterThan(scores[i + 1]);
    }
  });
});

describe('evaluateBest: 7-card hands', () => {
  it('finds the flush among seven cards', () => {
    const r = evaluateBest(parseCards('Ah Kh 2h 7h 9h 3c Js'));
    expect(r.category).toBe(HandCategory.Flush);
  });

  it('finds the best straight using board + hole', () => {
    const r = evaluateBest(parseCards('Tc 9d 8h 7s 6c 2d 2h'));
    expect(r.category).toBe(HandCategory.Straight);
    expect(r.tiebreakers[0]).toBe(10);
  });

  it('prefers full house over flush draw board', () => {
    const r = evaluateBest(parseCards('As Ah Ad Kh Kd 2c 7s'));
    expect(r.category).toBe(HandCategory.FullHouse);
  });

  it('the nut low example: pair of twos beats nothing', () => {
    const r = evaluateBest(parseCards('2c 2d 9h 5s 7c Jd Ah'));
    expect(r.category).toBe(HandCategory.OnePair);
  });
});

describe('describeHand', () => {
  it('names a royal flush', () => {
    expect(describeHand(evaluateFive(parseCards('As Ks Qs Js Ts')))).toBe('Royal flush');
  });
  it('names a full house correctly', () => {
    expect(describeHand(evaluateFive(parseCards('Kc Kd Kh 9s 9d')))).toBe(
      'Full house, Ks full of 9s',
    );
  });
  it('names two pair correctly', () => {
    expect(describeHand(evaluateFive(parseCards('Jc Jd 4h 4s 9d')))).toBe('Two pair, Js and 4s');
  });
});
