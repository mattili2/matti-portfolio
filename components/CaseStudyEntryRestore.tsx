"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import {
  clearCaseStudyRestore,
  peekCaseStudyRestore,
} from "@/lib/caseStudyEntry";

const STABILIZE_MS = 2000;

function cardInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const mid = window.innerHeight / 2;
  // Accept anywhere near vertical center (layout can still be settling)
  return rect.top < mid + 120 && rect.bottom > mid - 120;
}

/**
 * Scroll the sticky entry ProjectCard into view after Back from a case study.
 *
 * Why this is needed: Back uses soft-nav from a long case study (user is near
 * the bottom). With scroll preserved or clamped, the list page first lands on
 * its own bottom/footer. We must re-scroll to `#project-*` before/across paint.
 */
export function CaseStudyEntryRestore() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const entry = peekCaseStudyRestore(pathname);
    if (!entry) return;

    let cancelled = false;
    let rafId = 0;
    let timeoutIds: number[] = [];
    const startedAt = performance.now();

    const prevRestoration = window.history.scrollRestoration;
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // ignore
    }

    const applyScroll = () => {
      const el = document.getElementById(entry.cardId);
      if (!el) return false;
      el.scrollIntoView({ block: "center", behavior: "auto" });
      return true;
    };

    // Sync before first paint — avoids a visible flash of home/projects footer
    applyScroll();

    const finish = () => {
      if (cancelled) return;
      clearCaseStudyRestore();
      // Drop hash if Back navigated with #project-*
      if (window.location.hash === `#${entry.cardId}`) {
        const clean = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, "", clean);
      }
    };

    const tick = () => {
      if (cancelled) return;
      const el = document.getElementById(entry.cardId);
      if (el) {
        if (!cardInView(el)) {
          el.scrollIntoView({ block: "center", behavior: "auto" });
        }
      }
      if (performance.now() - startedAt < STABILIZE_MS) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      finish();
    };

    rafId = requestAnimationFrame(tick);

    // Sparse timeouts catch late layout (images/fonts) after rAF window
    for (const ms of [50, 150, 400, 800, 1200]) {
      timeoutIds.push(
        window.setTimeout(() => {
          if (!cancelled) applyScroll();
        }, ms),
      );
    }

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!cancelled) applyScroll();
          })
        : null;
    if (ro) {
      ro.observe(document.documentElement);
      const el = document.getElementById(entry.cardId);
      if (el) ro.observe(el);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      for (const id of timeoutIds) window.clearTimeout(id);
      ro?.disconnect();
      try {
        window.history.scrollRestoration = prevRestoration;
      } catch {
        // ignore
      }
    };
  }, [pathname]);

  return null;
}
