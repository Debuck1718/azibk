"use client";

import { useEffect, useRef } from "react";

type Particle = {
  /** Position in CSS pixels, relative to the canvas box. */
  x: number;
  y: number;
  /** Base position the particle is pulled back toward. */
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
};

/**
 * ---------------------------------------------------------------------------
 * HeroCanvas — a hand-written 2D particle field.
 * ---------------------------------------------------------------------------
 * Why Canvas 2D and not WebGL here?
 *
 * A WebGL version of this is the thing everyone reaches for, and it is usually
 * the wrong call for a hero: you pay a three.js bundle, a context-loss handler,
 * a fallback path and a shader compile on first paint, to animate a few hundred
 * points. Canvas 2D clears all of that at this particle count and still holds
 * 60fps comfortably. WebGL earns its keep in this portfolio at ~10k+ elements
 * (see the Flux Engine case study) — below that it is overhead.
 *
 * Behaviour
 * ---------
 * - Particles drift, and the pointer pushes them away within a radius, then
 *   they spring back to their home position. `grow` radius on hover feels like
 *   the field is reacting to you specifically rather than animating on a loop.
 * - Lines are drawn between near neighbours, with opacity falling off by
 *   distance, so the field reads as a connected mesh rather than dust.
 * - The accent colour is read from the live CSS variable every frame, which is
 *   why the whole field re-tints when you hover a project card elsewhere on the
 *   page. No prop drilling, no re-render.
 * - Pauses when the tab is hidden or the hero scrolls out of view.
 * - Skipped entirely under prefers-reduced-motion (a static frame is drawn).
 */
export function HeroCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    // Re-bind through non-null aliases so the closures below are not repeated
    // checks against a nullable ref — `canvas` and `wrap` are narrowed above.
    const ctx: CanvasRenderingContext2D = context;
    const host: HTMLDivElement = wrap;
    const surface: HTMLCanvasElement = canvas;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };
    const PUSH_RADIUS = 130;
    const LINK_DISTANCE = 118;

    /** Particle budget scales with area but is capped — big monitors stay smooth. */
    function particleCount() {
      const byArea = Math.round((width * height) / 15000);
      return Math.max(28, Math.min(byArea, 120));
    }

    function build() {
      const count = particleCount();
      particles = new Array(count).fill(0).map(() => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          homeX: x,
          homeY: y,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size: Math.random() * 1.7 + 0.8,
        };
      });
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      surface.width = Math.floor(width * dpr);
      surface.height = Math.floor(height * dpr);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    /** Reads the live accent, so project-card hovers tint the whole field. */
    function accent(): { rgb: string; glow: string } {
      const styles = getComputedStyle(document.documentElement);
      const rgb = styles.getPropertyValue("--accent").trim() || "91 140 255";
      const glow =
        styles.getPropertyValue("--accent-glow").trim() || "143 176 255";
      return { rgb, glow };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // rgb triplets, e.g. "91 140 255" — composed with rgba() to avoid the
      // space-separated alpha syntax that older Safari does not parse.
      const { rgb: accentRgb, glow: accentGlow } = accent();

      // 1. Integrate — drift, pointer repulsion, spring home.
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < PUSH_RADIUS * PUSH_RADIUS && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            // Falls off linearly with distance — gentle at the rim, firm at centre.
            const force = (1 - dist / PUSH_RADIUS) * 3.4;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring back toward home, and damp, so the field always settles.
        p.vx += (p.homeX - p.x) * 0.006;
        p.vy += (p.homeY - p.y) * 0.006;
        p.vx *= 0.955;
        p.vy *= 0.955;

        // Hard-clamp so a fast pointer sweep can never fling one off-screen.
        p.x = Math.max(-40, Math.min(width + 40, p.x));
        p.y = Math.max(-40, Math.min(height + 40, p.y));
      }

      // 2. Links first, so nodes sit on top of the mesh.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const from = particles[i];
          const to = particles[j];
          const dx = from.x - to.x;
          const dy = from.y - to.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

          const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.34;
          ctx.strokeStyle = `rgba(${accentRgb}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      }

      // 3. Nodes.
      for (const p of particles) {
        ctx.fillStyle = `rgba(${accentGlow}, 0.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. A faint highlight where the pointer is, so the interaction is visible
      //    even where the field happens to be sparse.
      if (pointer.active) {
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          PUSH_RADIUS * 1.5,
        );
        grad.addColorStop(0, `rgba(${accentGlow}, 0.10)`);
        grad.addColorStop(1, `rgba(${accentGlow}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, PUSH_RADIUS * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();

    if (reduced) {
      // Draw one static frame and never animate.
      draw();
      return;
    }

    // Only animate while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(host);

    const ro = new ResizeObserver(() => resize());
    ro.observe(host);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
    // `reduced` is a one-shot read at mount; re-running would rebuild the field.
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
