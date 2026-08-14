"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type InViewVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  ariaLabel?: string;
  /** cover = homepage loop; loop = GIF replacement; demo = controls. */
  mode: "cover" | "loop" | "demo";
  /** Override controls (gallery clip is muted-loop + controls). */
  controls?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

/**
 * Attach src only once in (or near) the viewport so homepage / case-study
 * pages do not download tens of MB of video during page-enter.
 */
export function InViewVideo({
  src,
  className,
  poster,
  ariaLabel,
  mode,
  controls,
  width,
  height,
  style,
}: InViewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || active) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [active]);

  const looping = mode === "cover" || mode === "loop";
  const showControls = controls ?? mode === "demo";

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={active ? src : undefined}
      poster={poster}
      autoPlay={looping && active}
      muted={looping}
      loop={looping}
      controls={showControls}
      playsInline
      preload={active ? (looping ? "auto" : "metadata") : "none"}
      width={width}
      height={height}
      aria-label={ariaLabel}
    />
  );
}
