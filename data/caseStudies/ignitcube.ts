import type { CaseStudy, CaseStudyCopy, CaseStudyImage } from "./types";

const hero: CaseStudyImage = {
  src: "/images/ignitcube/hero.png",
  alt: "Ignitcube interactive light installation",
  width: 3556,
  height: 1007,
};

const zh: CaseStudyCopy = {
  category: "装置设计/ 产品设计",
  title: "Ignitcube",
  topNavLabel: "顶部",
  meta: {
    toolsLabel: "工具",
    tools: "Arduino, Rhino",
    periodLabel: "时间",
    period: "2024.09",
    typeLabel: "类型",
    type: "个人项目",
  },
  intro:
    "IgnitCube 是一个以“火种资源”为概念的互动灯光装置。作品以火种的有限性、传递性与合作共享为核心，通过人与人之间共同传递光源，引发人们对资源珍惜与共享的思考，同时鼓励公共空间中的合作、交流与互动。",
  sections: [
    {
      id: "demo",
      title: "产品展示短片",
      navLabel: "产品展示短片",
      blocks: [
        {
          type: "video",
          src: "/videos/ignitcube.mov",
          size: "lg",
          width: 854,
          height: 480,
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
  category: "Installation design / product design",
  title: "Ignitcube",
  topNavLabel: "Top",
  meta: {
    toolsLabel: "Tools",
    tools: "Arduino, Rhino",
    periodLabel: "Period",
    period: "2024.09",
    typeLabel: "Type",
    type: "Personal Project",
  },
  intro:
    "IgnitCube is an interactive light installation centered on the idea of “ember as a resource.” Built around scarcity, transmission, and shared stewardship, people pass light to one another—prompting reflection on valuing and sharing resources, and encouraging cooperation, exchange, and interaction in public space.",
  sections: [
    {
      id: "demo",
      title: "Product Demo Film",
      navLabel: "Product Demo Film",
      blocks: [
        {
          type: "video",
          src: "/videos/ignitcube.mov",
          size: "lg",
          width: 854,
          height: 480,
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

/** Warm ember accent from Framer /Part-style labels on related product pages. */
export const IGNITCUBE_THEME_COLOR = "#ff2969";

export const ignitcubeCaseStudy = {
  id: "3",
  hero,
  themeColor: IGNITCUBE_THEME_COLOR,
  zh,
  en,
} as const;

export function getIgnitcubeCaseStudy(locale: "zh" | "en"): CaseStudy {
  const copy = locale === "en" ? en : zh;
  return {
    id: ignitcubeCaseStudy.id,
    hero: ignitcubeCaseStudy.hero,
    themeColor: ignitcubeCaseStudy.themeColor,
    ...copy,
  };
}
