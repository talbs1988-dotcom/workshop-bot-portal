"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "w-full h-12 px-4 rounded-xl border bg-white text-ink placeholder:text-smoke/60",
          "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
          "transition-shadow",
          error ? "border-red-400" : "border-line",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";
