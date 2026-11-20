import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services } from "@/data/content";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Everything your brand needs to{" "}
                <span className="font-serif font-normal italic text-gradient">be seen</span>.
              </>
            }
            description="One studio for strategy, production and post, so your story stays consistent from the first frame to the final cut."
          />
          <Reveal>
            <Button href="#contact" variant="secondary" icon={<ArrowRight size={16} aria-hidden="true" />}>
              Discuss your project
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title} className="h-full">
                <SpotlightCard className="h-full p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/10 ring-1 ring-inset ring-white/10">
                      <Icon size={22} className="text-violet-200" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist-400 transition duration-500 group-hover:rotate-45 group-hover:border-violet-300/50 group-hover:text-white"
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-mist-300">
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-mist-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
