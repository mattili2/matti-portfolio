import type { Locale } from "@/lib/i18n";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type GalleryCarouselBlock = {
  type: "carousel";
  id: string;
  caption: string;
  date: string;
  images: GalleryImage[];
  /** Background music for this series; omitted / undefined = silent (e.g. video). */
  audioSrc?: string;
};

export type GalleryVideoBlock = {
  type: "video";
  id: string;
  caption: string;
  date: string;
  src: string;
  poster: string;
  /** Intrinsic poster size for layout */
  width: number;
  height: number;
};

export type GalleryBlock = GalleryCarouselBlock | GalleryVideoBlock;

export type GalleryContent = {
  blocks: GalleryBlock[];
};

type GalleryBlockBase = {
  id: string;
  date: string;
  zh: { caption: string };
  en: { caption: string };
} & (
  | {
      type: "carousel";
      images: Omit<GalleryImage, "alt">[];
      audioSrc?: string;
    }
  | {
      type: "video";
      src: string;
      poster: string;
      width: number;
      height: number;
    }
);

const galleryBases: GalleryBlockBase[] = [
  {
    type: "carousel",
    id: "dream",
    date: "2026.07.02",
    zh: { caption: "偶尔做梦，在家里的床上醒来。" },
    en: { caption: "Sometimes I dream, then wake up in my own bed." },
    audioSrc: "/audio/gallery/dream.mp3",
    images: [
      { src: "/images/gallery/dream-01.png", width: 1286, height: 2144 },
      { src: "/images/gallery/dream-02.png", width: 1286, height: 2144 },
      { src: "/images/gallery/dream-03.png", width: 1286, height: 2144 },
      { src: "/images/gallery/dream-04.png", width: 1286, height: 2144 },
      { src: "/images/gallery/dream-05.png", width: 1286, height: 2144 },
      { src: "/images/gallery/dream-06.png", width: 1286, height: 2144 },
    ],
  },
  {
    type: "video",
    id: "moment",
    date: "2026.06.25",
    zh: { caption: "有了瞬间，就想要永远。" },
    en: { caption: "Once there's a moment, you want forever." },
    src: "/videos/gallery-moment.mov",
    poster: "/images/gallery/moment-poster.png",
    width: 1929,
    height: 2727,
  },
  {
    type: "carousel",
    id: "graduation",
    date: "2026.05.05",
    zh: { caption: "毕业展，如此盛大不真实的梦。" },
    en: { caption: "Graduation show — such a grand, unreal dream." },
    audioSrc: "/audio/gallery/graduation.mp3",
    images: [
      { src: "/images/gallery/grad-01.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-02.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-03.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-04.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-05.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-06.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-07.png", width: 2572, height: 4288 },
      { src: "/images/gallery/grad-08.png", width: 2572, height: 4288 },
    ],
  },
  {
    type: "carousel",
    id: "mom",
    date: "2026.03.08",
    zh: { caption: "妈妈。" },
    en: { caption: "Mom." },
    audioSrc: "/audio/gallery/mom.mp3",
    images: [
      { src: "/images/gallery/mom-01.png", width: 2572, height: 3432 },
      { src: "/images/gallery/mom-02.png", width: 2572, height: 3432 },
      { src: "/images/gallery/mom-03.png", width: 2572, height: 3432 },
      { src: "/images/gallery/mom-04.png", width: 2572, height: 3432 },
      { src: "/images/gallery/mom-05.png", width: 2572, height: 3432 },
      { src: "/images/gallery/mom-06.png", width: 2572, height: 3432 },
    ],
  },
];

export function getGallery(locale: Locale): GalleryContent {
  const blocks: GalleryBlock[] = galleryBases.map((base) => {
    const copy = base[locale];
    if (base.type === "carousel") {
      return {
        type: "carousel",
        id: base.id,
        caption: copy.caption,
        date: base.date,
        audioSrc: base.audioSrc,
        images: base.images.map((img, index) => ({
          ...img,
          alt: `${copy.caption} (${index + 1})`,
        })),
      };
    }
    return {
      type: "video",
      id: base.id,
      caption: copy.caption,
      date: base.date,
      src: base.src,
      poster: base.poster,
      width: base.width,
      height: base.height,
    };
  });
  return { blocks };
}
