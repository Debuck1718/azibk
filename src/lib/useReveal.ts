'use client';

import { useEffect, useRef } from 'react';

type Options = {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
  /** Reveal the whole group at once instead of staggering children. */
  stagger?: boolean;
  /** ms between staggered children. */
  interval?: number;
  /** Reveal immediately, for above-the-fold content. */
  immediate?: boolean;
};

/**
 * Replaces an animation library with ~30 lines of IntersectionObserver.
 *
 * The reason I prefer this over a dependency: reveal animations are the single
 * most common source of "the page is blank until you scroll" bugs, and owning
 * the observer means owning the failure mode. If IntersectionObserver is
 * missing, everything is revealed rather than hidden forever.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const { threshold = 0.15, stagger = false, interval = 70, immediate = false } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets: HTMLElement[] = stagger
      ? Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
      : [root];

    if (targets.length === 0) return;

    // No observer (old browser, or reduced motion) → show everything now.
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (immediate || prefersReduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const order = Number(el.dataset.revealOrder ?? 0);
          window.setTimeout(() => el.classList.add('is-revealed'), order * interval);
          observer.unobserve(el);
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((el, i) => {
      if (stagger) el.dataset.revealOrder = String(i);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [threshold, stagger, interval, immediate]);

  return ref;
}

/** Reads a CSS custom property set on :root, e.g. --accent → "91 140 255". */
export function readAccent(): string {
  if (typeof window === 'undefined') return '91 140 255';
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  return raw || '91 140 255';
}
