"use client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, Download, Pencil } from "lucide-react";
import { downloadConfig } from "@/lib/config";
import type { BotConfig } from "@/lib/state";
import { motion } from "framer-motion";

interface DoneProps {
  config: BotConfig;
  onEdit: () => void;
}

export function DoneScreen({ config, onEdit }: DoneProps) {
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
          {config.botName} מוכן לחיבור!
        </h2>
        <p className="text-smoke text-lg">
          ההגדרות שלך נשמרו. עכשיו נביא אותן לסדנה.
        </p>
      </motion.div>

      <Card className="mb-4">
        <div className="flex items-start gap-3">
          <Download className="w-6 h-6 text-gold-deep flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-ink mb-1">
              שלב 1 — הורידי את הקובץ
            </h3>
            <p className="text-sm text-smoke mb-3">
              קובץ ההגדרות שלך (JSON). שמרי במקום שתמצאי אותו —
              <strong> נצטרך אותו במפגש 1.</strong>
            </p>
            <Button size="lg" onClick={() => downloadConfig(config)}>
              <Download className="w-5 h-5" />
              הורידי את {config.botName || "הבוט שלי"}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="mb-4 bg-peach/30 border-peach">
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-gold-deep flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-ink mb-1">
              שלב 2 — מפגש 1 של הסדנה 💛
            </h3>
            <p className="text-sm text-smoke leading-relaxed">
              במפגש 1 (8.6.2026) — נחבר ביחד את {config.botName || "הבוט שלך"}{" "}
              ל-WhatsApp שלך, נסרוק QR, ומשם אתה מדבר איתו ישר מהטלפון.
              <br />
              <br />
              במפגשים הבאים נוסיף:
            </p>
            <ul className="text-sm text-smoke mt-2 space-y-1 list-disc list-inside">
              <li>🎯 ניהול לידים ב-Airtable</li>
              <li>📅 ניהול יומן חי</li>
              <li>🧾 חשבונית ירוקה</li>
              <li>☁️ מעבר לענן (לא תלוי במחשב שלך)</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Pencil className="w-5 h-5 text-smoke flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-ink mb-1">רוצה לשנות משהו?</h3>
            <p className="text-sm text-smoke mb-3">
              עוד אפשר לערוך לפני שמורידים סופית.
            </p>
            <Button variant="outline" size="md" onClick={onEdit}>
              <Pencil className="w-4 h-4" />
              ערוך הגדרות
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-center mt-8 text-xs text-smoke/70">
        💛 סדנת טל בשור · גרסה 1.2
      </div>
    </div>
  );
}
