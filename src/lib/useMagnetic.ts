'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic pointer attraction.
 *
 * The element leans toward the cursor while hovered and springs back on exit.
 * Everything goes through a single rAF loop and a CSS transform, so it never
 * touches layout and never fights the rest of the page for main-thread time.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 0.34) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;

    // Touch devices have no hover, and reduced-motion users asked us not to.
    if (reduced || coarse) return;

    let raf = 0;
    let current = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;

      const settled =
        Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;

      if (settled && target.x === 0 && target.y === 0) {
        el.style.transform = '';
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      target = { x: dx * strength, y: dy * strength };
      start();
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      start();
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    };
  }, [strength]);

  return ref;
}
