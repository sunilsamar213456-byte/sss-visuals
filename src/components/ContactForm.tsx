import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";

type Status = "idle" | "submitting" | "success";
type FieldName = "name" | "email" | "brief";
type FieldErrors = Partial<Record<FieldName, string>>;

const serviceOptions = [
  "Brand film",
  "Commercial & ads",
  "Product photography",
  "Motion & 3D",
  "Post-production",
  "Something else",
];
const budgetOptions = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k +"];
const timelineOptions = ["Within 2 weeks", "1–2 months", "3+ months", "Flexible"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-mist-400/70 outline-none transition duration-300 hover:border-white/20 focus:border-violet-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/15 aria-[invalid=true]:border-rose-400/70";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const brief = String(data.get("brief") ?? "").trim();

    const next: FieldErrors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid work email address.";
    if (brief.length < 20) next.brief = "Share a little more detail (at least 20 characters).";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    // Front-end only: connect this to your CRM or form endpoint before going live.
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 1400);
  };

  return (
    <div id="inquiry" className="glass-strong scroll-mt-28 rounded-3xl p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/40"
            >
              <Check size={28} aria-hidden="true" />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Brief received, thank you.</h3>
            <p className="mt-3 max-w-sm text-mist-300">
Thanks — this is a preview form. It is not connected to an inbox yet. Connect your email or form service before publishing the website.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm text-violet-200 underline-offset-4 hover:text-white hover:underline"
            >
              Send another brief
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-label="Project inquiry form"
          >
            <div className="mb-7">
              <h3 className="text-2xl font-semibold tracking-tight">Request your proposal</h3>
              <p className="mt-1.5 text-sm text-mist-400">Share your brief and preferred timeline. Before publishing, connect this form to your business inbox.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="email" label="Work email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="company" label="Company or brand">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your company"
                  className={inputClass}
                />
              </Field>

              <Field id="service" label="Service">
                <SelectField id="service" name="service" options={serviceOptions} defaultValue={serviceOptions[0]} />
              </Field>

              <Field id="budget" label="Budget (USD)">
                <SelectField id="budget" name="budget" options={budgetOptions} defaultValue={budgetOptions[1]} />
              </Field>

              <Field id="timeline" label="Timeline">
                <SelectField id="timeline" name="timeline" options={timelineOptions} defaultValue={timelineOptions[1]} />
              </Field>

              <Field id="brief" label="Project brief" error={errors.brief} className="sm:col-span-2">
                <textarea
                  id="brief"
                  name="brief"
                  rows={4}
                  placeholder="Tell us about your brand, audience, goals and where this content will live."
                  required
                  aria-invalid={errors.brief ? true : undefined}
                  aria-describedby={errors.brief ? "brief-error" : undefined}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
                icon={
                  status === "submitting" ? (
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={18} aria-hidden="true" />
                  )
                }
              >
                {status === "submitting" ? "Sending…" : "Request my proposal"}
              </Button>
              <p className="max-w-xs text-xs leading-relaxed text-mist-400">
                Preview form only. No information is sent until an email or form endpoint is connected.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-mist-400">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  name,
  options,
  defaultValue,
}: {
  id: string;
  name: string;
  options: string[];
  defaultValue: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={`${inputClass} appearance-none pr-10`}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink-900 text-white">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mist-400"
      />
    </div>
  );
}
