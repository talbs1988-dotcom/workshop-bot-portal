"use client";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface EmojiTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  emoji: string;
  label: string;
  selected?: boolean;
}

export function EmojiTile({
  emoji,
  label,
  selected,
  className,
  ...props
}: EmojiTileProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all",
        "hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? "border-gold bg-peach/40 shadow-card"
          : "border-line bg-white hover:border-gold/50",
        className,
      )}
      {...props}
    >
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
    </button>
  );
}
