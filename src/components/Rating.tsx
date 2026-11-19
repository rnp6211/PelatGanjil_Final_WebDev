export default function Rating({ value, label = true }: { value: number; label?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-ink" aria-label={`Rating ${value} dari 5`}>
      <span className="tracking-widest text-coral" aria-hidden="true">{"★".repeat(value)}{"☆".repeat(5 - value)}</span>
      {label && <span className="text-muted">{value}/5</span>}
    </span>
  );
}
