"use client";

import { useEffect, useRef } from "react";
import { NATIVE_MENU_SELECT_STYLE } from "@/lib/monolog-demo/theme";
import type { DemoCopy } from "@/lib/monolog-demo/types";
import type { DemoEntry } from "@/lib/monolog-demo/types";

export type ContextMenuAction =
  | "pin"
  | "unpin"
  | "edit"
  | "toTodo"
  | "toNote"
  | "delete";

type BubbleContextMenuProps = {
  entry: DemoEntry;
  x: number;
  y: number;
  copy: DemoCopy;
  onAction: (action: ContextMenuAction) => void;
  onClose: () => void;
};

/** Native `<select>` at click point — browser renders the system menu popup. */
export function BubbleContextMenu({
  entry,
  x,
  y,
  copy,
  onAction,
  onClose,
}: BubbleContextMenuProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;

    const open = () => {
      try {
        el.showPicker();
      } catch {
        el.focus();
      }
    };

    const id = window.requestAnimationFrame(open);
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[200]"
        aria-hidden
        onClick={onClose}
        onContextMenu={(event) => {
          event.preventDefault();
          onClose();
        }}
      />
      <select
        ref={selectRef}
        className="fixed z-[201] cursor-default opacity-[0.01]"
        style={{
          left: x,
          top: y,
          width: 20,
          height: 36,
          ...NATIVE_MENU_SELECT_STYLE,
        }}
        autoFocus
        defaultValue=""
        onChange={(event) => {
          const action = event.target.value as ContextMenuAction;
          if (action) onAction(action);
          event.target.value = "";
          onClose();
        }}
        onBlur={onClose}
      >
        <option value="" disabled hidden />
        <option value={entry.isPinned ? "unpin" : "pin"}>
          {entry.isPinned ? copy.menuUnpin : copy.menuPin}
        </option>
        <option value="edit">{copy.menuEdit}</option>
        {entry.kind === "note" ? (
          <option value="toTodo">{copy.menuToTodo}</option>
        ) : null}
        {entry.kind === "todo" ? (
          <option value="toNote">{copy.menuToNote}</option>
        ) : null}
        <option value="delete">{copy.menuDelete}</option>
      </select>
    </>
  );
}
