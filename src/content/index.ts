import type { Tier, Lesson } from './types';
import { tier1 } from './tier1';

// Ordered tiers. Tiers 2 and 3 are added in later milestones; progression
// logic already handles however many exist here.
export const tiers: Tier[] = [tier1];

export function getTier(id: string): Tier | undefined {
  return tiers.find((t) => t.id === id);
}

export function getLesson(lessonId: string): { tier: Tier; lesson: Lesson } | undefined {
  for (const tier of tiers) {
    const lesson = tier.lessons.find((l) => l.id === lessonId);
    if (lesson) return { tier, lesson };
  }
  return undefined;
}

export function allLessonIds(): string[] {
  return tiers.flatMap((t) => t.lessons.map((l) => l.id));
}

export * from './types';
export * from './glossary';
