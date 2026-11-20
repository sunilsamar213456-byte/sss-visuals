import { cn } from "@/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-indigo-600 to-blue-700 shadow-[0_8px_24px_-6px_rgb(99_102_241/0.7)]">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" aria-hidden="true">
          <path d="M6 4.5v15l13-7.5-13-7.5Z" fill="currentColor" />
        </svg>
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0"
        />
      </span>
      <span className="text-[15px] font-semibold tracking-[0.18em]">
        SSS<span className="text-mist-400">VISUALS</span>
      </span>
    </span>
  );
}
