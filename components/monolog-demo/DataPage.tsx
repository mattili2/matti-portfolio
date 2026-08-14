"use client";

import { useMemo } from "react";
import { categoryColor } from "@/lib/monolog-demo/chartSessions";
import type { ChartSession } from "@/lib/monolog-demo/chartSessions";
import { DEMO_COPY } from "@/lib/monolog-demo/copy";
import { MONOLOG } from "@/lib/monolog-demo/theme";
import type { DataPeriod } from "@/lib/monolog-demo/types";
import type { Locale } from "@/lib/i18n";
import { SfSymbol } from "./SfSymbol";

type DataPageProps = {
  locale: Locale;
  period: DataPeriod;
  focusedDate: Date;
  onFocusedDateChange: (date: Date) => void;
  sessions: ChartSession[];
};

const HOUR_MARKS = [0, 4, 8, 12, 16, 20, 24];
const LABEL_WIDTH = 28;
const HEADER_HEIGHT = 28;
const BLOCK_CORNER_RADIUS_MAX_RATIO = 0.16;
const BLOCK_CORNER_RADIUS_ABSOLUTE_MAX = 8;
const YEAR_DAY_SIZE = 18;
const YEAR_DAY_GAP = 2;
const YEAR_MONTH_GRID_WIDTH = YEAR_DAY_SIZE * 7 + YEAR_DAY_GAP * 6;

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function yOffset(date: Date, height: number): number {
  const seconds =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return (seconds / 86400) * height;
}

function xOffset(date: Date, width: number): number {
  const seconds =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return (seconds / 86400) * width;
}

function weekBlockCornerRadius(width: number, height: number): number {
  const halfWidth = width / 2;
  const byRatio = width * BLOCK_CORNER_RADIUS_MAX_RATIO;
  const capped = Math.min(byRatio, BLOCK_CORNER_RADIUS_ABSOLUTE_MAX, halfWidth - 1);
  return Math.min(capped, height / 2);
}

function formatPeriodTitle(
  locale: Locale,
  period: DataPeriod,
  focusedDate: Date,
): string {
  if (locale === "zh") {
    if (period === "week") {
      const weekStart = startOfWeek(focusedDate);
      const weekEnd = addDays(weekStart, 6);
      return `${weekStart.getMonth() + 1}月${weekStart.getDate()}日 – ${weekEnd.getMonth() + 1}月${weekEnd.getDate()}日`;
    }
    if (period === "month") {
      return `${focusedDate.getFullYear()}年${focusedDate.getMonth() + 1}月`;
    }
    return `${focusedDate.getFullYear()}年`;
  }

  if (period === "week") {
    const weekStart = startOfWeek(focusedDate);
    const weekEnd = addDays(weekStart, 6);
    return `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }
  if (period === "month") {
    return focusedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
  return String(focusedDate.getFullYear());
}

function stepFocusedDate(date: Date, period: DataPeriod, delta: number): Date {
  if (period === "week") return addDays(date, delta * 7);
  if (period === "month") return addMonths(date, delta);
  return addYears(date, delta);
}

function WeekTimeChart({
  focusedDate,
  sessions,
}: {
  focusedDate: Date;
  sessions: ChartSession[];
}) {
  const weekStart = startOfWeek(focusedDate);
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );
  const today = new Date();

  return (
    <div className="flex min-h-0 flex-1 flex-col px-2 pb-3">
      <div className="flex min-h-0 flex-1 flex-col px-3">
        <div className="mb-0 flex shrink-0">
          <div style={{ width: LABEL_WIDTH, height: HEADER_HEIGHT }} />
          <div className="grid flex-1 grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className="flex items-center justify-center text-[13px]"
                style={{
                  height: HEADER_HEIGHT,
                  color: isSameDay(day, today) ? MONOLOG.accent : MONOLOG.textSecondary,
                }}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="absolute inset-0 flex">
            <div
              className="relative shrink-0"
              style={{ width: LABEL_WIDTH }}
            >
              {HOUR_MARKS.map((hour) => (
                <span
                  key={hour}
                  className="absolute right-1 text-[11px] leading-none"
                  style={{
                    top: `calc(${(hour / 24) * 100}% - 6px)`,
                    color: MONOLOG.textTertiary,
                  }}
                >
                  {hour}
                </span>
              ))}
            </div>

            <div className="relative min-w-0 flex-1">
              {HOUR_MARKS.map((hour) => (
                <div
                  key={hour}
                  className="pointer-events-none absolute inset-x-0 border-t border-black/[0.08]"
                  style={{ top: `${(hour / 24) * 100}%` }}
                />
              ))}

              <div className="absolute inset-0 grid grid-cols-7">
                {weekDays.map((day) => {
                  const daySessions = sessions.filter((session) =>
                    isSameDay(session.start, day),
                  );
                  return (
                    <div key={day.toISOString()} className="relative h-full">
                      {daySessions.map((session) => {
                        const top = yOffset(session.start, 100);
                        const bottom = yOffset(session.end, 100);
                        const height = Math.max(bottom - top, (3 / 280) * 100);
                        const blockWidth = "calc(100% - 6px)";
                        const radius = weekBlockCornerRadius(40, (height / 100) * 280);
                        return (
                          <div
                            key={`${session.id}-${session.start.toISOString()}`}
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                              top: `${top}%`,
                              height: `${height}%`,
                              width: blockWidth,
                              minWidth: 16,
                              borderRadius: radius,
                              background: categoryColor(session.categoryName),
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {weekDays.some((day) => isSameDay(day, today)) ? (
                <div
                  className="pointer-events-none absolute inset-x-0 border-t"
                  style={{
                    top: `${yOffset(today, 100)}%`,
                    borderColor: MONOLOG.accent,
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthCalendarChart({
  focusedDate,
  sessions,
  locale,
}: {
  focusedDate: Date;
  sessions: ChartSession[];
  locale: Locale;
}) {
  const weekdayTitles =
    locale === "zh"
      ? ["一", "二", "三", "四", "五", "六", "日"]
      : ["M", "T", "W", "T", "F", "S", "S"];

  const days = useMemo(() => {
    const monthStart = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1);
    const monthEnd = new Date(focusedDate.getFullYear(), focusedDate.getMonth() + 1, 0);
    const firstWeekday = monthStart.getDay();
    const mondayBased = (firstWeekday + 6) % 7;
    const result: (Date | null)[] = Array.from({ length: mondayBased }, () => null);

    for (let day = 1; day <= monthEnd.getDate(); day += 1) {
      result.push(new Date(focusedDate.getFullYear(), focusedDate.getMonth(), day));
    }
    while (result.length % 7 !== 0) result.push(null);
    return result;
  }, [focusedDate]);

  const rows = Math.max(days.length / 7, 1);
  const today = new Date();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="grid shrink-0 grid-cols-7 px-5 pb-2">
        {weekdayTitles.map((title) => (
          <div
            key={title}
            className="text-center text-[12px] font-medium"
            style={{ color: MONOLOG.textSecondary }}
          >
            {title}
          </div>
        ))}
      </div>

      <div
        className="grid min-h-0 flex-1 grid-cols-7 px-5 pb-4"
        style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
      >
        {days.map((day, index) => {
          if (day == null) {
            return (
              <div
                key={`empty-${index}`}
                className="border-[0.5px] border-black/[0.08]"
                style={{ background: "rgba(0,0,0,0.04)" }}
              />
            );
          }

          const daySessions = sessions.filter((session) => isSameDay(session.start, day));

          return (
            <div
              key={day.toISOString()}
              className="relative overflow-hidden border-[0.5px] border-black/[0.08] bg-white"
            >
              {daySessions.map((session) => {
                const startX = xOffset(session.start, 100);
                const endX = xOffset(session.end, 100);
                const stripWidth = Math.max(endX - startX, 0.4);
                return (
                  <div
                    key={`${session.id}-${session.start.toISOString()}`}
                    className="absolute inset-y-0"
                    style={{
                      left: `${startX}%`,
                      width: `${stripWidth}%`,
                      minWidth: 1.5,
                      background: categoryColor(session.categoryName),
                    }}
                  />
                );
              })}
              <span
                className="pointer-events-none absolute left-1 top-1 text-[13px]"
                style={{
                  color: isSameDay(day, today) ? MONOLOG.textPrimary : MONOLOG.textSecondary,
                }}
              >
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniMonthGrid({
  monthDate,
  sessions,
}: {
  monthDate: Date;
  sessions: ChartSession[];
}) {
  const days = useMemo(() => {
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    const firstWeekday = monthStart.getDay();
    const mondayBased = (firstWeekday + 6) % 7;
    const result: (Date | null)[] = Array.from({ length: mondayBased }, () => null);

    for (let day = 1; day <= monthEnd.getDate(); day += 1) {
      result.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
    }
    return result;
  }, [monthDate]);

  const today = new Date();

  function dominantColor(day: Date): string | null {
    const daySessions = sessions.filter((session) => isSameDay(session.start, day));
    if (daySessions.length === 0) return null;

    const grouped = new Map<string, number>();
    for (const session of daySessions) {
      const duration = session.end.getTime() - session.start.getTime();
      grouped.set(
        session.categoryName,
        (grouped.get(session.categoryName) ?? 0) + duration,
      );
    }

    let topName: string | null = null;
    let topDuration = 0;
    for (const [name, duration] of grouped) {
      if (duration > topDuration) {
        topName = name;
        topDuration = duration;
      }
    }
    return topName ? categoryColor(topName) : null;
  }

  return (
    <div
      className="grid shrink-0 grid-cols-7"
      style={{ width: YEAR_MONTH_GRID_WIDTH, gap: YEAR_DAY_GAP }}
    >
      {days.map((day, index) => {
        if (day == null) {
          return (
            <div
              key={`pad-${index}`}
              style={{ width: YEAR_DAY_SIZE, height: YEAR_DAY_SIZE }}
            />
          );
        }

        const color = dominantColor(day);
        const isToday = isSameDay(day, today);

        return (
          <div
            key={day.toISOString()}
            className="flex items-center justify-center text-[10px]"
            style={{
              width: YEAR_DAY_SIZE,
              height: YEAR_DAY_SIZE,
              color: MONOLOG.textPrimary,
            }}
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: YEAR_DAY_SIZE,
                height: YEAR_DAY_SIZE,
                background: color ?? "transparent",
                boxShadow: !color && isToday ? `inset 0 0 0 1px ${MONOLOG.accent}` : undefined,
              }}
            >
              {day.getDate()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function YearCalendarChart({
  focusedDate,
  sessions,
  locale,
}: {
  focusedDate: Date;
  sessions: ChartSession[];
  locale: Locale;
}) {
  const monthNames =
    locale === "zh"
      ? ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = focusedDate.getFullYear();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-2">
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="flex justify-between">
            {Array.from({ length: 4 }, (_, col) => {
              const index = row * 4 + col;
              const monthDate = new Date(year, index, 1);
              return (
                <div key={index} className="shrink-0" style={{ width: YEAR_MONTH_GRID_WIDTH }}>
                  <p
                    className="mb-2 text-[12px] font-medium"
                    style={{ color: MONOLOG.textSecondary }}
                  >
                    {monthNames[index]}
                  </p>
                  <MiniMonthGrid monthDate={monthDate} sessions={sessions} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataPage({
  locale,
  period,
  focusedDate,
  onFocusedDateChange,
  sessions,
}: DataPageProps) {
  const copy = DEMO_COPY[locale];
  const title = formatPeriodTitle(locale, period, focusedDate);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-3">
        <h3 className="text-[24px] font-normal tracking-[-0.02em]">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]"
            style={{ background: MONOLOG.controlFill }}
            aria-label={copy.dataPrev}
            onClick={() => onFocusedDateChange(stepFocusedDate(focusedDate, period, -1))}
          >
            <SfSymbol name="chevron.left" size={11} />
          </button>
          <button
            type="button"
            className="h-7 rounded-full px-3 text-[13px] transition-colors hover:bg-black/[0.04]"
            style={{ background: MONOLOG.controlFill, color: MONOLOG.textPrimary }}
            onClick={() => onFocusedDateChange(new Date())}
          >
            {copy.dataToday}
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]"
            style={{ background: MONOLOG.controlFill }}
            aria-label={copy.dataNext}
            onClick={() => onFocusedDateChange(stepFocusedDate(focusedDate, period, 1))}
          >
            <SfSymbol name="chevron.right" size={11} />
          </button>
        </div>
      </div>

      {period === "week" ? (
        <WeekTimeChart focusedDate={focusedDate} sessions={sessions} />
      ) : null}
      {period === "month" ? (
        <MonthCalendarChart focusedDate={focusedDate} sessions={sessions} locale={locale} />
      ) : null}
      {period === "year" ? (
        <YearCalendarChart focusedDate={focusedDate} sessions={sessions} locale={locale} />
      ) : null}
    </div>
  );
}
