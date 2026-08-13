import type { Locale } from "@/lib/i18n";

export type OverviewCopy = {
  title: string;
  category: string;
  period: string;
  role: string;
  location: string;
};

export type OverviewItem = OverviewCopy & {
  /** Detail page id when featured; undefined = gray / non-clickable */
  projectId?: string;
  year: number;
};

type OverviewBase = {
  year: number;
  projectId?: string;
  zh: OverviewCopy;
  en: OverviewCopy;
};

const overviewBases: OverviewBase[] = [
  {
    year: 2026,
    projectId: "2",
    zh: {
      title: "Platte 调色·盘",
      category: "App设计/ 行为设计",
      period: "2026.05 - 2026.07",
      role: "小组研究 + 个人设计项目",
      location: "代尔夫特, 荷兰",
    },
    en: {
      title: "Platte: Palette on a Plate",
      category: "App design / behavior design",
      period: "2026.05 - 2026.07",
      role: "Group research + individual design project",
      location: "Delft, Netherlands",
    },
  },
  {
    year: 2025,
    projectId: "4",
    zh: {
      title: "Traces",
      category: "产品设计",
      period: "2025.09 - 2025.12",
      role: "个人项目",
      location: "代尔夫特, 荷兰",
    },
    en: {
      title: "Traces",
      category: "Product design",
      period: "2025.09 - 2025.12",
      role: "Personal project",
      location: "Delft, Netherlands",
    },
  },
  {
    year: 2025,
    projectId: "1",
    zh: {
      title: "Whale TV OS 体验优化",
      category: "电视操作系统 UX 设计",
      period: "2025.02 - 2025.06",
      role: "实习项目",
      location: "北京, 中国",
    },
    en: {
      title: "Whale TV OS Experience Optimization",
      category: "TV operating system UX design",
      period: "2025.02 - 2025.06",
      role: "Internship project",
      location: "Beijing, China",
    },
  },
  {
    year: 2024,
    projectId: "3",
    zh: {
      title: "Ignitcube",
      category: "装置设计/ 产品设计",
      period: "2024.09",
      role: "个人项目",
      location: "北京, 中国",
    },
    en: {
      title: "Ignitcube",
      category: "Installation design / product design",
      period: "2024.09",
      role: "Personal project",
      location: "Beijing, China",
    },
  },
  {
    year: 2024,
    zh: {
      title: "城市办公楼设计",
      category: "建筑设计",
      period: "2024.05",
      role: "个人项目",
      location: "奥胡斯, 丹麦",
    },
    en: {
      title: "Urban Office Building Design",
      category: "Architectural design",
      period: "2024.05",
      role: "Personal project",
      location: "Aarhus, Denmark",
    },
  },
  {
    year: 2024,
    zh: {
      title: "Rewardrobe：旅行共享衣橱",
      category: "App设计",
      period: "2024.03",
      role: "个人项目",
      location: "奥胡斯, 丹麦",
    },
    en: {
      title: "Rewardrobe: Travel Shared Wardrobe",
      category: "App design",
      period: "2024.03",
      role: "Personal project",
      location: "Aarhus, Denmark",
    },
  },
  {
    year: 2023,
    zh: {
      title: "小柿之旅",
      category: "绘本",
      period: "2023.11",
      role: "小组合作项目",
      location: "北京, 中国",
    },
    en: {
      title: "Journey of the Little Persimmon",
      category: "Picture book",
      period: "2023.11",
      role: "Group collaboration project",
      location: "Beijing, China",
    },
  },
  {
    year: 2023,
    zh: {
      title: "司岗里·佤山回响",
      category: "海报设计/视觉设计",
      period: "2023.01",
      role: "团队合作项目",
      location: "云南, 中国",
    },
    en: {
      title: "Sigangli · Echoes of the Wa Mountains",
      category: "Poster design / visual design",
      period: "2023.01",
      role: "Team collaboration project",
      location: "Yunnan, China",
    },
  },
];

export type OverviewYearGroup = {
  year: number;
  items: OverviewItem[];
};

export function getProjectOverview(locale: Locale): OverviewYearGroup[] {
  const items: OverviewItem[] = overviewBases.map(({ zh, en, year, projectId }) => ({
    year,
    projectId,
    ...(locale === "en" ? en : zh),
  }));

  const years = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    items: items.filter((i) => i.year === year),
  }));
}
