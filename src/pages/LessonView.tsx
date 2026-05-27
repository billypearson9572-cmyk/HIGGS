import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLesson, QUIZ_PASS_FRACTION } from '../content';
import { useProgress } from '../state/ProgressContext';
import { isLessonComplete, isTierUnlocked } from '../state/progress';
import { ContentBlocks } from '../components/ContentBlocks';
import { Quiz } from '../components/Quiz';

export function LessonView() {
  const { tierId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const { state, completeLesson } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);

  const found = getLesson(lessonId);
  if (!found || found.tier.id !== tierId || !isTierUnlocked(state, tierId)) {
    return (
      <div className="surface p-6 text-center">
        <p>This lesson is not available yet.</p>
        <Link to="/learn" className="mt-3 inline-block text-felt-300 underline">
          Back to lessons
        </Link>
      </div>
    );
  }

  const { tier, lesson } = found;
  const alreadyPassed = isLessonComplete(state, lesson.id);

  // Find the next step to suggest after passing.
  const idx = tier.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = tier.lessons[idx + 1];
  const nextLink = nextLesson
    ? `/learn/${tier.id}/${nextLesson.id}`
    : `/learn/${tier.id}/milestone`;
  const nextLabel = nextLesson ? `Next lesson: ${nextLesson.title}` : `Tier milestone: ${tier.milestone.title}`;

  return (
    <div className="space-y-5">
      <div className="text-sm">
        <Link to="/learn" className="text-felt-300 underline">
          Learn
        </Link>
        <span className="text-felt-500"> / Tier {tier.number}</span>
      </div>

      <header>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-1 text-sm text-felt-300">
          {lesson.minutes} min read{alreadyPassed ? ' · completed' : ''}
        </p>
      </header>

      {!showQuiz ? (
        <>
          <article className="surface p-5">
            <ContentBlocks blocks={lesson.blocks} />
          </article>
          <button
            onClick={() => setShowQuiz(true)}
            className="rounded-lg bg-felt-500 px-5 py-2.5 font-semibold text-white hover:bg-felt-400"
          >
            {alreadyPassed ? 'Retake the quiz' : 'Start the quiz'}
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold">Quick quiz</h2>
          <Quiz
            questions={lesson.quiz}
            passFraction={QUIZ_PASS_FRACTION}
            alreadyPassed={alreadyPassed}
            onPass={(score, total) => completeLesson(lesson.id, score, total)}
          />
          <div className="flex flex-wrap gap-3">
            <Link to="/learn" className="rounded-lg border border-felt-600 px-4 py-2 text-felt-100 hover:bg-felt-800">
              Back to lessons
            </Link>
            {(alreadyPassed || isLessonComplete(state, lesson.id)) && (
              <button
                onClick={() => navigate(nextLink)}
                className="rounded-lg bg-felt-600 px-4 py-2 font-semibold text-white hover:bg-felt-500"
              >
                {nextLabel}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
