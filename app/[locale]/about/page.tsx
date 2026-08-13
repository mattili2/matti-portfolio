import { notFound } from "next/navigation";
import { getAbout } from "@/data/about";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const about = getAbout(locale);

  return (
    <div className="w-full px-[var(--content-pad)] pb-24 pt-[110px] md:pt-[150px]">
      <section aria-labelledby="about-education">
        <h1
          id="about-education"
          className="w-full text-[27px] font-semibold md:text-3xl"
        >
          {about.educationTitle}
        </h1>
        <ul className="mt-8 list-none p-0 md:mt-10">
          {about.education.map((item) => (
            <li
              key={item.school}
              className="flex w-full min-w-0 items-start py-1.5 text-[length:var(--body-size)] tracking-[0.02em]"
            >
              <span
                className="mr-4 mt-0.5 h-3 w-3 shrink-0 rounded-full bg-foreground sm:mr-5"
                aria-hidden
              />
              <div className="mr-5 hidden w-[200px] shrink-0 leading-snug tracking-[0.02em] min-[700px]:block md:w-[272px]">
                <p className="font-normal">{item.meta.primary}</p>
                <p className="font-normal">{item.meta.location}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-none">{item.school}</p>
                <p className="mt-1 font-normal leading-none">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-experience" className="mt-14 md:mt-16">
        <h2
          id="about-experience"
          className="w-full text-[27px] font-semibold md:text-3xl"
        >
          {about.experienceTitle}
        </h2>
        <ul className="mt-8 list-none p-0 md:mt-10">
          {about.experience.map((item) => (
            <li
              key={item.title}
              className="flex w-full min-w-0 items-start py-1.5 text-[length:var(--body-size)] tracking-[0.02em]"
            >
              <span
                className="mr-4 mt-0.5 h-3 w-3 shrink-0 rounded-full bg-foreground sm:mr-5"
                aria-hidden
              />
              <div className="mr-5 hidden w-[200px] shrink-0 leading-snug tracking-[0.02em] min-[700px]:block md:w-[272px]">
                <p className="font-normal">{item.meta.primary}</p>
                <p className="font-normal">{item.meta.location}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-none">{item.title}</p>
                <p className="mt-1 font-normal leading-none">{item.org}</p>
                <ul className="mt-2 list-none space-y-0.5 p-0">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative w-full pl-5 font-normal leading-[1.2] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-foreground"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
