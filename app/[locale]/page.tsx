import { notFound } from "next/navigation";
import { CaseStudyEntryRestore } from "@/components/CaseStudyEntryRestore";
import { HeroPortraitPad } from "@/components/HeroPortraitPad";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollDownArrow } from "@/components/ScrollDownArrow";
import { getDictionary } from "@/data/dictionary";
import { getFeaturedProjects } from "@/data/projects";
import { isLocale, type Locale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const projects = getFeaturedProjects(locale);

  return (
    <div className="w-full">
      <CaseStudyEntryRestore />
      <section className="flex flex-col items-center pb-10 pt-[84px] md:pt-[190px]">
        <div className="w-full px-[var(--content-pad)]">
          <HeroPortraitPad
            alt={dict.heroAlt}
            clearLabel={dict.heroDrawClear}
            colorLabel={dict.heroDrawColor}
            sendLabel={dict.heroDrawSend}
          />
        </div>

        <div className="w-full px-[var(--content-pad)]">
          <p className="mt-0 text-center text-lg font-semibold tracking-tight md:text-xl">
            UX Designer <span className="mx-2 font-normal text-muted">|</span> UX
            Researcher
          </p>

          <div className="mt-6 w-full space-y-1 text-center text-[16px] font-[var(--body-weight)] leading-[var(--body-leading)] text-[var(--body-color)]">
            {dict.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex w-full justify-center">
            <ScrollDownArrow
              targetId="selected-projects"
              label={dict.scrollToProjects}
            />
          </div>
        </div>
      </section>

      <section id="selected-projects" className="px-[var(--content-pad)] pb-10 pt-16 md:pt-24">
        <h2 className="mb-10 scroll-mt-[calc(var(--header-h)+16px)] text-[27px] font-semibold md:mb-14 md:text-3xl">
          {dict.featuredProjects}
        </h2>
        <div className="flex flex-col gap-16 md:gap-[90px]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={`project-${project.id}`}
              project={project}
              locale={locale}
              align={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
