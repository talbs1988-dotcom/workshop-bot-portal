export type Phase = "landing" | "wizard" | "apikey" | "chat" | "done";

export interface BotConfig {
  botName: string;
  ownerName: string;
  tone: "friendly" | "professional" | "direct";
  focus: "tasks" | "reminders" | "conversation";
  apiKey?: string;
}

export const initialConfig: BotConfig = {
  botName: "",
  ownerName: "",
  tone: "friendly",
  focus: "tasks",
};

const STORAGE_KEY = "tal-bot-config";

export function saveConfig(config: BotConfig): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {}
}

export function loadConfig(): BotConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BotConfig) : null;
  } catch {
    return null;
  }
}
