"use client";

import { useEffect } from "react";

/** Enables document-level vertical mandatory snap while the Gallery page is mounted. */
export function GallerySnap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("gallery-y-snap");
    return () => {
      root.classList.remove("gallery-y-snap");
    };
  }, []);

  return null;
}
