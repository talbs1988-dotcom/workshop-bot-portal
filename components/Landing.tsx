"use client";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto px-6 py-16">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="text-7xl md:text-8xl mb-6 inline-block"
      >
        ✨
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 text-balance">
        הבוט האישי שלך
      </h1>

      <p className="text-lg md:text-xl text-smoke mb-3 text-balance">
        בנו עוזר חכם ב-3 דקות. בלי קוד, בלי התקנות.
      </p>

      <p className="text-sm text-smoke/80 mb-10">
        סדנת טל בשור 💛 גרסה ראשונית — בסדנה עצמה נחבר אותו לוואטסאפ שלך
      </p>

      <Button size="lg" onClick={onStart} className="min-w-[220px]">
        בואו נתחיל 🚀
      </Button>

      <div className="mt-12 grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
        <Step emoji="🪪" text="פרטי עסק וכללים" />
        <Step emoji="🔑" text="חברי Claude" />
        <Step emoji="💬" text="דברי איתו!" />
      </div>
    </div>
  );
}

function Step({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl" aria-hidden>
        {emoji}
      </span>
      <span className="text-xs text-smoke">{text}</span>
    </div>
  );
}
