import type { CaseStudy, CaseStudyCopy, CaseStudyImage } from "./types";

const hero: CaseStudyImage = {
  src: "/images/whale/hero.png",
  alt: "Whale TV OS experience optimization hero",
  width: 1664,
  height: 464,
};

/** Widths from Framer /proj/1 at 1440px (content col ≈ 1160). */
const img = {
  userTest: {
    src: "/images/whale/user-test.png",
    alt: "Internal user testing on real Whale TV devices",
    width: 2172,
    height: 254,
  },
  dataProcess: {
    src: "/images/whale/data-process.png",
    alt: "User testing data synthesis process",
    width: 2210,
    height: 480,
  },
  coreIssues: {
    src: "/images/whale/core-issues.png",
    alt: "Core experience issues and optimization directions",
    width: 2426,
    height: 720,
  },
  homeDiscovery: {
    src: "/images/whale/home-discovery.png",
    alt: "Home and Discovery section analysis",
    width: 1916,
    height: 918,
  },
  contentPositioning: {
    src: "/images/whale/content-positioning.png",
    alt: "Home and Discovery content positioning strategy",
    width: 2404,
    height: 1054,
  },
  homeMine: {
    src: "/images/whale/home-mine.png",
    alt: "Home second-screen redesign around personal content",
    width: 1810,
    height: 5136,
    // Framer row: ~371 / 1160
    widthPct: 32,
  },
  homeMineDemo: {
    src: "/images/whale/home-mine-demo.mp4",
    alt: "Home personal-content experience demo",
    width: 1138,
    height: 640,
    // Framer row: ~777 / 1160
    widthPct: 67,
  },
  bannerPreviewDemo: {
    src: "/images/whale/banner-preview-demo.mp4",
    alt: "Banner focus card preview interaction",
    width: 1142,
    height: 640,
    widthPct: 90,
  },
  bannerPreview: {
    src: "/images/whale/banner-preview.png",
    alt: "Banner linked with Your Top Choices focus state",
    width: 2106,
    height: 350,
  },
  defaultFocusDemo: {
    src: "/images/whale/default-focus-demo.mp4",
    alt: "Default focus moved to top Banner",
    width: 1142,
    height: 640,
    widthPct: 90,
  },
  defaultFocus: {
    src: "/images/whale/default-focus.png",
    alt: "Default focus reconsideration diagram",
    width: 2126,
    height: 346,
  },
  directPlay: {
    src: "/images/whale/direct-play.png",
    alt: "First-screen cards skip detail and play directly",
    width: 1900,
    height: 918,
    widthPct: 90,
  },
  discoveryExplore: {
    src: "/images/whale/discovery-explore.png",
    alt: "Discovery content exploration label",
    width: 406,
    height: 144,
    size: "xs",
  },
  discoveryTime: {
    src: "/images/whale/discovery-time.png",
    alt: "Discovery modules emphasizing time and freshness",
    width: 728,
    height: 1422,
    // Framer row: ~441 / 1160
    widthPct: 38,
  },
  discoveryTimeDemo: {
    src: "/images/whale/discovery-time-demo.mp4",
    alt: "Discovery browsing experience demo",
    width: 640,
    height: 788,
    // Framer row: ~696 / 1160
    widthPct: 60,
  },
  searchBrowse1: {
    src: "/images/whale/search-to-browse-1.png",
    alt: "Discovery search redefined as browse/filter",
    width: 1988,
    height: 682,
    widthPct: 84,
  },
  searchBrowse2: {
    src: "/images/whale/search-to-browse-2.png",
    alt: "Discovery retrieval interaction details",
    width: 1170,
    height: 660,
    widthPct: 69,
  },
  appsSystem: {
    src: "/images/whale/apps-system.png",
    alt: "Existing Apps interaction analysis",
    width: 1874,
    height: 798,
  },
  schemeA: {
    src: "/images/whale/scheme-a.mp4",
    alt: "Scheme A: push content down on long-press edit",
    width: 1142,
    height: 640,
    widthPct: 73,
  },
  schemeB: {
    src: "/images/whale/scheme-b.mp4",
    alt: "Scheme B: dim neighboring rows on long-press edit",
    width: 1142,
    height: 640,
    widthPct: 73,
  },
  schemeC: {
    src: "/images/whale/scheme-c.mp4",
    alt: "Scheme C: centered modal for app management",
    width: 1142,
    height: 640,
    widthPct: 73,
  },
  schemeCompare: {
    src: "/images/whale/scheme-compare.png",
    alt: "Comparison of three Apps edit interaction schemes",
    width: 2312,
    height: 1058,
  },
  uninstall: {
    src: "/images/whale/uninstall.png",
    alt: "Removable vs preinstalled non-removable apps",
    width: 1952,
    height: 894,
  },
} as const satisfies Record<string, CaseStudyImage>;

/** Framer /proj/1 reflection section icons (128×128, 64px display). */
const reflectIcons = {
  consistency: {
    src: "/images/whale/reflect-consistency.png",
    alt: "",
    width: 128,
    height: 128,
  },
  business: {
    src: "/images/whale/reflect-business.png",
    alt: "",
    width: 128,
    height: 128,
  },
  technical: {
    src: "/images/whale/reflect-technical.png",
    alt: "",
    width: 136,
    height: 128,
  },
} as const satisfies Record<string, Pick<CaseStudyImage, "src" | "alt" | "width" | "height">>;

const zh: CaseStudyCopy = {
  category: "电视操作系统 UX 设计",
  title: "Whale TV OS 体验优化",
  topNavLabel: "顶部",
  meta: {
    toolsLabel: "工具",
    tools: "Figma, User Testing",
    periodLabel: "时间",
    period: "2025.02 - 2025.06",
    typeLabel: "类型",
    type: "实习项目",
  },
  intro:
    "此项目为在Whale TV实习中的工作整理。在本项目中，我主要负责线上和线下两部分的用户测试与分析，并基于研究结果梳理核心痛点，完成交互设计的优化与迭代。",
  sections: [
    {
      id: "part-1",
      eyebrow: "/Part 1",
      title: "为 Home 与 Discovery 板块建立差异化体验",
      navLabel: "Part 1",
      blocks: [],
    },
    {
      id: "understand-1",
      eyebrow: "Understand",
      title: "初版设计完成后，我们通过用户测试寻找优化方向。",
      navLabel: "用户测试",
      blocks: [
        {
          type: "paragraph",
          text: "测试在公司内部开展，共邀请 60+ 位 来自不同部门与专业背景的用户参与。",
        },
        {
          type: "list",
          items: [
            {
              text: "使用真机进行体验测试，观察并记录用户的疑问点与操作行为。",
            },
            {
              text: "根据预设问题与测试过程中发现的问题进行用户访谈。",
            },
          ],
        },
        { type: "image", image: img.userTest },
        { type: "subheading", text: "数据整理过程" },
        { type: "image", image: img.dataProcess },
        { type: "subheading", text: "核心体验问题与优化方向" },
        { type: "image", image: img.coreIssues },
        { type: "subheading", text: "Home 与 Discovery 板块分析" },
        { type: "image", image: img.homeDiscovery },
      ],
    },
    {
      id: "strategy-content",
      eyebrow: "Design Strategy 01",
      title: "设计策略：内容差异化",
      navLabel: "内容差异化",
      blocks: [
        {
          type: "paragraph",
          text: "首先，我重新梳理了两个板块的定位，明确各自的定位、目标用户以及内容侧重点。同时，对页面中不同位置的具体内容进行了梳理。",
        },
        { type: "image", image: img.contentPositioning },
        { type: "subheading", text: "/Home: 强化“我的内容”体验" },
        {
          type: "paragraph",
          text: "在第二屏的瀑布流中，我移除了原本以平台（Netflix、YouTube）和内容类型（Action、Live）为主的分类方式，围绕用户自身的使用行为与偏好组织内容，强化 Home 作为个人快捷入口的定位。主要包含：",
        },
        {
          type: "list",
          items: [
            { text: "继续之前行为" },
            { text: "快捷访问" },
            { text: "基于历史的个性化推荐" },
            { text: "基于时间与场景的轻推荐内容" },
          ],
        },
        {
          type: "paragraph",
          text: "Continue Watching · Recently added · Because you watched/ added ... · Relaxing Tonight, Trending in Your Region",
        },
        {
          type: "imageRow",
          images: [img.homeMine, img.homeMineDemo],
        },
      ],
    },
    {
      id: "strategy-interaction-home",
      eyebrow: "Design Strategy 02",
      title: "设计策略：交互差异化",
      navLabel: "交互差异化 · Home",
      blocks: [
        { type: "subheading", text: "/Home: 创造高效触达" },
        { type: "subheading", text: "在Banner增加焦点卡片预览" },
        {
          type: "paragraph",
          text: "在首页，我增加了“Your Top Choices”在焦点态下的信息展示密度，Banner 区与Your Top Choices内容卡片动态关联，为用户展示更多信息。",
        },
        { type: "image", image: img.bannerPreviewDemo },
        { type: "image", image: img.bannerPreview },
        { type: "subheading", text: "默认焦点的重新考量" },
        {
          type: "paragraph",
          text: "由于弱化了 Banner 中推荐与广告内容的展示权重，我将默认焦点由首个内容卡片调整至顶部 Banner，目的是在商业侧与用户浏览体验之间取得平衡。",
        },
        { type: "image", image: img.defaultFocusDemo },
        { type: "image", image: img.defaultFocus },
        { type: "subheading", text: "第一屏卡片跳过详情页，直接播放" },
        {
          type: "paragraph",
          text: "点击 OK 后直接播放，避免在详情页重复展示 Banner 已提供的内容信息，同时强化 Home 的高效访问体验。这是交互一致性与访问效率之间的权衡。",
        },
        { type: "image", image: img.directPlay },
      ],
    },
    {
      id: "strategy-interaction-discovery",
      eyebrow: "Design Strategy 02",
      title: "/Discovery: 更多元的浏览形式与探索体验",
      navLabel: "交互差异化 · Discovery",
      blocks: [
        {
          type: "paragraph",
          text: "Discovery板块的目标，是构建“大而全”的影音库体验，更多服务于希望探索内容的用户。因此，我主要从以下两个方向提升该板块的浏览探索体验：",
        },
        { type: "subheading", text: "增强内容探索形式" },
        {
          type: "paragraph",
          text: "引入不同类型的内容卡片与浏览形式，除了影片内容外，还包含人物、专题合集等模块，提升浏览过程中的层次感与探索感。",
        },
        { type: "image", image: img.discoveryExplore },
        { type: "subheading", text: "增强内容的“时间流动感”" },
        {
          type: "paragraph",
          text: "通过 Trending、Top 10 This Week、Recently Released 等内容模块，强化内容的更新感与实时性。",
        },
        {
          type: "imageRow",
          images: [img.discoveryTime, img.discoveryTimeDemo],
        },
        {
          type: "paragraph",
          text: "同时，在顶部标签栏做了如下改动：",
        },
        { type: "subheading", text: "「搜索」调整为「检索」" },
        {
          type: "paragraph",
          text: "全局 Search 与 Discovery 原本均提供搜索功能，用户难以理解两者的区别。我将 Discovery 的搜索重新定义为「检索」，强调内容浏览与筛选，而非直接搜索。",
        },
        { type: "image", image: img.searchBrowse1 },
        { type: "image", image: img.searchBrowse2 },
      ],
    },
    {
      id: "part-2",
      eyebrow: "/Part 2",
      title: "为 Apps 板块新增编辑功能",
      navLabel: "Part 2",
      blocks: [
        {
          type: "metaRows",
          rows: [
            {
              label: "需求目标：",
              value:
                "在 Apps 页面提供快速编辑能力，提升应用管理效率，降低用户整理应用的操作成本。",
            },
            {
              label: "需求描述：",
              value:
                "用户可通过长按 OK 键进入快速编辑状态，无需跳转至独立编辑页面。在快速编辑模式下，支持应用打开详情页和卸载；将短按 OK 键交互由进入 App 详情页调整为直接打开 App，与首页交互逻辑保持一致。",
            },
          ],
        },
      ],
    },
    {
      id: "understand-apps",
      eyebrow: "Understand",
      title: "如何在增加新功能的同时维持系统一致性？",
      navLabel: "Apps 理解",
      blocks: [
        {
          type: "paragraph",
          text: "产品需要在 Apps 板块新增“快捷编辑”功能，因此首先分析了现有系统的交互行为。",
        },
        { type: "image", image: img.appsSystem },
      ],
    },
    {
      id: "design-apps",
      eyebrow: "Design",
      title: "三个设计方案与用户测试",
      navLabel: "Apps 方案",
      blocks: [
        {
          type: "paragraph",
          text: "针对“长按唤起 App 编辑功能”，我设计了三种交互方案，并通过用户测试进行对比分析与方案选择。",
        },
        { type: "subheading", text: "方案A 下推" },
        {
          type: "paragraph",
          text: "长按进入编辑模式，下方内容整体下移。",
        },
        { type: "image", image: img.schemeA },
        { type: "subheading", text: "方案B 多行置灰" },
        {
          type: "paragraph",
          text: "长按进入编辑模式，除操作主体外，其所在行和下一行内容置灰处理。",
        },
        { type: "image", image: img.schemeB },
        { type: "subheading", text: "方案C 弹窗" },
        {
          type: "paragraph",
          text: "长按采用居中弹窗展示管理选项。",
        },
        { type: "image", image: img.schemeC },
        { type: "subheading", text: "方案对比与分析" },
        { type: "image", image: img.schemeCompare },
        {
          type: "paragraph",
          text: "最终选择置灰方案，因为其更符合系统现有的交互规范，并能通过弱化其他内容，有效地突出当前操作对象。",
        },
        { type: "subheading", text: "可卸载与不可卸载的App" },
        {
          type: "paragraph",
          text: "此处，App分为预装不可卸载App与可卸载App，需要分情况处理。",
        },
        { type: "image", image: img.uninstall },
      ],
    },
    {
      id: "reflection",
      eyebrow: "REFLECTION",
      title: "设计挑战与收获",
      navLabel: "反思",
      blocks: [
        {
          type: "paragraph",
          text: "在这个项目中，我认为最大的挑战是在不同限制之间不断寻找平衡。",
        },
        { type: "subheading", text: "设计与系统一致性", icon: reflectIcons.consistency },
        {
          type: "paragraph",
          text: "在加入新功能时，不同板块也需要保持清晰的定位和体验，避免因设计过于统一而导致同质化。同时需要保证交互流程自然流畅，还要遵循系统已有的交互逻辑和用户心智模型，降低学习成本。",
        },
        {
          type: "paragraph",
          text: "例如，新增 Apps「快捷编辑」功能时，需要延续 Home 页编辑模式的交互逻辑；首页卡片跳过详情页直接播放，需要权衡与系统其他页面交互一致性的影响。",
        },
        { type: "subheading", text: "设计与商业需求", icon: reflectIcons.business },
        {
          type: "paragraph",
          text: "设计决策在提升用户体验的同时，可能会影响商业目标和要求。",
        },
        {
          type: "paragraph",
          text: "例如，Banner 与内容卡片的联动能够增强浏览体验，但会减少广告位的曝光机会，因此需要在用户体验与商业侧之间寻找平衡；Home 第二屏的改动会影响 YouTube、Netflix 等合作内容的展示需求。但由于现有设计存在内容重复和定位模糊的问题，仍应尽力沟通，推动更合理的方案。",
        },
        {
          type: "paragraph",
          text: "部分商业合作的需求，例如固定板块位置、应用不可置灰或不可卸载等，往往需要单独处理。例如不可卸载App与普通App。",
        },
        { type: "subheading", text: "设计与技术实现", icon: reflectIcons.technical },
        {
          type: "paragraph",
          text: "设计方案并不总能按照理想状态落地，经常会出现“这个目前做不了”或者“只能换一种逻辑实现”。",
        },
        {
          type: "paragraph",
          text: "例如，目前无法获取用户近期观看数据，或广告在有网、无网状态下的切换与覆盖逻辑受限，都需要重新调整设计方案。",
        },
        {
          type: "paragraph",
          text: "所以，设计不是静态的交付，而是在不断沟通、调整中逐渐成形。设计师需要与产品、开发紧密协作，在用户体验、技术可行性和开发周期之间灵活取舍，在约束中找到更好的解决方案，同时为真正影响用户体验的问题争取空间。",
        },
      ],
    },
  ],
};

const en: CaseStudyCopy = {
  category: "TV operating system UX design",
  title: "Whale TV OS Experience Optimization",
  topNavLabel: "Top",
  meta: {
    toolsLabel: "Tools",
    tools: "Figma, User Testing",
    periodLabel: "Period",
    period: "2025.02 - 2025.06",
    typeLabel: "Type",
    type: "Internship Project",
  },
  intro:
    "A collection of work from my internship at Whale TV. I led online and offline user testing and analysis, synthesized core pain points from the research, and iterated interaction design improvements.",
  sections: [
    {
      id: "part-1",
      eyebrow: "/Part 1",
      title: "Differentiate the Home and Discovery Experiences",
      navLabel: "Part 1",
      blocks: [],
    },
    {
      id: "understand-1",
      eyebrow: "Understand",
      title:
        "After the First Design Pass, We Used User Testing to Find Directions for Improvement.",
      navLabel: "User Testing",
      blocks: [
        {
          type: "paragraph",
          text: "Testing ran inside the company with 60+ participants from different departments and backgrounds.",
        },
        {
          type: "list",
          items: [
            {
              text: "Ran experience tests on real devices, observing and recording questions and behaviors.",
            },
            {
              text: "Interviewed users using prepared prompts and issues discovered during testing.",
            },
          ],
        },
        { type: "image", image: img.userTest },
        { type: "subheading", text: "Data Synthesis" },
        { type: "image", image: img.dataProcess },
        {
          type: "subheading",
          text: "Core Experience Issues and Optimization Directions",
        },
        { type: "image", image: img.coreIssues },
        { type: "subheading", text: "Home and Discovery Analysis" },
        { type: "image", image: img.homeDiscovery },
      ],
    },
    {
      id: "strategy-content",
      eyebrow: "Design Strategy 01",
      title: "Design Strategy: Content Differentiation",
      navLabel: "Content Differentiation",
      blocks: [
        {
          type: "paragraph",
          text: "I first clarified the positioning of both sections—purpose, target users, and content focus—and mapped what belongs in each screen region.",
        },
        { type: "image", image: img.contentPositioning },
        {
          type: "subheading",
          text: "/Home: Strengthen the “My Content” Experience",
        },
        {
          type: "paragraph",
          text: "On the second-screen waterfall, I removed platform-led (Netflix, YouTube) and genre-led (Action, Live) grouping, and reorganized around the user’s own behavior and preferences—reinforcing Home as a personal shortcut. Main groups include:",
        },
        {
          type: "list",
          items: [
            { text: "Continue previous behavior" },
            { text: "Quick access" },
            { text: "Personalized recommendations from history" },
            { text: "Light recommendations by time and context" },
          ],
        },
        {
          type: "paragraph",
          text: "Continue Watching · Recently added · Because you watched/ added ... · Relaxing Tonight, Trending in Your Region",
        },
        {
          type: "imageRow",
          images: [img.homeMine, img.homeMineDemo],
        },
      ],
    },
    {
      id: "strategy-interaction-home",
      eyebrow: "Design Strategy 02",
      title: "Design Strategy: Interaction Differentiation",
      navLabel: "Interaction · Home",
      blocks: [
        { type: "subheading", text: "/Home: Create Efficient Access" },
        { type: "subheading", text: "Add Focus-Card Preview on the Banner" },
        {
          type: "paragraph",
          text: "I increased information density for “Your Top Choices” in the focused state, dynamically linking the Banner with those cards so users see more at a glance.",
        },
        { type: "image", image: img.bannerPreviewDemo },
        { type: "image", image: img.bannerPreview },
        { type: "subheading", text: "Reconsidering the Default Focus" },
        {
          type: "paragraph",
          text: "Because recommendation and ad weight in the Banner were reduced, I moved the default focus from the first content card to the top Banner—balancing commercial needs with browsing experience.",
        },
        { type: "image", image: img.defaultFocusDemo },
        { type: "image", image: img.defaultFocus },
        {
          type: "subheading",
          text: "First-Screen Cards Skip the Detail Page and Play Directly",
        },
        {
          type: "paragraph",
          text: "Pressing OK plays immediately, avoiding a detail page that repeats Banner information and reinforcing Home as a fast entry point—a trade-off between interaction consistency and access efficiency.",
        },
        { type: "image", image: img.directPlay },
      ],
    },
    {
      id: "strategy-interaction-discovery",
      eyebrow: "Design Strategy 02",
      title: "/Discovery: Richer Browsing and Exploration",
      navLabel: "Interaction · Discovery",
      blocks: [
        {
          type: "paragraph",
          text: "Discovery aims for a broad audiovisual library for users who want to explore. I improved browsing and exploration in two directions:",
        },
        { type: "subheading", text: "Richer Exploration Formats" },
        {
          type: "paragraph",
          text: "I introduced more card types and browsing patterns—beyond titles alone, including people and curated collections—to add hierarchy and a sense of discovery.",
        },
        { type: "image", image: img.discoveryExplore },
        { type: "subheading", text: "Stronger “Time Flow” in Content" },
        {
          type: "paragraph",
          text: "Modules such as Trending, Top 10 This Week, and Recently Released reinforce freshness and real-time update cues.",
        },
        {
          type: "imageRow",
          images: [img.discoveryTime, img.discoveryTimeDemo],
        },
        {
          type: "paragraph",
          text: "I also adjusted the top tab bar:",
        },
        { type: "subheading", text: "Rename “Search” to “Browse / Retrieve”" },
        {
          type: "paragraph",
          text: "Global Search and Discovery both offered search, which confused users. I redefined Discovery’s search as retrieval—emphasizing browsing and filtering rather than direct search.",
        },
        { type: "image", image: img.searchBrowse1 },
        { type: "image", image: img.searchBrowse2 },
      ],
    },
    {
      id: "part-2",
      eyebrow: "/Part 2",
      title: "Add Editing to the Apps Section",
      navLabel: "Part 2",
      blocks: [
        {
          type: "metaRows",
          rows: [
            {
              label: "Goal:",
              value:
                "Provide quick editing on the Apps page to improve management efficiency and lower the cost of organizing apps.",
            },
            {
              label: "Description:",
              value:
                "Users can long-press OK to enter quick-edit mode without leaving for a separate edit screen. In quick edit, they can open app details or uninstall; short-press OK opens the app directly instead of the detail page, matching Home interaction logic.",
            },
          ],
        },
      ],
    },
    {
      id: "understand-apps",
      eyebrow: "Understand",
      title: "How Do We Add a Feature While Keeping System Consistency?",
      navLabel: "Apps Understand",
      blocks: [
        {
          type: "paragraph",
          text: "The product needed a “quick edit” feature in Apps, so I first analyzed existing system interactions.",
        },
        { type: "image", image: img.appsSystem },
      ],
    },
    {
      id: "design-apps",
      eyebrow: "Design",
      title: "Three Design Schemes and User Testing",
      navLabel: "Apps Schemes",
      blocks: [
        {
          type: "paragraph",
          text: "For long-press to open App edit, I designed three interaction schemes and chose through comparative user testing.",
        },
        { type: "subheading", text: "Scheme A — Push Down" },
        {
          type: "paragraph",
          text: "Long-press enters edit mode and shifts content below downward.",
        },
        { type: "image", image: img.schemeA },
        { type: "subheading", text: "Scheme B — Dim Multiple Rows" },
        {
          type: "paragraph",
          text: "Long-press enters edit mode and dims the active row and the next row, leaving the target clear.",
        },
        { type: "image", image: img.schemeB },
        { type: "subheading", text: "Scheme C — Modal" },
        {
          type: "paragraph",
          text: "Long-press opens a centered modal with management options.",
        },
        { type: "image", image: img.schemeC },
        { type: "subheading", text: "Scheme Comparison" },
        { type: "image", image: img.schemeCompare },
        {
          type: "paragraph",
          text: "We chose the dimming scheme because it best matched existing system patterns and highlights the current object by de-emphasizing everything else.",
        },
        { type: "subheading", text: "Removable vs Non-Removable Apps" },
        {
          type: "paragraph",
          text: "Apps split into preinstalled non-removable apps and removable apps, so each case needs its own handling.",
        },
        { type: "image", image: img.uninstall },
      ],
    },
    {
      id: "reflection",
      eyebrow: "Reflection",
      title: "Design Challenges and Takeaways",
      navLabel: "Reflection",
      blocks: [
        {
          type: "paragraph",
          text: "The biggest challenge was continually balancing competing constraints.",
        },
        { type: "subheading", text: "Design and System Consistency", icon: reflectIcons.consistency },
        {
          type: "paragraph",
          text: "When adding features, sections still need clear roles—avoiding sameness from over-unifying—while keeping flows natural and respecting existing interaction logic and mental models.",
        },
        {
          type: "paragraph",
          text: "For example, Apps “quick edit” needed to continue Home’s edit-mode logic; skipping the detail page for direct play on Home had to be weighed against consistency with other pages.",
        },
        { type: "subheading", text: "Design and Business Needs", icon: reflectIcons.business },
        {
          type: "paragraph",
          text: "UX improvements can conflict with commercial goals.",
        },
        {
          type: "paragraph",
          text: "Banner–card linkage improves browsing but may reduce ad exposure, so UX and business need balance; Home’s second screen also affects partner surfaces like YouTube and Netflix. Because the old design duplicated content and blurred roles, I still pushed for a clearer structure.",
        },
        {
          type: "paragraph",
          text: "Some partnership constraints—fixed module placement, apps that cannot be dimmed or uninstalled—need special handling, such as non-removable vs regular apps.",
        },
        { type: "subheading", text: "Design and Technical Feasibility", icon: reflectIcons.technical },
        {
          type: "paragraph",
          text: "Designs rarely ship unchanged—“not possible yet” or “only with a different logic” is common.",
        },
        {
          type: "paragraph",
          text: "For example, recent viewing data was unavailable, and online/offline ad switching had limits, so proposals had to adapt.",
        },
        {
          type: "paragraph",
          text: "So design is not a static handoff—it forms through communication and revision. Designers work closely with product and engineering, trading off experience, feasibility, and timeline, while still fighting for changes that truly matter to users.",
        },
      ],
    },
  ],
};

/** Framer /Part accent `rgb(255, 41, 105)` on /proj/1 */
export const WHALE_THEME_COLOR = "#ff2969";

export const whaleCaseStudy = {
  id: "1",
  hero,
  themeColor: WHALE_THEME_COLOR,
  theme: "dark" as const,
  zh,
  en,
} as const;

export function getWhaleCaseStudy(locale: "zh" | "en"): CaseStudy {
  const copy = locale === "en" ? en : zh;
  return {
    id: whaleCaseStudy.id,
    hero: whaleCaseStudy.hero,
    themeColor: whaleCaseStudy.themeColor,
    theme: whaleCaseStudy.theme,
    ...copy,
  };
}
