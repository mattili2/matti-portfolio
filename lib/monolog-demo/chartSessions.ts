import { CATEGORIES } from "./theme";
import type { DemoEntry } from "./types";

export type ChartSession = {
  id: string;
  start: Date;
  end: Date;
  categoryName: string;
  taskName: string;
};

const TASK_POOL = [
  "写博客",
  "审查 PR",
  "阅读",
  "开会",
  "整理笔记",
  "调试",
  "运动",
  "邮件",
  "学习",
  "规划",
  "深度工作",
  "回复消息",
  "设计",
  "散步",
];

/** Deterministic PRNG — same day always yields the same sessions. */
function createRng(seed: number) {
  let state = seed >>> 0;
  return {
    next(): number {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 0x1_0000_0000;
    },
    int(min: number, max: number): number {
      return Math.floor(this.next() * (max - min + 1)) + min;
    },
    pick<T>(items: T[]): T {
      return items[this.int(0, items.length - 1)]!;
    },
  };
}

function daySeed(day: Date): number {
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  return y * 10_000 + m * 100 + d;
}

function startOfDay(day: Date): Date {
  const result = new Date(day);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addMinutes(dayStart: Date, minutes: number): Date {
  return new Date(dayStart.getTime() + minutes * 60_000);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const DEMO_HISTORY_DAYS = 6;

/** Lighter demo fill — a few clusters per day, not a full workday simulation. */
export function makeRealisticSessions(day: Date): ChartSession[] {
  const categories = [...CATEGORIES];
  if (categories.length === 0) return [];

  const rng = createRng(daySeed(day));
  const dayStart = startOfDay(day);
  const sessions: ChartSession[] = [];
  const clusterCount = rng.int(2, 3);
  let cursorMinutes = rng.int(9 * 60, 11 * 60);
  const dayEndMinutes = 21 * 60;

  for (let cluster = 0; cluster < clusterCount; cluster += 1) {
    if (cursorMinutes >= dayEndMinutes - 20) break;

    const clusterSize = rng.int(1, 2);
    const primaryCategory = rng.pick(categories);

    for (let index = 0; index < clusterSize; index += 1) {
      if (cursorMinutes >= dayEndMinutes - 5) break;

      const category =
        index > 0 && rng.next() < 0.65 ? primaryCategory : rng.pick(categories);

      const roll = rng.int(0, 9);
      let durationMinutes: number;
      if (roll <= 3) durationMinutes = rng.int(8, 18);
      else if (roll <= 7) durationMinutes = rng.int(20, 35);
      else durationMinutes = rng.int(40, 55);

      const start = addMinutes(dayStart, cursorMinutes);
      const endMinutes = Math.min(cursorMinutes + durationMinutes, dayEndMinutes);
      const end = addMinutes(dayStart, endMinutes);
      if (end <= start) continue;

      sessions.push({
        id: `${daySeed(day)}-${cluster}-${index}`,
        start,
        end,
        categoryName: category.name,
        taskName: rng.pick(TASK_POOL),
      });

      cursorMinutes = endMinutes + rng.int(2, 10);
    }

    cursorMinutes += rng.int(40, 80);
  }

  return sessions;
}

export function timerSessionsFromEntries(entries: DemoEntry[]): ChartSession[] {
  return entries
    .filter((entry) => entry.kind === "timer")
    .map((entry) => {
      const end = entry.createdAt;
      const durationMs = (entry.durationSeconds ?? 0) * 1000;
      const start = new Date(end.getTime() - durationMs);
      return {
        id: entry.id,
        start,
        end,
        categoryName: entry.categoryName ?? "默认",
        taskName: entry.text,
      };
    });
}

/** Today timers from the feed + a few recent days for charts. */
export function getChartSessions(entries: DemoEntry[], today = new Date()): ChartSession[] {
  const todayTimers = timerSessionsFromEntries(entries).filter((session) =>
    isSameDay(session.end, today),
  );

  const historical: ChartSession[] = [];
  const todayStart = startOfDay(today);

  for (let offset = DEMO_HISTORY_DAYS; offset >= 1; offset -= 1) {
    const day = new Date(todayStart);
    day.setDate(day.getDate() - offset);
    historical.push(...makeRealisticSessions(day));
  }

  return [...todayTimers, ...historical];
}

export function categoryColor(name: string): string {
  return CATEGORIES.find((category) => category.name === name)?.color ?? CATEGORIES[0]!.color;
}
