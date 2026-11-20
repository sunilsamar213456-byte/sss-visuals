import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}

/**
 * Glass card with a cursor-following light spotlight.
 * Position is written straight to CSS variables to avoid re-renders.
 */
export function SpotlightCard({ children, className, lift = true }: SpotlightCardProps) {
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={cn(
        "glass group relative overflow-hidden rounded-3xl transition-[transform,border-color] duration-500",
        lift && "hover:-translate-y-1 hover:border-white/[0.16]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(139 92 246 / 0.16), transparent 70%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
