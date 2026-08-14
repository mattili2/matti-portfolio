import type { Locale } from "@/lib/i18n";

export type ProjectCopy = {
  title: string;
  category: string;
  period: string;
  description: string;
};

export type Project = ProjectCopy & {
  id: string;
  cover: string;
  coverType: "image" | "video";
};

type ProjectBase = {
  id: string;
  cover: string;
  coverType: "image" | "video";
  zh: ProjectCopy;
  en: ProjectCopy;
};

const projectBases: ProjectBase[] = [
  {
    id: "5",
    cover: "/images/monolog.png",
    coverType: "image",
    zh: {
      title: "MonoLOG：通过对话记录专注",
      category: "Vibe Coding/ 电脑端App设计",
      period: "2026.03, 2026.07",
      description:
        "MonoLOG（独白）是一款对话式记录工具，将专注记录融入自然对话，结合 AI 数字陪伴与监督，让整个过程更加自然、低负担、易坚持。",
    },
    en: {
      title: "MonoLOG: Tracking Focus Through Conversation",
      category: "Vibe Coding / Desktop App Design",
      period: "2026.03, 2026.07",
      description:
        "MonoLOG (Monologue) is a conversational journaling tool that folds focus tracking into natural dialogue. With AI companionship and gentle accountability, the process feels natural, low-friction, and easier to stick with.",
    },
  },
  {
    id: "1",
    cover: "/images/whale.png",
    coverType: "image",
    zh: {
      title: "Whale TV OS 体验优化",
      category: "电视操作系统 UX 设计",
      period: "2025.02 - 2025.06",
      description:
        "此项目为在Whale TV实习中的工作整理。在本项目中，我主要负责线上和线下两部分的用户测试与分析，并基于研究结果梳理核心痛点，完成交互设计的优化与迭代。",
    },
    en: {
      title: "Whale TV OS Experience Optimization",
      category: "TV operating system UX design",
      period: "2025.02 - 2025.06",
      description:
        "A collection of work from my internship at Whale TV. I led online and offline user testing and analysis, synthesized core pain points from the research, and iterated interaction design improvements.",
    },
  },
  {
    id: "2",
    cover: "/images/platte.png",
    coverType: "image",
    zh: {
      title: "Platte 调色·盘",
      category: "App设计/ 行为设计",
      period: "2026.05 - 2026.07",
      description:
        "Platte 调色·盘是一款以「在餐盘上调色」为核心概念，通过颜色引导、周期饮食规划和轻社交陪伴，帮助独居年轻人逐步养成健康、多样饮食习惯的 App。",
    },
    en: {
      title: "Platte: Palette on a Plate",
      category: "App design / behavior design",
      period: "2026.05 - 2026.07",
      description:
        "Platte is an app built around “mixing colors on a plate.” Through color cues, cyclical meal planning, and light social companionship, it helps young people living alone gradually build healthier, more varied eating habits.",
    },
  },
  {
    id: "3",
    cover: "/videos/ignitcube.mp4",
    coverType: "video",
    zh: {
      title: "Ignitcube",
      category: "装置设计/ 产品设计",
      period: "2024.09",
      description:
        "IgnitCube 是一个以“火种资源”为概念的互动灯光装置。作品以火种的有限性、传递性与合作共享为核心，通过人与人之间共同传递光源，引发人们对资源珍惜与共享的思考，同时鼓励公共空间中的合作、交流与互动。",
    },
    en: {
      title: "Ignitcube",
      category: "Installation design / product design",
      period: "2024.09",
      description:
        "IgnitCube is an interactive light installation centered on the idea of “ember as a resource.” Built around scarcity, transmission, and shared stewardship, people pass light to one another—prompting reflection on valuing and sharing resources, and encouraging cooperation, exchange, and interaction in public space.",
    },
  },
  {
    id: "4",
    cover: "/videos/traces.mp4",
    coverType: "video",
    zh: {
      title: "Traces",
      category: "产品设计",
      period: "2025.09 - 2025.12",
      description:
        "Traces 是一款为短期居住者设计的记忆盒子，用于珍藏那些无法带走却值得留存的珍贵物品与回忆。",
    },
    en: {
      title: "Traces",
      category: "Product design",
      period: "2025.09 - 2025.12",
      description:
        "Traces is a memory box designed for short-term residents—to keep precious objects and memories that cannot be taken away, yet deserve to be held onto.",
    },
  },
];

export function getFeaturedProjects(locale: Locale): Project[] {
  return projectBases.map(({ zh, en, ...base }) => ({
    ...base,
    ...(locale === "en" ? en : zh),
  }));
}

/**
 * Newest-first card order on Projects overview (canonical list sequence).
 * Case-study Prev/Next nav follows this order among projects that have case studies.
 */
export const projectsOverviewOrder = ["5", "2", "4", "1", "3"] as const;

export function getFeaturedProjectsChronological(locale: Locale): Project[] {
  const byId = new Map(
    getFeaturedProjects(locale).map((project) => [project.id, project]),
  );
  return projectsOverviewOrder
    .map((id) => byId.get(id))
    .filter((project): project is Project => Boolean(project));
}

export function getProjectById(
  id: string,
  locale: Locale,
): Project | undefined {
  const base = projectBases.find((project) => project.id === id);
  if (!base) return undefined;
  const { zh, en, ...rest } = base;
  return { ...rest, ...(locale === "en" ? en : zh) };
}
