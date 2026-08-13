"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import {
  fallbackCaseStudyBackHref,
  getCaseStudyEntry,
  markCaseStudyRestore,
} from "@/lib/caseStudyEntry";
import { localePath, type Locale } from "@/lib/i18n";

type NavTarget = { id: string; title: string };

type CaseStudyBottomNavProps = {
  locale: Locale;
  prev: NavTarget | null;
  next: NavTarget | null;
  labels: {
    back: string;
    prev: string;
    next: string;
  };
  /** Invert chrome contrast for dark case-study pages */
  dark?: boolean;
};

const ARROW = 32;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ARROW}
      height={ARROW}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ARROW}
      height={ARROW}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isNearPageBottom() {
  const doc = document.documentElement;
  const remaining =
    doc.scrollHeight - (window.scrollY + window.innerHeight);
  return remaining <= Math.max(120, window.innerHeight * 0.85);
}

export function CaseStudyBottomNav({
  locale,
  prev,
  next,
  labels,
  dark = false,
}: CaseStudyBottomNavProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const update = () => setVisible(isNearPageBottom());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!mounted) return null;

  const interactiveClass = `nav-chrome pointer-events-auto ${
    visible ? "" : "pointer-events-none"
  } ${dark ? "case-study-chrome-dark" : ""}`;

  const disabledClass = `nav-chrome-disabled ${dark ? "case-study-chrome-dark" : ""}`;

  const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
    // Always use sticky list entry when present — never the current case study
    // id, and never history.back() (that walks Prev/Next case studies).
    const entry = getCaseStudyEntry();
    if (entry) {
      event.preventDefault();
      markCaseStudyRestore();
      // Hash lets Next scroll the card; CaseStudyEntryRestore re-stabilizes.
      // Do NOT use scroll:false alone — that keeps case-study bottom Y and
      // clamps onto the list page footer (the "always home bottom" bug).
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // ignore
      }
      router.push(`${entry.path}#${entry.cardId}`);
      return;
    }
    // No stored entry (direct URL / cleared storage): go to projects list.
    // Let the Link href (`/[locale]/project`) proceed.
  };

  const arrowButtonClass = (enabled: boolean) =>
    `group relative inline-flex items-center justify-center ${
      enabled ? interactiveClass : disabledClass
    }`;

  return createPortal(
    <nav
      aria-label={`${labels.back} / ${labels.prev} / ${labels.next}`}
      className={`case-study pointer-events-none fixed inset-x-0 bottom-6 z-40 flex items-center justify-between pl-[var(--page-pad)] pr-8 transition-opacity duration-[length:var(--fade-ms)] ease-out motion-reduce:transition-none md:bottom-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href={fallbackCaseStudyBackHref(locale)}
        aria-label={labels.back}
        title={labels.back}
        tabIndex={visible ? undefined : -1}
        onClick={handleBack}
        className={`inline-flex items-center text-[15px] tracking-[0.02em] ${interactiveClass}`}
      >
        {labels.back}
      </Link>

      <div className="pointer-events-none flex items-center gap-2">
        {prev ? (
          <Link
            href={localePath(locale, `/proj/${prev.id}`)}
            aria-label={`${labels.prev}: ${prev.title}`}
            title={prev.title}
            tabIndex={visible ? undefined : -1}
            className={arrowButtonClass(true)}
          >
            <span
              className={`pointer-events-none absolute right-[calc(100%+8px)] top-1/2 max-w-[200px] -translate-y-1/2 truncate whitespace-nowrap text-right text-[13px] font-normal opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                dark ? "text-[#ccc]" : "text-[#666]"
              }`}
            >
              {prev.title}
            </span>
            <ChevronLeft />
          </Link>
        ) : (
          <span
            role="link"
            aria-disabled="true"
            aria-label={labels.prev}
            className={arrowButtonClass(false)}
          >
            <ChevronLeft />
          </span>
        )}

        {next ? (
          <Link
            href={localePath(locale, `/proj/${next.id}`)}
            aria-label={`${labels.next}: ${next.title}`}
            title={next.title}
            tabIndex={visible ? undefined : -1}
            className={arrowButtonClass(true)}
          >
            {/* Sit left of the whole pair so label doesn't land between arrows */}
            <span
              className={`pointer-events-none absolute right-[calc(100%+8px+32px+8px)] top-1/2 max-w-[200px] -translate-y-1/2 truncate whitespace-nowrap text-right text-[13px] font-normal opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                dark ? "text-[#ccc]" : "text-[#666]"
              }`}
            >
              {next.title}
            </span>
            <ChevronRight />
          </Link>
        ) : (
          <span
            role="link"
            aria-disabled="true"
            aria-label={labels.next}
            className={arrowButtonClass(false)}
          >
            <ChevronRight />
          </span>
        )}
      </div>
    </nav>,
    document.body,
  );
}
