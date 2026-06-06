"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ChatMessage as MessageBubble } from "./ChatMessage";
import { sendChat, type ChatMessage } from "@/lib/claude";
import type { BotConfig } from "@/lib/state";
import { Loader2, Download, Send } from "lucide-react";

interface ChatInterfaceProps {
  config: BotConfig;
  onDone: () => void;
  onBack: () => void;
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatInterface({ config, onDone, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const greetingSentRef = useRef(false);

  useEffect(() => {
    if (greetingSentRef.current || messages.length > 0) return;
    greetingSentRef.current = true;
    sendInitialGreeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  async function sendInitialGreeting() {
    setBusy(true);
    setError(null);
    try {
      const greeting = await sendChat(config, [
        {
          id: "init",
          role: "user",
          content: `שלום, אני ${config.ownerName}. ברך אותי בקצרה לפי האופי שלך.`,
        },
      ]);
      setMessages([{ id: genId(), role: "assistant", content: greeting }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  }

  async function handleSend() {
    const text = draft.trim();
    if (!text || busy) return;
    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setDraft("");
    setBusy(true);
    setError(null);
    try {
      const reply = await sendChat(config, next);
      setMessages([
        ...next,
        { id: genId(), role: "assistant", content: reply },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 flex flex-col min-h-[calc(100vh-2rem)]">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-ink">{config.botName} 🤖</h2>
        <p className="text-xs text-smoke">העוזר האישי של {config.ownerName}</p>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden min-h-[400px]">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        >
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              role={m.role}
              content={m.content}
              botName={config.botName}
            />
          ))}
          {busy && (
            <div className="self-start flex items-center gap-2 text-smoke text-sm px-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{config.botName} כותב...</span>
            </div>
          )}
          {error && (
            <div className="self-center bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-3 py-2 max-w-md text-center">
              ❌ {error}
            </div>
          )}
        </div>

        <div className="border-t border-line p-3 flex gap-2 bg-cream/40">
          <Input
            placeholder="כתבי משהו..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={busy}
          />
          <Button
            onClick={handleSend}
            disabled={busy || !draft.trim()}
            className="px-4"
            aria-label="שלח"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <div className="flex justify-between mt-4">
        <Button variant="ghost" onClick={onBack}>
          ← חזרה
        </Button>
        <Button variant="outline" onClick={onDone}>
          <Download className="w-4 h-4" />
          שמרי את הבוט שלך
        </Button>
      </div>
    </div>
  );
}
