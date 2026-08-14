export type EntryKind = "note" | "todo" | "timer" | "ai";

export type DemoEntry = {
  id: string;
  kind: EntryKind;
  text: string;
  createdAt: Date;
  isDone?: boolean;
  isPinned?: boolean;
  categoryName?: string;
  categoryColor?: string;
  durationSeconds?: number;
  companionName?: string;
  /** `/demo/monolog/*` avatar asset key */
  avatar?: "default" | "vangogh";
  incoming?: boolean;
};

export type TimerMode = "countdown" | "stopwatch";

export type SidebarPage = "today" | "data" | "categories";

export type DataPeriod = "week" | "month" | "year";

export type DemoCopy = {
  backToCaseStudy: string;
  tryDemo: string;
  demoHint: string;
  today: string;
  data: string;
  categories: string;
  placeholder: string;
  taskPlaceholder: string;
  inviteAi: string;
  search: string;
  send: string;
  countdown: string;
  stopwatch: string;
  min: string;
  demoBadge: string;
  menuPin: string;
  menuUnpin: string;
  menuEdit: string;
  menuToTodo: string;
  menuToNote: string;
  menuDelete: string;
  editPrompt: string;
  periodWeek: string;
  periodMonth: string;
  periodYear: string;
  dataToday: string;
  dataPrev: string;
  dataNext: string;
};
