"use client";

import { useEffect, useRef } from "react";

const VOLUME = 0.25;

/**
 * Plays per-section gallery BGM based on which snap section is most centered.
 * One shared HTMLAudioElement — no overlapping tracks. Video sections use an
 * empty data-gallery-audio and pause comic music while active.
 */
export function GalleryMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeSrcRef = useRef<string | null>(null);
  const unlockedRef = useRef(false);
  const pendingSrcRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.volume = VOLUME;
    audioRef.current = audio;

    const tryPlay = (src: string | null) => {
      const el = audioRef.current;
      if (!el) return;

      if (!src) {
        el.pause();
        activeSrcRef.current = null;
        pendingSrcRef.current = null;
        return;
      }

      pendingSrcRef.current = src;

      // Compare against the live element src, not only the ref — React Strict Mode
      // re-runs effects and can leave activeSrcRef pointing at a cleared Audio.
      const currentSrc = el.getAttribute("src") || el.src || "";
      const alreadyLoaded =
        activeSrcRef.current === src &&
        (currentSrc === src || currentSrc.endsWith(src));

      if (!alreadyLoaded) {
        el.pause();
        el.src = src;
        el.currentTime = 0;
        activeSrcRef.current = src;
      }

      if (!unlockedRef.current) return;

      void el.play().catch(() => {
        /* autoplay blocked until a user gesture unlocks */
      });
    };

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      const pending = pendingSrcRef.current;
      if (pending) tryPlay(pending);
    };

    const gestureEvents = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
    for (const type of gestureEvents) {
      window.addEventListener(type, unlock, { passive: true });
    }

    const sections = [
      ...document.querySelectorAll<HTMLElement>("[data-gallery-audio]"),
    ];

    let raf = 0;
    const pickActive = () => {
      const mid = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
        const center = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = section;
        }
      }
      const src = best?.dataset.galleryAudio?.trim() || null;
      tryPlay(src);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pickActive();
      });
    };

    const observer = new IntersectionObserver(onScroll, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    for (const section of sections) observer.observe(section);

    pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      for (const type of gestureEvents) {
        window.removeEventListener(type, unlock);
      }
      if (raf) cancelAnimationFrame(raf);
      audio.pause();
      audio.removeAttribute("src");
      audioRef.current = null;
      activeSrcRef.current = null;
      pendingSrcRef.current = null;
      // keep unlockedRef — user gesture still counts after Strict Mode effect re-run
    };
  }, []);

  return null;
}
