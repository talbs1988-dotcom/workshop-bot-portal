"use client";
import { useEffect, useState } from "react";
import { PhaseShell } from "@/components/PhaseShell";
import { Landing } from "@/components/Landing";
import { PersonalityWizard } from "@/components/PersonalityWizard";
import { ApiKeyStep } from "@/components/ApiKeyStep";
import { ChatInterface } from "@/components/ChatInterface";
import { DoneScreen } from "@/components/DoneScreen";
import {
  initialConfig,
  loadConfig,
  saveConfig,
  type BotConfig,
  type Phase,
} from "@/lib/state";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [config, setConfig] = useState<BotConfig>(initialConfig);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadConfig();
    if (stored) {
      setConfig(stored);
      if (stored.apiKey && stored.botName) {
        setPhase("chat");
      } else if (stored.botName) {
        setPhase("apikey");
      }
    }
    setHydrated(true);
  }, []);

  function updateConfig(next: BotConfig) {
    setConfig(next);
    saveConfig(next);
  }

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="text-3xl animate-pulse">✨</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <PhaseShell phaseKey={phase}>
        {phase === "landing" && <Landing onStart={() => setPhase("wizard")} />}
        {phase === "wizard" && (
          <PersonalityWizard
            initial={config}
            onBack={() => setPhase("landing")}
            onComplete={(c) => {
              updateConfig(c);
              setPhase("apikey");
            }}
          />
        )}
        {phase === "apikey" && (
          <ApiKeyStep
            onBack={() => setPhase("wizard")}
            onComplete={(apiKey) => {
              const next = { ...config, apiKey };
              updateConfig(next);
              setPhase("chat");
            }}
          />
        )}
        {phase === "chat" && (
          <ChatInterface
            config={config}
            onBack={() => setPhase("apikey")}
            onDone={() => setPhase("done")}
          />
        )}
        {phase === "done" && (
          <DoneScreen config={config} onChat={() => setPhase("chat")} />
        )}
      </PhaseShell>
    </main>
  );
}
