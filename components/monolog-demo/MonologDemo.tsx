"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BubbleContextMenu, type ContextMenuAction } from "@/components/monolog-demo/BubbleContextMenu";
import { CategoryPicker } from "@/components/monolog-demo/CategoryPicker";
import { DataPage } from "@/components/monolog-demo/DataPage";
import { DemoCursor } from "@/components/monolog-demo/DemoCursor";
import { MacTrafficLights } from "@/components/monolog-demo/MacTrafficLights";
import { chatReply, focusCompletedReply } from "@/lib/monolog-demo/aiResponses";
import { getChartSessions } from "@/lib/monolog-demo/chartSessions";
import { DEMO_COPY } from "@/lib/monolog-demo/copy";
import { CATEGORIES, DEMO_WINDOW_LAYOUT, MONOLOG, PRESETS } from "@/lib/monolog-demo/theme";
import type { DataPeriod, DemoEntry, SidebarPage, TimerMode } from "@/lib/monolog-demo/types";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { SfSymbol } from "./SfSymbol";

const ICON = 13;
const WINDOW_BODY_HEIGHT = MONOLOG.windowHeight - 28;
const EMBEDDED_BODY_HEIGHT = 640;

type MonologDemoProps = {
  locale: Locale;
  /** Inline on case-study page — hides page chrome. */
  embedded?: boolean;
};

function uid(): string {
  return crypto.randomUUID();
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatDurationLabel(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  const minutes = Math.max(1, Math.floor(totalSeconds / 60));
  return `${minutes} min`;
}

function formatDateHeading(locale: Locale): string {
  const date = new Date();
  if (locale === "zh") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function atTime(hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const AVATAR_SRC = {
  default: "/demo/monolog/default-avatar.png",
  vangogh: "/demo/monolog/vangogh-avatar.png",
} as const;

export function MonologDemo({ locale, embedded = false }: MonologDemoProps) {
  const copy = DEMO_COPY[locale];
  const initialEntries = useMemo<DemoEntry[]>(() => {
    if (locale === "zh") {
      return [
        {
          id: uid(),
          kind: "ai",
          text: "塞涅卡说：「时间是我们唯一真正拥有的财富。」让我们用 25 分钟，把它变成「改进作品集」这一笔。",
          createdAt: atTime(9, 12),
          avatar: "default",
          incoming: true,
        },
        {
          id: uid(),
          kind: "todo",
          text: "改进作品集",
          createdAt: atTime(9, 13),
          isDone: false,
          isPinned: true,
        },
        {
          id: uid(),
          kind: "timer",
          text: "改进作品集",
          createdAt: atTime(9, 38),
          categoryName: "默认",
          categoryColor: MONOLOG.categoryPurple,
          durationSeconds: 25 * 60,
        },
        {
          id: uid(),
          kind: "note",
          text: "作品集内容有点多，感觉可以分成几个独立板块来呈现。",
          createdAt: atTime(9, 39),
        },
        {
          id: uid(),
          kind: "todo",
          text: "读<破茧成蝶>第三部分",
          createdAt: atTime(11, 17),
          isDone: false,
          isPinned: true,
        },
        {
          id: uid(),
          kind: "timer",
          text: "读<破茧成蝶>第三部分",
          createdAt: atTime(12, 7),
          categoryName: "学习",
          categoryColor: CATEGORIES[2].color,
          durationSeconds: 50 * 60,
        },
        {
          id: uid(),
          kind: "note",
          text: "这部分主要讲持续交付、Kanban，以及怎样让流程真正「流动」起来。",
          createdAt: atTime(12, 8),
        },
        {
          id: uid(),
          kind: "ai",
          text: "23:45 了，你还没睡？我当年在阿尔勒也常熬夜，但星空值得白天再看。",
          createdAt: atTime(23, 45),
          companionName: "梵高",
          avatar: "vangogh",
          incoming: true,
        },
      ];
    }

    return [
      {
        id: uid(),
        kind: "ai",
        text: "Seneca said time is the only wealth we truly own. Let's turn the next 25 minutes into one focused pass on your portfolio.",
        createdAt: atTime(9, 12),
        avatar: "default",
        incoming: true,
      },
      {
        id: uid(),
        kind: "todo",
        text: "Improve portfolio",
        createdAt: atTime(9, 13),
        isDone: false,
        isPinned: true,
      },
      {
        id: uid(),
        kind: "timer",
        text: "Improve portfolio",
        createdAt: atTime(9, 38),
        categoryColor: MONOLOG.categoryPurple,
        durationSeconds: 25 * 60,
      },
      {
        id: uid(),
        kind: "note",
        text: "The case study is getting long — maybe split it into clearer sections.",
        createdAt: atTime(9, 39),
      },
      {
        id: uid(),
        kind: "todo",
        text: "Read Phoenix Project ch. 3",
        createdAt: atTime(11, 17),
        isDone: false,
        isPinned: true,
      },
      {
        id: uid(),
        kind: "timer",
        text: "Read Phoenix Project ch. 3",
        createdAt: atTime(12, 7),
        categoryName: "学习",
        categoryColor: CATEGORIES[2].color,
        durationSeconds: 50 * 60,
      },
      {
        id: uid(),
        kind: "note",
        text: "This part is about continuous delivery, Kanban, and making work actually flow.",
        createdAt: atTime(12, 8),
      },
      {
        id: uid(),
        kind: "ai",
        text: "23:45 — still up? I also painted late in Arles, but the stars are worth seeing by daylight.",
        createdAt: atTime(23, 45),
        companionName: "Van Gogh",
        avatar: "vangogh",
        incoming: true,
      },
    ];
  }, [locale]);

  const [entries, setEntries] = useState<DemoEntry[]>(initialEntries);
  const [draft, setDraft] = useState("");
  const [hasCompanion] = useState(true);
  const [sidebarPage, setSidebarPage] = useState<SidebarPage>("today");
  const [dataPeriod, setDataPeriod] = useState<DataPeriod>("week");
  const [focusedDate, setFocusedDate] = useState(() => new Date());

  const [mode, setMode] = useState<TimerMode>("countdown");
  const [taskName, setTaskName] = useState(
    locale === "zh" ? "改进作品集" : "Improve portfolio",
  );
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [customMinutes, setCustomMinutes] = useState("25");
  const [durationSeconds, setDurationSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [contextMenu, setContextMenu] = useState<{
    entryId: string;
    x: number;
    y: number;
  } | null>(null);

  const [windowWidth, setWindowWidth] = useState(DEMO_WINDOW_LAYOUT.defaultWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hasSidebar, setHasSidebar] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<number | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<{
    edge: "left" | "right";
    startX: number;
    startWidth: number;
  } | null>(null);

  const category = CATEGORIES[categoryIndex] ?? CATEGORIES[0];
  const canReset =
    mode === "countdown"
      ? hasStarted
      : isRunning || elapsedSeconds > 0;
  const showsTimerDisplay = hasStarted;
  const displayTime =
    mode === "countdown"
      ? formatTimer(remainingSeconds)
      : formatTimer(elapsedSeconds);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const maxWindowWidth = useMemo(() => {
    if (containerWidth <= 0) return DEMO_WINDOW_LAYOUT.defaultWidth;
    return containerWidth;
  }, [containerWidth]);

  const minWindowWidth = useMemo(
    () =>
      hasSidebar
        ? DEMO_WINDOW_LAYOUT.minWidthWithSidebar
        : DEMO_WINDOW_LAYOUT.minWidthCollapsed,
    [hasSidebar],
  );

  const clampedWidth = Math.min(
    Math.max(windowWidth, minWindowWidth),
    Math.max(minWindowWidth, maxWindowWidth),
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const updateSidebar = () => setHasSidebar(mq.matches);
    updateSidebar();
    mq.addEventListener("change", updateSidebar);
    return () => mq.removeEventListener("change", updateSidebar);
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const update = () => {
      const width = shell.clientWidth;
      setContainerWidth(width);
      const max = width;
      const min = Math.min(
        hasSidebar
          ? DEMO_WINDOW_LAYOUT.minWidthWithSidebar
          : DEMO_WINDOW_LAYOUT.minWidthCollapsed,
        Math.max(max, 1),
      );
      setWindowWidth((current) =>
        embedded ? max : Math.min(Math.max(current, min), max),
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(shell);
    return () => observer.disconnect();
  }, [embedded, hasSidebar]);

  useEffect(() => {
    if (!isResizing) return;

    const onPointerMove = (event: PointerEvent) => {
      const drag = resizeRef.current;
      if (!drag) return;
      const delta =
        drag.edge === "right"
          ? event.clientX - drag.startX
          : drag.startX - event.clientX;
      const next = Math.min(
        Math.max(drag.startWidth + delta * 2, minWindowWidth),
        maxWindowWidth,
      );
      setWindowWidth(next);
    };

    const onPointerUp = () => {
      resizeRef.current = null;
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isResizing, maxWindowWidth, minWindowWidth]);

  const startResize = useCallback(
    (edge: "left" | "right", clientX: number) => {
      resizeRef.current = {
        edge,
        startX: clientX,
        startWidth: clampedWidth,
      };
      setIsResizing(true);
    },
    [clampedWidth],
  );

  useEffect(() => {
    scrollToBottom();
  }, [entries, scrollToBottom]);

  useEffect(() => {
    if (!isRunning) {
      if (tickRef.current != null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
      return;
    }

    tickRef.current = window.setInterval(() => {
      if (mode === "countdown") {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            window.clearInterval(tickRef.current!);
            tickRef.current = null;
            setIsRunning(false);
            const completed = durationSeconds;
            const task = taskName.trim() || (locale === "zh" ? "专注" : "Focus");
            setEntries((current) => [
              ...current,
              {
                id: uid(),
                kind: "timer",
                text: task,
                createdAt: new Date(),
                categoryName: category.name,
                categoryColor: category.color,
                durationSeconds: completed,
              },
              ...(hasCompanion
                ? [
                    {
                      id: uid(),
                      kind: "ai" as const,
                      text: focusCompletedReply(task, completed),
                      createdAt: new Date(),
                      avatar: "default" as const,
                      incoming: true,
                    },
                  ]
                : []),
            ]);
            setHasStarted(false);
            setRemainingSeconds(durationSeconds);
            return durationSeconds;
          }
          return prev - 1;
        });
      } else {
        setElapsedSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      if (tickRef.current != null) window.clearInterval(tickRef.current);
    };
  }, [category.name, durationSeconds, hasCompanion, isRunning, locale, mode, taskName]);

  const selectPreset = (minutes: number) => {
    setCustomMinutes(String(minutes));
    const seconds = minutes * 60;
    setDurationSeconds(seconds);
    setRemainingSeconds(seconds);
  };

  const toggleTimer = () => {
    if (!isRunning && mode === "countdown" && !hasStarted) {
      const minutes = Math.max(1, parseInt(customMinutes, 10) || 25);
      const seconds = minutes * 60;
      setDurationSeconds(seconds);
      setRemainingSeconds(seconds);
      setHasStarted(true);
    } else if (!isRunning && mode === "stopwatch" && !hasStarted) {
      setHasStarted(true);
      setElapsedSeconds(0);
    }
    setIsRunning((v) => !v);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHasStarted(false);
    if (mode === "countdown") {
      setRemainingSeconds(durationSeconds);
    } else {
      setElapsedSeconds(0);
    }
  };

  const submitDraft = () => {
    const text = draft.trim();
    if (!text) return;
    const kind = "note";
    setEntries((current) => [
      ...current,
      {
        id: uid(),
        kind,
        text,
        createdAt: new Date(),
        isDone: false,
      },
      ...(hasCompanion && kind === "note"
        ? [
            {
              id: uid(),
              kind: "ai" as const,
              text: chatReply(text),
              createdAt: new Date(),
              avatar: "default" as const,
              incoming: true,
            },
          ]
        : []),
    ]);
    setDraft("");
  };

  const toggleTodo = (id: string) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id && entry.kind === "todo"
          ? { ...entry, isDone: !entry.isDone }
          : entry,
      ),
    );
  };

  const pinnedEntries = useMemo(
    () => entries.filter((entry) => entry.isPinned),
    [entries],
  );

  const chartSessions = useMemo(() => getChartSessions(entries), [entries]);

  const contextEntry = contextMenu
    ? entries.find((entry) => entry.id === contextMenu.entryId)
    : undefined;

  const deleteEntry = useCallback((id: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const togglePinEntry = useCallback((id: string) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, isPinned: !entry.isPinned } : entry,
      ),
    );
  }, []);

  const editEntry = useCallback(
    (id: string) => {
      const entry = entries.find((item) => item.id === id);
      if (!entry) return;
      const next = window.prompt(copy.editPrompt, entry.text);
      if (next == null) return;
      const trimmed = next.trim();
      if (!trimmed) return;
      setEntries((current) =>
        current.map((item) => (item.id === id ? { ...item, text: trimmed } : item)),
      );
    },
    [copy.editPrompt, entries],
  );

  const convertNoteToTodo = useCallback((id: string) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id && entry.kind === "note"
          ? { ...entry, kind: "todo" as const, isDone: false }
          : entry,
      ),
    );
  }, []);

  const convertTodoToNote = useCallback((id: string) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id && entry.kind === "todo"
          ? { ...entry, kind: "note" as const, isDone: undefined, isPinned: false }
          : entry,
      ),
    );
  }, []);

  const handleContextAction = useCallback(
    (action: ContextMenuAction) => {
      if (!contextEntry) return;
      const id = contextEntry.id;
      switch (action) {
        case "pin":
        case "unpin":
          togglePinEntry(id);
          break;
        case "edit":
          editEntry(id);
          break;
        case "toTodo":
          convertNoteToTodo(id);
          break;
        case "toNote":
          convertTodoToNote(id);
          break;
        case "delete":
          deleteEntry(id);
          break;
      }
    },
    [
      contextEntry,
      convertNoteToTodo,
      convertTodoToNote,
      deleteEntry,
      editEntry,
      togglePinEntry,
    ],
  );

  const openContextMenu = useCallback(
    (entryId: string, clientX: number, clientY: number) => {
      setContextMenu({ entryId, x: clientX, y: clientY });
    },
    [],
  );

  return (
    <div
      ref={shellRef}
      className={
        embedded
          ? "flex w-full flex-col"
          : "mx-auto flex w-full flex-col gap-6 px-[var(--content-pad)] pb-20 pt-10 md:pt-14"
      }
      style={{ fontFamily: MONOLOG.font }}
    >
      {!embedded ? (
        <div className="flex w-full flex-col gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
            {copy.demoBadge}
          </p>
          <h1 className="text-2xl font-semibold tracking-[0.02em] md:text-3xl">
            MonoLOG
          </h1>
          <p className="text-sm text-muted">{copy.demoHint}</p>
        </div>
      ) : null}

      {/* App window */}
      <div
        ref={demoRef}
        className="monolog-demo relative w-full shrink-0"
        style={embedded ? undefined : { width: clampedWidth, maxWidth: "100%" }}
      >
        <DemoCursor containerRef={demoRef} color={MONOLOG.categoryDefault} />
        {!embedded ? (
          <div
            className="hidden rounded-t-xl border border-black/10 bg-[#f6f6f6]/95 px-4 py-2 shadow-sm md:flex md:items-center md:justify-between"
            style={{ fontFamily: MONOLOG.font }}
          >
            <div className="flex items-center gap-3 text-[12px] text-black/75">
              <Image
                src="/demo/monolog/menu-bar-icon.png"
                alt=""
                width={18}
                height={18}
                className="opacity-90"
                aria-hidden
              />
              <span className="font-medium">MonoLOG</span>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-black/55">
              <span>{showsTimerDisplay ? displayTime : "25:00"}</span>
              <span>{copy.today}</span>
            </div>
          </div>
        ) : null}

        <div
          className={
            embedded
              ? "overflow-hidden rounded-[10px] bg-white ring-1 ring-black/10 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_8px_28px_rgba(0,0,0,0.12),0_22px_56px_rgba(0,0,0,0.08)]"
              : "overflow-hidden rounded-b-[10px] bg-white ring-1 ring-black/10 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_40px_rgba(0,0,0,0.14),0_28px_72px_rgba(0,0,0,0.1)]"
          }
          style={{ fontFamily: MONOLOG.font }}
        >
        <div
          className="flex overflow-hidden"
          style={{ height: embedded ? EMBEDDED_BODY_HEIGHT : WINDOW_BODY_HEIGHT }}
        >
          <aside
            className="hidden w-[180px] shrink-0 flex-col border-r border-black/8 md:flex"
            style={{ background: MONOLOG.sidebarBg }}
          >
            <div className="flex items-center gap-2.5 px-3.5 pb-1.5 pt-3">
              <MacTrafficLights />
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center text-black/45"
                aria-label="Toggle sidebar"
              >
                <SfSymbol name="sidebar.left" size={15} />
              </button>
            </div>
            <div className="px-4 pb-5 pt-0 text-[24px] font-semibold tracking-[-0.02em]">
              MonoLOG
            </div>
            <nav
              className="flex flex-col gap-1.5"
              style={{ padding: "12px 10px" }}
            >
              <SidebarItem
                label={copy.today}
                icon="sun.max"
                active={sidebarPage === "today"}
                onClick={() => setSidebarPage("today")}
              />
              <SidebarItem
                label={copy.data}
                icon="chart.bar"
                active={sidebarPage === "data"}
                onClick={() => setSidebarPage("data")}
              />
              <SidebarItem
                label={copy.categories}
                icon="tag"
                disabled
              />
            </nav>
          </aside>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
            <ContentToolbar
              copy={copy}
              sidebarPage={sidebarPage}
              dataPeriod={dataPeriod}
              onDataPeriodChange={setDataPeriod}
            />
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {sidebarPage === "today" ? (
              <>
                <div
                  ref={feedRef}
                  className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 pt-2"
                >
                  <p className="mb-3 text-center text-[11px]" style={{ color: MONOLOG.textTertiary }}>
                    {formatDateHeading(locale)}
                  </p>
                  {entries.map((entry) => (
                    <FeedBubble
                      key={entry.id}
                      entry={entry}
                      onToggleTodo={toggleTodo}
                      onContextMenu={openContextMenu}
                    />
                  ))}
                </div>

                {contextMenu && contextEntry ? (
                  <BubbleContextMenu
                    entry={contextEntry}
                    x={contextMenu.x}
                    y={contextMenu.y}
                    copy={copy}
                    onAction={handleContextAction}
                    onClose={() => setContextMenu(null)}
                  />
                ) : null}

                <div className="border-t border-black/6 bg-white px-5 py-3">
                  {pinnedEntries.length > 0 ? (
                    <PinnedBar
                      entries={pinnedEntries}
                      onToggleTodo={toggleTodo}
                      onContextMenu={openContextMenu}
                    />
                  ) : null}

                  <TimerBar
                    copy={copy}
                    mode={mode}
                    setMode={setMode}
                    category={category}
                    categoryIndex={categoryIndex}
                    setCategoryIndex={setCategoryIndex}
                    taskName={taskName}
                    setTaskName={setTaskName}
                    customMinutes={customMinutes}
                    setCustomMinutes={setCustomMinutes}
                    showsTimerDisplay={showsTimerDisplay}
                    displayTime={displayTime}
                    canReset={canReset}
                    isRunning={isRunning}
                    onSelectPreset={selectPreset}
                    onToggleTimer={toggleTimer}
                    onReset={resetTimer}
                  />

                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div
                      className="pointer-events-none flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: MONOLOG.controlFill }}
                      aria-hidden
                    >
                      <SfSymbol name="plus" size={14} className="text-black/70" />
                    </div>
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitDraft();
                      }}
                      placeholder={copy.placeholder}
                      className="h-9 min-w-0 flex-1 rounded-full border bg-white px-3.5 text-[13px] outline-none placeholder:text-black/35"
                      style={{
                        borderColor: MONOLOG.fieldStroke,
                        color: MONOLOG.textPrimary,
                      }}
                    />
                    <button
                      type="button"
                      onClick={submitDraft}
                      disabled={!draft.trim()}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-35"
                      style={{
                        background: draft.trim() ? MONOLOG.accent : MONOLOG.controlFill,
                        color: draft.trim() ? "#fff" : MONOLOG.textSecondary,
                      }}
                      aria-label={copy.send}
                    >
                      <SfSymbol
                        name="arrow.up"
                        size={20}
                        color={draft.trim() ? "#ffffff" : undefined}
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : null}

            {sidebarPage === "data" ? (
              <DataPage
                locale={locale}
                period={dataPeriod}
                focusedDate={focusedDate}
                onFocusedDateChange={setFocusedDate}
                sessions={chartSessions}
              />
            ) : null}
            </div>
          </div>
        </div>
        </div>

        {!embedded ? (
          <>
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize window"
              className="absolute inset-y-3 left-0 z-10 w-2 -translate-x-1/2 touch-none"
              onPointerDown={(event) => {
                event.preventDefault();
                startResize("left", event.clientX);
              }}
            />
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize window"
              className="absolute inset-y-3 right-0 z-10 w-2 translate-x-1/2 touch-none"
              onPointerDown={(event) => {
                event.preventDefault();
                startResize("right", event.clientX);
              }}
            />
          </>
        ) : null}
      </div>

      {!embedded ? (
        <Link
          href={localePath(locale, "proj/5")}
          className="text-sm text-muted underline underline-offset-4 hover:text-foreground"
        >
          ← {copy.backToCaseStudy}
        </Link>
      ) : null}
    </div>
  );
}

function ContentToolbar({
  copy,
  sidebarPage,
  dataPeriod,
  onDataPeriodChange,
}: {
  copy: (typeof DEMO_COPY)["zh"];
  sidebarPage: SidebarPage;
  dataPeriod: DataPeriod;
  onDataPeriodChange: (period: DataPeriod) => void;
}) {
  const periods: { id: DataPeriod; label: string }[] = [
    { id: "week", label: copy.periodWeek },
    { id: "month", label: copy.periodMonth },
    { id: "year", label: copy.periodYear },
  ];

  return (
    <div className="bg-white px-3.5 py-2.5 md:px-4 md:py-3">
      <div className="relative h-7 w-full">
        <div className="absolute left-0 top-0 z-10 flex items-center gap-2.5">
          <div className="flex items-center gap-2.5 md:hidden">
            <MacTrafficLights />
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center text-black/45"
              aria-label="Toggle sidebar"
            >
              <SfSymbol name="sidebar.left" size={15} />
            </button>
          </div>
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center text-black/70"
            aria-label={copy.inviteAi}
          >
            <SfSymbol name="plus" size={14} />
          </button>
        </div>

        <div className="flex h-7 items-center justify-center px-24 md:px-10">
          {sidebarPage === "data" ? (
            <div
              className="flex rounded-full p-0.5"
              style={{ background: MONOLOG.controlFill }}
            >
              {periods.map((period) => {
                const selected = dataPeriod === period.id;
                return (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => onDataPeriodChange(period.id)}
                    className="flex h-7 min-w-9 items-center justify-center rounded-full px-2.5 text-[13px] transition-colors"
                    style={{
                      background: selected ? "#fff" : "transparent",
                      color: selected ? MONOLOG.textPrimary : MONOLOG.textSecondary,
                      fontWeight: selected ? 600 : 400,
                      padding: "0 10px",
                    }}
                  >
                    {period.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="absolute right-0 top-0 z-10 flex h-7 w-7 items-center justify-center text-black/45"
          aria-label={copy.search}
        >
          <SfSymbol name="magnifyingglass" size={14} />
        </button>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  icon,
  active = false,
  disabled = false,
  onClick,
}: {
  label: string;
  icon: "sun.max" | "chart.bar" | "tag";
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const style = {
    padding: "10px 12px",
    background: active ? "rgba(0,0,0,0.08)" : "transparent",
    color: disabled
      ? MONOLOG.textTertiary
      : active
        ? MONOLOG.textPrimary
        : MONOLOG.textSecondary,
    fontWeight: active ? 600 : 400,
    cursor: disabled ? "default" : undefined,
  } as const;

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className="flex w-full items-center gap-2.5 rounded-[10px] text-left text-[13px] leading-none"
        style={style}
      >
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <SfSymbol name={icon} size={14} />
        </span>
        <span className="min-w-0 truncate">{label}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-[10px] text-left text-[13px] leading-none transition-colors hover:bg-black/[0.06]"
      style={style}
    >
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <SfSymbol name={icon} size={14} />
      </span>
      <span className="min-w-0 truncate">{label}</span>
    </button>
  );
}

function FeedBubble({
  entry,
  onToggleTodo,
  onContextMenu,
}: {
  entry: DemoEntry;
  onToggleTodo: (id: string) => void;
  onContextMenu: (entryId: string, clientX: number, clientY: number) => void;
}) {
  const incoming = entry.incoming ?? entry.kind === "ai";
  const isTimer = entry.kind === "timer";
  const isTodo = entry.kind === "todo";

  const background =
    incoming || entry.kind === "ai"
      ? MONOLOG.incomingBubble
      : isTodo
        ? MONOLOG.todoBubble
        : isTimer
          ? MONOLOG.timerBubble
          : MONOLOG.noteBubble;

  const textColor =
    incoming || entry.kind === "ai"
      ? MONOLOG.incomingText
      : isTimer
        ? MONOLOG.timerText
        : isTodo
          ? MONOLOG.todoText
          : MONOLOG.noteText;

  const radius = isTimer ? MONOLOG.pillRadius : MONOLOG.bubbleRadius;

  const bubbleStyle = {
    background,
    color: textColor,
    borderTopLeftRadius: incoming ? 0 : radius,
    borderTopRightRadius: incoming ? radius : 0,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  } as const;

  const avatarSrc =
    entry.avatar != null ? AVATAR_SRC[entry.avatar] : AVATAR_SRC.default;

  const bubbleBody = (
    <div className="flex flex-col" style={{ alignItems: incoming ? "flex-start" : "flex-end" }}>
      <div
        className="max-w-[min(100%,420px)] px-3.5 py-2.5 text-[13px] leading-[1.45]"
        style={bubbleStyle}
        onContextMenu={(event) => {
          event.preventDefault();
          onContextMenu(entry.id, event.clientX, event.clientY);
        }}
      >
        {isTodo ? (
          <div className="flex items-center gap-2">
            {entry.isPinned ? (
              <SfSymbol
                name="pin"
                size={ICON}
                className="shrink-0 rotate-45 text-black/35"
              />
            ) : null}
            <button type="button" onClick={() => onToggleTodo(entry.id)} className="shrink-0">
              <SfSymbol
                name={entry.isDone ? "checkmark.circle.fill" : "circle"}
                size={ICON}
                className={entry.isDone ? "text-black" : "text-black/45"}
              />
            </button>
            <span className={`min-w-0 flex-1 ${entry.isDone ? "line-through opacity-55" : ""}`}>
              {entry.text}
            </span>
            <SfSymbol name="play.fill" size={ICON} className="shrink-0 text-black/70" />
          </div>
        ) : isTimer ? (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-full border border-white/20"
              style={{ background: entry.categoryColor ?? MONOLOG.categoryPurple }}
            />
            <span>{entry.text}</span>
            <span style={{ color: MONOLOG.timerTextMuted }}>
              {formatDurationLabel(entry.durationSeconds ?? 0)}
            </span>
          </div>
        ) : (
          <span>{entry.text}</span>
        )}
      </div>
      <span className="mt-1 px-1 text-[10px]" style={{ color: MONOLOG.textTertiary }}>
        {formatClock(entry.createdAt)}
      </span>
    </div>
  );

  return (
    <div
      className={`mb-3 flex w-full ${incoming ? "justify-start" : "justify-end"}`}
    >
      {incoming ? (
        <div className="flex max-w-[min(100%,460px)] items-start gap-2">
          <Image
            src={avatarSrc}
            alt=""
            width={28}
            height={28}
            className="mt-0.5 shrink-0 rounded-full object-cover"
            aria-hidden
          />
          {bubbleBody}
        </div>
      ) : (
        bubbleBody
      )}
    </div>
  );
}

function PinnedBar({
  entries,
  onToggleTodo,
  onContextMenu,
}: {
  entries: DemoEntry[];
  onToggleTodo: (id: string) => void;
  onContextMenu: (entryId: string, clientX: number, clientY: number) => void;
}) {
  return (
    <div className="mb-2.5 flex gap-2 overflow-x-auto pb-0.5">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-xl px-2.5 py-2 text-[13px]"
          style={{
            background:
              entry.kind === "timer"
                ? MONOLOG.timerBubble
                : entry.kind === "note"
                  ? MONOLOG.noteBubble
                  : MONOLOG.todoBubble,
            color:
              entry.kind === "timer"
                ? MONOLOG.timerText
                : entry.kind === "note"
                  ? MONOLOG.noteText
                  : MONOLOG.todoText,
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            onContextMenu(entry.id, event.clientX, event.clientY);
          }}
        >
          <SfSymbol name="pin" size={ICON} className="shrink-0 rotate-45 text-black/35" />
          {entry.kind === "todo" ? (
            <button type="button" onClick={() => onToggleTodo(entry.id)} className="shrink-0">
              <SfSymbol
                name={entry.isDone ? "checkmark.circle.fill" : "circle"}
                size={ICON}
                className={entry.isDone ? "text-black" : "text-black/45"}
              />
            </button>
          ) : entry.kind === "timer" ? (
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: entry.categoryColor ?? MONOLOG.categoryPurple }}
            />
          ) : null}
          <span
            className={`min-w-0 flex-1 truncate ${
              entry.kind === "todo" && entry.isDone ? "line-through opacity-55" : ""
            }`}
          >
            {entry.text}
          </span>
          {entry.kind === "todo" ? (
            <SfSymbol name="play.fill" size={ICON} className="shrink-0 text-black/70" />
          ) : entry.kind === "timer" ? (
            <span className="shrink-0 text-[11px] opacity-55">
              {formatDurationLabel(entry.durationSeconds ?? 0)}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function TimerBar(props: {
  copy: (typeof DEMO_COPY)["zh"];
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  category: (typeof CATEGORIES)[number];
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
  taskName: string;
  setTaskName: (value: string) => void;
  customMinutes: string;
  setCustomMinutes: (value: string) => void;
  showsTimerDisplay: boolean;
  displayTime: string;
  canReset: boolean;
  isRunning: boolean;
  onSelectPreset: (minutes: number) => void;
  onToggleTimer: () => void;
  onReset: () => void;
}) {
  const {
    copy,
    mode,
    setMode,
    categoryIndex,
    setCategoryIndex,
    taskName,
    setTaskName,
    customMinutes,
    setCustomMinutes,
    showsTimerDisplay,
    displayTime,
    canReset,
    isRunning,
    onSelectPreset,
    onToggleTimer,
    onReset,
  } = props;

  const presetsDisabled = mode === "stopwatch";

  return (
    <div className="flex shrink-0 flex-nowrap items-center gap-2.5 text-[13px]">
      <div
        className="flex shrink-0 rounded-full p-0.5"
        style={{ background: MONOLOG.controlFill }}
      >
        {(["countdown", "stopwatch"] as const).map((item) => {
          const selected = mode === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className="flex h-8 min-w-8 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tracking-tight"
              style={{
                background: selected ? "#fff" : "transparent",
                color: selected ? MONOLOG.textPrimary : MONOLOG.textSecondary,
              }}
            >
              {item === "countdown" ? copy.countdown : copy.stopwatch}
            </button>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <CategoryPicker
          categoryIndex={categoryIndex}
          onChange={setCategoryIndex}
          ariaLabel="Category"
        />

        <div
          className="flex h-9 w-[148px] shrink-0 items-center gap-1 rounded-full border px-2.5"
          style={{ borderColor: MONOLOG.fieldStroke }}
        >
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder={copy.taskPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
          />
          <SfSymbol name="chevron.down" size={12} className="shrink-0 text-black/45" />
        </div>
      </div>

      <div className="relative min-w-[170px] shrink-0">
        <div
          className="flex items-center gap-1.5 transition-opacity"
          style={{
            opacity: showsTimerDisplay ? 0 : presetsDisabled ? 0.4 : 1,
            pointerEvents: showsTimerDisplay || presetsDisabled ? "none" : "auto",
          }}
        >
          {PRESETS.map((preset) => {
            const selected = Number(customMinutes) === preset;
            return (
              <button
                key={preset}
                type="button"
                disabled={presetsDisabled}
                onClick={() => onSelectPreset(preset)}
                className="flex h-9 w-9 items-center justify-center rounded-full disabled:cursor-not-allowed"
                style={{
                  background: selected && !presetsDisabled ? MONOLOG.accent : MONOLOG.controlFill,
                  color: selected && !presetsDisabled ? "#fff" : MONOLOG.textPrimary,
                }}
              >
                {preset}
              </button>
            );
          })}
          <input
            value={customMinutes}
            disabled={presetsDisabled}
            onChange={(e) => setCustomMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className="h-9 w-11 rounded-full border bg-transparent text-center text-[13px] outline-none disabled:cursor-not-allowed"
            style={{ borderColor: MONOLOG.fieldStroke }}
            inputMode="numeric"
          />
          <span style={{ color: MONOLOG.textSecondary }}>{copy.min}</span>
        </div>
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-[15px] font-light tabular-nums transition-opacity"
          style={{ opacity: showsTimerDisplay ? 1 : 0 }}
        >
          {displayTime}
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onReset}
          disabled={!canReset}
          className="flex h-9 w-9 items-center justify-center rounded-full disabled:opacity-40"
          style={{ background: MONOLOG.controlFill, color: isRunning ? "#ff3b30" : MONOLOG.textPrimary }}
        >
          <SfSymbol name="stop.fill" size={ICON} />
        </button>
        <button
          type="button"
          onClick={onToggleTimer}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: MONOLOG.accent }}
        >
          <SfSymbol
            name={isRunning ? "pause.fill" : "play.fill"}
            size={ICON}
            color="#ffffff"
          />
        </button>
      </div>
    </div>
  );
}