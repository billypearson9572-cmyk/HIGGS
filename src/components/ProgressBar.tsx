interface Props {
  fraction: number; // 0..1
  label?: string;
}

export function ProgressBar({ fraction, label }: Props) {
  const pct = Math.round(Math.min(1, Math.max(0, fraction)) * 100);
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-sm text-felt-200">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-felt-800"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="h-full rounded-full bg-felt-400 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
