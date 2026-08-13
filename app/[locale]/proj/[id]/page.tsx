import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { getCaseStudy } from "@/data/caseStudies";
import { getDictionary } from "@/data/dictionary";
import { getProjectById } from "@/data/projects";
import { isLocale, localePath, type Locale } from "@/lib/i18n";

type ProjectPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const project = getProjectById(id, locale);

  if (!project) notFound();

  const caseStudy = getCaseStudy(id, locale);
  if (caseStudy) {
    return <CaseStudyView study={caseStudy} locale={locale} />;
  }

  return (
    <div className="case-study w-full px-[var(--content-pad)] pb-24 pt-[140px] md:pt-[180px]">
      <p className="text-sm text-muted">{project.category}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-[0.03em] md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-1 text-sm text-muted">{project.period}</p>
      <p className="mt-8 max-w-2xl text-base leading-8 text-[#333]">
        {project.description}
      </p>
      <p className="mt-10 max-w-xl text-base leading-8 text-muted">
        {dict.caseStudyBuilding}
      </p>
      <Link
        href={localePath(locale)}
        className="nav-chrome mt-10 inline-block text-sm underline underline-offset-4"
      >
        {dict.backHome}
      </Link>
    </div>
  );
}
