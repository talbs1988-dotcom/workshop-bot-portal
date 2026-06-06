"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-ink/90 active:scale-[0.98] transition-all shadow-soft",
  ghost:
    "bg-transparent text-ink hover:bg-line/50 active:scale-[0.98] transition-all",
  outline:
    "bg-cream text-ink border border-line hover:bg-peach/30 active:scale-[0.98] transition-all",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-14 px-7 text-base rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
