const VAN_GOGH_WELCOME = [
  "我是梵高。把星空画进画布之前，先把这一小时画进你的日程吧。",
  "到了。激情不能只停在心里——按下开始，让它落地。",
  "你好。今天我们不谈完美，只谈你肯不肯再画上一笔专注。",
];

const VAN_GOGH_FOCUS = [
  (task: string, duration: string) =>
    `${task} 完成了 ${duration}。这一笔很有力——别让画布空太久。`,
  (task: string, duration: string) =>
    `好看。${duration} 的专注像一层厚涂，堆起来就是作品。`,
  (task: string, duration: string) =>
    `收笔了：${task}。星空也是一笔笔画出来的。`,
];

const VAN_GOGH_CHAT = [
  "说得好。像补了一刀厚涂——画面一下子有了重心。",
  "我听见了。有些话不必完美，落在画布上就够了。",
  "继续说。我一边调色，一边听你。",
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function displayTask(task: string): string {
  const trimmed = task.trim();
  return trimmed ? `「${trimmed}」` : "这件事";
}

function durationLabel(seconds: number): string {
  if (seconds < 60) return `${seconds} 秒`;
  return `${Math.max(1, Math.floor(seconds / 60))} 分钟`;
}

export function welcomeReply(): string {
  return pick(VAN_GOGH_WELCOME);
}

export function focusCompletedReply(taskName: string, durationSeconds: number): string {
  const task = displayTask(taskName);
  const duration = durationLabel(durationSeconds);
  return pick(VAN_GOGH_FOCUS)(task, duration);
}

export function chatReply(text: string): string {
  const lower = text.toLowerCase();
  if (text.includes("累") || text.includes("休息") || text.includes("睡")) {
    return "累了就该停笔。星空也不会因为你歇一会儿而褪色。";
  }
  if (text.includes("画") || text.includes("颜色") || text.includes("灵感")) {
    return "颜色会自己找上门，只要你还肯站在画布前。你今天涂了哪一笔？";
  }
  if (text.includes("是的") || text.includes("好") || text.includes("嗯")) {
    return "那就这样。把画笔放下，也把心事轻轻搁在一边。";
  }
  if (lower.includes("hi") || text.includes("你好") || text.includes("在吗")) {
    return "在。颜料盘还没洗，人也就还在。";
  }
  return pick(VAN_GOGH_CHAT);
}
