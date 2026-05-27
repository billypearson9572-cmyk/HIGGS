import { useMemo, useState } from 'react';
import { searchGlossary } from '../content';

export function Glossary() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchGlossary(query), [query]);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Glossary</h1>
        <p className="mt-1 text-felt-200">Every term defined in the lessons, in one place.</p>
      </header>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search terms or definitions"
        aria-label="Search the glossary"
        className="w-full rounded-lg border border-felt-700 bg-felt-900 px-4 py-2.5 text-felt-50 placeholder:text-felt-500 focus:border-felt-400"
      />

      {results.length === 0 ? (
        <p className="text-felt-300">No terms match “{query}”.</p>
      ) : (
        <dl className="space-y-3">
          {results.map((t) => (
            <div key={t.term} id={`term-${t.term.toLowerCase().replace(/\s+/g, '-')}`} className="surface p-4">
              <dt className="flex items-center gap-2 font-bold text-felt-50">
                {t.term}
                <span className="rounded bg-felt-800 px-1.5 py-0.5 text-[10px] font-medium text-felt-300">
                  Tier {t.tier}
                </span>
              </dt>
              <dd className="mt-1 text-sm text-felt-200">{t.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
