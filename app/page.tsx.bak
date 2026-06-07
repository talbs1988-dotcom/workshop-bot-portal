"use client";
import { useEffect, useState } from "react";
import { PhaseShell } from "@/components/PhaseShell";
import { Landing } from "@/components/Landing";
import { PersonalityWizard } from "@/components/PersonalityWizard";
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
      if (stored.botName) {
        setPhase("done");
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
              setPhase("done");
            }}
          />
        )}
        {phase === "done" && (
          <DoneScreen config={config} onEdit={() => setPhase("wizard")} />
        )}
      </PhaseShell>
    </main>
  );
}
