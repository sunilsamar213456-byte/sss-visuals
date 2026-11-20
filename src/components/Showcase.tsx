import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EASE, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio, workCategories, type WorkCategory, type WorkItem } from "@/data/content";
import { cn } from "@/utils/cn";

export function Showcase() {
  const [filter, setFilter] = useState<WorkCategory>("All");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const items = filter === "All" ? portfolio : portfolio.filter((item) => item.category === filter);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Stories we’ve shaped for brands{" "}
                <span className="font-serif font-normal italic text-gradient">around the world</span>.
              </>
            }
            description="A glimpse of films, campaigns and visuals produced for clients across industries and markets."
          />

          <Reveal className="self-start">
            <div role="group" aria-label="Filter projects by category" className="glass flex flex-wrap gap-1 rounded-full p-1.5">
              {workCategories.map((category) => {
                const on = filter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      on ? "text-ink-950" : "text-mist-300 hover:text-white"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-filter"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{category}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <WorkCard item={item} onOpen={() => setSelected(item)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="glass mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl p-7 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-lg font-semibold tracking-tight">Want a reel like this for your brand?</p>
            <p className="mt-1 text-sm text-mist-300">Share your brief and we’ll reply with a proposal within 48 hours.</p>
          </div>
          <Button href="#contact" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
            Hire Us
          </Button>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <Lightbox key={selected.id} item={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}

function WorkCard({ item, onOpen }: { item: WorkItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`View case study: ${item.title}`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800 text-left shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]"
    >
      <img
        src={item.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
        {item.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="translate-y-1 transition duration-500 group-hover:translate-y-0">
          <p className="text-lg font-semibold tracking-tight">{item.title}</p>
          <p className="mt-1 text-sm text-white/65">{item.summary}</p>
        </div>
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink-950 transition duration-500 lg:translate-y-2 lg:opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
    </button>
  );
}

function Lightbox({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      // Keep keyboard focus trapped inside the dialog.
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass-strong relative grid max-h-[92vh] w-full overflow-y-auto rounded-t-3xl sm:max-w-5xl sm:grid-cols-[1.25fr_1fr] sm:rounded-3xl"
      >
        <div className="relative min-h-[260px] bg-ink-800 sm:min-h-[460px]">
          <img src={item.image} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">
              {item.category} · {item.year}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/10"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <h3 id="case-title" className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-mist-400">{item.client}</p>
          <p className="mt-5 leading-relaxed text-mist-300">{item.summary}</p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-mist-400">Result</p>
            <p className="mt-2 text-base font-medium text-white">{item.result}</p>
          </div>

          <div className="mt-auto pt-8">
            <Button
              href="#contact"
              onClick={onClose}
              className="w-full"
              icon={<ArrowUpRight size={18} aria-hidden="true" />}
            >
              Start a project like this
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
