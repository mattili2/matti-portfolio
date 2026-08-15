import type { Locale } from "@/lib/i18n";

export type Dictionary = {
  name: string;
  nameShort: string;
  role: string;
  bio: [string, string];
  featuredProjects: string;
  scrollToProjects: string;
  navAria: string;
  mobileNavAria: string;
  openMenu: string;
  closeMenu: string;
  closeMenuBg: string;
  projectOverview: string;
  projectOverviewBody: string;
  aboutTitle: string;
  galleryTitle: string;
  caseStudyBuilding: string;
  caseStudyNavBack: string;
  caseStudyNavPrev: string;
  caseStudyNavNext: string;
  caseStudyTryDemo: string;
  caseStudyTryDemoHint: string;
  caseStudyInteractiveDemo: string;
  caseStudyInteractiveDemoHint: string;
  backHome: string;
  heroAlt: string;
  metaDescription: string;
  langZh: string;
  langEn: string;
  langSwitchAria: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  zh: {
    name: "李雨馨 Matti",
    nameShort: "李雨馨 Matti",
    role: "UX Designer | UX Researcher",
    bio: [
      "我是一名用户体验/ UX 设计师，目前就读于荷兰代尔夫特理工大学工业设计学院。",
      "我拥有建筑学的跨学科背景，同时喜欢插画，摄影和剪辑。在设计过程中，我注重清晰与逻辑。",
    ],
    featuredProjects: "主要项目",
    scrollToProjects: "滚动到主要项目",
    navAria: "主导航",
    mobileNavAria: "移动导航",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    closeMenuBg: "关闭菜单背景",
    projectOverview: "项目概览",
    projectOverviewBody: "",
    aboutTitle: "About",
    galleryTitle: "Gallery",
    caseStudyBuilding: "案例详情页内容建设中，完整文案与配图将在下一轮补齐。",
    caseStudyNavBack: "返回",
    caseStudyNavPrev: "上一篇",
    caseStudyNavNext: "下一篇",
    caseStudyTryDemo: "体验 MonoLOG",
    caseStudyTryDemoHint: "轻量 Web 演示 · 对话、待办与计时",
    caseStudyInteractiveDemo: "交互Demo",
    caseStudyInteractiveDemoHint:
      "试试点击页面里的内容：输入文字、开始计时，或在对话上右键编辑。",
    backHome: "← 返回首页",
    heroAlt: "李雨馨 Matti 线稿肖像",
    metaDescription:
      "李雨馨 Matti — UX Designer / UX Researcher，荷兰代尔夫特理工大学工业设计学院。",
    langZh: "中",
    langEn: "ENG",
    langSwitchAria: "切换语言",
  },
  en: {
    name: "Yuxin Li Matti",
    nameShort: "Yuxin Li Matti",
    role: "UX Designer | UX Researcher",
    bio: [
      "I am a UX / user experience designer currently studying at the Faculty of Industrial Design Engineering, Delft University of Technology in the Netherlands.",
      "With an interdisciplinary background in architecture, I also enjoy illustration, photography, and video editing. In my design process, I value clarity and logic.",
    ],
    featuredProjects: "Selected Projects",
    scrollToProjects: "Scroll to selected projects",
    navAria: "Main navigation",
    mobileNavAria: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeMenuBg: "Close menu backdrop",
    projectOverview: "Project Overview",
    projectOverviewBody: "",
    aboutTitle: "About",
    galleryTitle: "Gallery",
    caseStudyBuilding:
      "Case study details are in progress. Full copy and visuals will be added next.",
    caseStudyNavBack: "Back",
    caseStudyNavPrev: "Previous",
    caseStudyNavNext: "Next",
    caseStudyTryDemo: "Try MonoLOG",
    caseStudyTryDemoHint: "Lightweight web demo · chat, todos & timer",
    caseStudyInteractiveDemo: "Interactive Demo",
    caseStudyInteractiveDemoHint:
      "Try clicking around: type a note, start the timer, or right‑click a message to edit.",
    backHome: "← Back to home",
    heroAlt: "Line portrait of Yuxin Li Matti",
    metaDescription:
      "Yuxin Li Matti — UX Designer / UX Researcher at Delft University of Technology, Faculty of Industrial Design Engineering.",
    langZh: "中",
    langEn: "ENG",
    langSwitchAria: "Switch language",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
