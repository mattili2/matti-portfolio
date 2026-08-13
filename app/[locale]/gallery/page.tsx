import { notFound } from "next/navigation";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { GalleryMusic } from "@/components/GalleryMusic";
import { GallerySnap } from "@/components/GallerySnap";
import { getGallery } from "@/data/gallery";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Exactly one viewport tall. Header offset is padding inside the section so
 * snap-center is direction-symmetric (section never taller than the snapport).
 */
const snapSection =
  "box-border flex h-dvh w-full snap-center snap-always flex-col pt-[var(--header-h)]";

export default async function GalleryPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const gallery = getGallery(locale);

  return (
    <div className="w-full">
      <GallerySnap />
      <GalleryMusic />
      {gallery.blocks.map((block) => {
        if (block.type === "carousel") {
          return (
            <section
              key={block.id}
              className={snapSection}
              data-gallery-audio={block.audioSrc ?? ""}
            >
              <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
                <div className="w-full">
                  <GalleryCarousel
                    images={block.images}
                    label={block.caption}
                    seriesId={block.id}
                  />
                  <div className="mt-3 px-[var(--content-pad)] text-center">
                    <p className="text-base font-medium tracking-[-0.03em] leading-[1.5]">
                      {block.caption}
                    </p>
                    <p className="text-base font-medium tracking-[-0.03em] leading-[1.5] text-[rgb(143,143,143)]">
                      {block.date}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section
            key={block.id}
            className={`${snapSection} px-[var(--content-pad)]`}
            data-gallery-audio=""
          >
            <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
              <div className="w-full max-w-[min(500px,calc((100dvh-var(--header-h)-8rem)*500/511))]">
                <video
                  className="aspect-[500/511] h-auto max-h-[calc(100dvh-var(--header-h)-8rem)] w-full bg-black object-cover"
                  src={block.src}
                  poster={block.poster}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={block.caption}
                />
                <div className="mt-3 text-center">
                  <p className="text-base font-medium tracking-[-0.03em] leading-[1.5]">
                    {block.caption}
                  </p>
                  <p className="text-base font-medium tracking-[-0.03em] leading-[1.5] text-[rgb(143,143,143)]">
                    {block.date}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
