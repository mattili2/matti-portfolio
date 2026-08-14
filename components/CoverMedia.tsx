"use client";

type CoverMediaProps = {
  src: string;
  alt: string;
  type: "image" | "video";
};

import Image from "next/image";
import { InViewVideo } from "@/components/InViewMedia";
import { mediaSrc } from "@/lib/media";

export function CoverMedia({ src, alt, type }: CoverMediaProps) {
  if (type === "video") {
    return (
      <InViewVideo
        className="h-full w-full object-cover"
        src={mediaSrc(src)}
        mode="cover"
        ariaLabel={alt}
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
