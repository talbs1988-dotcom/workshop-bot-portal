import type { BotConfig } from "./state";

export interface ExportedConfig {
  version: "1.0";
  generatedAt: string;
  bot: {
    name: string;
    tone: BotConfig["tone"];
    focus: BotConfig["focus"];
  };
  owner: {
    name: string;
  };
  workshop: {
    nextStep: "connect-whatsapp-via-green-api";
    instructions: string;
  };
}

export function buildExport(config: BotConfig): ExportedConfig {
  return {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    bot: {
      name: config.botName,
      tone: config.tone,
      focus: config.focus,
    },
    owner: {
      name: config.ownerName,
    },
    workshop: {
      nextStep: "connect-whatsapp-via-green-api",
      instructions:
        "במפגש 1 של הסדנה — נחבר את הקובץ הזה ל-WhatsApp שלך דרך Green API.",
    },
  };
}

export function downloadConfig(config: BotConfig): void {
  const data = buildExport(config);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${config.botName || "bot"}-config.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
