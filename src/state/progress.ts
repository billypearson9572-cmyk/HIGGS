// Progress persistence and progression rules. All data lives in localStorage;
// there is no backend and no login.

import { tiers } from '../content';

export interface LessonRecord {
  score: number;
  total: number;
  passedAt: string; // ISO date
}

export interface MilestoneRecord {
  score: number;
  total: number;
  passedAt: string;
}

export interface TrainerStats {
  correct: number;
  total: number;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string | null; // YYYY-MM-DD
}

export interface ProgressState {
  version: 1;
  completedLessons: Record<string, LessonRecord>;
  completedMilestones: Record<string, MilestoneRecord>;
  trainers: Record<string, TrainerStats>;
  streak: StreakState;
}

export const PROGRESS_KEY = 'pokerpath.progress';

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    completedLessons: {},
    completedMilestones: {},
    trainers: {},
    streak: { current: 0, longest: 0, lastActiveDate: null },
  };
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...emptyProgress(), ...parsed } as ProgressState;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode). Fail quietly.
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00Z').getTime();
  const db = new Date(b + 'T00:00:00Z').getTime();
  return Math.round((db - da) / 86_400_000);
}

// Update the streak based on the current date. Pure: returns a new streak.
export function touchStreak(streak: StreakState, now = today()): StreakState {
  if (streak.lastActiveDate === now) return streak;
  let current = 1;
  if (streak.lastActiveDate && daysBetween(streak.lastActiveDate, now) === 1) {
    current = streak.current + 1;
  }
  return {
    current,
    longest: Math.max(streak.longest, current),
    lastActiveDate: now,
  };
}

// --- Progression rules -----------------------------------------------------

export function isLessonComplete(state: ProgressState, lessonId: string): boolean {
  return Boolean(state.completedLessons[lessonId]);
}

export function isMilestoneComplete(state: ProgressState, tierId: string): boolean {
  return Boolean(state.completedMilestones[tierId]);
}

// A tier is complete when every lesson is passed and the milestone is passed.
export function isTierComplete(state: ProgressState, tierId: string): boolean {
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) return false;
  const lessonsDone = tier.lessons.every((l) => isLessonComplete(state, l.id));
  return lessonsDone && isMilestoneComplete(state, tierId);
}

// A tier unlocks when the previous tier is complete (the first is always open).
export function isTierUnlocked(state: ProgressState, tierId: string): boolean {
  const index = tiers.findIndex((t) => t.id === tierId);
  if (index <= 0) return true;
  return isTierComplete(state, tiers[index - 1].id);
}

// The milestone unlocks once all lessons in the tier are passed.
export function isMilestoneUnlocked(state: ProgressState, tierId: string): boolean {
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) return false;
  if (!isTierUnlocked(state, tierId)) return false;
  return tier.lessons.every((l) => isLessonComplete(state, l.id));
}

export interface TierProgress {
  lessonsDone: number;
  lessonsTotal: number;
  milestoneDone: boolean;
  // 0..1 including the milestone as one extra step.
  fraction: number;
}

export function tierProgress(state: ProgressState, tierId: string): TierProgress {
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) {
    return { lessonsDone: 0, lessonsTotal: 0, milestoneDone: false, fraction: 0 };
  }
  const lessonsDone = tier.lessons.filter((l) => isLessonComplete(state, l.id)).length;
  const milestoneDone = isMilestoneComplete(state, tierId);
  const steps = tier.lessons.length + 1; // lessons + milestone
  const fraction = (lessonsDone + (milestoneDone ? 1 : 0)) / steps;
  return { lessonsDone, lessonsTotal: tier.lessons.length, milestoneDone, fraction };
}
