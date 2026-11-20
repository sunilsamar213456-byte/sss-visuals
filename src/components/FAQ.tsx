import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Plus } from "lucide-react";
import { useState } from "react";
import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";
import { cn } from "@/utils/cn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="font-serif font-normal italic text-gradient">answered</span>.
              </>
            }
            description="Everything international clients usually ask before we start. Can’t find yours? Write to us."
          />

          <Reveal className="glass mt-10 rounded-3xl p-6">
            <p className="font-medium">Still curious?</p>
            <p className="mt-1 text-sm text-mist-300">Add your business email here before publishing the website.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-200 transition hover:text-white"
            >
              <Mail size={16} aria-hidden="true" />
              Add your business email before launch
            </span>
          </Reveal>
        </div>

        <StaggerGroup className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const buttonId = `faq-button-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <StaggerItem key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-base font-medium transition-colors duration-300 hover:text-violet-100 sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300",
                        isOpen && "rotate-45 border-violet-300/40 bg-violet-500/15 text-violet-100"
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-mist-300">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
