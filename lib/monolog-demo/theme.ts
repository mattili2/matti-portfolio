/** Product UI palette — matches customized MonoLOG settings in the portfolio screenshot. */
export const MONOLOG = {
  /** AI / incoming chat bubbles */
  incomingBubble: "#3c46f9",
  incomingText: "#ffffff",
  /** Outgoing notes */
  noteBubble: "rgba(0, 0, 0, 0.06)",
  noteText: "#000000",
  /** Todos + pinned strip */
  todoBubble: "#b2f2ee",
  todoText: "#000000",
  /** Completed timer logs */
  timerBubble: "#000000",
  timerText: "#ffffff",
  timerTextMuted: "rgba(255, 255, 255, 0.55)",
  /** Controls — black accent in the shipped UI */
  accent: "#000000",
  controlFill: "rgba(0, 0, 0, 0.08)",
  fieldStroke: "rgba(0, 0, 0, 0.18)",
  textPrimary: "#000000",
  textSecondary: "rgba(0, 0, 0, 0.55)",
  textTertiary: "rgba(0, 0, 0, 0.35)",
  windowBg: "#ffffff",
  pageBg: "#f2f2f7",
  sidebarBg: "#f0f0f0",
  chromeBg: "#ececec",
  categoryPurple: "#5B48F5",
  categoryDefault: "#5B48F5",
  trafficRed: "#FF5F57",
  trafficYellow: "#FEBC2E",
  trafficGreen: "#28C840",
  font:
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif',
  controlHeight: 36,
  bubbleRadius: 16,
  pillRadius: 9999,
  bubbleMaxWidth: 420,
  windowWidth: 632,
  windowHeight: 740,
} as const;

/** Demo window sizing — mirrors `MainWindowLayout` in the macOS app. */
export const DEMO_WINDOW_LAYOUT = {
  sidebarWidth: 180,
  timerBarContentWidth: 552,
  timerBarHorizontalPadding: 40,
  minWidthCollapsed: 552 + 40,
  minWidthWithSidebar: 180 + 552 + 40,
  defaultWidth: 180 + 552 + 40,
} as const;

/** Native `<select>` popup typography — keep category + context menus consistent. */
export const NATIVE_MENU_SELECT_STYLE = {
  fontSize: 13,
  lineHeight: "18px",
  fontFamily: MONOLOG.font,
} as const;

/** Chart / category colors — aligned with the product data-view palette. */
export const CATEGORIES = [
  { name: "默认", color: "#5B48F5" },
  { name: "个人", color: "#00D4C8" },
  { name: "学习", color: "#FF4DA6" },
  { name: "活动", color: "#8B7CFF" },
] as const;

export const PRESETS = [5, 25, 50] as const;
