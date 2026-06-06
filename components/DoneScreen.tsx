"use client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, Download, MessageCircle, Sparkles } from "lucide-react";
import { downloadConfig } from "@/lib/config";
import type { BotConfig } from "@/lib/state";
import { motion } from "framer-motion";

interface DoneProps {
  config: BotConfig;
  onChat: () => void;
}

export function DoneScreen({ config, onChat }: DoneProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="text-center mb-8"
      >
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2 text-balance">
          {config.botName} פעיל!
        </h2>
        <p className="text-smoke text-lg">הבוט שלך מוכן ומחכה לך</p>
      </motion.div>

      <Card className="mb-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-ink mb-1">המוח החכם שלו פעיל</h3>
            <p className="text-sm text-smoke">
              חזרי לצ'אט מתי שתרצי ודברי איתו. הוא יזכור את האופי שבחרת.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={onChat}
              className="mt-3"
            >
              <MessageCircle className="w-4 h-4" />
              חזרה לצ'אט
            </Button>
          </div>
        </div>
      </Card>

      <Card className="mb-4">
        <div className="flex items-start gap-3">
          <Download className="w-5 h-5 text-gold-deep flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-ink mb-1">שמרי את ההגדרות שלך</h3>
            <p className="text-sm text-smoke mb-3">
              בסדנה — תעלי את הקובץ הזה כדי לחבר את הבוט לוואטסאפ.
            </p>
            <Button onClick={() => downloadConfig(config)}>
              <Download className="w-4 h-4" />
              הורידי את הקובץ
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-peach/30 border-peach">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gold-deep flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-ink mb-1">נתראה בסדנה 💛</h3>
            <p className="text-sm text-smoke">
              במפגש 1 — נחבר את {config.botName} ל-WhatsApp שלך. במפגש 2-4 —
              נוסיף יומן, משימות, חשבוניות, ועוד.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
