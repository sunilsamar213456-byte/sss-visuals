import { CountUp } from "@/components/ui/CountUp";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { clients, stats } from "@/data/content";
import { cn } from "@/utils/cn";

const logoStyles = [
  "font-serif text-3xl italic",
  "text-base font-semibold uppercase tracking-[0.3em]",
  "text-2xl font-bold tracking-tight",
  "text-2xl font-medium lowercase tracking-tight",
  "text-xl font-black tracking-tight",
  "text-2xl font-light uppercase tracking-[0.15em]",
  "font-serif text-2xl",
  "text-2xl font-semibold tracking-tighter",
];

export function SocialProof() {
  return (
    <section aria-label="Client trust and results" className="relative border-y border-white/[0.06] bg-ink-900/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-sm text-mist-400">A focused creative studio for brands, creators and growing businesses</p>
        </Reveal>

        <div className="mask-fade-x mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-center gap-16 pr-16"
              >
                {clients.map((name, i) => (
                  <li
                    key={`${copy}-${name}`}
                    className={cn(
                      "whitespace-nowrap text-white/35 transition-colors duration-300 hover:text-white/85",
                      logoStyles[i % logoStyles.length]
                    )}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <StaggerGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="bg-ink-950 p-6 sm:p-8">
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-mist-400">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
