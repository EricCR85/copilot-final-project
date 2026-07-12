interface ProgressBarProps {
  value: number;
  label?: string;
}

export const ProgressBar = ({ value, label = "Progress" }: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const percentage = `${clampedValue}%`;

  return (
    <div className="w-full space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm font-medium text-gray-700">
          <span>{label}</span>
          <span>{percentage}</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        aria-label={label}
        className="h-3 w-full overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
};
