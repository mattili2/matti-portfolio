"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/data/gallery";

type GalleryCarouselProps = {
  images: GalleryImage[];
  label: string;
  /** Gallery series id — used for per-series max-width tweaks. */
  seriesId?: string;
};

/**
 * Room below the fixed header for dots + caption + small gaps so the full work
 * stays inside one snap viewport (avoids oversize snap-center asymmetry).
 */
const slideMaxH = "calc(100dvh - var(--header-h) - 10.5rem + 50px)";
/** Prefer 560; fall back to 520 when that height wouldn't fit the snapport. */
const SLIDE_MAX_W_PREFERRED = 560;
const SLIDE_MAX_W_FALLBACK = 520;

/** Per-series overrides (preferred / fallback) relative to the defaults above. */
const SERIES_SLIDE_MAX_W: Record<string, { preferred: number; fallback: number }> =
  {
    dream: { preferred: 590, fallback: 550 }, // +30
    graduation: { preferred: 590, fallback: 550 }, // +30
    mom: { preferred: 540, fallback: 500 }, // −20
  };

function slideMaxWPair(seriesId?: string) {
  if (seriesId && SERIES_SLIDE_MAX_W[seriesId]) {
    return SERIES_SLIDE_MAX_W[seriesId];
  }
  return { preferred: SLIDE_MAX_W_PREFERRED, fallback: SLIDE_MAX_W_FALLBACK };
}

function availableSlideHeightPx() {
  const root = getComputedStyle(document.documentElement);
  const headerH = parseFloat(root.getPropertyValue("--header-h")) || 64;
  const rem = parseFloat(root.fontSize) || 16;
  return window.innerHeight - headerH - 10.5 * rem + 50;
}

/** Prefer preferred-width if the comic at aspect ratio fits; else fallback. */
function pickSlideMaxW(ratio: number, seriesId?: string) {
  const { preferred, fallback } = slideMaxWPair(seriesId);
  const availableH = availableSlideHeightPx();
  const heightAtPreferred = preferred / ratio;
  return heightAtPreferred <= availableH ? preferred : fallback;
}

function nearestSlideIndex(scroller: HTMLElement) {
  const slides = [...scroller.querySelectorAll<HTMLElement>("[data-slide]")];
  if (slides.length === 0) return 0;
  const mid = scroller.scrollLeft + scroller.clientWidth / 2;
  let best = 0;
  let bestDist = Infinity;
  slides.forEach((slide, i) => {
    const center = slide.offsetLeft + slide.offsetWidth / 2;
    const dist = Math.abs(center - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}

function scrollToSlide(scroller: HTMLElement, i: number, behavior: ScrollBehavior) {
  const slide = scroller.querySelectorAll<HTMLElement>("[data-slide]")[i];
  if (!slide) return;
  const left = slide.offsetLeft - (scroller.clientWidth - slide.offsetWidth) / 2;
  scroller.scrollTo({ left, behavior });
}

export function GalleryCarousel({
  images,
  label,
  seriesId,
}: GalleryCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const first = images[0];
  const ratio = first != null ? first.width / first.height : 3 / 4;
  const pageAspect =
    first != null ? `${first.width} / ${first.height}` : "3 / 4";
  const [maxW, setMaxW] = useState(() => slideMaxWPair(seriesId).preferred);
  const slideMaxW = `min(${maxW}px, calc(100vw - 80px))`;

  // Side inset from half the (possibly height-capped) slide width.
  const sidePad = `max(var(--content-pad), calc(50% - min(${slideMaxW}, calc(${slideMaxH} * ${ratio})) / 2))`;
  const slideWidth = `min(${slideMaxW}, calc(${slideMaxH} * ${ratio}))`;

  useEffect(() => {
    const syncMaxW = () => setMaxW(pickSlideMaxW(ratio, seriesId));
    syncMaxW();
    window.addEventListener("resize", syncMaxW);
    return () => window.removeEventListener("resize", syncMaxW);
  }, [ratio, seriesId]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let settleTimer = 0;

    const syncIndex = () => {
      setIndex(nearestSlideIndex(el));
    };

    const snapToNearest = () => {
      const best = nearestSlideIndex(el);
      setIndex(best);
      const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[best];
      if (!slide) return;
      const target =
        slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
      if (Math.abs(el.scrollLeft - target) > 1) {
        el.scrollTo({ left: target, behavior: "smooth" });
      }
    };

    const onScroll = () => {
      syncIndex();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snapToNearest, 120);
    };

    syncIndex();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", snapToNearest);
    return () => {
      window.clearTimeout(settleTimer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", snapToNearest);
    };
  }, [images.length]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIndex(i);
    scrollToSlide(el, i, "smooth");
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div
          ref={scrollerRef}
          className="flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingInline: sidePad,
            scrollPaddingInline: sidePad,
          }}
          aria-label={label}
        >
          {images.map((image, i) => {
            const active = i === index;
            const mask =
              i < index
                ? "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.45) 100%)"
                : "linear-gradient(270deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.45) 100%)";

            return (
              <figure
                key={image.src}
                data-slide
                className="relative m-0 shrink-0 snap-center snap-always overflow-hidden"
                style={{
                  aspectRatio: pageAspect,
                  width: slideWidth,
                  maxHeight: slideMaxH,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes={`(max-width: 809px) calc(100vw - 80px), ${maxW}px`}
                  className="object-contain"
                />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${
                    active ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ background: mask }}
                />
              </figure>
            );
          })}
        </div>

        {/* Outer edges stay solid #fff; soft fade only near the centered slide. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-3 left-0 z-10"
          style={{
            width: sidePad,
            background:
              "linear-gradient(to right, #fff 0%, #fff 78%, rgba(255,255,255,0.85) 90%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-3 right-0 z-10"
          style={{
            width: sidePad,
            background:
              "linear-gradient(to left, #fff 0%, #fff 78%, rgba(255,255,255,0.85) 90%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      <div
        className="mt-1 flex items-center justify-center gap-2.5"
        role="tablist"
        aria-label={label}
      >
        {images.map((image, i) => {
          const active = i === index;
          return (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Scroll to page ${i + 1}`}
              onClick={() => goTo(i)}
              className="flex h-2.5 w-2.5 items-center justify-center"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-opacity ${
                  active ? "opacity-100" : "opacity-30"
                }`}
                style={{ backgroundColor: "#000" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
