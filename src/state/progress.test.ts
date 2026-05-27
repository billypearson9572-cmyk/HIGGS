import { describe, it, expect } from 'vitest';
import {
  emptyProgress,
  touchStreak,
  isLessonComplete,
  isTierComplete,
  isTierUnlocked,
  isMilestoneUnlocked,
  tierProgress,
  type ProgressState,
} from './progress';
import { tiers } from '../content';

function completeAllLessons(state: ProgressState, tierId: string): ProgressState {
  const tier = tiers.find((t) => t.id === tierId)!;
  const next = structuredClone(state);
  for (const l of tier.lessons) {
    next.completedLessons[l.id] = { score: 4, total: 4, passedAt: '2026-01-01' };
  }
  return next;
}

describe('streak', () => {
  it('starts at 1 on first activity', () => {
    const s = touchStreak(emptyProgress().streak, '2026-01-01');
    expect(s.current).toBe(1);
    expect(s.longest).toBe(1);
  });

  it('does not change twice on the same day', () => {
    const a = touchStreak(emptyProgress().streak, '2026-01-01');
    const b = touchStreak(a, '2026-01-01');
    expect(b).toBe(a);
  });

  it('increments on consecutive days', () => {
    let s = touchStreak(emptyProgress().streak, '2026-01-01');
    s = touchStreak(s, '2026-01-02');
    expect(s.current).toBe(2);
  });

  it('resets after a gap', () => {
    let s = touchStreak(emptyProgress().streak, '2026-01-01');
    s = touchStreak(s, '2026-01-05');
    expect(s.current).toBe(1);
    expect(s.longest).toBe(1);
  });
});

describe('progression', () => {
  const firstTier = tiers[0].id;

  it('first tier is always unlocked', () => {
    expect(isTierUnlocked(emptyProgress(), firstTier)).toBe(true);
  });

  it('milestone is locked until all lessons are passed', () => {
    const empty = emptyProgress();
    expect(isMilestoneUnlocked(empty, firstTier)).toBe(false);
    const done = completeAllLessons(empty, firstTier);
    expect(isMilestoneUnlocked(done, firstTier)).toBe(true);
  });

  it('tier is not complete until the milestone is passed', () => {
    let state = completeAllLessons(emptyProgress(), firstTier);
    expect(isTierComplete(state, firstTier)).toBe(false);
    state = structuredClone(state);
    state.completedMilestones[firstTier] = { score: 10, total: 10, passedAt: '2026-01-02' };
    expect(isTierComplete(state, firstTier)).toBe(true);
  });

  it('tier progress fraction counts lessons and milestone', () => {
    const tier = tiers[0];
    const steps = tier.lessons.length + 1;
    const empty = emptyProgress();
    expect(tierProgress(empty, firstTier).fraction).toBe(0);

    const oneLesson = structuredClone(empty);
    oneLesson.completedLessons[tier.lessons[0].id] = { score: 4, total: 4, passedAt: 'x' };
    expect(tierProgress(oneLesson, firstTier).fraction).toBeCloseTo(1 / steps);
    expect(isLessonComplete(oneLesson, tier.lessons[0].id)).toBe(true);
  });
});
