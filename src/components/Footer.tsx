import { Marquee } from "./ui/Marquee";
import { profile } from "@/lib/site";

export function Footer() {
  // Built from the real strings rather than hard-coded, so it cannot drift.
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-line">
      {/* Oversized wordmark — the last thing you see, deliberately too big. */}
      <div className="overflow-hidden py-10" aria-hidden="true">
        <Marquee
          speed="slow"
          items={[
            profile.name.toUpperCase(),
            "FRAMEWORKS",
            "ENGINES",
            "SYSTEMS",
          ]}
          className="[&_span.font-display]:text-[15vw] [&_span.font-display]:leading-[0.85] [&_span.font-display]:text-ink-line"
        />
      </div>

      <div className="shell flex flex-col gap-6 border-t border-ink-line py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-faint">
          © {year} {profile.name} · {profile.role}
        </p>

        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-faint">
          Built with Next.js, TypeScript &amp; Tailwind — no template.
        </p>

        <a
          href="#top"
          className="group flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
        >
          Back to top
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-expo group-hover:-translate-y-1"
          >
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
