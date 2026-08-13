import type { CaseStudy, CaseStudyCopy, CaseStudyImage } from "./types";

const hero: CaseStudyImage = {
  src: "/images/platte/hero.png",
  alt: "Platte app screens and colorful plate hero",
  width: 1372,
  height: 360,
};

const img = {
  survey: {
    src: "/images/platte/survey.png",
    alt: "Survey findings on solo dining challenges",
    width: 1466,
    height: 410,
  },
  // Framer ~696 centered
  comb: {
    src: "/images/platte/comb.png",
    alt: "COM-B behavioral model research diagram",
    width: 2400,
    height: 1272,
    size: "md",
  },
  // Framer ~1160
  insights: {
    src: "/images/platte/insights.png",
    alt: "Key insights from COM-B analysis",
    width: 2150,
    height: 653,
    size: "lg",
  },
  // Framer ~406
  colorResearch: {
    src: "/images/platte/color-research.png",
    alt: "Color supporting healthy eating research",
    width: 754,
    height: 884,
    size: "sm",
  },
  // Framer ~700 centered
  concept: {
    src: "/images/platte/concept.png",
    alt: "Platte design concept overview strip",
    width: 952,
    height: 270,
    size: "md",
  },
  // Framer ~1100
  userflow: {
    src: "/images/platte/userflow.png",
    alt: "Core user flow: purchase, plan, execute, settle",
    width: 1944,
    height: 966,
    size: "lg",
  },
  planExec: {
    src: "/images/platte/plan-exec.png",
    alt: "Cyclical meal plan and execution screens",
    width: 2726,
    height: 1482,
  },
  settle: {
    src: "/images/platte/settle.png",
    alt: "Cycle settlement summary and color gallery",
    width: 2796,
    height: 1330,
  },
  purchase: {
    src: "/images/platte/purchase.png",
    alt: "Color-assisted grocery purchase flow",
    width: 2642,
    height: 1226,
  },
  social: {
    src: "/images/platte/social.png",
    alt: "Team companionship and shared cooking screens",
    width: 2290,
    height: 1225,
  },
  overview: {
    src: "/images/platte/overview.png",
    alt: "Three roles of color in Platte",
    width: 2812,
    height: 1390,
  },
  // Framer AI figures centered ~490–700
  aiResearch: {
    src: "/images/platte/ai-research.png",
    alt: "AI-assisted research clustering workflow",
    width: 980,
    height: 578,
    size: "md",
  },
  aiDesign: {
    src: "/images/platte/ai-design.png",
    alt: "AI-assisted interactive prototype exploration",
    width: 1022,
    height: 634,
    size: "sm",
  },
  aiDeliver: {
    src: "/images/platte/ai-deliver.png",
    alt: "AI-assisted visual asset generation",
    width: 1142,
    height: 598,
    size: "md",
  },
} as const satisfies Record<string, CaseStudyImage>;

const zh: CaseStudyCopy = {
  category: "App设计/行为设计",
  title: "Platte 调色·盘",
  topNavLabel: "顶部",
  meta: {
    toolsLabel: "工具",
    tools: "Figma, Photoshop, Illustration, AI 工具",
    periodLabel: "时间",
    period: "2026.05 - 2026.07",
    typeLabel: "类型",
    type: "小组研究 + 个人设计项目",
  },
  intro:
    "Platte 调色·盘是一款以「在餐盘上调色」为核心概念，通过颜色引导、周期饮食规划和轻社交陪伴，帮助独居年轻人逐步养成健康、多样饮食习惯的 App。",
  sections: [
    {
      id: "background",
      eyebrow: "Background",
      title: "独居饮食中存在什么问题？",
      navLabel: "问题分析",
      blocks: [
        {
          type: "paragraph",
          text: "通过问卷调查，我们收集了31份居住在荷兰的学生问卷，发现许多独居者都面临着相似的饮食困扰：饮食时间不规律、长期重复食用相同食物，以及因食材无法及时消耗而产生浪费。这些现象并非孤立存在，而是共同反映出整体独居人群饮食中的挑战。",
        },
        { type: "image", image: img.survey },
      ],
    },
    {
      id: "research-comb",
      eyebrow: "research",
      title: "基于 COM-B 分析的关键洞察",
      navLabel: "COM-B 分析",
      blocks: [
        {
          type: "paragraph",
          text: "接着，我们邀请 5 位独居用户进行为期一周的饮食记录，并在记录结束后开展访谈得到更具体的数据。同时，我们设计了一些轻量化的分享实验，鼓励用户主动记录和分享自己的饮食行为，以观察社交反馈对饮食坚持的影响。",
        },
        {
          type: "paragraph",
          text: "最后，我们基于 COM-B 行为模型对收集到的数据进行整理和分析，提炼出影响独居饮食体验的关键因素。",
        },
        { type: "image", image: img.comb },
        { type: "image", image: img.insights },
      ],
    },
    {
      id: "insights",
      eyebrow: "INSIGHTS",
      title: "关键洞察",
      navLabel: "关键洞察",
      blocks: [
        {
          type: "list",
          items: [
            {
              lead: "1.",
              text: "让独居者感到疲惫的，不是做饭本身，而是在有限食材下不断思考如何做到不重复、有营养、少浪费所带来的决策成本。",
            },
            {
              lead: "2.",
              text: "缺乏他人的约束与共同用餐场景，独居饮食更容易变得随意，难以保持规律。",
            },
            {
              lead: "3.",
              text: "通过记录与分享自己的饮食，人们能够获得即时反馈和情绪满足，从而增强持续做饭的动力。",
            },
            {
              lead: "4.",
              text: "独居做饭需要频繁面对剩余食材的保存与再利用问题，而一次未能有效利用食材的经历，往往会影响下一次的采购与烹饪决策，最终形成重复饮食与食物浪费的循环。",
            },
          ],
        },
      ],
    },
    {
      id: "research-color",
      eyebrow: "research",
      title: "用颜色支持饮食行为",
      navLabel: "用颜色支持饮食行为",
      blocks: [
        {
          type: "paragraph",
          text: "对独居者而言，真正的负担不是做饭，而是反复思考「买什么、做什么、怎么搭配才健康」。研究表明，颜色存引导人们健康多样饮食的潜力。",
        },
        { type: "image", image: img.colorResearch },
        {
          type: "list",
          items: [
            {
              lead: "5. 颜色能够降低多样饮食的决策成本",
              text: "相比营养计算，人们更容易感知颜色。因此，利用颜色作为视觉启发来引导健康多样的饮食，是一种有前景的策略。",
            },
            {
              lead: "6. 餐食颜色与健康饮食相关",
              text: "研究发现，餐食颜色越丰富，与水果和蔬菜摄入量越高呈正相关。同时不同颜色通常对应不同类型的植物化学物，并与不同健康方向相关联。* 但由于单一食物往往含有多种活性成分，颜色仅作为一种促进饮食多样性的简化线索，而非精确映射。",
            },
          ],
        },
      ],
    },
    {
      id: "design-concept",
      eyebrow: "Design concept",
      title: "Platte: 在你的餐盘上“调色”",
      navLabel: "设计概念",
      blocks: [
        { type: "subheading", text: "设计目标：" },
        {
          type: "paragraph",
          text: "帮助独居者持续保持健康、多样的饮食习惯。",
        },
        { type: "subheading", text: "设计机会：" },
        {
          type: "list",
          items: [
            {
              lead: "1. 降低饮食规划成本，让健康选择更容易发生",
              text: "将复杂的采购、搭配和食材管理过程转化为简单、可执行的行为目标，帮助用户减少决策负担。",
            },
            {
              lead: "2. 建立持续反馈机制，增强健康饮食的长期动力。",
              text: "通过社交陪伴、可视化反馈和激励机制，让用户看到自己的变化，并持续保持健康多样的饮食习惯。",
            },
          ],
        },
        { type: "subheading", text: "设计概念：" },
        {
          type: "paragraph",
          text: "本设计以「在餐盘上‘调色’」为核心概念，围绕「颜色作为目标、反馈与奖励」构建设计概念，串联做饭前、做饭中和做饭后的完整行为流程。",
        },
        {
          type: "paragraph",
          text: "通过采购清单、周期计划、饮食打卡与分享、周期结算与画作收集等功能，帮助独居者减少饮食决策负担，获得持续反馈与激励，使健康、多样的饮食成为一种轻松、有趣且更容易坚持的日常习惯。",
        },
        { type: "image", image: img.concept },
      ],
    },
    {
      id: "ux-userflow",
      eyebrow: "UX DESIGN",
      title: "用户流程",
      navLabel: "用户流程",
      blocks: [
        {
          type: "paragraph",
          text: "我首先梳理了产品的核心用户流程，将整个体验拆解为采购、计划、执行、结算四个阶段，所有功能都围绕这一完整周期展开。",
        },
        { type: "image", image: img.userflow },
      ],
    },
    {
      id: "ux-plan-exec",
      eyebrow: "UX DESIGN",
      title: "周期式饮食计划：计划与执行",
      navLabel: "周期式饮食计划：计划与执行",
      blocks: [
        {
          type: "paragraph",
          text: "系统会根据已采购食材，综合食材利用率与营养搭配生成一份食谱计划，用户可直接采用或随时调整。在这个过程中，颜色作为直观的视觉反馈，帮助用户持续了解本周期的饮食颜色轨迹。",
        },
        { type: "image", image: img.planExec },
      ],
    },
    {
      id: "ux-settle",
      eyebrow: "UX DESIGN",
      title: "周期式饮食计划：结算与收集",
      navLabel: "周期式饮食计划：结算与收集",
      blocks: [
        {
          type: "paragraph",
          text: "每个饮食周期结束后，用户会收到一份周期总结，包含综合评分、饮食数据和食材颜色聚类分析等，帮助回顾本周期的饮食情况。系统还会根据本周期的饮食颜色组成调出一个专属颜色，加入色谱。随着颜色不断累积，用户可逐步解锁艺术画作，丰富个人画廊。",
        },
        { type: "image", image: img.settle },
      ],
    },
    {
      id: "ux-purchase",
      eyebrow: "UX DESIGN",
      title: "颜色辅助采购过程",
      navLabel: "颜色辅助采购过程",
      blocks: [
        {
          type: "paragraph",
          text: "在周期开始前的采购过程也是人们面临重要决策的过程。因此，我将颜色作为一种直观的采购目标：当没有明确选择时，让餐盘颜色更丰富，变化出新的颜色，就是本周期的目标。",
        },
        { type: "image", image: img.purchase },
      ],
    },
    {
      id: "ux-social",
      eyebrow: "UX DESIGN",
      title: "各自吃饭，共同相伴。",
      navLabel: "各自吃饭，共同相伴。",
      blocks: [
        {
          type: "paragraph",
          text: "用户可以自由组建自己的小队，和远方的朋友或者陌生人一起坚持。通过分享食谱和烹饪成果，用户们在彼此观察、学习和鼓励中，建立长期坚持健康饮食的动力。",
        },
        { type: "image", image: img.social },
      ],
    },
    {
      id: "overview",
      eyebrow: "Overview",
      title: "颜色的三种角色",
      navLabel: "颜色的三种角色",
      blocks: [{ type: "image", image: img.overview }],
    },
    {
      id: "reflection",
      eyebrow: "REFLECTION",
      title: "AI 在本项目设计工作流中的应用",
      navLabel: "AI 在本项目设计工作流中的应用",
      blocks: [
        {
          type: "paragraph",
          text: "在这个项目中，我认为最大的挑战是在不同限制之间不断寻找平衡。",
        },
        { type: "subheading", text: "前期研究：整理、聚类、生成假设" },
        {
          type: "paragraph",
          text: "使用AI 工具处理大量研究资料，比如文献综述、问卷和访谈整理，快速总结整体趋势、聚类用户观点，并生成一些值得继续验证的假设，作为后续访谈和设计探索的起点。",
        },
        {
          type: "metaRows",
          rows: [
            {
              label: "结果验证",
              value: "AI 输出结合原始研究数据和后续访谈验证。",
            },
            {
              label: "结构化输入输出",
              value: "明确输入资料、分析目标和输出格式。",
            },
          ],
        },
        { type: "image", image: img.aiResearch },
        { type: "subheading", text: "设计：快速制作可交互原型，辅助推敲" },
        {
          type: "paragraph",
          text: "使用Cursor、Figma Make 快速探索同一功能的不同交互方案，制作可交互原型，补充一些页面状态和交互路径。",
        },
        {
          type: "metaRows",
          rows: [
            {
              label: "提供上下文",
              value: "输入产品目标、页面功能、Figma Frame 和视觉参考。",
            },
            {
              label: "拆分任务",
              value: "按单个页面、组件或交互流程逐步生成，控制每次输出目标。",
            },
          ],
        },
        { type: "image", image: img.aiDesign },
        { type: "subheading", text: "交付：快速生成与迭代视觉素材" },
        {
          type: "paragraph",
          text: "使用 ChatGPT Image 快速生成和迭代配图、矢量图形、绘画作品转化等视觉素材，更快速地探索不同视觉方向并帮助页面设计与素材制作。",
        },
        {
          type: "metaRows",
          rows: [
            {
              label: "参考图驱动",
              value: "提供参考图、风格关键词和颜色体系。",
            },
            {
              label: "控制变量",
              value: "每次只调整一个维度，如配色、视觉风格和内容。",
            },
          ],
        },
        { type: "image", image: img.aiDeliver },
      ],
    },
  ],
};

const en: CaseStudyCopy = {
  category: "App Design / Behavior Design",
  title: "Platte: Palette on a Plate",
  topNavLabel: "Top",
  meta: {
    toolsLabel: "Tools",
    tools: "Figma, Photoshop, Illustration, AI Tools",
    periodLabel: "Period",
    period: "2026.05 - 2026.07",
    typeLabel: "Type",
    type: "Group Research + Individual Design Project",
  },
  intro:
    "Platte is an app built around “mixing colors on a plate.” Through color cues, cyclical meal planning, and light social companionship, it helps young people living alone gradually build healthier, more varied eating habits.",
  sections: [
    {
      id: "background",
      eyebrow: "Background",
      title: "What Goes Wrong in Solo Eating?",
      navLabel: "Background",
      blocks: [
        {
          type: "paragraph",
          text: "Through a survey of 31 students living in the Netherlands, we found many people living alone share similar struggles: irregular meal times, repeating the same foods for long stretches, and waste when ingredients aren’t used in time. These aren’t isolated issues—they point to broader challenges in solo eating.",
        },
        { type: "image", image: img.survey },
      ],
    },
    {
      id: "research-comb",
      eyebrow: "Research",
      title: "Key Insights from COM-B Analysis",
      navLabel: "COM-B Analysis",
      blocks: [
        {
          type: "paragraph",
          text: "Next, we invited five people living alone to keep a week-long food diary, then interviewed them for richer detail. We also ran lightweight sharing experiments that encouraged people to log and share meals, so we could observe how social feedback affects sticking with cooking.",
        },
        {
          type: "paragraph",
          text: "Finally, we organized the data with the COM-B behavior model and distilled the key factors shaping solo dining experiences.",
        },
        { type: "image", image: img.comb },
        { type: "image", image: img.insights },
      ],
    },
    {
      id: "insights",
      eyebrow: "Insights",
      title: "Key Insights",
      navLabel: "Key Insights",
      blocks: [
        {
          type: "list",
          items: [
            {
              lead: "1.",
              text: "What exhausts people living alone isn’t cooking itself—it’s the decision cost of constantly figuring out how to avoid repetition, stay nutritious, and reduce waste with limited ingredients.",
            },
            {
              lead: "2.",
              text: "Without others’ accountability or shared mealtime rituals, solo eating slips into casual patterns and becomes hard to keep regular.",
            },
            {
              lead: "3.",
              text: "Logging and sharing meals brings immediate feedback and emotional reward, which strengthens the motivation to keep cooking.",
            },
            {
              lead: "4.",
              text: "Solo cooking constantly confronts leftover storage and reuse. One failed attempt to use ingredients well often shapes the next shopping and cooking choices—feeding a loop of repetition and waste.",
            },
          ],
        },
      ],
    },
    {
      id: "research-color",
      eyebrow: "Research",
      title: "Using Color to Support Eating Behavior",
      navLabel: "Using Color to Support Eating Behavior",
      blocks: [
        {
          type: "paragraph",
          text: "For people living alone, the real burden isn’t cooking—it’s repeatedly deciding what to buy, what to cook, and how to combine foods healthily. Research suggests color has potential to guide healthier, more varied eating.",
        },
        { type: "image", image: img.colorResearch },
        {
          type: "list",
          items: [
            {
              lead: "5. Color can lower the decision cost of varied eating",
              text: "People perceive color more easily than nutrition math. Using color as a visual prompt to guide healthy, diverse meals is a promising strategy.",
            },
            {
              lead: "6. Meal color relates to healthier eating",
              text: "Richer meal color correlates with higher fruit and vegetable intake. Different colors often map to different phytochemicals and health directions. * Because a single food can contain many active compounds, color is only a simplified cue for diversity—not a precise mapping.",
            },
          ],
        },
      ],
    },
    {
      id: "design-concept",
      eyebrow: "Design Concept",
      title: "Platte: “Mix Color” on Your Plate",
      navLabel: "Design Concept",
      blocks: [
        { type: "subheading", text: "Design Goal:" },
        {
          type: "paragraph",
          text: "Help people living alone sustain healthy, varied eating habits.",
        },
        { type: "subheading", text: "Design Opportunities:" },
        {
          type: "list",
          items: [
            {
              lead: "1. Lower planning cost so healthy choices happen more easily",
              text: "Turn complex shopping, pairing, and ingredient management into simple, actionable goals that reduce decision burden.",
            },
            {
              lead: "2. Build ongoing feedback to sustain long-term healthy eating.",
              text: "Through social companionship, visual feedback, and incentives, help users see their progress and keep varied, healthy habits going.",
            },
          ],
        },
        { type: "subheading", text: "Design Concept:" },
        {
          type: "paragraph",
          text: "The concept centers on “mixing color on your plate,” with color as goal, feedback, and reward—linking the full flow before, during, and after cooking.",
        },
        {
          type: "paragraph",
          text: "Through shopping lists, cycle plans, meal check-ins and sharing, cycle settlement, and artwork collection, Platte reduces decision burden and adds continuous feedback—so healthy, varied eating feels lighter, more playful, and easier to stick with.",
        },
        { type: "image", image: img.concept },
      ],
    },
    {
      id: "ux-userflow",
      eyebrow: "UX Design",
      title: "User Flow",
      navLabel: "User Flow",
      blocks: [
        {
          type: "paragraph",
          text: "I mapped the core user flow first, splitting the experience into purchase, plan, execute, and settle—four stages that every feature orbits.",
        },
        { type: "image", image: img.userflow },
      ],
    },
    {
      id: "ux-plan-exec",
      eyebrow: "UX Design",
      title: "Cyclical Meal Plans: Plan & Execute",
      navLabel: "Cyclical Meal Plans: Plan & Execute",
      blocks: [
        {
          type: "paragraph",
          text: "From purchased ingredients, the system generates a recipe plan balancing utilization and nutrition. Users can adopt it as-is or adjust anytime. Color acts as immediate visual feedback so people can track the cycle’s color trajectory.",
        },
        { type: "image", image: img.planExec },
      ],
    },
    {
      id: "ux-settle",
      eyebrow: "UX Design",
      title: "Cyclical Meal Plans: Settle & Collect",
      navLabel: "Cyclical Meal Plans: Settle & Collect",
      blocks: [
        {
          type: "paragraph",
          text: "At the end of each cycle, users get a summary with overall score, eating data, and ingredient-color clustering to review the period. The system also mixes a signature color from that cycle into a spectrum. As colors accumulate, users unlock artworks and grow a personal gallery.",
        },
        { type: "image", image: img.settle },
      ],
    },
    {
      id: "ux-purchase",
      eyebrow: "UX Design",
      title: "Color-Assisted Shopping",
      navLabel: "Color-Assisted Shopping",
      blocks: [
        {
          type: "paragraph",
          text: "Shopping before a cycle is another high-decision moment. I treat color as a clear purchase goal: when choices feel unclear, making the plate richer and unlocking new colors becomes the aim for that cycle.",
        },
        { type: "image", image: img.purchase },
      ],
    },
    {
      id: "ux-social",
      eyebrow: "UX Design",
      title: "Eat Alone, Stay Accompanied.",
      navLabel: "Eat Alone, Stay Accompanied.",
      blocks: [
        {
          type: "paragraph",
          text: "Users can form their own teams and stick with friends afar—or strangers. By sharing recipes and cooking results, people observe, learn from, and encourage each other, building lasting motivation for healthier eating.",
        },
        { type: "image", image: img.social },
      ],
    },
    {
      id: "overview",
      eyebrow: "Overview",
      title: "Three Roles of Color",
      navLabel: "Three Roles of Color",
      blocks: [{ type: "image", image: img.overview }],
    },
    {
      id: "reflection",
      eyebrow: "Reflection",
      title: "How AI Fit into This Design Workflow",
      navLabel: "How AI Fit into This Design Workflow",
      blocks: [
        {
          type: "paragraph",
          text: "The biggest challenge in this project, for me, was continually finding balance across competing constraints.",
        },
        {
          type: "subheading",
          text: "Early Research: Organize, Cluster, Generate Hypotheses",
        },
        {
          type: "paragraph",
          text: "I used AI tools on large research piles—literature reviews, surveys, interview notes—to summarize trends, cluster viewpoints, and draft hypotheses worth testing as starting points for later interviews and design exploration.",
        },
        {
          type: "metaRows",
          rows: [
            {
              label: "Validate Results",
              value:
                "Cross-check AI output against original research data and follow-up interviews.",
            },
            {
              label: "Structured I/O",
              value:
                "Specify source materials, analysis goals, and output format clearly.",
            },
          ],
        },
        { type: "image", image: img.aiResearch },
        {
          type: "subheading",
          text: "Design: Quickly Make Interactive Prototypes to Think With",
        },
        {
          type: "paragraph",
          text: "With Cursor and Figma Make, I explored alternate interaction schemes for the same feature, built interactive prototypes, and filled in page states and paths.",
        },
        {
          type: "metaRows",
          rows: [
            {
              label: "Provide Context",
              value:
                "Feed product goals, page jobs, Figma frames, and visual references.",
            },
            {
              label: "Split Tasks",
              value:
                "Generate page by page, component by component, or flow by flow—one clear target at a time.",
            },
          ],
        },
        { type: "image", image: img.aiDesign },
        {
          type: "subheading",
          text: "Delivery: Generate and Iterate Visual Assets Quickly",
        },
        {
          type: "paragraph",
          text: "ChatGPT Image helped generate and iterate illustrations, vector graphics, and painting-derived visuals—speeding exploration of directions and supporting page design and asset production.",
        },
        {
          type: "metaRows",
          rows: [
            {
              label: "Reference-Driven",
              value: "Provide reference images, style keywords, and a color system.",
            },
            {
              label: "Control Variables",
              value:
                "Change one dimension at a time—palette, visual style, or content.",
            },
          ],
        },
        { type: "image", image: img.aiDeliver },
      ],
    },
  ],
};

/** Framer token `--token-b48b837b…` / eyebrow + active-dot fill on /proj/2 */
export const PLATTE_THEME_COLOR = "#9189ea";

export const platteCaseStudy = {
  id: "2",
  hero,
  themeColor: PLATTE_THEME_COLOR,
  zh,
  en,
} as const;

export function getPlatteCaseStudy(locale: "zh" | "en"): CaseStudy {
  const copy = locale === "en" ? en : zh;
  return {
    id: platteCaseStudy.id,
    hero: platteCaseStudy.hero,
    themeColor: platteCaseStudy.themeColor,
    ...copy,
  };
}
