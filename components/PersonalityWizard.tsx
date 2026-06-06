"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { EmojiTile } from "@/components/ui/EmojiTile";
import type { BotConfig } from "@/lib/state";

interface WizardProps {
  initial: BotConfig;
  onComplete: (config: BotConfig) => void;
  onBack: () => void;
}

const TONES: Array<{
  value: BotConfig["tone"];
  emoji: string;
  label: string;
}> = [
  { value: "friendly", emoji: "💛", label: "חברית" },
  { value: "professional", emoji: "🎩", label: "מקצועית" },
  { value: "direct", emoji: "⚡", label: "ישירה" },
];

const FOCUSES: Array<{
  value: BotConfig["focus"];
  emoji: string;
  label: string;
}> = [
  { value: "tasks", emoji: "✅", label: "משימות" },
  { value: "reminders", emoji: "⏰", label: "תזכורות" },
  { value: "conversation", emoji: "💭", label: "שיחה" },
];

export function PersonalityWizard({
  initial,
  onComplete,
  onBack,
}: WizardProps) {
  const [config, setConfig] = useState<BotConfig>(initial);

  const canSubmit =
    config.botName.trim().length >= 2 && config.ownerName.trim().length >= 2;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🪪</div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-1">
          בואי נכיר את הבוט שלך
        </h2>
        <p className="text-smoke">3 שאלות מהירות</p>
      </div>

      <Card className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            איך תקראי לבוט שלך?
          </label>
          <Input
            placeholder="לדוגמה: מאיה, אלי, או כל שם שתבחרי"
            value={config.botName}
            onChange={(e) => setConfig({ ...config, botName: e.target.value })}
            maxLength={20}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            איך הוא יקרא לך?
          </label>
          <Input
            placeholder="השם שלך"
            value={config.ownerName}
            onChange={(e) =>
              setConfig({ ...config, ownerName: e.target.value })
            }
            maxLength={20}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            מה האופי שלו?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TONES.map((t) => (
              <EmojiTile
                key={t.value}
                emoji={t.emoji}
                label={t.label}
                selected={config.tone === t.value}
                onClick={() => setConfig({ ...config, tone: t.value })}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            במה הוא יעזור בעיקר?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {FOCUSES.map((f) => (
              <EmojiTile
                key={f.value}
                emoji={f.emoji}
                label={f.label}
                selected={config.focus === f.value}
                onClick={() => setConfig({ ...config, focus: f.value })}
              />
            ))}
          </div>
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
