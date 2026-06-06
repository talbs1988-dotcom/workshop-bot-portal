"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ExternalLink, Gift } from "lucide-react";

interface ApiKeyStepProps {
  onComplete: (apiKey: string) => void;
  onBack: () => void;
}

export function ApiKeyStep({ onComplete, onBack }: ApiKeyStepProps) {
  const [key, setKey] = useState("");
  const [touched, setTouched] = useState(false);

  const looksValid = key.startsWith("sk-ant-") && key.length > 30;
  const error =
    touched && !looksValid ? "המפתח צריך להתחיל ב-sk-ant-" : undefined;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🔑</div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-1">
          חברי את המוח של הבוט
        </h2>
        <p className="text-smoke">
          המוח של הבוט שלך הוא Claude — נחבר אותו עכשיו
        </p>
      </div>

      <Card className="space-y-6">
        <div className="bg-peach/40 border border-peach rounded-xl p-4 flex gap-3">
          <Gift className="w-5 h-5 text-gold-deep flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-ink mb-1">
              קרדיט של $5 מתנה מ-Anthropic
            </p>
            <p className="text-smoke">
              חשבון חדש מקבל מספיק קרדיט לכל הסדנה. בלי כרטיס אשראי בהתחלה.
            </p>
          </div>
        </div>

        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-xl border border-line hover:border-gold hover:bg-cream transition-all group"
        >
          <div>
            <div className="font-medium text-ink mb-0.5">
              📚 מדריך: איך מקבלים API key
            </div>
            <div className="text-sm text-smoke">
              נכנסות ל-console.anthropic.com, מתחברות, "API Keys" → "Create Key"
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-smoke group-hover:text-ink transition-colors" />
        </a>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            הדביקי כאן את ה-API key שלך
          </label>
          <Input
            type="password"
            placeholder="sk-ant-..."
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              if (!touched) setTouched(true);
            }}
            error={error}
            autoComplete="off"
            spellCheck={false}
          />
          <p className="text-xs text-smoke/80 mt-2">
            🔒 המפתח שלך נשמר רק בדפדפן שלך. לא נשלח לשום שרת חוץ מ-Anthropic
            עצמם.
          </p>
        </div>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={onBack}>
          ← חזרה
        </Button>
        <Button
          onClick={() => onComplete(key)}
          disabled={!looksValid}
          size="lg"
        >
          בואו נדבר 💬
        </Button>
      </div>
    </div>
  );
}
