"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface PhaseShellProps {
  phaseKey: string;
  children: ReactNode;
}

export function PhaseShell({ phaseKey, children }: PhaseShellProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phaseKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
