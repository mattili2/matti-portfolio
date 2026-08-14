"use client";

import { useEffect, useRef } from "react";

type DemoCursorProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  color: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

const CURSOR_LERP = 0.32;
const MAX_PARTICLES = 40;
const SPAWN_DISTANCE = 3.5;

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

/** Theme-colored cursor with soft gradient trail — canvas-rendered, no hard edges. */
export function DemoCursor({ containerRef, color }: DemoCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    renderX: 0,
    renderY: 0,
    visible: false,
    particles: [] as Particle[],
    lastSpawnX: 0,
    lastSpawnY: 0,
    rgb: hexToRgb(color),
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    state.rgb = hexToRgb(color);

    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    const spawnParticle = (x: number, y: number) => {
      state.particles.push({
        x: x + (Math.random() - 0.5) * 1.4,
        y: y + (Math.random() - 0.5) * 1.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        life: 0.55 + Math.random() * 0.35,
        size: 1.8 + Math.random() * 2.2,
      });

      if (state.particles.length > MAX_PARTICLES) {
        state.particles.splice(0, state.particles.length - MAX_PARTICLES);
      }
    };

    const drawGlow = (x: number, y: number, radius: number, alpha: number) => {
      const { r, g, b } = state.rgb;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      gradient.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.28})`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      const rect = el.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      state.particles = state.particles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98,
          life: particle.life * 0.93,
          size: particle.size * 0.985,
        }))
        .filter((particle) => particle.life > 0.015);

      for (const particle of state.particles) {
        drawGlow(particle.x, particle.y, particle.size * 2.4, particle.life * 0.42);
      }

      if (state.visible) {
        state.renderX += (state.targetX - state.renderX) * CURSOR_LERP;
        state.renderY += (state.targetY - state.renderY) * CURSOR_LERP;

        const { renderX, renderY } = state;
        drawGlow(renderX, renderY, 16, 0.16);
        drawGlow(renderX, renderY, 6.5, 0.72);
        drawGlow(renderX, renderY, 2.8, 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      state.targetX = event.clientX - rect.left;
      state.targetY = event.clientY - rect.top;
      state.visible = true;

      const dx = state.targetX - state.lastSpawnX;
      const dy = state.targetY - state.lastSpawnY;
      const distance = Math.hypot(dx, dy);

      if (distance >= SPAWN_DISTANCE) {
        const steps = Math.max(1, Math.floor(distance / SPAWN_DISTANCE));
        for (let step = 1; step <= steps; step += 1) {
          const t = step / steps;
          spawnParticle(state.lastSpawnX + dx * t, state.lastSpawnY + dy * t);
        }
        state.lastSpawnX = state.targetX;
        state.lastSpawnY = state.targetY;
      }
    };

    const onEnter = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      state.targetX = event.clientX - rect.left;
      state.targetY = event.clientY - rect.top;
      state.renderX = state.targetX;
      state.renderY = state.targetY;
      state.lastSpawnX = state.targetX;
      state.lastSpawnY = state.targetY;
      state.visible = true;
    };

    const onLeave = () => {
      state.visible = false;
      state.particles = [];
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[300]"
      aria-hidden
    />
  );
}
