"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const STROKE_WIDTH = 3;
const PORTRAIT_MAX = 400;
const TOOLS_GAP = 12;

const PRESET_COLORS = [
  "#999999",
  "#333333",
  "#D64545",
  "#4A7FD4",
  "#4FAF6E",
  "#E8923A",
] as const;

const BRUSH_CURSOR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='M4.5 16.5 7.2 13.8 13.5 7.5 15.5 9.5 9.2 15.8 6.5 17.5 4.5 16.5Z' fill='%23666'/%3E%3Cpath d='M13.2 6.2 15.2 8.2' stroke='%23666' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E\") 4 16, crosshair";

type HeroPortraitPadProps = {
  alt: string;
  clearLabel: string;
  colorLabel: string;
  sendLabel: string;
};

type Point = { x: number; y: number };

function applyBrushStyle(ctx: CanvasRenderingContext2D, color: string) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = STROKE_WIDTH;
}

function ClearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7h14M9 7V5h6v2M8 7l1 12h6l1-12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12 20 4l-6 16-2.5-6.5L4 12Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Homepage hero — full-width draw band (height = portrait row only). */
export function HeroPortraitPad({
  alt,
  clearLabel,
  colorLabel,
  sendLabel,
}: HeroPortraitPadProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const colorRef = useRef<string>(PRESET_COLORS[0]);
  const hasInkRef = useRef(false);
  const snapshotRef = useRef<HTMLCanvasElement | null>(null);

  const [inZone, setInZone] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [sending, setSending] = useState(false);

  const strokeColor = PRESET_COLORS[colorIndex];

  const markInk = () => {
    if (!hasInkRef.current) hasInkRef.current = true;
  };

  const resizeCanvas = useCallback(() => {
    const zone = zoneRef.current;
    const canvas = canvasRef.current;
    if (!zone || !canvas) return;

    const width = zone.clientWidth;
    const height = zone.clientHeight;
    if (width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width > 0 && canvas.height > 0) {
      const previous = document.createElement("canvas");
      previous.width = canvas.width;
      previous.height = canvas.height;
      const previousCtx = previous.getContext("2d");
      if (previousCtx) {
        previousCtx.drawImage(canvas, 0, 0);
        snapshotRef.current = previous;
      }
    }

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (snapshotRef.current) {
      ctx.drawImage(snapshotRef.current, 0, 0, width, height);
    }
    applyBrushStyle(ctx, colorRef.current);
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    colorRef.current = strokeColor;
    const ctx = ctxRef.current;
    if (ctx) applyBrushStyle(ctx, strokeColor);
  }, [strokeColor]);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(zone);
    return () => observer.disconnect();
  }, [resizeCanvas]);

  const toCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const strokeTo = (point: Point) => {
    const ctx = ctxRef.current;
    const last = lastPointRef.current;
    if (!ctx || !last) return;

    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
    markInk();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;

    const point = toCanvasPoint(event);
    drawingRef.current = true;
    lastPointRef.current = point;
    event.currentTarget.setPointerCapture(event.pointerId);

    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = colorRef.current;
      ctx.arc(point.x, point.y, STROKE_WIDTH / 2, 0, Math.PI * 2);
      ctx.fill();
      applyBrushStyle(ctx, colorRef.current);
      markInk();
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    strokeTo(toCanvasPoint(event));
  };

  const endStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const cycleColor = () => {
    setColorIndex((index) => (index + 1) % PRESET_COLORS.length);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    applyBrushStyle(ctx, colorRef.current);
    hasInkRef.current = false;
  };

  const composeExport = async (): Promise<Blob | null> => {
    const canvas = canvasRef.current;
    const portrait = portraitRef.current;
    const zone = zoneRef.current;
    if (!canvas || !portrait || !zone) return null;

    const width = Math.round(zone.clientWidth);
    const height = Math.round(zone.clientHeight);
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const portraitRect = portrait.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();
    const offsetX = portraitRect.left - zoneRect.left;
    const offsetY = portraitRect.top - zoneRect.top;

    await new Promise<void>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          portrait.offsetWidth,
          portrait.offsetHeight,
        );
        resolve();
      };
      img.onerror = () => reject(new Error("portrait load failed"));
      img.src = "/images/hero.png";
    });

    ctx.drawImage(canvas, 0, 0, width, height);

    return new Promise((resolve) => {
      exportCanvas.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  const sendToAuthor = async () => {
    if (!hasInkRef.current || sending) return;

    setSending(true);
    try {
      const blob = await composeExport();
      if (!blob) return;

      const form = new FormData();
      form.append("image", blob, `hero-doodle-${Date.now()}.png`);
      await fetch("/api/hero-doodle", { method: "POST", body: form });
    } finally {
      setSending(false);
    }
  };

  const toolBtnClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-black/40 bg-transparent text-black transition-colors hover:border-black hover:text-black";

  return (
    <div
      ref={zoneRef}
      className="relative w-full"
      style={{ cursor: inZone ? BRUSH_CURSOR : undefined }}
      onPointerEnter={() => setInZone(true)}
      onPointerLeave={() => {
        setInZone(false);
        drawingRef.current = false;
        lastPointRef.current = null;
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 z-10 touch-none"
        style={{ cursor: inZone ? BRUSH_CURSOR : "default" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endStroke}
        onPointerCancel={endStroke}
      />

      <div
        ref={portraitRef}
        className="pointer-events-none relative z-0 mx-auto w-[min(100%,400px)]"
      >
        <Image
          src="/images/hero.png"
          alt={alt}
          width={1019}
          height={1017}
          priority
          sizes="400px"
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>

      <div
        className={`absolute top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-150 ${
          inZone ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          left: `min(calc(50% + min(50%, ${PORTRAIT_MAX / 2}px) + ${TOOLS_GAP}px), calc(100% - 48px))`,
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={cycleColor}
          aria-label={colorLabel}
          title={colorLabel}
          className={toolBtnClass}
        >
          <span
            className="h-4 w-4 rounded-full bg-black"
            style={{ background: strokeColor }}
          />
        </button>

        <button
          type="button"
          onClick={clearCanvas}
          aria-label={clearLabel}
          title={clearLabel}
          className={toolBtnClass}
        >
          <ClearIcon />
        </button>

        <button
          type="button"
          onClick={sendToAuthor}
          aria-label={sendLabel}
          title={sendLabel}
          disabled={sending}
          className={`${toolBtnClass} disabled:opacity-40`}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
