import type { BotConfig } from "./state";
import { buildSystemPrompt } from "./prompt-builder";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  id: string;
}

export async function sendChat(
  config: BotConfig,
  history: ChatMessage[],
): Promise<string> {
  if (!config.apiKey) throw new Error("no api key");
  const systemPrompt = buildSystemPrompt(config);
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: config.apiKey,
      systemPrompt,
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "request failed" }));
    throw new Error(err.error || "request failed");
  }
  const data = await res.json();
  return data.reply as string;
}
