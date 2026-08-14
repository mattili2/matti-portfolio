type SfSymbolName =
  | "play.fill"
  | "pause.fill"
  | "stop.fill"
  | "plus"
  | "arrow.up"
  | "circle"
  | "checkmark.circle.fill"
  | "chevron.down"
  | "chevron.left"
  | "chevron.right"
  | "sun.max"
  | "chart.bar"
  | "tag"
  | "magnifyingglass"
  | "pin"
  | "pin.fill"
  | "photo"
  | "waveform"
  | "sidebar.left";

type SfSymbolProps = {
  name: SfSymbolName;
  className?: string;
  size?: number;
  /** Force icon color (e.g. `#ffffff` on black control buttons). */
  color?: string;
};

/** SF Symbol–style glyphs for macOS-native demo chrome (not Apple assets). */
export function SfSymbol({ name, className, size = 13, color }: SfSymbolProps) {
  const fill = color ?? "currentColor";
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    style: color ? { color: fill } : undefined,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "play.fill":
      return (
        <svg {...common}>
          <path fill={fill} d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l11.04-6.86c.66-.41.66-1.27 0-1.68L9.54 4.3C8.87 3.87 8 4.35 8 5.14z" />
        </svg>
      );
    case "pause.fill":
      return (
        <svg {...common}>
          <rect x="6.5" y="4" width="4.5" height="16" rx="1" fill={fill} />
          <rect x="13" y="4" width="4.5" height="16" rx="1" fill={fill} />
        </svg>
      );
    case "stop.fill":
      return (
        <svg {...common}>
          <path fill={fill} d="M7 7h10v10H7V7z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" stroke={fill} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "arrow.up":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5" />
          <path d="M7 10l5-5 5 5" />
        </svg>
      );
    case "circle":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
    case "checkmark.circle.fill":
      return (
        <svg {...common}>
          <path fill={fill} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.2L6.8 12l1.4-1.4 2.6 2.6 5.8-5.8 1.4 1.4-7.2 7.2z" />
        </svg>
      );
    case "chevron.down":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "chevron.left":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 6l-6 6 6 6" />
        </svg>
      );
    case "chevron.right":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 6l6 6-6 6" />
        </svg>
      );
    case "sun.max":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    case "chart.bar":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 19V10M12 19V5M18 19v-8" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12.5 12.5 20 4 12.5V6a2 2 0 012-2h4.5L20 12.5z" />
          <circle cx="8.5" cy="8.5" r="1.25" />
        </svg>
      );
    case "magnifyingglass":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M16 16l5 5" strokeLinecap="round" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21v-2.5" />
          <path d="M8.5 4.5 10.5 11h3l2-6.5H8.5z" />
        </svg>
      );
    case "pin.fill":
      return (
        <svg {...common}>
          <path d="M14 4.5V3H10v1.5L7 8v3.5l2 1.5V20h6v-7l2-1.5V8l-3-3.5z" />
        </svg>
      );
    case "photo":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <circle cx="9" cy="11" r="1.8" fill="currentColor" stroke="none" />
          <path d="M6 18l4.5-4.5 3 3L18 12l2 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "waveform":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 12V8M8 12V5M12 12V3M16 12V7M20 12V10" />
        </svg>
      );
    case "sidebar.left":
      return (
        <svg {...common} fill="none" stroke={fill} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M9 5v14" />
        </svg>
      );
  }
}
