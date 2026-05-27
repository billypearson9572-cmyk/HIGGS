// Content model for lessons, quizzes and tiers.
// Lesson content lives in plain data files (see tier1.ts) so it is easy to
// edit without touching UI code.

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'note' | 'stakes'; text: string }
  | { type: 'term'; term: string; definition: string };

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  // Rough reading time in minutes, shown on cards.
  minutes: number;
  summary: string;
  blocks: ContentBlock[];
  quiz: QuizQuestion[];
}

// The milestone that ends each tier. Some are quizzes, some are interactive
// challenges identified by a component key.
export interface Milestone {
  id: string;
  title: string;
  description: string;
  // Which interactive challenge to render, or 'quiz' for a question set.
  kind: 'hand-ranking' | 'quiz';
  // Pass mark as a fraction, e.g. 0.8 = 80%.
  passFraction: number;
  // Number of questions/rounds the challenge should run.
  rounds: number;
  // Only for kind === 'quiz'.
  quiz?: QuizQuestion[];
}

export interface Tier {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  lessons: Lesson[];
  milestone: Milestone;
}

// Quizzes pass at this fraction of correct answers unless overridden.
export const QUIZ_PASS_FRACTION = 0.7;
