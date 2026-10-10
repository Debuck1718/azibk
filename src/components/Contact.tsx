"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import { MagneticButton } from "./ui/MagneticButton";
import { profile } from "@/lib/site";

/**
 * Contact — the close.
 *
 * Typographic rather than a card: the email address is set at display size
 * because that is the single action this page is asking for. The word-by-word
 * stagger on the headline is the only motion here; a form at this point would
 * just add friction to the one thing you want the reader to do.
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.1 });
  const emailRef = useRef<HTMLAnchorElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Reset the "copied" confirmation after a beat, and clean the timer up.
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, denied permission) — fall back to
      // selecting the text so the user can copy it manually.
      const el = emailRef.current;
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const words = "Come and see the work in person.".split(" ");

  return (
    <section
      id="contact"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* Accent bloom behind the closing headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent)) 0%, rgb(var(--accent-glow)) 40%, transparent 70%)",
        }}
      />

      <div className="shell relative py-28 md:py-40">
        <div className="mb-10 flex items-start justify-between gap-6">
          <span className="eyebrow">
            <span className="text-[rgb(var(--accent))]">06</span>
            <span className="mx-3 text-ink-line">/</span>
            Visit or call
          </span>
        </div>
        <div className="hairline mb-16" />

        <h2 className="max-w-4xl font-display text-fluid-2xl font-medium leading-[1.02] tracking-tightest">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden pb-[0.08em] pr-[0.24em] align-bottom"
            >
              <span
                data-reveal
                className="will-reveal inline-block"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-reveal
          className="will-reveal mt-8 max-w-xl text-pretty text-fluid-base text-bone-dim"
        >
          A frame is easier to choose with the mouldings in your hand. Come to the studio to see
          the materials and the finish, or call if a form is not your thing — we are happy to
          talk through what you have and what it needs.
        </p>

        <div
          data-reveal
          className="will-reveal mt-12 flex flex-wrap items-center gap-5"
        >
          <MagneticButton href={`mailto:${profile.email}`} variant="solid">
            {profile.email}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3 w-3 transition-transform duration-500 ease-expo group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                d="M2 8h11M9 4l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>

          <button
            type="button"
            onClick={copy}
            className="group flex items-center gap-3 rounded-full border border-ink-line px-5 py-3.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone-dim transition-colors duration-500 ease-expo hover:border-[rgb(var(--accent))] hover:text-bone"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                copied ? "bg-[rgb(var(--accent))]" : "bg-bone-faint"
              }`}
            />
            {copied ? "Copied" : "Copy address"}
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </button>
        </div>

        {/* Anchored so the manual-copy fallback has a real text node to select. */}
        <a ref={emailRef} href={`mailto:${profile.email}`} className="sr-only">
          {profile.email}
        </a>

        <ul className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-line pt-8">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-bone-dim transition-colors duration-300 hover:text-[rgb(var(--accent))]"
              >
                <span className="link-underline">{social.label}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
