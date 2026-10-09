"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/site";

/**
 * A fixed header that condenses on scroll, plus a full-screen menu on mobile.
 *
 * The active section is derived from an IntersectionObserver rather than scroll
 * position maths — it stays correct when sections change height, and it costs
 * nothing per frame.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[9000] transition-all duration-700 ease-expo ${
          scrolled ? "nav-scrolled py-3" : "border-b border-transparent py-5"
        }`}
      >
        <nav
          className="shell flex items-center justify-between gap-6"
          aria-label="Primary"
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.24em]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-ink-line text-[0.62rem] transition-colors duration-500 ease-expo group-hover:border-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent))]">
              {profile.initials}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`group relative flex items-baseline gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active === link.id
                      ? "text-bone"
                      : "text-bone-dim hover:text-bone"
                  }`}
                >
                  <span className="text-[0.6rem] text-bone-faint">
                    {link.index}
                  </span>
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-[rgb(var(--accent))] transition-transform duration-500 ease-expo ${
                      active === link.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group hidden items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] md:flex"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))] animate-pulse-soft"
              />
              <span className="link-underline">Get in touch</span>
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[9500] grid h-10 w-10 place-items-center rounded-full border border-ink-line md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span
                  className={`block h-px w-4 bg-bone transition-transform duration-500 ease-expo ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-bone transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-bone transition-transform duration-500 ease-expo ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={`fixed inset-0 z-[9400] md:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div className="glass flex h-full flex-col justify-center bg-ink/95 px-8">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li key={link.id} className="overflow-hidden">
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  style={{
                    transitionDelay: open ? `${i * 55 + 90}ms` : "0ms",
                  }}
                  className={`flex items-baseline gap-4 py-3 font-display text-fluid-xl tracking-display transition-all duration-700 ease-expo ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  <span className="font-mono text-xs text-bone-faint">
                    {link.index}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em] text-bone-dim">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline w-fit"
            >
              {profile.email}
            </a>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
