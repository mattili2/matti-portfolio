/** Display width within the case-study content column. Defaults to `full`. */
export type CaseStudyImageSize = "full" | "lg" | "md" | "sm" | "xs";

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Width hint for standalone images (and optional per-cell overrides).
   * - full: content-column width (default) — app UI / key screens
   * - lg: ~90% / max ~1040px — wide figures still near-primary
   * - md: ~65% / max ~680px — diagrams, process strips
   * - sm: ~42% / max ~440px — sketches, small research figures
   * - xs: ~14% / max ~160px — tiny labels / badges
   */
  size?: CaseStudyImageSize;
  /**
   * Exact share of the content column (1–100). Overrides `size` when set.
   * In `imageRow`, used as flex grow weight (relative to siblings).
   */
  widthPct?: number;
};

export type CaseStudyListItem = {
  /** Bold lead-in before the body, e.g. “流程繁琐。” */
  lead?: string;
  text: string;
};

export type CaseStudyMetaRow = {
  label: string;
  value: string;
};

export type CaseStudyBlock =
  | {
      type: "paragraph";
      text: string;
      /** Stub / “more content coming” note — centered with extra top gap */
      variant?: "placeholder";
    }
  | {
      type: "subheading";
      text: string;
      /** Optional leading icon (e.g. Whale reflection rows). */
      icon?: Pick<CaseStudyImage, "src" | "alt" | "width" | "height">;
    }
  | { type: "list"; items: CaseStudyListItem[] }
  | { type: "metaRows"; rows: CaseStudyMetaRow[] }
  | {
      type: "imageGrid";
      columns: 2 | 3;
      images: CaseStudyImage[];
      caption?: string;
    }
  | {
      /** Horizontal pair/row (stacks on small screens). Uses each image's widthPct as flex weight. */
      type: "imageRow";
      images: CaseStudyImage[];
      caption?: string;
    }
  | { type: "image"; image: CaseStudyImage; caption?: string }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      /** Display width within the content column (same tiers as images). */
      size?: CaseStudyImageSize;
      /** Optional intrinsic size hint for layout (defaults to 16:9). */
      width?: number;
      height?: number;
    };

export type CaseStudySection = {
  /** Stable hash id for in-page anchors / dot nav */
  id: string;
  /** Small muted label above the title, e.g. BACKGROUND / DESIGN GOAL */
  eyebrow?: string;
  title: string;
  /**
   * Dot-nav hover label. Defaults to eyebrow, then title.
   * Set explicitly when eyebrows repeat across sections.
   */
  navLabel?: string;
  blocks: CaseStudyBlock[];
};

export type CaseStudyCopy = {
  category: string;
  title: string;
  /** Hover / a11y label for the top (hero) dot */
  topNavLabel: string;
  meta: {
    toolsLabel: string;
    tools: string;
    periodLabel: string;
    period: string;
    typeLabel: string;
    type: string;
  };
  intro: string;
  sections: CaseStudySection[];
};

export type CaseStudyTheme = "light" | "dark";

export type CaseStudy = CaseStudyCopy & {
  id: string;
  hero: CaseStudyImage;
  /**
   * Brand accent for this case study (active dots + section eyebrows).
   * Extracted from Framer / product UI — not a generic black/gray.
   */
  themeColor: string;
  /** Page surface: Whale uses dark (black bg + light text). Defaults to light. */
  theme?: CaseStudyTheme;
  /** Embed interactive web demo inline (e.g. MonoLOG on /proj/5). */
  demoEmbed?: boolean;
};
