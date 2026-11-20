import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight whitespace-nowrap transition-[box-shadow,background-color,border-color,color,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(120deg,#7c3aed_0%,#4f46e5_50%,#2563eb_100%)] text-white shadow-[0_12px_40px_-12px_rgb(124_58_237/0.8),inset_0_1px_0_rgb(255_255_255/0.25)] hover:shadow-[0_18px_50px_-10px_rgb(79_70_229/0.9),inset_0_1px_0_rgb(255_255_255/0.3)]",
  secondary: "glass text-white hover:border-white/20 hover:bg-white/[0.08]",
  ghost: "text-mist-300 hover:bg-white/[0.06] hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

/**
 * Accessible button or link with optional magnetic pointer pull and a
 * light sweep on hover for primary actions.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  magnetic = false,
  type = "button",
  disabled,
  className,
}: ButtonProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 20, mass: 0.5 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!magnetic) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * 0.25);
    my.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[320%]"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
    </>
  );

  const motionProps = {
    style: { x, y },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} className={classes} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
