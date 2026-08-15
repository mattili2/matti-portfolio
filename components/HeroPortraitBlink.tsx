"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const OPEN_MS = 5000;
const CLOSED_MS = 500;
/** Display width at which the full frame fits; narrower viewports crop sides. */
const MAX_WIDTH = 1250;
const IMAGE_W = 1352;
const IMAGE_H = 399;
const FRAME_HEIGHT = Math.round((MAX_WIDTH * IMAGE_H) / IMAGE_W); // ≈369
/** Taller than the full-frame ratio when narrow so the face reads larger. */
const HEIGHT_VW = (FRAME_HEIGHT / MAX_WIDTH) * 130; // ≈38.4vw
/** Mobile floor — main knob for “bigger on narrow”. */
const MIN_HEIGHT = 300;

/** Click cycle: study → design → draw → photo (transparent overlays + soft SFX). */
const OVERLAYS = [
  { src: "/images/hero-overlay-study.png", label: "学习", sound: "/sounds/study-book.mp3" },
  { src: "/images/hero-overlay-design.png", label: "设计", sound: "/sounds/design-click.mp3" },
  { src: "/images/hero-overlay-draw.png", label: "画画", sound: "/sounds/draw-pencil.mp3" },
  { src: "/images/hero-overlay-photo.png", label: "摄影", sound: "/sounds/photo-shutter.mp3" },
] as const;

const SFX_VOLUME = 0.22;

type HeroPortraitBlinkProps = {
  alt: string;
};

/** Homepage portrait — blink + click-to-stack activity overlays. */
export function HeroPortraitBlink({ alt }: HeroPortraitBlinkProps) {
  const [eyesOpen, setEyesOpen] = useState(true);
  /** How many overlays are visible (0–4). */
  const [overlayCount, setOverlayCount] = useState(0);
  const audioRef = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    audioRef.current = OVERLAYS.map((overlay) => {
      const audio = new Audio(overlay.sound);
      audio.preload = "auto";
      audio.volume = SFX_VOLUME;
      return audio;
    });
    return () => {
      for (const audio of audioRef.current) {
        if (!audio) continue;
        audio.pause();
        audio.src = "";
      }
      audioRef.current = [];
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setEyesOpen(true);
      return;
    }

    let timeoutId = 0;
    let cancelled = false;

    const schedule = (open: boolean) => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setEyesOpen(!open);
        schedule(!open);
      }, open ? OPEN_MS : CLOSED_MS);
    };

    schedule(true);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const playOverlaySound = (index: number) => {
    const base = audioRef.current[index];
    if (!base) return;
    const clip = base.cloneNode(true) as HTMLAudioElement;
    clip.volume = SFX_VOLUME;
    void clip.play().catch(() => {
      /* autoplay / gesture edge cases */
    });
  };

  const advanceOverlay = () => {
    if (overlayCount >= OVERLAYS.length) {
      setOverlayCount(0);
      return;
    }
    playOverlaySound(overlayCount);
    setOverlayCount(overlayCount + 1);
  };

  return (
    <button
      type="button"
      onClick={advanceOverlay}
      aria-label={`${alt}（点击叠加：学习 → 设计 → 画画 → 摄影）`}
      className="relative mx-auto block w-full max-w-[1250px] cursor-pointer overflow-hidden border-0 bg-transparent p-0"
      style={{
        height: `clamp(${MIN_HEIGHT}px, ${HEIGHT_VW}vw, ${FRAME_HEIGHT}px)`,
      }}
    >
      <Image
        src="/images/hero-eyes-open.jpg"
        alt={alt}
        fill
        priority
        sizes="(max-width: 1250px) 100vw, 1250px"
        className={`object-cover object-center transition-opacity duration-75 ${
          eyesOpen ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
      />
      <Image
        src="/images/hero-eyes-closed.jpg"
        alt=""
        fill
        sizes="(max-width: 1250px) 100vw, 1250px"
        aria-hidden
        className={`object-cover object-center transition-opacity duration-75 ${
          eyesOpen ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />

      {OVERLAYS.map((overlay, index) => (
        <Image
          key={overlay.src}
          src={overlay.src}
          alt=""
          fill
          sizes="(max-width: 1250px) 100vw, 1250px"
          aria-hidden
          className={`object-cover object-center transition-opacity duration-300 ${
            index < overlayCount ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />
      ))}
    </button>
  );
}
