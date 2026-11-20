import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <StaggerGroup className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <StaggerItem>
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgb(103_232_249)]" />
          {eyebrow}
        </span>
      </StaggerItem>
      <StaggerItem>
        <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </StaggerItem>
      {description && (
        <StaggerItem>
          <p
            className={cn(
              "mt-5 text-pretty text-base leading-relaxed text-mist-300 sm:text-lg",
              centered && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </StaggerItem>
      )}
    </StaggerGroup>
  );
}
