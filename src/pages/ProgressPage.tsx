import { useRef, useState } from 'react';
import { tiers } from '../content';
import { useProgress } from '../state/ProgressContext';
import { useSettings, type Settings } from '../state/SettingsContext';
import { isLessonComplete, isMilestoneComplete, tierProgress, type ProgressState } from '../state/progress';
import { ProgressBar } from '../components/ProgressBar';

const SETTING_LABELS: { key: keyof Settings; label: string; hint: string }[] = [
  { key: 'highContrast', label: 'High contrast', hint: 'Stronger colours and borders for easier reading.' },
  { key: 'readableFont', label: 'Dyslexia-friendly font', hint: 'Switches body text to Atkinson Hyperlegible / Lexend.' },
  { key: 'relaxedSpacing', label: 'Generous line spacing', hint: 'More space between lines of text.' },
  { key: 'reducedMotion', label: 'Reduced motion', hint: 'Removes animations and smooth transitions.' },
];

export function ProgressPage() {
  const { state, resetProgress, importProgress } = useProgress();
  const { settings, toggle } = useSettings();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function exportData() {
    const payload = {
      app: 'PokerPath',
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokerpath-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importFile(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const progress = (parsed.progress ?? parsed) as ProgressState;
      if (!progress || typeof progress !== 'object' || !('completedLessons' in progress)) {
        throw new Error('Unrecognised file');
      }
      importProgress(progress);
      setMessage('Progress imported successfully.');
    } catch {
      setMessage('That file could not be read. Please choose a PokerPath export.');
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="mt-1 text-felt-200">Track how far you have come and manage your data.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Current streak" value={`${state.streak.current} days`} />
        <Stat label="Longest streak" value={`${state.streak.longest} days`} />
        <Stat
          label="Lessons completed"
          value={`${Object.keys(state.completedLessons).length} / ${tiers.reduce((n, t) => n + t.lessons.length, 0)}`}
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">By tier</h2>
        {tiers.map((tier) => {
          const tp = tierProgress(state, tier.id);
          return (
            <div key={tier.id} className="surface p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Tier {tier.number}: {tier.title}
                </span>
                <span className="text-sm text-felt-300">{Math.round(tp.fraction * 100)}%</span>
              </div>
              <div className="mt-2">
                <ProgressBar fraction={tp.fraction} />
              </div>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                {tier.lessons.map((l) => (
                  <li
                    key={l.id}
                    className={`rounded px-2 py-1 ${
                      isLessonComplete(state, l.id) ? 'bg-felt-600 text-white' : 'bg-felt-800 text-felt-400'
                    }`}
                  >
                    {isLessonComplete(state, l.id) ? '✓ ' : ''}
                    {l.title}
                  </li>
                ))}
                <li
                  className={`rounded px-2 py-1 ${
                    isMilestoneComplete(state, tier.id) ? 'bg-clay-600 text-white' : 'bg-felt-800 text-felt-400'
                  }`}
                >
                  {isMilestoneComplete(state, tier.id) ? '✓ ' : ''}
                  {tier.milestone.title}
                </li>
              </ul>
            </div>
          );
        })}
      </section>

      <section className="surface p-5">
        <h2 className="text-lg font-bold">Accessibility</h2>
        <p className="mt-1 text-sm text-felt-200">These settings are saved on this device.</p>
        <div className="mt-4 space-y-3">
          {SETTING_LABELS.map(({ key, label, hint }) => (
            <label key={key} className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={() => toggle(key)}
                className="mt-1 h-5 w-5 accent-felt-400"
              />
              <span>
                <span className="font-medium text-felt-50">{label}</span>
                <span className="block text-xs text-felt-300">{hint}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <h2 className="text-lg font-bold">Back up your progress</h2>
        <p className="mt-1 text-sm text-felt-200">
          Your progress lives only in this browser. Export a JSON file to keep a backup or move to
          another device.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={exportData}
            className="rounded-lg bg-felt-500 px-4 py-2 font-semibold text-white hover:bg-felt-400"
          >
            Export progress
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-felt-600 px-4 py-2 font-semibold text-felt-100 hover:bg-felt-800"
          >
            Import progress
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importFile(file);
              e.target.value = '';
            }}
          />
        </div>
        {message && <p className="mt-3 text-sm text-felt-300">{message}</p>}

        <div className="mt-6 border-t border-felt-700 pt-4">
          <button
            onClick={() => {
              if (confirm('Reset all progress? This cannot be undone.')) {
                resetProgress();
                setMessage('Progress has been reset.');
              }
            }}
            className="text-sm text-clay-300 underline hover:text-clay-200"
          >
            Reset all progress
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-4">
      <div className="text-sm text-felt-300">{label}</div>
      <div className="mt-1 text-xl font-bold text-felt-50">{value}</div>
    </div>
  );
}
