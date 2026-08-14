"use client";

import { CATEGORIES, NATIVE_MENU_SELECT_STYLE } from "@/lib/monolog-demo/theme";

type CategoryPickerProps = {
  categoryIndex: number;
  onChange: (index: number) => void;
  ariaLabel?: string;
};

/** Native `<select>` — macOS / browser renders the system menu popup. */
export function CategoryPicker({
  categoryIndex,
  onChange,
  ariaLabel = "Category",
}: CategoryPickerProps) {
  const color = CATEGORIES[categoryIndex]?.color ?? CATEGORIES[0].color;

  return (
    <label className="relative flex h-9 w-5 shrink-0 items-center justify-center rounded-md">
      <span
        className="h-3 w-3 rounded-full ring-1 ring-black/[0.06]"
        style={{ background: color }}
      />
      <select
        className="absolute inset-0 opacity-0"
        style={NATIVE_MENU_SELECT_STYLE}
        value={categoryIndex}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
      >
        {CATEGORIES.map((cat, index) => (
          <option key={cat.name} value={index}>
            {cat.name}
          </option>
        ))}
      </select>
    </label>
  );
}
