import { ArrowUpRight, Globe2, Layers, Play, ShieldCheck, Timer } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reassurances = [
  { icon: Timer, text: "Clear communication at every milestone" },
  { icon: Layers, text: "Scope and pricing agreed before work" },
  { icon: ShieldCheck, text: "NDA available on request" },
  { icon: Globe2, text: "International projects welcome" },
];

export function CTA() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 p-6 sm:p-10 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-24 -top-32 h-[28rem] w-[28rem] animate-aurora rounded-full bg-violet-600/35 blur-[120px]" />
            <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] animate-aurora rounded-full bg-cyan-400/20 blur-[130px] [animation-delay:-9s]" />
            <div className="bg-grid grid-mask absolute inset-0 opacity-60" />
          </div>

          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Start your project"
                title={
                  <>
                    Let’s make your next story{" "}
                    <span className="font-serif font-normal italic text-gradient">unforgettable</span>.
                  </>
                }
                description="Tell us what you’re building. We’ll reply with a clear plan, a fixed-scope proposal and a realistic timeline, after reviewing your brief."
              />

              <StaggerGroup className="mt-10 flex flex-col gap-3 sm:flex-row">
                <StaggerItem>
                  <Button href="#inquiry" size="lg" magnetic icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                    Hire Us
                  </Button>
                </StaggerItem>
                <StaggerItem>
                  <Button
                    href="#work"
                    variant="secondary"
                    size="lg"
                    icon={<Play size={15} className="fill-current" aria-hidden="true" />}
                  >
                    View Our Work
                  </Button>
                </StaggerItem>
              </StaggerGroup>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {reassurances.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex items-center gap-3 text-sm text-mist-300">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-inset ring-white/10">
                        <Icon size={16} className="text-cyan-200" aria-hidden="true" />
                      </span>
                      {item.text}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-10 text-sm text-mist-400">
                Prefer email?{" "}
                <span className="text-violet-200 underline-offset-4 hover:text-white hover:underline"
                >
                  Add your business email before launch
                </span>
              </p>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
