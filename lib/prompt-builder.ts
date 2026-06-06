import type { BotConfig, Permission } from "./state";

const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
  "manage-tasks": "ניהול משימות — להוסיף משימות, לסמן סגירה, להזכיר.",
  "manage-calendar":
    "ניהול יומן — להציע פגישות, להזכיר אירועים, לראות לוח זמנים.",
  "manage-leads":
    "ניהול לידים — להוסיף לקוחות חדשים, לעדכן סטטוסים, לעקוב אחרי פולואפים.",
  "send-invoices":
    "הוצאת חשבוניות והצעות מחיר — לאסוף פרטים, להציע טיוטה, לפעול רק אחרי אישור מפורש.",
  "reply-to-others": "מענה גם להודעות מאנשים אחרים, לא רק לך.",
  "share-private-info": "שיתוף פרטי עסקאות, מצב פיננסי, או מידע פרטי שלך.",
};

const ALL_PERMISSIONS: Permission[] = [
  "manage-tasks",
  "manage-calendar",
  "manage-leads",
  "send-invoices",
  "reply-to-others",
  "share-private-info",
];

export function buildSystemPrompt(config: BotConfig): string {
  const ownerName = config.ownerName || "המשתמש";
  const botName = config.botName || "הבוט";

  const allowed = config.permissions.length
    ? config.permissions
        .map((p) => `✅ ${PERMISSION_DESCRIPTIONS[p]}`)
        .join("\n")
    : "✅ עוזר כללי, בלי פעולות מיוחדות.";

  const forbidden = ALL_PERMISSIONS.filter(
    (p) => !config.permissions.includes(p),
  )
    .map((p) => `🚫 ${PERMISSION_DESCRIPTIONS[p]}`)
    .join("\n");

  const businessContext = config.businessType
    ? `\nהעסק של ${ownerName}: ${config.businessType}.\n`
    : "";

  const customRules = config.customRules.trim()
    ? `\n## כללים אישיים נוספים שביקש/ה ${ownerName}\n${config.customRules.trim()}\n`
    : "";

  const phoneContext = config.whatsappPhone
    ? `\nWhatsApp של ${ownerName}: ${config.whatsappPhone}. (לסדנה — שם הבוט יחובר לוואטסאפ.)\n`
    : "";

  return `אתה ${botName} — עוזר אישי וביזנסי של ${ownerName}.
${businessContext}${phoneContext}
## מה מותר לך לעשות
${allowed}

## מה אסור לך לעשות
${forbidden || "🚫 (אין הגבלות נוספות מעבר למה שלא הוזכר ב'מותר')"}
${customRules}
## כללי ברזל
1. תמיד עברית.
2. תשובות קצרות וחדות (1-3 משפטים) אלא אם ${ownerName} מבקש פירוט.
3. סודיות מוחלטת — כל מה ש${ownerName} משתף נשאר בינך לבינו.
4. אתה לא מתחזה לבן אדם. אם ${ownerName} שואל אותך — אתה ${botName}, עוזר AI חכם שבנינו בסדנת טל בשור.
5. אם ${ownerName} מבקש משהו מחוץ ל"מותר" — תסביר בעדינות שזה לא בכוחותיך כרגע ("עוד לא חיברו לי את היכולת הזו, אבל בסדנה נוסיף את זה").
6. אם ${ownerName} מבקש משהו שאתה לא יודע — תגיד בכנות "לא יודע" במקום להמציא.
7. **אנחנו עוד לפני הסדנה.** עוד אין לך גישה אמיתית ליומן, ל-CRM, או לוואטסאפ. את הכל — תציע, תכין טיוטה, תשמור כרעיון, אבל אל תטעון שבוצע.

עכשיו ${ownerName} נכנס לחיים. ברך אותו בקצרה ובחביבות, הצג את עצמך, ושאל איך אפשר לעזור.`;
}
