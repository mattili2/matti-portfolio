import type { CaseStudy, CaseStudyCopy, CaseStudyImage } from "./types";

const hero: CaseStudyImage = {
  src: "/images/traces/hero.png",
  alt: "Traces memory box product hero",
  width: 1704,
  height: 446,
};

const zh: CaseStudyCopy = {
  category: "产品设计",
  title: "Traces",
  topNavLabel: "顶部",
  meta: {
    toolsLabel: "工具",
    tools: "Figma, Arduino, AI Tools",
    periodLabel: "时间",
    period: "2025.09 - 2025.12",
    typeLabel: "类型",
    type: "个人项目",
  },
  intro:
    "Traces 是一款为短期居住者设计的记忆盒子，用于珍藏那些无法带走却值得留存的珍贵物品与回忆。",
  sections: [
    {
      id: "demo",
      title: "产品展示短片",
      navLabel: "产品展示短片",
      blocks: [
        {
          type: "video",
          src: "/videos/traces.mp4",
          poster: "/images/traces.png",
        },
        {
          type: "paragraph",
          variant: "placeholder",
          text: "更多内容正在整理中。",
        },
      ],
    },
  ],
};

const en: CaseStudyCopy = {
  category: "Product design",
  title: "Traces",
  topNavLabel: "Top",
  meta: {
    toolsLabel: "Tools",
    tools: "Figma, Arduino, AI Tools",
    periodLabel: "Period",
    period: "2025.09 - 2025.12",
    typeLabel: "Type",
    type: "Personal Project",
  },
  intro:
    "Traces is a memory box designed for short-term residents—to keep precious objects and memories that cannot be taken away, yet deserve to be held onto.",
  sections: [
    {
      id: "demo",
      title: "Product Demo Film",
      navLabel: "Product Demo Film",
      blocks: [
        {
          type: "video",
          src: "/videos/traces.mp4",
          poster: "/images/traces.png",
        },
        {
          type: "paragraph",
          variant: "placeholder",
          text: "More content is being prepared.",
        },
      ],
    },
  ],
};

/** Matches Framer accent used on product case pages (`rgb(255, 41, 105)`). */
export const TRACES_THEME_COLOR = "#ff2969";

export const tracesCaseStudy = {
  id: "4",
  hero,
  themeColor: TRACES_THEME_COLOR,
  zh,
  en,
} as const;

export function getTracesCaseStudy(locale: "zh" | "en"): CaseStudy {
  const copy = locale === "en" ? en : zh;
  return {
    id: tracesCaseStudy.id,
    hero: tracesCaseStudy.hero,
    themeColor: tracesCaseStudy.themeColor,
    ...copy,
  };
}
