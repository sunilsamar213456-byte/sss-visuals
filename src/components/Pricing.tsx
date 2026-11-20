import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingTiers, type PricingTier } from "@/data/content";
import { cn } from "@/utils/cn";

type Billing = "project" | "retainer";

const billingOptions: { value: Billing; label: string }[] = [
  { value: "project", label: "Per project" },
  { value: "retainer", label: "Monthly retainer" },
];

const formatUSD = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("project");

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title={
            <>
              Transparent pricing.{" "}
              <span className="font-serif font-normal italic text-gradient">Serious</span> production value.
            </>
          }
          description="Fixed scope and clear deliverables in USD. Crew, travel and location costs are itemized in every proposal."
        />

        <Reveal className="mt-10 flex justify-center">
          <div role="group" aria-label="Billing type" className="glass inline-flex rounded-full p-1.5">
            {billingOptions.map((option) => {
              const on = billing === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setBilling(option.value)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                    on ? "text-ink-950" : "text-mist-300 hover:text-white"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{option.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.name} className="h-full">
              <PriceCard tier={tier} billing={billing} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-10 text-center text-sm text-mist-400">
          Need something bespoke?{" "}
          <a
            href="#contact"
            className="text-violet-200 underline-offset-4 hover:text-white hover:underline"
          >
            Tell us about your goals
          </a>{" "}
          and we’ll tailor a plan within 48 hours. Prices exclude applicable taxes.
        </Reveal>
      </div>
    </section>
  );
}

function PriceCard({ tier, billing }: { tier: PricingTier; billing: Billing }) {
  const amount = tier.price ? tier.price[billing] : null;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 sm:p-8",
        tier.highlighted
          ? "bg-ink-900 ring-1 ring-violet-400/50 shadow-[0_40px_120px_-30px_rgb(124_58_237/0.7)] lg:-my-4 lg:py-12"
          : "glass"
      )}
    >
      {tier.highlighted && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/25 blur-[80px]"
          />
        </>
      )}

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">{tier.name}</h3>
        {tier.badge && (
          <span className="rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 px-3 py-1 text-xs font-semibold text-ink-950">
            {tier.badge}
          </span>
        )}
      </div>
      <p className="relative mt-2 text-sm text-mist-300">{tier.tagline}</p>

      <div className="relative mt-8 flex h-[3.25rem] items-end gap-2">
        {amount !== null ? (
          <>
            <span className="mb-1 text-sm text-mist-400">From</span>
            <span className="relative inline-flex h-[3.25rem] items-end overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${tier.name}-${billing}`}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block text-5xl font-semibold leading-none tracking-tight tabular-nums"
                >
                  {formatUSD(amount)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="mb-1 text-sm text-mist-400">{billing === "retainer" ? "/ month" : "/ project"}</span>
          </>
        ) : (
          <span className="text-5xl font-semibold leading-none tracking-tight">Custom</span>
        )}
      </div>

      <div className="relative mt-8 h-px w-full bg-white/10" />

      <ul className="relative mt-8 flex flex-1 flex-col gap-3.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] text-mist-300">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-500/20 text-violet-200">
              <Check size={12} strokeWidth={3} aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-10">
        <Button
          href="#contact"
          size="lg"
          variant={tier.highlighted ? "primary" : "secondary"}
          className="w-full"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
