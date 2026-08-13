import type { Locale } from "@/lib/i18n";

export type AboutMeta = {
  /** Top line: date range or expected graduation */
  primary: string;
  /** Bottom line: location (hidden on small screens, matching Framer) */
  location: string;
};

export type AboutEducationItem = {
  meta: AboutMeta;
  school: string;
  detail: string;
};

export type AboutExperienceItem = {
  meta: AboutMeta;
  title: string;
  org: string;
  bullets: string[];
};

export type AboutContent = {
  educationTitle: string;
  experienceTitle: string;
  education: AboutEducationItem[];
  experience: AboutExperienceItem[];
};

const aboutByLocale: Record<Locale, AboutContent> = {
  zh: {
    educationTitle: "教育经历",
    experienceTitle: "实践经历",
    education: [
      {
        meta: {
          primary: "预计毕业：2027.07",
          location: "荷兰，代尔夫特",
        },
        school: "代尔夫特理工大学（TU Delft）",
        detail: "交互设计硕士, 工业设计工程学院",
      },
      {
        meta: {
          primary: "2020.08 - 2025.06",
          location: "中国，北京",
        },
        school: "中央美术学院",
        detail: "建筑学学士",
      },
      {
        meta: {
          primary: "2024.02 - 2024.06",
          location: "丹麦，奥胡斯",
        },
        school: "奥胡斯建筑学院",
        detail: "交换项目",
      },
    ],
    experience: [
      {
        meta: {
          primary: "2025.01 - 2025.06",
          location: "中国，北京",
        },
        title: "Whale TV｜交互设计实习生",
        org: "产品设计与UX 用户体验设计部",
        bullets: [
          "在海外智能电视产品团队中参与系统交互设计，与多部门团队协作",
          "通过交互原型、线上测试和用户访谈开展用户研究",
          "收集并分析用户反馈，发现并梳理电视操作系统的体验问题",
          "根据测试结果持续优化设计方案，完成迭代",
        ],
      },
      {
        meta: {
          primary: "2026.02 - 2026.06",
          location: "荷兰，代尔夫特",
        },
        title: "Human-AI Co-painting｜研究助理",
        org: "代尔夫特理工大学, 工业设计工程学院",
        bullets: [
          "调研与分析人机协作绘画主流协作模式，探索人机共创的设计机会",
          "参与人机协作绘画研究，负责训练数据设计、标注体系搭建，以及问卷设计与众包标注流程管理",
        ],
      },
    ],
  },
  en: {
    educationTitle: "Education",
    experienceTitle: "Experience",
    education: [
      {
        meta: {
          primary: "Expected graduation: 2027.07",
          location: "Delft, Netherlands",
        },
        school: "Delft University of Technology (TU Delft)",
        detail: "MSc Interaction Design, Faculty of Industrial Design Engineering",
      },
      {
        meta: {
          primary: "2020.08 - 2025.06",
          location: "Beijing, China",
        },
        school: "Central Academy of Fine Arts",
        detail: "Bachelor of Architecture",
      },
      {
        meta: {
          primary: "2024.02 - 2024.06",
          location: "Aarhus, Denmark",
        },
        school: "Aarhus School of Architecture",
        detail: "Exchange program",
      },
    ],
    experience: [
      {
        meta: {
          primary: "2025.01 - 2025.06",
          location: "Beijing, China",
        },
        title: "Whale TV｜Interaction Design Intern",
        org: "Product Design & UX",
        bullets: [
          "Contributed to system interaction design in an overseas smart TV product team, collaborating across departments",
          "Conducted user research through interactive prototypes, online tests, and user interviews",
          "Collected and analyzed user feedback to identify experience issues in the TV operating system",
          "Iterated design solutions based on test results",
        ],
      },
      {
        meta: {
          primary: "2026.02 - 2026.06",
          location: "Delft, Netherlands",
        },
        title: "Human-AI Co-painting｜Research Assistant",
        org: "TU Delft, Faculty of Industrial Design Engineering",
        bullets: [
          "Researched mainstream human–AI co-painting collaboration modes and explored design opportunities for co-creation",
          "Supported the study through training-data design, annotation framework setup, questionnaire design, and crowdstaffed annotation workflow management",
        ],
      },
    ],
  },
};

export function getAbout(locale: Locale): AboutContent {
  return aboutByLocale[locale];
}
