"use client";

interface FilterOption {
  id: string;
  label: string;
}

interface ChipFiltersProps {
  options: FilterOption[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Minimal chip filter row. Active chip: filled neutral-900.
 * Passive: white/50 with subtle border.
 */
export default function ChipFilters({
  options,
  active,
  onChange,
  className = "",
}: ChipFiltersProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
            active === opt.id
              ? "bg-neutral-900 text-white"
              : "bg-white/50 border border-black/10 text-neutral-700 hover:bg-white/80"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
