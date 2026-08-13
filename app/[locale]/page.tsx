import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyEntryRestore } from "@/components/CaseStudyEntryRestore";
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
      <section className="flex flex-col items-center px-[var(--content-pad)] pb-10 pt-[84px] md:pt-[190px]">
        <div className="relative mx-auto h-auto w-[min(100%,400px)]">
          <Image
            src="/images/hero.png"
            alt={dict.heroAlt}
            width={1019}
            height={1017}
            priority
            sizes="400px"
            className="h-auto w-full"
          />
        </div>

        <p className="mt-0 text-center text-lg font-semibold tracking-tight md:text-xl">
          UX Designer <span className="mx-2 font-normal text-muted">|</span> UX
          Researcher
        </p>

        <div className="mt-6 w-full space-y-1 text-center text-[16px] font-[var(--body-weight)] leading-[var(--body-leading)] text-[var(--body-color)]">
          {dict.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ScrollDownArrow
          targetId="selected-projects"
          label={dict.scrollToProjects}
        />
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
