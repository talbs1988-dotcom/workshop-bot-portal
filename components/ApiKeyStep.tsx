"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AlertCircle, ExternalLink } from "lucide-react";

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
        <p className="text-smoke">המוח שלו = Claude API של Anthropic</p>
      </div>

      <Card className="space-y-6">
        <div className="bg-sky/40 border border-sky/60 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-ink flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-ink mb-1">
              חשוב לדעת — חשבון Anthropic API נפרד
            </p>
            <p className="text-smoke leading-relaxed">
              אם יש לך Claude Pro / Claude Code — זה{" "}
              <strong>לא אותו דבר</strong>. ל-API צריך חשבון נפרד עם קרדיט (~$5
              מספיק לסדנה). אם אין לך — תפתחי בשלוש דקות, חוזרים לכאן.
            </p>
          </div>
        </div>

        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-bold">
              1
            </span>
            <div>
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-gold underline-offset-4 hover:decoration-2"
              >
                console.anthropic.com
              </a>{" "}
              — להירשם עם המייל שלך
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-bold">
              2
            </span>
            <div>
              <strong>Plans & Billing</strong> → להוסיף $5 קרדיט (כרטיס אשראי.
              אם רואה "Buy usage credits" — זה זה. <em>"Skip for now"</em> רק אם
              כבר יש לך קרדיט מקודם.)
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <strong>API Keys</strong> → <em>"Create Key"</em> → להעתיק את
              המפתח (מתחיל ב-
              <code className="bg-line/40 px-1 rounded">sk-ant-</code>)
            </div>
          </li>
        </ol>

        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 rounded-xl border border-line hover:border-gold hover:bg-cream transition-all text-sm font-medium text-ink"
        >
          פתחי את עמוד ה-API Keys
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="border-t border-line pt-6">
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
            dir="ltr"
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
