export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center py-32">
      <span className="eyebrow mb-6">
        <span className="text-[rgb(var(--accent))]">404</span>
        <span className="mx-3 text-ink-line">/</span>
        No such route
      </span>
      <h1 className="max-w-3xl font-display text-fluid-2xl font-medium leading-[0.98] tracking-tightest">
        This path does not resolve.
      </h1>
      <p className="mt-6 max-w-xl text-fluid-base text-bone-dim">
        The page you asked for is not here. The work, however, is one link away.
      </p>
      <a
        href="/"
        className="mt-10 w-fit rounded-full border border-ink-line px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-bone transition-colors duration-500 ease-expo hover:border-[rgb(var(--accent))]"
      >
        Back to the index
      </a>
    </section>
  );
}
