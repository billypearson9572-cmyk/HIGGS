import type { ContentBlock } from '../content/types';

const CALLOUT_STYLES: Record<string, { box: string; label: string; title: string }> = {
  tip: { box: 'border-felt-400 bg-felt-800/60', label: 'text-felt-300', title: 'Tip' },
  note: { box: 'border-felt-600 bg-felt-800/40', label: 'text-felt-200', title: 'Note' },
  warning: { box: 'border-clay-500 bg-clay-900/30', label: 'text-clay-300', title: 'Careful' },
  stakes: { box: 'border-clay-400 bg-clay-900/20', label: 'text-clay-300', title: 'Low-stakes note' },
};

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'h':
      return <h3 className="mt-6 text-lg font-bold text-felt-50">{block.text}</h3>;
    case 'p':
      return <p className="mt-3 leading-relaxed text-felt-100">{block.text}</p>;
    case 'list':
      return (
        <ul className="mt-3 list-disc space-y-1.5 pl-6 text-felt-100">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case 'ordered':
      return (
        <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-felt-100">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case 'term':
      return (
        <div className="surface mt-4 border-l-4 border-l-felt-400 p-3">
          <dt className="font-bold text-felt-50">{block.term}</dt>
          <dd className="mt-1 text-sm text-felt-200">{block.definition}</dd>
        </div>
      );
    case 'callout': {
      const s = CALLOUT_STYLES[block.tone];
      return (
        <div className={`mt-4 rounded-lg border-l-4 p-3 ${s.box}`}>
          <div className={`text-xs font-bold uppercase tracking-wide ${s.label}`}>{s.title}</div>
          <p className="mt-1 text-sm text-felt-100">{block.text}</p>
        </div>
      );
    }
  }
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <dl className="mt-2">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </dl>
  );
}
