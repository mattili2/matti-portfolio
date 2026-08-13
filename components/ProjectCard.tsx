"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Project } from "@/data/projects";
import { setCaseStudyEntry } from "@/lib/caseStudyEntry";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import { CoverMedia } from "./CoverMedia";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  /** even = right, odd = left — matches Framer home zigzag */
  align?: "left" | "right";
  /** Optional anchor id for TOC scroll targets (e.g. project-2) */
  id?: string;
};

/** Only home + projects list — never case study `/proj/...` (Prev/Next). */
function isTrackableOrigin(pathname: string): boolean {
  const path = stripLocale(pathname);
  return path === "/" || path === "" || path === "/project";
}

export function ProjectCard({
  project,
  locale,
  align = "left",
  id,
}: ProjectCardProps) {
  const pathname = usePathname();
  const cardId = id ?? `project-${project.id}`;

  return (
    <div
      id={cardId}
      className={`flex w-full scroll-mt-[calc(var(--header-h)+32px)] ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <Link
        href={localePath(locale, `/proj/${project.id}`)}
        className="group block w-full max-w-[var(--card-max)]"
        onClick={() => {
          if (!isTrackableOrigin(pathname)) return;
          // Capture before navigate; path must match list page usePathname()
          // (e.g. `/zh` or `/zh/project`) so Back restore can peek it.
          setCaseStudyEntry({
            path: pathname,
            cardId,
            scrollY: window.scrollY,
          });
        }}
        onPointerDown={() => {
          // Pointerdown fires before Next prefetch/nav steals the gesture
          if (!isTrackableOrigin(pathname)) return;
          setCaseStudyEntry({
            path: pathname,
            cardId,
            scrollY: window.scrollY,
          });
        }}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f5f5f5]">
          <CoverMedia
            src={project.cover}
            alt={project.title}
            type={project.coverType}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/45"
            aria-hidden
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 transition-opacity duration-300 group-hover:opacity-55 md:mt-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold tracking-[0.03em] md:text-2xl">
              {project.title}
            </h3>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted md:text-[15px]">
              <span>{project.category}</span>
              <span>{project.period}</span>
            </div>
          </div>
          <p className="body-copy">{project.description}</p>
        </div>
      </Link>
    </div>
  );
}
