import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { EASE, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { testimonials } from "@/data/content";
import { cn } from "@/utils/cn";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const active = testimonials[index];

  // Auto-advance unless the user is interacting, and never when motion is reduced.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, index, total]);

  const step = (direction: 1 | -1) => setIndex((i) => (i + direction + total) % total);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative py-24 sm:py-32">
      <div
        className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16"
        onKeyDown={handleKeyDown}
      >
        <div>
          <SectionHeading
            eyebrow="The SSS VISUALS approach"
            title={
              <>
                A creative process built around{" "}
                <span className="font-serif font-normal italic text-gradient">across time zones</span>.
              </>
            }
            description="Clear communication, purposeful editing and platform-ready delivery — from the first brief to the final export."
          />

          <Reveal className="mt-10">
            <div role="tablist" aria-label="Choose a testimonial" className="grid gap-3">
              {testimonials.map((testimonial, i) => {
                const on = i === index;
                return (
                  <button
                    key={testimonial.name}
                    type="button"
                    role="tab"
                    id={`testimonial-tab-${i}`}
                    aria-selected={on}
                    aria-controls="testimonial-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border p-3.5 text-left transition-colors duration-300",
                      on ? "border-white/15 bg-white/[0.06]" : "border-transparent hover:bg-white/[0.03]"
                    )}
                  >
                    <img
                      src={testimonial.avatar}
                      alt=""
                      width={44}
                      height={44}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{testimonial.name}</p>
                      <p className="truncate text-sm text-mist-400">{testimonial.company}</p>
                    </div>
                    {on && (
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgb(103_232_249)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <SpotlightCard lift={false} className="p-8 sm:p-12">
              <Quote
                aria-hidden="true"
                className="absolute right-8 top-8 h-20 w-20 text-white/[0.05] sm:right-12 sm:top-12"
              />

              <div
                id="testimonial-panel"
                role="tabpanel"
                aria-labelledby={`testimonial-tab-${index}`}
                aria-live={paused ? "polite" : "off"}
                className="min-h-[340px] sm:min-h-[300px]"
              >
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={active.name}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div role="img" aria-label="Rated 5 out of 5" className="flex gap-1 text-amber-300">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="fill-current" aria-hidden="true" />
                      ))}
                    </div>

                    <blockquote className="mt-6 font-serif text-2xl leading-snug tracking-[-0.01em] sm:text-[1.9rem]">
                      <p>“{active.quote}”</p>
                    </blockquote>

                    <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={active.avatar}
                          alt={`Portrait of ${active.name}`}
                          width={48}
                          height={48}
                          loading="lazy"
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10"
                        />
                        <div>
                          <p className="font-semibold">{active.name}</p>
                          <p className="text-sm text-mist-400">
                            {active.role}, {active.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-semibold tracking-tight text-gradient">{active.metric}</p>
                        <p className="ml-auto max-w-[12rem] text-xs leading-snug text-mist-400">
                          {active.metricLabel}
                        </p>
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                <p className="font-mono text-sm text-mist-400">
                  <span className="text-white">{String(index + 1).padStart(2, "0")}</span> /{" "}
                  {String(total).padStart(2, "0")}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous testimonial"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:border-white/25 hover:bg-white/10 active:scale-95"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next testimonial"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:border-white/25 hover:bg-white/10 active:scale-95"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
