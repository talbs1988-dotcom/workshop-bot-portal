export type Phase = "landing" | "wizard" | "apikey" | "chat" | "done";

export type Permission =
  | "manage-tasks"
  | "manage-calendar"
  | "manage-leads"
  | "send-invoices"
  | "reply-to-others"
  | "share-private-info";

export interface BotConfig {
  botName: string;
  ownerName: string;
  whatsappPhone: string;
  businessType: string;
  permissions: Permission[];
  customRules: string;
  apiKey?: string;
}

export const initialConfig: BotConfig = {
  botName: "",
  ownerName: "",
  whatsappPhone: "",
  businessType: "",
  permissions: ["manage-tasks", "manage-calendar", "manage-leads"],
  customRules: "",
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
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BotConfig>;
    // Migration from old shape (tone/focus)
    return {
      ...initialConfig,
      ...parsed,
      permissions:
        Array.isArray(parsed.permissions) && parsed.permissions.length > 0
          ? (parsed.permissions as Permission[])
          : initialConfig.permissions,
    };
  } catch {
    return null;
  }
}
