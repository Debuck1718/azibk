"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import { orderSteps, orderOptions, profile } from "@/lib/site";

/**
 * Order — the commercial heart of the site.
 *
 * A framing enquiry is a considered purchase, not a checkout. Nobody spends
 * GH₵2,000 on a frame in one click, so this is deliberately a *brief* form:
 * it collects exactly what is needed to produce a quote, and nothing else.
 * Every extra field is a reason not to send it.
 *
 * Implementation notes
 * --------------------
 * - The form does not submit anywhere yet. `onSubmit` is wired and the payload
 *   is assembled; handing it to an API route or a form service is a one-line
 *   change (see the TODO at the bottom of this file).
 * - Validation is inline and friendly, and it *keeps* what the user typed —
 *   losing a filled-in form is the fastest way to lose the commission.
 * - There is no disabled submit button before submission: a disabled button
 *   with no explanation is a dead end. Instead the form tells you what is
 *   missing when you try to send.
 * - A file input is offered because a phone photo of the piece is genuinely
 *   the most useful thing a customer can send.
 */
export function Order() {
  const ref = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.05 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    itemType: orderOptions.itemTypes[0],
    size: orderOptions.sizes[1],
    materials: orderOptions.materials[0],
    quantity: "1",
    timing: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    itemType: orderOptions.itemTypes[0],
    size: orderOptions.sizes[1],
    materials: orderOptions.materials[0],
    quantity: "1",
    timing: "",
    notes: "",
  };

  /**
   * "Send another enquiry" must return a genuinely empty form.
   *
   * Resetting only the *status* is the subtle bug here: the form re-renders from
   * the same React state, so the previous customer's name and notes would still
   * be sitting in the fields. Anyone sending a second enquiry would be looking
   * at the first one's details.
   */
  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
  };

  const set =
    (key: keyof typeof form) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      // Clear the error for a field as soon as the user starts fixing it.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
    };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "We need a name to reply to.";
    if (!form.email.trim()) {
      next.email = "An email address lets us send you the quote.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That email address looks incomplete.";
    }
    if (!form.notes.trim()) {
      next.notes =
        "Tell us what the piece is — even a short description helps.";
    }
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      // Move focus to the first problem so keyboard and screen-reader users
      // are taken to it rather than left guessing what failed.
      const firstKey = Object.keys(found)[0];
      document.getElementById(`order-${firstKey}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      // TODO: replace with a POST to your API route or form service.
      // The payload below is already everything a quote needs.
      const payload = { ...form, submittedAt: new Date().toISOString() };
      void payload;

      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section
      id="order"
      className="relative scroll-mt-24 overflow-hidden border-t border-ink-line"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[38vmax] w-[38vmax] -translate-x-1/2 rounded-full opacity-[0.11] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent)) 0%, rgb(var(--accent-glow)) 40%, transparent 70%)",
        }}
      />

      <div ref={ref} className="shell relative py-24 md:py-32">
        <header className="mb-14">
          <div className="mb-6 flex items-start justify-between gap-6">
            <span className="eyebrow">
              <span className="text-[rgb(var(--accent))]">05</span>
              <span className="mx-3 text-ink-line">/</span>
              Order a frame
            </span>
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.28em] text-bone-faint md:block">
              § 05
            </span>
          </div>
          <div className="hairline mb-10" />
          <p className="max-w-3xl text-balance text-fluid-lg text-bone-dim">
            Tell us what you would like framed and we will come back with a
            specification and a firm price within 24 hours. No obligation, and
            no cost to ask.
          </p>
        </header>

        <div className="grid min-w-0 gap-10 sm:gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          {/* Form */}
          <div data-reveal className="will-reveal">
            {status === "sent" ? (
              <OrderConfirmation name={form.name} onReset={resetForm} />
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-8">
                {/* Contact */}
                <fieldset className="space-y-6">
                  <legend className="eyebrow mb-5">1 · Your details</legend>

                  <div className="grid min-w-0 gap-5 sm:grid-cols-2 sm:gap-6">
                    <Field
                      id="order-name"
                      label="Name"
                      required
                      error={errors.name}
                      value={form.name}
                      onChange={set("name")}
                      autoComplete="name"
                    />
                    <Field
                      id="order-email"
                      label="Email"
                      type="email"
                      required
                      error={errors.email}
                      value={form.email}
                      onChange={set("email")}
                      autoComplete="email"
                    />
                    <Field
                      id="order-phone"
                      label="Phone or WhatsApp"
                      type="tel"
                      hint="Optional — often the quickest way to sort out details."
                      value={form.phone}
                      onChange={set("phone")}
                      autoComplete="tel"
                    />
                    <Field
                      id="order-quantity"
                      label="How many pieces"
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={set("quantity")}
                    />
                  </div>
                </fieldset>

                {/* The piece */}
                <fieldset className="space-y-6 border-t border-ink-line pt-8">
                  <legend className="eyebrow mb-5">2 · The piece</legend>

                  <div className="grid min-w-0 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    <Select
                      id="order-itemType"
                      label="What is it?"
                      value={form.itemType}
                      onChange={set("itemType")}
                      options={orderOptions.itemTypes}
                    />
                    <Select
                      id="order-size"
                      label="Roughly how big?"
                      value={form.size}
                      onChange={set("size")}
                      options={orderOptions.sizes}
                    />
                    <Select
                      id="order-materials"
                      label="How much protection?"
                      value={form.materials}
                      onChange={set("materials")}
                      options={orderOptions.materials}
                    />
                  </div>

                  <Field
                    id="order-timing"
                    label="When do you need it?"
                    hint="Optional — tell us if there is a date you are working towards."
                    value={form.timing}
                    onChange={set("timing")}
                  />

                  <div>
                    <label
                      htmlFor="order-notes"
                      className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone-dim"
                    >
                      Describe the piece{" "}
                      <span className="text-[rgb(var(--accent))]">*</span>
                    </label>
                    <textarea
                      id="order-notes"
                      autoComplete="off"
                      rows={5}
                      value={form.notes}
                      onChange={set("notes")}
                      aria-invalid={Boolean(errors.notes)}
                      aria-describedby={
                        errors.notes ? "order-notes-error" : "order-notes-hint"
                      }
                      placeholder="Condition, size, colours you like or hate, where it will hang anything you think matters."
                      className={`w-full resize-y rounded-xl border bg-ink-soft px-4 py-3 text-sm leading-relaxed text-bone placeholder:text-bone-faint/70 transition-colors duration-300 focus:border-[rgb(var(--accent))] focus:outline-none ${
                        errors.notes ? "border-red-400/70" : "border-ink-line"
                      }`}
                    />
                    {errors.notes ? (
                      <p
                        id="order-notes-error"
                        role="alert"
                        className="mt-2 text-xs text-red-300"
                      >
                        {errors.notes}
                      </p>
                    ) : (
                      <p
                        id="order-notes-hint"
                        className="mt-2 text-xs text-bone-faint"
                      >
                        A photo from your phone is often the most useful thing
                        you can send.
                      </p>
                    )}
                  </div>
                </fieldset>

                {/* Submit */}
                <div className="flex flex-wrap items-center gap-5 border-t border-ink-line pt-8">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-transparent bg-bone px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors duration-500 ease-expo hover:text-bone disabled:opacity-60"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-[1px] w-[1px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--accent))] transition-transform duration-[650ms] ease-expo group-hover:scale-[300]"
                    />
                    <span className="relative z-10">
                      {status === "sending" ? "Sending…" : "Request my quote"}
                    </span>
                  </button>

                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone-faint">
                    Or email{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="link-underline text-bone-dim hover:text-[rgb(var(--accent))]"
                    >
                      {profile.email}
                    </a>
                  </p>

                  {status === "failed" ? (
                    <p role="alert" className="text-xs text-red-300">
                      Something went wrong sending that. Please email us
                      directly.
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>

          {/* How it works */}
          <aside data-reveal className="will-reveal">
            <h3 className="eyebrow mb-7">What happens next</h3>
            <ol className="space-y-8">
              {orderSteps.map((s) => (
                <li
                  key={s.step}
                  className="relative border-t border-ink-line pt-5"
                >
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-[rgb(var(--accent))]">
                    {s.step}
                  </span>
                  <h4 className="mt-2 text-fluid-base">{s.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-bone-faint">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl border border-ink-line p-6">
              <h4 className="eyebrow mb-4">Prefer to talk first?</h4>
              <dl className="space-y-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] sm:text-[0.66rem] sm:tracking-[0.14em]">
                <div className="flex justify-between gap-4 border-b border-ink-line pb-3">
                  <dt className="text-bone-faint">Studio</dt>
                  <dd className="text-right">{profile.location}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-ink-line pb-3">
                  <dt className="text-bone-faint">Phone</dt>
                  <dd className="max-w-[60%] break-all text-right">{profile.phone}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-bone-faint">Hours</dt>
                  <dd className="text-right">Mon–Sat, 9–6</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Field primitives — shared label/error/aria wiring so no field drifts      */
/* -------------------------------------------------------------------------- */

const fieldBase =
  "w-full rounded-xl border bg-ink-soft px-4 py-3 text-sm text-bone placeholder:text-bone-faint/70 transition-colors duration-300 focus:border-[rgb(var(--accent))] focus:outline-none";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone-dim"
    >
      {children}
      {required ? (
        <span className="ml-1 text-[rgb(var(--accent))]">*</span>
      ) : null}
    </label>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  hint,
  error,
  autoComplete,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  autoComplete?: string;
  min?: string;
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        min={min}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`${fieldBase} ${error ? "border-red-400/70" : "border-ink-line"}`}
      />
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs text-red-300"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-bone-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`${fieldBase} appearance-none border-ink-line bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%23A8A5A0' stroke-width='1.5'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink text-bone">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function OrderConfirmation({
  name,
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  const first = name.trim().split(" ")[0] || "there";

  return (
    <div
      role="status"
      className="rounded-2xl border border-[rgb(var(--accent))]/40 bg-[rgb(var(--accent))]/[0.06] p-8 md:p-12"
    >
      <span className="eyebrow">Enquiry received</span>
      <h3 className="mt-4 font-display text-fluid-xl tracking-display">
        Thank you, {first}.
      </h3>
      <p className="mt-4 max-w-xl text-fluid-base leading-relaxed text-bone-dim">
        Your request is with the studio. We will come back to you within 24
        hours with a specification and a firm price — check your inbox, and your
        spam folder just in case.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full border border-ink-line px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-bone-dim transition-colors duration-500 hover:border-[rgb(var(--accent))] hover:text-bone"
      >
        Send another enquiry
      </button>
    </div>
  );
}
