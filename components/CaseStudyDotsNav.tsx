"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type CaseStudyNavItem = {
  id: string;
  label: string;
  /** Hollow ring — used for the top/hero anchor, matching Framer */
  ring?: boolean;
};

type CaseStudyDotsNavProps = {
  items: CaseStudyNavItem[];
  /** Active/selected fill (and ring border). Inactive stays muted gray. */
  themeColor: string;
  /** Light labels/inactive dots for dark case-study pages */
  dark?: boolean;
};

/** Treat as page-top / still in hero: hide the top-section dot entirely. */
const TOP_SCROLL_THRESHOLD_PX = 8;

function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-h",
  );
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 64;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - getHeaderOffset() - 24;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function CaseStudyDotsNav({
  items,
  themeColor,
  dark = false,
}: CaseStudyDotsNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [atPageTop, setAtPageTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  const itemKey = items.map((item) => item.id).join("|");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const updateActive = () => {
      const atTop = window.scrollY <= TOP_SCROLL_THRESHOLD_PX;
      setAtPageTop(atTop);

      // Absolute top: hide top dot (via atPageTop) and clear selection.
      if (atTop) {
        setActiveId(null);
        return;
      }

      const marker = getHeaderOffset() + 32;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
    // itemKey captures id list; labels don't affect spy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemKey]);

  if (!mounted || items.length === 0) return null;

  // Portal to body so layout animations cannot trap position:fixed
  // Framer: fixed bottom 100px, right 40px (--page-pad), gap 8px
  // Visible when case-study --content-pad > 80px (vw > 800; see globals.css)
  return createPortal(
    <nav
      aria-label="Case study sections"
      className="pointer-events-auto fixed bottom-[100px] right-[var(--page-pad)] z-40 hidden flex-col items-end gap-2 min-[801px]:flex"
    >
      {items.map((item) => {
        // Top/hero ring: fully hidden at page top; appears only after leaving.
        if (item.ring && atPageTop) return null;

        const active = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={active ? "location" : undefined}
            title={item.label}
            className="group relative flex h-[17px] w-2 items-center justify-center"
            onClick={(event) => {
              event.preventDefault();
              scrollToId(item.id);
              if (item.ring && window.scrollY <= TOP_SCROLL_THRESHOLD_PX) {
                setAtPageTop(true);
                setActiveId(null);
              } else {
                setAtPageTop(false);
                setActiveId(item.id);
              }
            }}
          >
            <span
              className={
                item.ring
                  ? `block size-2 shrink-0 rounded-full border-2 transition-opacity ${
                      active
                        ? ""
                        : `${dark ? "border-[#888]" : "border-[#b5b5b5]"} group-hover:opacity-[var(--nav-hover-opacity)]`
                    }`
                  : `block size-2 shrink-0 rounded-full transition-opacity ${
                      active
                        ? ""
                        : `${dark ? "bg-[#888]" : "bg-[#ccc]"} group-hover:opacity-[var(--nav-hover-opacity)]`
                    }`
              }
              style={
                active
                  ? item.ring
                    ? { borderColor: themeColor }
                    : { backgroundColor: themeColor }
                  : undefined
              }
            />
            <span
              className={`pointer-events-none absolute right-[calc(100%+10px)] top-1/2 max-w-[220px] -translate-y-1/2 truncate whitespace-nowrap text-right text-[13px] font-normal opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                dark ? "text-[#ccc]" : "text-[#666]"
              }`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>,
    document.body,
  );
}
