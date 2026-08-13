"use client";

type CoverMediaProps = {
  src: string;
  alt: string;
  type: "image" | "video";
};

import Image from "next/image";
import { mediaSrc } from "@/lib/media";

export function CoverMedia({ src, alt, type }: CoverMediaProps) {
  if (type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        src={mediaSrc(src)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 810px) 100vw, 1120px"
      className="object-cover"
    />
  );
}
