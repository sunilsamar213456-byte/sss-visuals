import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { benefits, crewRoles, processSteps } from "@/data/content";

export function Benefits() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why SSSVISUALS"
          title={
            <>
              Premium craft,{" "}
              <span className="font-serif font-normal italic text-gradient">without the friction</span>.
            </>
          }
          description="We remove the usual pain points of working with a production studio across borders: unclear scope, slow replies and inconsistent quality."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          <Reveal className="h-full">
            <SpotlightCard lift={false} className="flex h-full flex-col p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-[90px]"
              />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">Senior crew, every time</p>
              <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                One senior team pitches, shoots and finishes your film.
              </h3>
              <p className="mt-5 leading-relaxed text-mist-300">
                No handoffs to junior teams. Every project is led by senior creatives who stay accountable from the
                first call to final delivery.
              </p>

              <ul className="mt-8 space-y-3">
                {crewRoles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <span>{role}</span>
                    <Check size={16} className="text-emerald-300" aria-hidden="true" />
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-t border-white/10 pt-8">
                <p className="text-4xl font-semibold tracking-tight">
                  <CountUp to={10} suffix=" days" />
                </p>
                <p className="mt-1 text-sm text-mist-400">Average turnaround from brief to final master</p>
              </div>
            </SpotlightCard>
          </Reveal>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title} className="h-full">
                  <SpotlightCard className="h-full p-7 sm:p-8">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] ring-1 ring-inset ring-white/10">
                      <Icon size={20} className="text-cyan-200" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight">{benefit.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mist-300">{benefit.description}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const connectorTransition = { duration: 1.6, ease: EASE, delay: 0.2 };
  const connectorViewport = { once: true, margin: "-100px 0px" };

  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              From first call to{" "}
              <span className="font-serif font-normal italic text-gradient">final master</span> in five steps.
            </>
          }
          description="A clear, transparent process designed for busy teams working across borders."
        />

        <div className="relative mt-20">
          {/* Desktop connector: spans from the first step to the last step */}
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-white/10 md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-violet-400 via-cyan-300 to-amber-300"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={connectorViewport}
              transition={connectorTransition}
            />
          </div>

          {/* Mobile connector: vertical line down the left edge */}
          <div aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-white/10 md:hidden">
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-violet-400 via-cyan-300 to-amber-300"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={connectorViewport}
              transition={connectorTransition}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {processSteps.map((step, i) => (
              <li key={step.step} className="list-none">
                <Reveal delay={i * 0.1} className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
                  <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink-900 ring-1 ring-white/15 shadow-[0_0_30px_-8px_rgb(139_92_246/0.6)]">
                    <span className="font-mono text-sm text-violet-200">{step.step}</span>
                  </div>
                  <div className="md:mt-7">
                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-300">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 flex justify-center">
          <Button href="#contact" size="lg" magnetic icon={<ArrowUpRight size={18} aria-hidden="true" />}>
            Start with a discovery call
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
