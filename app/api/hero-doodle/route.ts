import { NextResponse } from "next/server";

const MAX_BYTES = 2_500_000;
const AUTHOR_EMAIL = "2039526375@qq.com";
const DEFAULT_FROM = "Portfolio <hello@liyuxin.work>";

async function sendDiscordWebhook(webhookUrl: string, bytes: ArrayBuffer, filename: string) {
  const form = new FormData();
  form.append(
    "content",
    "Homepage doodle — someone drew on your line portrait.",
  );
  form.append(
    "file",
    new Blob([new Uint8Array(bytes)], { type: "image/png" }),
    filename,
  );

  const response = await fetch(webhookUrl, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Discord webhook failed (${response.status})`);
  }
}

async function sendResendEmail(apiKey: string, bytes: ArrayBuffer, filename: string) {
  const from = process.env.HERO_DOODLE_FROM_EMAIL ?? DEFAULT_FROM;
  const to = process.env.HERO_DOODLE_TO_EMAIL ?? AUTHOR_EMAIL;
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(bytes).toString("base64")
      : btoa(String.fromCharCode(...new Uint8Array(bytes)));

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Homepage doodle on your portrait",
      text: "Someone drew on your homepage line portrait. PNG attached.",
      attachments: [
        {
          filename,
          content: base64,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[hero-doodle] Resend error:", detail);
    throw new Error(`Resend failed (${response.status}): ${detail}`);
  }
}

async function saveLocally(bytes: ArrayBuffer, filename: string) {
  const { mkdir, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const dir = join(process.cwd(), ".data", "hero-doodles");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), Buffer.from(bytes));
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const image = form.get("image");

    if (image == null || typeof image === "string") {
      return NextResponse.json({ error: "Missing image" }, { status: 400 });
    }

    if (image.size <= 0 || image.size > MAX_BYTES) {
      return NextResponse.json({ error: "Invalid image size" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const filename = image.name.endsWith(".png")
      ? image.name.replace(/[^\w.-]/g, "_")
      : `hero-doodle-${Date.now()}.png`;

    const webhook = process.env.HERO_DOODLE_WEBHOOK_URL?.trim();
    const resendKey = process.env.RESEND_API_KEY?.trim();

    if (webhook) {
      await sendDiscordWebhook(webhook, bytes, filename);
      return NextResponse.json({ ok: true, via: "webhook" });
    }

    if (resendKey) {
      await sendResendEmail(resendKey, bytes, filename);
      return NextResponse.json({ ok: true, via: "email" });
    }

    // Local `next dev` fallback — open the PNG under `.data/hero-doodles/`.
    try {
      await saveLocally(bytes, filename);
      return NextResponse.json({
        ok: true,
        via: "local",
        path: `.data/hero-doodles/${filename}`,
      });
    } catch {
      return NextResponse.json(
        {
          error:
            "No delivery channel configured. Set HERO_DOODLE_WEBHOOK_URL or RESEND_API_KEY.",
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("[hero-doodle]", error);
    return NextResponse.json({ error: "Failed to save doodle" }, { status: 500 });
  }
}
