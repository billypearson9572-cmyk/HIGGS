import { useState } from 'react';
import type { QuizQuestion } from '../content/types';

interface Props {
  questions: QuizQuestion[];
  passFraction: number;
  onPass: (score: number, total: number) => void;
  alreadyPassed?: boolean;
}

// A simple one-question-at-a-time quiz with instant feedback and explanations.
export function Quiz({ questions, passFraction, onPass, alreadyPassed }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const passMark = Math.ceil(total * passFraction);
  const q = questions[index];

  function choose(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correctIndex) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setFinished(true);
      if (correctCount >= passMark) onPass(correctCount, total);
    }
  }

  function retry() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
  }

  if (finished) {
    const passed = correctCount >= passMark;
    return (
      <div className="surface p-5 text-center">
        <h3 className="text-xl font-bold">{passed ? 'Quiz passed' : 'Not quite yet'}</h3>
        <p className="mt-2 text-felt-200">
          You scored {correctCount} out of {total}. You need {passMark} to pass.
        </p>
        {passed ? (
          <p className="mt-3 text-felt-300">Great work. This lesson is now ticked off.</p>
        ) : (
          <button
            onClick={retry}
            className="mt-4 rounded-lg bg-felt-500 px-5 py-2 font-semibold text-white hover:bg-felt-400"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between text-sm text-felt-300">
        <span>
          Question {index + 1} of {total}
        </span>
        {alreadyPassed && <span className="text-felt-400">Already passed</span>}
      </div>
      <p className="mt-3 text-lg font-semibold text-felt-50">{q.prompt}</p>
      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isChosen = i === selected;
          let cls = 'border-felt-700 bg-felt-800 hover:bg-felt-700';
          if (revealed && isCorrect) cls = 'border-felt-300 bg-felt-700';
          else if (revealed && isChosen && !isCorrect) cls = 'border-clay-500 bg-clay-900/40';
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={revealed}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${cls}`}
            >
              <span className="font-medium text-felt-50">{opt}</span>
              {revealed && isCorrect && <span className="ml-auto text-felt-300">correct</span>}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-4 rounded-lg bg-felt-800/60 p-3 text-sm text-felt-100">
          {q.explanation}
        </div>
      )}
      {revealed && (
        <button
          onClick={next}
          className="mt-4 rounded-lg bg-felt-500 px-5 py-2 font-semibold text-white hover:bg-felt-400"
        >
          {index + 1 < total ? 'Next question' : 'Finish quiz'}
        </button>
      )}
    </div>
  );
}
