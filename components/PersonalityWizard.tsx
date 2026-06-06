"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { BotConfig, Permission } from "@/lib/state";
import { cn } from "@/lib/cn";

interface WizardProps {
  initial: BotConfig;
  onComplete: (config: BotConfig) => void;
  onBack: () => void;
}

const PERMISSION_LABELS: Array<{
  value: Permission;
  emoji: string;
  label: string;
  hint: string;
}> = [
  {
    value: "manage-tasks",
    emoji: "✅",
    label: "ניהול משימות",
    hint: "להוסיף ולסמן משימות שלך",
  },
  {
    value: "manage-calendar",
    emoji: "📅",
    label: "ניהול יומן",
    hint: "ליצור פגישות, להזכיר אירועים",
  },
  {
    value: "manage-leads",
    emoji: "🎯",
    label: "ניהול לידים",
    hint: "להוסיף לקוחות חדשים, לעדכן סטטוסים",
  },
  {
    value: "send-invoices",
    emoji: "🧾",
    label: "הוצאת חשבוניות",
    hint: "להוציא הצעות מחיר וחשבוניות",
  },
  {
    value: "reply-to-others",
    emoji: "📨",
    label: "מענה לאחרים",
    hint: "לענות גם להודעות מאנשים אחרים",
  },
  {
    value: "share-private-info",
    emoji: "🔓",
    label: "שיתוף מידע פרטי",
    hint: "לשתף איתי פרטים על עסקאות, מצב פיננסי",
  },
];

export function PersonalityWizard({
  initial,
  onComplete,
  onBack,
}: WizardProps) {
  const [config, setConfig] = useState<BotConfig>(initial);

  const canSubmit =
    config.botName.trim().length >= 2 && config.ownerName.trim().length >= 2;

  function togglePermission(p: Permission) {
    setConfig((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(p)
        ? prev.permissions.filter((x) => x !== p)
        : [...prev.permissions, p],
    }));
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🪪</div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-1">
          בואי נכיר את הבוט שלך
        </h2>
        <p className="text-smoke">קצת פרטים — בלי זה הוא לא יידע איפה להתחיל</p>
      </div>

      <Card className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              👤 שם הבוט
            </label>
            <Input
              placeholder="מאיה, אלי, או כל שם"
              value={config.botName}
              onChange={(e) =>
                setConfig({ ...config, botName: e.target.value })
              }
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              💁‍♀️ השם שלך
            </label>
            <Input
              placeholder="ככה הוא יקרא לך"
              value={config.ownerName}
              onChange={(e) =>
                setConfig({ ...config, ownerName: e.target.value })
              }
              maxLength={20}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            📱 מספר WhatsApp שלך
            <span className="font-normal text-smoke mr-2 text-xs">
              (לסדנה — נחבר אותו אז)
            </span>
          </label>
          <Input
            placeholder="0501234567"
            value={config.whatsappPhone}
            onChange={(e) =>
              setConfig({ ...config, whatsappPhone: e.target.value })
            }
            type="tel"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            💼 מה העסק שלך עושה?
            <span className="font-normal text-smoke mr-2 text-xs">
              (משפט קצר)
            </span>
          </label>
          <Input
            placeholder="לדוגמה: יועצת שיווק לבעלי עסקים קטנים"
            value={config.businessType}
            onChange={(e) =>
              setConfig({ ...config, businessType: e.target.value })
            }
            maxLength={120}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            🛡️ מה מותר לבוט לעשות?
          </label>
          <div className="space-y-2">
            {PERMISSION_LABELS.map((p) => {
              const checked = config.permissions.includes(p.value);
              return (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => togglePermission(p.value)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-xl border-2 text-right transition-all",
                    "hover:bg-cream",
                    checked
                      ? "border-gold bg-peach/30"
                      : "border-line bg-white",
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",
                      checked
                        ? "bg-ink text-cream"
                        : "border-2 border-line bg-white",
                    )}
                  >
                    {checked && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-ink text-sm">
                      <span className="me-2">{p.emoji}</span>
                      {p.label}
                    </div>
                    <div className="text-xs text-smoke">{p.hint}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            📝 כללים נוספים שחשובים לך
            <span className="font-normal text-smoke mr-2 text-xs">
              (אופציונלי — לדוגמה: "אל תזכיר את ההכנסות אם אני לא שואלת")
            </span>
          </label>
          <textarea
            className="w-full min-h-24 px-4 py-3 rounded-xl border border-line bg-white text-ink placeholder:text-smoke/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-shadow"
            placeholder="כתבי כאן כל מה שאת רוצה שהבוט ידע..."
            value={config.customRules}
            onChange={(e) =>
              setConfig({ ...config, customRules: e.target.value })
            }
            maxLength={500}
          />
        </div>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={onBack}>
          ← חזרה
        </Button>
        <Button
          onClick={() => onComplete(config)}
          disabled={!canSubmit}
          size="lg"
        >
          המשך →
        </Button>
      </div>
    </div>
  );
}
