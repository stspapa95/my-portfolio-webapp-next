type PlaceholderMediaProps = {
  label: string;
  className?: string;
};

export function PlaceholderMedia({ label, className = "" }: PlaceholderMediaProps) {
  return (
    <div
      className={`placeholder relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <span className="font-mono text-[12px] tracking-[0.09em] text-muted">
        {`[ ${label} ]`}
      </span>
    </div>
  );
}
