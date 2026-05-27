import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  emptyProgress,
  loadProgress,
  saveProgress,
  touchStreak,
  type ProgressState,
} from './progress';

interface ProgressContextValue {
  state: ProgressState;
  completeLesson: (lessonId: string, score: number, total: number) => void;
  completeMilestone: (tierId: string, score: number, total: number) => void;
  recordTrainer: (key: string, correct: number, total: number) => void;
  resetProgress: () => void;
  importProgress: (state: ProgressState) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const completeLesson = useCallback((lessonId: string, score: number, total: number) => {
    setState((prev) => ({
      ...prev,
      completedLessons: {
        ...prev.completedLessons,
        [lessonId]: { score, total, passedAt: new Date().toISOString() },
      },
      streak: touchStreak(prev.streak),
    }));
  }, []);

  const completeMilestone = useCallback((tierId: string, score: number, total: number) => {
    setState((prev) => ({
      ...prev,
      completedMilestones: {
        ...prev.completedMilestones,
        [tierId]: { score, total, passedAt: new Date().toISOString() },
      },
      streak: touchStreak(prev.streak),
    }));
  }, []);

  const recordTrainer = useCallback((key: string, correct: number, total: number) => {
    setState((prev) => {
      const existing = prev.trainers[key] ?? { correct: 0, total: 0 };
      return {
        ...prev,
        trainers: {
          ...prev.trainers,
          [key]: { correct: existing.correct + correct, total: existing.total + total },
        },
        streak: touchStreak(prev.streak),
      };
    });
  }, []);

  const resetProgress = useCallback(() => setState(emptyProgress()), []);

  const importProgress = useCallback((next: ProgressState) => {
    setState({ ...emptyProgress(), ...next });
  }, []);

  const value = useMemo(
    () => ({ state, completeLesson, completeMilestone, recordTrainer, resetProgress, importProgress }),
    [state, completeLesson, completeMilestone, recordTrainer, resetProgress, importProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
