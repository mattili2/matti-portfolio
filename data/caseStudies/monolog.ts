import type { CaseStudy, CaseStudyCopy, CaseStudyImage } from "./types";

const hero: CaseStudyImage = {
  src: "/images/monolog/hero.png",
  alt: "MonoLOG menu bar focus timer",
  width: 1562,
  height: 374,
};

const img = {
  competitor1: {
    src: "/images/monolog/competitor-1.png",
    alt: "Feature-management focus app screenshot",
    width: 1206,
    height: 2622,
  },
  competitor2: {
    src: "/images/monolog/competitor-2.png",
    alt: "Concept-experience focus app screenshot",
    width: 919,
    height: 2028,
  },
  competitor3: {
    src: "/images/monolog/competitor-3.png",
    alt: "Minimalist desktop timer screenshot",
    width: 888,
    height: 1931,
  },
  iter11: {
    src: "/images/monolog/iter1-1.png",
    alt: "Iteration 01 timer panel",
    width: 868,
    height: 1236,
  },
  iter12: {
    src: "/images/monolog/iter1-2.png",
    alt: "Iteration 01 desktop pet dialogue",
    width: 866,
    height: 1234,
  },
  iter13: {
    src: "/images/monolog/iter1-3.png",
    alt: "Iteration 01 desktop companion",
    width: 864,
    height: 1230,
  },
  iter14: {
    src: "/images/monolog/iter1-4.png",
    alt: "Iteration 01 main dashboard",
    width: 788,
    height: 1156,
  },
  iter15: {
    src: "/images/monolog/iter1-5.png",
    alt: "Iteration 01 focus data panel",
    width: 930,
    height: 1344,
  },
  iter16: {
    src: "/images/monolog/iter1-6.png",
    alt: "Iteration 01 settings and pet appearance",
    width: 824,
    height: 1154,
  },
  // Framer final UIs ~928 centered
  result1: {
    src: "/images/monolog/result-1.png",
    alt: "MonoLOG main interface conversation view",
    width: 1480,
    height: 1134,
    size: "lg",
  },
  result2: {
    src: "/images/monolog/result-2.png",
    alt: "MonoLOG main interface focus session",
    width: 1738,
    height: 1360,
    size: "lg",
  },
  menubar: {
    src: "/images/monolog/menubar.png",
    alt: "MonoLOG menu bar quick timer",
    width: 1714,
    height: 1038,
    size: "lg",
  },
} as const satisfies Record<string, CaseStudyImage>;

const zh: CaseStudyCopy = {
  category: "Vibe Coding/ 电脑端App设计",
  title: "MonoLOG：通过对话记录专注",
  topNavLabel: "顶部",
  meta: {
    toolsLabel: "工具",
    tools: "Figma, Cursor 等其它AI 工具",
    periodLabel: "时间",
    period: "2026.03, 2026.07",
    typeLabel: "类型",
    type: "个人项目",
  },
  intro:
    "MonoLOG（独白）是一款对话式记录工具，将专注记录融入自然对话，结合 AI 数字陪伴与监督，让整个过程更加自然、低负担、易坚持。",
  sections: [
    {
      id: "background",
      eyebrow: "Background",
      title: "我想做一个适合自己的专注类App",
      navLabel: "我想做一个适合自己的专注类App",
      blocks: [
        { type: "subheading", text: "起点：" },
        {
          type: "paragraph",
          text: "市面上已经有很多专注类 App，它们各有特色，也能满足不同用户的需求。但长期以来，我始终没能做到长期坚持。在体验了大量产品、回顾自己的使用过程后，因此，我总结出了几个让我放弃使用的主要原因：",
        },
        {
          type: "list",
          items: [
            {
              lead: "流程繁琐。",
              text: "计划和执行过程包含过多步骤，用户需要提前填写任务内容、类型、时间、日期等信息，开始专注前还需要完成多项设置，增加了开始的成本和心理负担。",
            },
            {
              lead: "缺少主动引导。",
              text: "专注产品通常只是记录和计时，当用户想偷懒或失去动力时，很少提供提醒、监督或鼓励。在一个人的坚持和努力过程中，时常也想要一个陪伴和提醒的伙伴。",
            },
            {
              lead: "电脑端选择较少。",
              text: "平时工作主要在电脑上，希望专注和记录也能在同一设备完成，避免频繁查看手机。但目前很多专注 App 都更偏向移动端，电脑上的使用体验比较有限。",
            },
          ],
        },
        { type: "subheading", text: "竞品分析：" },
        {
          type: "paragraph",
          text: "我把目前市面上的专注类 App 分为三类：",
        },
        {
          type: "list",
          items: [
            {
              lead: "功能管理型。",
              text: "以计划管理和数据记录为核心，提供任务规划、专注统计、习惯追踪等完整功能。例如 Calflow、3x3等产品，可以帮助用户管理目标并分析自己的专注情况。但较完整的功能也带来了更高的使用成本，开始一次专注前往往需要完成较多设置。",
            },
            {
              lead: "概念体验型。",
              text: "通过视觉隐喻和游戏化机制，将专注过程转化为更有趣的体验。例如 Forest 将专注比作种植树木，通过成长反馈激励用户坚持。这类产品能够提升使用动力，但丰富的视觉反馈也可能分散用户注意力。",
            },
            {
              lead: "极简工具型。",
              text: "强调快捷优雅，通过简单的计时功能帮助用户快速进入专注状态。例如一些极简计时工具，减少了复杂操作，但同时缺少计划管理、过程记录和持续反馈，长期使用可能缺乏反馈、动力不足。",
            },
          ],
        },
        {
          type: "imageGrid",
          columns: 3,
          images: [img.competitor1, img.competitor2, img.competitor3],
        },
      ],
    },
    {
      id: "design-goal",
      eyebrow: "DESIGN GOAL",
      title: "设计目标",
      navLabel: "设计目标",
      blocks: [
        {
          type: "metaRows",
          rows: [
            {
              label: "目标用户：",
              value: "20-30 岁，希望提升效率，同时需要陪伴和监督的年轻人",
            },
            {
              label: "主要功能：",
              value: "专注记录/ 过程反馈/ 主动引导或陪伴",
            },
            {
              label: "使用场景：",
              value: "工作、学习、健身等专注活动",
            },
            {
              label: "用户目标：",
              value:
                "轻松开始专注记录/ 减少时间浪费/ 帮助自己长期保持专注习惯/ 在坚持过程中获得成就感和意义",
            },
            {
              label: "关键词：",
              value:
                "低负担记录 / 快速启动 / 陪伴 / 主动引导与监督 / 长期坚持/ 电脑端/ 简洁视觉 / 轻量数据反馈",
            },
          ],
        },
      ],
    },
    {
      id: "ideation",
      eyebrow: "ideation",
      title: "两个主要方向：主动引导与快速开始",
      navLabel: "两个主要方向：主动引导与快速开始",
      blocks: [
        { type: "subheading", text: "主动引导" },
        {
          type: "paragraph",
          text: "像多邻国督促学习一样，专注软件也可以主动“关心”用户。接入 AI 是一个很好的机会，它可以提供更场景化、人性化的体验。通过理解你的上下文、你正在做什么，AI 能根据实际情况提供合适的反馈。",
        },
        { type: "subheading", text: "快速开始" },
        {
          type: "paragraph",
          text: "为了快速开始，电脑端的计时软件很适合放在顶部菜单栏中。不用单独打开窗口，即可快速开启专注记录。",
        },
      ],
    },
    {
      id: "iteration-01",
      eyebrow: "Iteration 01",
      title: "以桌面宠物陪伴为核心的专注工具",
      navLabel: "以桌面宠物陪伴为核心的专注工具",
      blocks: [
        {
          type: "paragraph",
          text: "版本 1 的起点来自一个开源桌面宠物clawd。它可以常驻在用户桌面上，并根据鼠标操作和电脑行为产生不同反馈。基于这一形式，我思考是否可以让桌面宠物不仅提供视觉陪伴，还能够通过文字交流给予用户主动引导。结合专注记录功能，它可以成为一个提供情感支持与监督的专注工具。",
        },
        { type: "subheading", text: "效果展示" },
        {
          type: "paragraph",
          text: "界面主要分为三部分：",
        },
        {
          type: "list",
          items: [
            {
              lead: "顶部菜单栏的快速计时。",
              text: "提供快捷入口，用户无需打开完整应用，即可快速开始或查看当前专注状态。",
            },
            {
              lead: "桌面宠物与对话框。",
              text: "作为主要陪伴入口，通过桌面互动和文字对话，为用户提供反馈、提醒和情感支持。",
            },
            {
              lead: "主面板。",
              text: "集中展示专注数据、积分、宠物外观和设置等内容。",
            },
          ],
        },
        {
          type: "imageGrid",
          columns: 3,
          images: [img.iter11, img.iter12, img.iter13],
        },
        {
          type: "imageGrid",
          columns: 3,
          images: [img.iter14, img.iter15, img.iter16],
        },
        { type: "subheading", text: "Vibe Coding 过程" },
        {
          type: "paragraph",
          text: "使用工具： Cursor + ChatGPT",
        },
        {
          type: "paragraph",
          text: "主要过程：",
        },
        {
          type: "list",
          items: [
            {
              lead: "梳理产品需求与交互逻辑：",
              text: "将初步想法与 ChatGPT 反复沟通，共同整理产品定位、功能需求和交互逻辑，并生成结构化 Prompt 作为开发基础。",
            },
            {
              lead: "通过 AI 生成初版原型：",
              text: "基于整理后的需求，通过 Cursor 快速生成可运行的产品原型，验证整体框架。",
            },
            {
              lead: "持续迭代交互与视觉细节：",
              text: "根据初版效果不断通过对话调整页面布局、交互方式和视觉风格。对于具体的圆角、间距等细节会通过局部调整代码快速修改。",
            },
            {
              lead: "接入 API 调试 AI 对话功能：",
              text: "连接 AI API，实现桌面宠物与用户的实时对话，并不断调整对话逻辑和反馈方式。",
            },
          ],
        },
        { type: "subheading", text: "使用体验和结果" },
        {
          type: "paragraph",
          text: "经过一段时间的实际使用，我发现桌面宠物虽然在专注中增加了陪伴感，但最终仍未能形成长期使用习惯。主要原因有三点：",
        },
        {
          type: "list",
          items: [
            {
              lead: "信息和功能过于分散：",
              text: "桌面宠物、对话框、主面板等多个窗口同时存在，功能入口较多，整体体验较为复杂。",
            },
            {
              lead: "陪伴感难以长期维持：",
              text: "桌面宠物初期具有新鲜感，但长期固定在桌面后，逐渐失去吸引力。",
            },
            {
              lead: "桌面宠物形式仍然偏重：",
              text: "除了专注记录外，还需要进行宠物互动、状态管理等额外操作。长期使用下来，桌面宠物反而成为一种额外负担。",
            },
          ],
        },
      ],
    },
    {
      id: "design-goal-2",
      eyebrow: "DESIGN GOAL",
      title: "设计目标 2.0",
      navLabel: "设计目标 2.0",
      blocks: [
        {
          type: "metaRows",
          rows: [
            {
              label: "目标用户：",
              value:
                "20-30 岁，追求简洁高效，希望提升效率，同时需要陪伴和监督的年轻人",
            },
            {
              label: "主要功能：",
              value: "专注记录/ 过程反馈/ 轻量的主动引导或陪伴",
            },
            {
              label: "使用场景：",
              value: "工作、学习、健身等专注活动",
            },
            {
              label: "用户目标：",
              value:
                "轻松开始专注记录/ 减少时间浪费/ 帮助自己长期保持专注习惯/ 在坚持过程中获得成就感和意义",
            },
            {
              label: "关键词：",
              value:
                "低负担记录 / 快速启动 / 陪伴 / 主动引导与监督 / 长期坚持/ 电脑端/ 简洁视觉 / 轻量数据反馈",
            },
          ],
        },
      ],
    },
    {
      id: "iteration-02-simplify",
      eyebrow: "Iteration 02",
      title: "从具象的陪伴走向轻量简洁",
      navLabel: "从具象的陪伴走向轻量简洁",
      blocks: [
        { type: "subheading", text: "合并窗口" },
        {
          type: "paragraph",
          text: "将原本分开的对话窗口和主面板进行合并，仅保留一个主界面和一个菜单栏快捷窗口，减少窗口切换，让整体使用体验更加轻量。",
        },
        { type: "subheading", text: "将桌面宠物简化为对话形象" },
        {
          type: "paragraph",
          text: "去除互动形式较复杂的具象桌面宠物，将其简化为对话中的 AI 形象。同时，用户可以邀请不同 AI 进入对话，一起陪伴并引导用户保持专注。",
        },
        { type: "subheading", text: "增加待办功能到对话框" },
        {
          type: "paragraph",
          text: "之前缺少计划功能，用户无法提前规划每天的任务，只能临时决定要做什么，或使用备忘录、日历等其他工具进行记录。",
        },
        {
          type: "paragraph",
          text: "因此，我将待办功能加入对话框，通过简单输入、设置待办和置顶任务等操作，让用户可以轻松完成“低负担”的计划。",
        },
      ],
    },
    {
      id: "iteration-02-monolog",
      eyebrow: "Iteration 02",
      title: "MonoLOG：和自己对话，也和自己塑造的伙伴对话",
      navLabel: "MonoLOG：和自己对话，也和自己塑造的伙伴对话",
      blocks: [
        { type: "subheading", text: "成果" },
        { type: "image", image: img.result1 },
        {
          type: "image",
          image: img.result2,
          caption: "主界面",
        },
        {
          type: "image",
          image: img.menubar,
          caption: "菜单栏",
        },
        { type: "subheading", text: "Vibe Coding 过程" },
        {
          type: "paragraph",
          text: "在新的迭代中，我从 0 开始重新搭建。由于第一次开发时更偏向快速验证想法，整体流程和代码结构较为混乱。基于前期经验，我重新梳理产品架构和实现方式，让整个过程更清晰。",
        },
        {
          type: "paragraph",
          text: "使用工具与框架： Cursor AI + Xcode + SwiftUI",
        },
        {
          type: "paragraph",
          text: "主要过程：",
        },
        {
          type: "list",
          items: [
            {
              lead: "梳理产品需求与技术方案：",
              text: "首先，我将 MonoLOG 的产品定位、核心功能和交互流程与 ChatGPT 沟通，整理为结构化需求文档，包括产品功能、页面结构、交互逻辑和视觉规范。此外，在新版本中，我希望采用 macOS 原生组件进行开发。一方面，原生设计规范能够帮助产品保持简洁、统一的视觉体验；另一方面，也为未来向移动端延伸提供更好的适配基础。因此，我选择使用 Apple 官方开发框架 SwiftUI 和开发工具 Xcode。通过 Cursor AI 辅助编写和修改 SwiftUI 代码，再使用 Xcode 进行编译、运行和调试，在实际体验中不断迭代产品。",
            },
            {
              lead: "从需求到 App 原型迭代：",
              text: "我首先将 Monolog 拆分为多个核心模块：对话式今日页面、菜单栏计时器、数据页面、AI 陪伴模块。通过 Cursor AI 将产品需求转化为具体代码实现。分板块的开发方式让我可以分别验证每个功能，并在保持整体结构清晰的同时快速迭代。",
            },
            {
              lead: "确定主视觉icon与配色：",
              text: "在完成核心功能后，我进一步完善 MonoLOG 的视觉部分，包括 Icon、菜单栏图标和整体配色。",
            },
          ],
        },
        {
          type: "paragraph",
          text: "对话是最容易开启的交互形式。通过将专注记录融入对话流程，用户可以低成本完成记录和计划，同时通过 AI 伙伴提升过程中的动力和趣味性，让每日专注逐渐成为一种习惯。",
        },
      ],
    },
  ],
};

const en: CaseStudyCopy = {
  category: "Vibe Coding / Desktop App Design",
  title: "MonoLOG: Tracking Focus Through Conversation",
  topNavLabel: "Top",
  meta: {
    toolsLabel: "Tools",
    tools: "Figma, Cursor, and Other AI Tools",
    periodLabel: "Period",
    period: "2026.03, 2026.07",
    typeLabel: "Type",
    type: "Personal Project",
  },
  intro:
    "MonoLOG (Monologue) is a conversational journaling tool that folds focus tracking into natural dialogue. With AI companionship and gentle accountability, the process feels natural, low-friction, and easier to stick with.",
  sections: [
    {
      id: "background",
      eyebrow: "Background",
      title: "I Wanted a Focus App That Actually Fits Me",
      navLabel: "I Wanted a Focus App That Actually Fits Me",
      blocks: [
        { type: "subheading", text: "Starting Point:" },
        {
          type: "paragraph",
          text: "There are already many focus apps on the market, each with its own strengths and audiences. Still, I had never managed to stick with one for long. After trying many products and reviewing my own usage, I identified a few main reasons I kept giving up:",
        },
        {
          type: "list",
          items: [
            {
              lead: "Too much friction.",
              text: "Planning and execution involve too many steps. Users have to fill in task content, type, time, date, and more, then complete several settings before focusing—raising both the startup cost and the psychological burden.",
            },
            {
              lead: "Little proactive guidance.",
              text: "Most focus products only log and time. When users feel lazy or lose motivation, they rarely get reminders, accountability, or encouragement. While sticking with something alone, people often want a companion who checks in.",
            },
            {
              lead: "Few strong desktop options.",
              text: "I work mostly on a computer and want focus and logging on the same device, without constantly checking my phone. Many focus apps are mobile-first, and the desktop experience is limited.",
            },
          ],
        },
        { type: "subheading", text: "Competitive Analysis:" },
        {
          type: "paragraph",
          text: "I grouped current focus apps into three types:",
        },
        {
          type: "list",
          items: [
            {
              lead: "Feature-management tools.",
              text: "Centered on planning and data, with task planning, focus stats, habit tracking, and more. Products like Calflow and 3x3 help users manage goals and analyze focus—but completeness also raises usage cost, with more setup before each session.",
            },
            {
              lead: "Concept-experience tools.",
              text: "They turn focus into a more playful experience through visual metaphors and gamification. Forest, for example, frames focus as growing trees and uses growth feedback to motivate. That can boost drive, but rich visual feedback can also distract.",
            },
            {
              lead: "Minimal tools.",
              text: "They emphasize speed and elegance, helping users enter focus quickly with simple timing. That reduces complexity, but often lacks planning, process logging, and ongoing feedback—so long-term use can feel under-rewarded.",
            },
          ],
        },
        {
          type: "imageGrid",
          columns: 3,
          images: [
            {
              ...img.competitor1,
              alt: "Screenshot of a feature-management focus app",
            },
            {
              ...img.competitor2,
              alt: "Screenshot of a concept-experience focus app",
            },
            {
              ...img.competitor3,
              alt: "Screenshot of a minimalist desktop timer",
            },
          ],
        },
      ],
    },
    {
      id: "design-goal",
      eyebrow: "Design Goal",
      title: "Design Goals",
      navLabel: "Design Goals",
      blocks: [
        {
          type: "metaRows",
          rows: [
            {
              label: "Target Users:",
              value:
                "People aged 20–30 who want better efficiency and also need companionship and accountability",
            },
            {
              label: "Core Features:",
              value: "Focus logging / in-process feedback / proactive guidance or companionship",
            },
            {
              label: "Contexts:",
              value: "Work, study, fitness, and other focus activities",
            },
            {
              label: "User Goals:",
              value:
                "Start focus logging easily / waste less time / build a lasting focus habit / feel progress and meaning while sticking with it",
            },
            {
              label: "Keywords:",
              value:
                "Low-friction logging / quick start / companionship / proactive guidance & accountability / long-term persistence / desktop / clean visuals / lightweight data feedback",
            },
          ],
        },
      ],
    },
    {
      id: "ideation",
      eyebrow: "Ideation",
      title: "Two Main Directions: Proactive Guidance and Quick Start",
      navLabel: "Two Main Directions: Proactive Guidance and Quick Start",
      blocks: [
        { type: "subheading", text: "Proactive Guidance" },
        {
          type: "paragraph",
          text: "Just as Duolingo nudges learning, a focus app can actively “care” about the user. AI is a strong fit here—it can feel more contextual and human. By understanding what you are doing, it can offer feedback that matches the moment.",
        },
        { type: "subheading", text: "Quick Start" },
        {
          type: "paragraph",
          text: "For a fast start on desktop, a timer belongs in the menu bar. Users can begin focus logging without opening a separate window.",
        },
      ],
    },
    {
      id: "iteration-01",
      eyebrow: "Iteration 01",
      title: "A Focus Tool Centered on a Desktop Pet Companion",
      navLabel: "A Focus Tool Centered on a Desktop Pet Companion",
      blocks: [
        {
          type: "paragraph",
          text: "Version 1 started from an open-source desktop pet, clawd. It can stay on the desktop and react to mouse and computer behavior. Building on that form, I wondered whether a desktop pet could offer not only visual presence, but also proactive guidance through text. Combined with focus logging, it could become a companion that supports and holds users accountable.",
        },
        { type: "subheading", text: "Demo" },
        {
          type: "paragraph",
          text: "The interface had three main parts:",
        },
        {
          type: "list",
          items: [
            {
              lead: "Menu-bar quick timer.",
              text: "A shortcut so users can start or check the current focus state without opening the full app.",
            },
            {
              lead: "Desktop pet and dialogue.",
              text: "The main companionship entry—desktop interaction and text chat for feedback, reminders, and emotional support.",
            },
            {
              lead: "Main panel.",
              text: "A place for focus data, points, pet appearance, settings, and more.",
            },
          ],
        },
        {
          type: "imageGrid",
          columns: 3,
          images: [
            { ...img.iter11, alt: "Iteration 01 timer panel" },
            { ...img.iter12, alt: "Iteration 01 desktop pet dialogue" },
            { ...img.iter13, alt: "Iteration 01 desktop companion" },
          ],
        },
        {
          type: "imageGrid",
          columns: 3,
          images: [
            { ...img.iter14, alt: "Iteration 01 main dashboard" },
            { ...img.iter15, alt: "Iteration 01 focus data panel" },
            { ...img.iter16, alt: "Iteration 01 settings and pet appearance" },
          ],
        },
        { type: "subheading", text: "Vibe Coding Process" },
        {
          type: "paragraph",
          text: "Tools: Cursor + ChatGPT",
        },
        {
          type: "paragraph",
          text: "Main steps:",
        },
        {
          type: "list",
          items: [
            {
              lead: "Clarify product needs and interaction logic:",
              text: "I iterated with ChatGPT on positioning, features, and flows, then produced structured prompts as a development foundation.",
            },
            {
              lead: "Generate a first prototype with AI:",
              text: "From those requirements, Cursor quickly produced a runnable prototype to validate the overall frame.",
            },
            {
              lead: "Iterate interaction and visual details:",
              text: "I kept adjusting layout, interaction, and visual style through conversation. Local code edits handled details like radius and spacing.",
            },
            {
              lead: "Connect APIs and tune AI dialogue:",
              text: "I wired an AI API for real-time pet–user chat and kept refining dialogue logic and feedback.",
            },
          ],
        },
        { type: "subheading", text: "Usage and Outcome" },
        {
          type: "paragraph",
          text: "After using it for a while, I found the desktop pet added companionship during focus, but still did not become a lasting habit. Three reasons stood out:",
        },
        {
          type: "list",
          items: [
            {
              lead: "Information and features were too scattered:",
              text: "The pet, dialogue, and main panel lived in multiple windows, with too many entry points and a complex overall experience.",
            },
            {
              lead: "Companionship was hard to sustain:",
              text: "The pet felt fresh at first, but after sitting on the desktop long-term it lost appeal.",
            },
            {
              lead: "The pet form was still too heavy:",
              text: "Beyond focus logging, users also managed pet interaction and state. Over time the pet became an extra burden.",
            },
          ],
        },
      ],
    },
    {
      id: "design-goal-2",
      eyebrow: "Design Goal",
      title: "Design Goals 2.0",
      navLabel: "Design Goals 2.0",
      blocks: [
        {
          type: "metaRows",
          rows: [
            {
              label: "Target Users:",
              value:
                "People aged 20–30 who want simplicity and efficiency, better focus, and light companionship with accountability",
            },
            {
              label: "Core Features:",
              value:
                "Focus logging / in-process feedback / lightweight proactive guidance or companionship",
            },
            {
              label: "Contexts:",
              value: "Work, study, fitness, and other focus activities",
            },
            {
              label: "User Goals:",
              value:
                "Start focus logging easily / waste less time / build a lasting focus habit / feel progress and meaning while sticking with it",
            },
            {
              label: "Keywords:",
              value:
                "Low-friction logging / quick start / companionship / proactive guidance & accountability / long-term persistence / desktop / clean visuals / lightweight data feedback",
            },
          ],
        },
      ],
    },
    {
      id: "iteration-02-simplify",
      eyebrow: "Iteration 02",
      title: "From Concrete Companionship to Light Simplicity",
      navLabel: "From Concrete Companionship to Light Simplicity",
      blocks: [
        { type: "subheading", text: "Merge Windows" },
        {
          type: "paragraph",
          text: "I merged the separate dialogue window and main panel, keeping only one main interface and one menu-bar shortcut window—fewer switches, a lighter overall experience.",
        },
        { type: "subheading", text: "Simplify the Desktop Pet into a Dialogue Persona" },
        {
          type: "paragraph",
          text: "I removed the more complex embodied desktop pet and simplified it into an AI persona inside conversation. Users can invite different AIs into the chat to accompany and guide focus.",
        },
        { type: "subheading", text: "Add Todos into the Dialogue" },
        {
          type: "paragraph",
          text: "Earlier versions lacked planning. Users could only decide tasks on the spot, or rely on notes, calendars, and other tools.",
        },
        {
          type: "paragraph",
          text: "So I added todos into the dialogue—simple input, todo setup, and pinning—so planning stays low-friction.",
        },
      ],
    },
    {
      id: "iteration-02-monolog",
      eyebrow: "Iteration 02",
      title: "MonoLOG: Talk with Yourself, and with the Companions You Shape",
      navLabel: "MonoLOG: Talk with Yourself, and with the Companions You Shape",
      blocks: [
        { type: "subheading", text: "Outcome" },
        {
          type: "image",
          image: {
            ...img.result1,
            alt: "MonoLOG main interface conversation view",
          },
        },
        {
          type: "image",
          image: {
            ...img.result2,
            alt: "MonoLOG main interface focus session",
          },
          caption: "Main interface",
        },
        {
          type: "image",
          image: {
            ...img.menubar,
            alt: "MonoLOG menu bar quick timer",
          },
          caption: "Menu bar",
        },
        { type: "subheading", text: "Vibe Coding Process" },
        {
          type: "paragraph",
          text: "In this iteration I rebuilt from zero. The first version prioritized fast idea validation, so the flow and code structure were messy. With that experience, I restructured the product architecture and implementation for clearer progress.",
        },
        {
          type: "paragraph",
          text: "Tools and stack: Cursor AI + Xcode + SwiftUI",
        },
        {
          type: "paragraph",
          text: "Main steps:",
        },
        {
          type: "list",
          items: [
            {
              lead: "Clarify product needs and technical approach:",
              text: "I worked with ChatGPT on MonoLOG’s positioning, core features, and flows, then turned them into a structured requirements doc covering features, page structure, interaction logic, and visual rules. I also wanted native macOS components—cleaner, more consistent visuals, and a better base for future mobile. So I chose SwiftUI and Xcode, used Cursor AI to write and revise SwiftUI, then compiled, ran, and debugged in Xcode while iterating from real use.",
            },
            {
              lead: "From requirements to app prototype:",
              text: "I split MonoLOG into core modules: conversational Today page, menu-bar timer, data page, and AI companion. Cursor AI helped turn requirements into code. Building by module let me validate each feature while keeping the overall structure clear.",
            },
            {
              lead: "Define the icon and color system:",
              text: "After the core features, I refined MonoLOG’s visuals—app icon, menu-bar icon, and overall color.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Conversation is the easiest interaction to start. By folding focus logging into dialogue, users can record and plan at low cost, while AI companions add motivation and playfulness—so daily focus can gradually become a habit.",
        },
      ],
    },
  ],
};

/**
 * Framer accent `rgb(60, 70, 249)` on /proj/5 closing copy;
 * also matches MonoLOG product UI blues in result screens.
 * (Framer section eyebrows on this page are currently gray — we use the
 * product accent so dots + eyebrows share one theme like PLATTE.)
 */
export const MONOLOG_THEME_COLOR = "#3c46f9";

export const monologCaseStudy = {
  id: "5",
  hero,
  themeColor: MONOLOG_THEME_COLOR,
  zh,
  en,
} as const;

export function getMonologCaseStudy(
  locale: "zh" | "en",
): CaseStudy {
  const copy = locale === "en" ? en : zh;
  return {
    id: monologCaseStudy.id,
    hero: monologCaseStudy.hero,
    themeColor: monologCaseStudy.themeColor,
    demoEmbed: true,
    ...copy,
  };
}
