"use client";

import type { OverviewItem } from "@/data/projectOverview";

type ProjectOverviewRowProps = {
  item: OverviewItem;
};

/**
 * Directory / TOC row — always one horizontal line (never stacks).
 * Breakpoints hide columns the way Framer does: role/location from 1200px,
 * period from ~700px; title + category stay.
 */
export function ProjectOverviewRow({ item }: ProjectOverviewRowProps) {
  const featured = Boolean(item.projectId);
  const color = featured ? "text-foreground" : "text-muted";
  const bullet = featured ? "bg-foreground" : "bg-muted";

  const body = (
    <div
      className={`flex w-full min-w-0 items-center py-1.5 text-[length:var(--body-size)] font-medium leading-none tracking-[0.02em] ${color}`}
    >
      <span
        className={`mr-4 h-3 w-3 shrink-0 rounded-full sm:mr-5 ${bullet}`}
        aria-hidden
      />

      {/* period — hide on very narrow */}
      <p className="mr-5 hidden w-[200px] shrink-0 whitespace-nowrap min-[700px]:block">
        {item.period}
      </p>

      <p className="min-w-0 flex-1 truncate tracking-[0.03em]">
        {item.title}
      </p>

      {/* Right meta cluster — pushed to the content edge */}
      <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-6">
        <p className="max-w-[40vw] truncate tracking-[0.02em] sm:max-w-none sm:shrink-0 sm:whitespace-nowrap">
          {item.category}
        </p>
        <p className="hidden shrink-0 whitespace-nowrap min-[1200px]:block">
          {item.role}
        </p>
        <p className="hidden shrink-0 whitespace-nowrap min-[1200px]:block">
          {item.location}
        </p>
      </div>
    </div>
  );

  // Featured TOC rows jump to the matching card on this page (not detail routes).
  // JS smooth scroll — html keeps scroll-behavior: auto so route changes stay instant.
  if (item.projectId) {
    const hash = `#project-${item.projectId}`;
    return (
      <a
        href={hash}
        className="block w-full transition-opacity hover:opacity-50"
        onClick={(event) => {
          event.preventDefault();
          const el = document.getElementById(`project-${item.projectId}`);
          if (!el) return;
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", hash);
        }}
      >
        {body}
      </a>
    );
  }

  return <div className="block w-full">{body}</div>;
}
