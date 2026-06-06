"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  botName?: string;
}

export function ChatMessage({ role, content, botName }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex gap-2 max-w-[85%]",
        isUser ? "self-end flex-row-reverse" : "self-start",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0",
          isUser ? "bg-ink text-cream" : "bg-peach text-ink",
        )}
      >
        {isUser ? "אני" : "🤖"}
      </div>
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
          isUser ? "bg-ink text-cream" : "bg-white border border-line text-ink",
        )}
      >
        {!isUser && botName && (
          <div className="text-xs font-medium text-smoke mb-1">{botName}</div>
        )}
        {content}
      </div>
    </motion.div>
  );
}
