"use client";

import { useEffect } from "react";
import type { CaseStudyTheme } from "@/data/caseStudies/types";

/** Applies full-page dark surface for case studies (body bg + chrome vars). Header stays light. */
export function CaseStudyThemeEffect({ theme }: { theme?: CaseStudyTheme }) {
  useEffect(() => {
    if (theme !== "dark") return;
    document.body.classList.add("case-theme-dark");
    return () => {
      document.body.classList.remove("case-theme-dark");
    };
  }, [theme]);

  return null;
}
