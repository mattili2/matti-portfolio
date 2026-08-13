import { notFound } from "next/navigation";
import { CaseStudyEntryRestore } from "@/components/CaseStudyEntryRestore";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectOverviewRow } from "@/components/ProjectOverviewRow";
import { getDictionary } from "@/data/dictionary";
import { getProjectOverview } from "@/data/projectOverview";
import {
  getFeaturedProjectsChronological,
  type Project,
} from "@/data/projects";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/** Group chronological featured cards by year (from period prefix). */
function groupCardsByYear(cards: Project[]) {
  const groups: { year: number; projects: Project[] }[] = [];
  for (const project of cards) {
    const year = Number.parseInt(project.period.slice(0, 4), 10);
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.projects.push(project);
    } else {
      groups.push({ year, projects: [project] });
    }
  }
  return groups;
}

export default async function ProjectOverviewPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const groups = getProjectOverview(locale);
  const cardGroups = groupCardsByYear(
    getFeaturedProjectsChronological(locale),
  );
  // Continuous zigzag across years (same even→right / odd→left as home)
  let nextIndex = 0;
  const cardGroupsWithAlign = cardGroups.map((group) => ({
    year: group.year,
    projects: group.projects.map((project) => {
      const index = nextIndex;
      nextIndex += 1;
      return {
        project,
        align: (index % 2 === 0 ? "right" : "left") as "left" | "right",
      };
    }),
  }));

  return (
    <div className="w-full px-[var(--content-pad)] pb-24 pt-[110px] md:pt-[150px]">
      <CaseStudyEntryRestore />
      <h1 className="w-full text-[27px] font-semibold md:text-3xl">
        {dict.projectOverview}
      </h1>

      {/* Directory / TOC — featured rows scroll to cards below */}
      <nav aria-label={dict.projectOverview} className="mt-12 w-full md:mt-16">
        <div className="flex w-full flex-col gap-5 md:gap-6">
          {groups.map((group) => (
            <section key={group.year} id={`year-${group.year}`} className="w-full">
              <h2 className="pb-1 text-[length:var(--body-size)] font-semibold tracking-tight">
                {group.year}
              </h2>
              <div className="w-full">
                {group.items.map((item) => (
                  <ProjectOverviewRow
                    key={`${item.year}-${item.title}`}
                    item={item}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </nav>

      {/* Featured cards — same zigzag / max-width as home; year labels only */}
      <section
        aria-label={dict.featuredProjects}
        className="mt-20 flex w-full flex-col gap-16 md:mt-28 md:gap-[90px]"
      >
        {cardGroupsWithAlign.map((group) => (
          <div key={group.year} className="contents">
            <h2 className="w-full text-[27px] font-semibold md:text-3xl">
              {group.year}
            </h2>
            {group.projects.map(({ project, align }) => (
              <ProjectCard
                key={project.id}
                id={`project-${project.id}`}
                project={project}
                locale={locale}
                align={align}
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
