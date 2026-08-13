import Image from "next/image";
import type { CSSProperties } from "react";
import { CaseStudyBottomNav } from "@/components/CaseStudyBottomNav";
import {
  CaseStudyDotsNav,
  type CaseStudyNavItem,
} from "@/components/CaseStudyDotsNav";
import { CaseStudyThemeEffect } from "@/components/CaseStudyThemeEffect";
import type { CaseStudy, CaseStudyBlock, CaseStudyImage } from "@/data/caseStudies";
import { getNextCaseStudyId, getPrevCaseStudyId } from "@/data/caseStudies";
import type { CaseStudyImageSize } from "@/data/caseStudies/types";
import { getDictionary } from "@/data/dictionary";
import { getProjectById } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import { mediaSrc } from "@/lib/media";

type CaseStudyViewProps = {
  study: CaseStudy;
  locale: Locale;
};

const IMAGE_SIZE_CLASS: Record<CaseStudyImageSize, string> = {
  full: "w-full",
  lg: "mx-auto w-full max-w-[min(100%,1040px)]",
  md: "mx-auto w-full max-w-[min(100%,680px)]",
  sm: "mx-auto w-full max-w-[min(100%,440px)]",
  xs: "mx-auto w-full max-w-[min(100%,160px)]",
};

function imageSizeClass(image: Pick<CaseStudyImage, "size" | "widthPct">): string {
  if (image.widthPct != null && image.widthPct > 0) {
    // width set via style (Framer % of content column)
    return "mx-auto w-full max-w-none";
  }
  return IMAGE_SIZE_CLASS[image.size ?? "full"];
}

function imageWidthStyle(
  image: Pick<CaseStudyImage, "widthPct">,
): CSSProperties | undefined {
  if (image.widthPct == null || image.widthPct <= 0) return undefined;
  const pct = Math.min(100, Math.max(1, image.widthPct));
  return { width: `${pct}%`, maxWidth: `${pct}%` };
}

function imageFrameClass(): string {
  // No fill — transparent GIFs must show the page surface (black on Whale,
  // white on light studies), not a gray/near-black placeholder plate.
  return "relative overflow-hidden bg-transparent";
}

function sectionNavLabel(section: CaseStudy["sections"][number]): string {
  // Prefer explicit nav labels; fall back to title (not eyebrow — those are EN section tags)
  return section.navLabel ?? section.title;
}

function CaseStudyImageFigure({
  image,
  caption,
  className,
  style,
}: {
  image: CaseStudyImage;
  caption?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const animated = /\.gif$/i.test(image.src);
  const size = image.size ?? "full";
  return (
    <figure className={className ?? "mt-2 w-full"} style={style}>
      <div
        className={`${imageFrameClass()} ${imageSizeClass(image)}`}
        style={imageWidthStyle(image)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          unoptimized={animated}
          sizes={
            image.widthPct != null
              ? `(max-width: 809px) 100vw, ${Math.round((image.widthPct / 100) * 1200)}px`
              : size === "full"
                ? "100vw"
                : size === "lg"
                  ? "(max-width: 809px) 100vw, 1040px"
                  : size === "md"
                    ? "(max-width: 809px) 100vw, 680px"
                    : size === "xs"
                      ? "(max-width: 809px) 40vw, 160px"
                      : "(max-width: 809px) 100vw, 440px"
          }
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function CaseStudyBlocks({
  blocks,
}: {
  blocks: CaseStudyBlock[];
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={key}
                className={
                  block.variant === "placeholder"
                    ? "body-copy mt-12 w-full text-center md:mt-16"
                    : "body-copy w-full"
                }
              >
                {block.text}
              </p>
            );
          case "subheading":
            return (
              <h3
                key={key}
                className="mt-2 w-full text-[17px] font-semibold tracking-[0.02em] text-foreground md:text-lg"
              >
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul
                key={key}
                className="body-copy flex w-full list-disc flex-col gap-3 pl-5"
              >
                {block.items.map((item) => (
                  <li key={`${item.lead ?? ""}${item.text.slice(0, 24)}`}>
                    {item.lead ? (
                      <span className="font-semibold text-foreground">
                        {item.lead}{" "}
                      </span>
                    ) : null}
                    {item.text}
                  </li>
                ))}
              </ul>
            );
          case "metaRows":
            return (
              <dl
                key={key}
                className="body-copy flex w-full flex-col gap-3"
              >
                {block.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 sm:flex-row sm:gap-2"
                  >
                    <dt className="shrink-0 font-semibold text-foreground">
                      {row.label}
                    </dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "imageGrid":
            return (
              <figure key={key} className="mt-2 w-full">
                <div
                  className={`grid w-full gap-2.5 ${
                    block.columns === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-3"
                  }`}
                >
                  {block.images.map((image) => (
                    <div
                      key={image.src}
                      className={`${imageFrameClass()} w-full`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        unoptimized={/\.gif$/i.test(image.src)}
                        sizes={
                          block.columns === 2
                            ? "(max-width: 809px) 100vw, 50vw"
                            : "(max-width: 809px) 100vw, 33vw"
                        }
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-sm text-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "imageRow": {
            // Framer: side-by-side with relative widths + ~10px gap.
            // CSS grid fr tracks honor ratios without % + gap overflow.
            // Stacks to one column below md.
            const cols = block.images
              .map((image) => {
                const p =
                  image.widthPct != null && image.widthPct > 0
                    ? image.widthPct
                    : 1;
                return `minmax(0,${p}fr)`;
              })
              .join(" ");
            return (
              <figure key={key} className="mt-2 w-full">
                <div
                  className="grid w-full grid-cols-1 items-start gap-2.5 md:[grid-template-columns:var(--row-cols)]"
                  style={{ ["--row-cols" as string]: cols }}
                >
                  {block.images.map((image) => {
                    const animated = /\.gif$/i.test(image.src);
                    const pct =
                      image.widthPct != null && image.widthPct > 0
                        ? image.widthPct
                        : undefined;
                    return (
                      <div
                        key={image.src}
                        className={`${imageFrameClass()} w-full min-w-0`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          unoptimized={animated}
                          sizes={
                            pct != null
                              ? `(max-width: 809px) 100vw, ${Math.round((pct / 100) * 1200)}px`
                              : "(max-width: 809px) 100vw, 50vw"
                          }
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-sm text-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          case "image":
            return (
              <CaseStudyImageFigure
                key={key}
                image={block.image}
                caption={block.caption}
              />
            );
          case "video": {
            const size = block.size ?? "full";
            const width = block.width ?? 1920;
            const height = block.height ?? 1080;
            return (
              <figure key={key} className="mt-2 w-full">
                <div
                  className={`relative overflow-hidden bg-[#111] ${imageSizeClass({ size })}`}
                >
                  <video
                    className="h-auto w-full"
                    src={mediaSrc(block.src)}
                    poster={block.poster}
                    controls
                    playsInline
                    preload="metadata"
                    width={width}
                    height={height}
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-sm text-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}

export function CaseStudyView({ study, locale }: CaseStudyViewProps) {
  const dict = getDictionary(locale);
  const prevId = getPrevCaseStudyId(study.id);
  const nextId = getNextCaseStudyId(study.id);
  const prevProject = prevId ? getProjectById(prevId, locale) : undefined;
  const nextProject = nextId ? getProjectById(nextId, locale) : undefined;
  const dark = study.theme === "dark";

  const metaRows = [
    { label: study.meta.toolsLabel, value: study.meta.tools },
    { label: study.meta.periodLabel, value: study.meta.period },
    { label: study.meta.typeLabel, value: study.meta.type },
  ];

  const navItems: CaseStudyNavItem[] = [
    { id: "head", label: study.topNavLabel, ring: true },
    ...study.sections.map((section) => ({
      id: section.id,
      label: sectionNavLabel(section),
    })),
  ];

  return (
    <article
      className="case-study w-full pb-8"
      data-theme={dark ? "dark" : "light"}
    >
      <CaseStudyThemeEffect theme={study.theme} />
      <CaseStudyDotsNav
        items={navItems}
        themeColor={study.themeColor}
        dark={dark}
      />
      <CaseStudyBottomNav
        locale={locale}
        dark={dark}
        prev={
          prevProject
            ? { id: prevProject.id, title: prevProject.title }
            : null
        }
        next={
          nextProject
            ? { id: nextProject.id, title: nextProject.title }
            : null
        }
        labels={{
          back: dict.caseStudyNavBack,
          prev: dict.caseStudyNavPrev,
          next: dict.caseStudyNavNext,
        }}
      />

      {/* Full-bleed hero — shared 6:1 (flatter than asset ~3.5–4.2:1) */}
      <div
        id="head"
        className="w-full scroll-mt-[var(--header-h)] pt-[var(--header-h)]"
      >
        <div
          className="relative aspect-[5/1] w-full overflow-hidden bg-[#111]"
        >
          <Image
            src={study.hero.src}
            alt={study.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <header className="flex w-full flex-col gap-8 px-[var(--content-pad)] pb-20 pt-12 md:gap-10 md:pb-28 md:pt-16">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted md:text-[15px]">{study.category}</p>
          <h1 className="text-3xl font-semibold tracking-[0.03em] md:text-4xl">
            {study.title}
          </h1>
        </div>

        <dl className="flex w-full flex-col gap-2 text-[15px]">
          {metaRows.map((row) => (
            <div key={row.label} className="flex gap-6 md:gap-10">
              <dt
                className={`w-14 shrink-0 md:w-16 ${dark ? "" : "text-muted"}`}
                style={dark ? { color: study.themeColor } : undefined}
              >
                {row.label}
              </dt>
              <dd className="text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div
          className={`w-full border px-6 py-5 md:px-8 md:py-6 ${dark ? "" : "border-border"}`}
          style={dark ? { borderColor: study.themeColor } : undefined}
        >
          <p className="body-copy w-full">{study.intro}</p>
        </div>
      </header>

      <div className="flex w-full flex-col gap-16 px-[var(--content-pad)] pb-16 md:gap-20 md:pb-24">
        {study.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex w-full scroll-mt-[calc(var(--header-h)+24px)] flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              {section.eyebrow ? (
                <p
                  className="text-xs font-medium uppercase tracking-[0.08em] md:text-[13px]"
                  style={{ color: study.themeColor }}
                >
                  {section.eyebrow}
                </p>
              ) : null}
              <h2 className="text-2xl font-semibold tracking-[0.02em] md:text-[28px]">
                {section.title}
              </h2>
            </div>
            <CaseStudyBlocks blocks={section.blocks} />
          </section>
        ))}
      </div>
    </article>
  );
}
