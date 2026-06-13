"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const INSTALL_COMMAND = `curl -sL https://github.com/talbs1988-dotcom/talbs-whatsapp-bot/archive/main.tar.gz | tar -xz -C /tmp && rm -rf ~/talbs-whatsapp-bot && mv /tmp/talbs-whatsapp-bot-main/template ~/talbs-whatsapp-bot && cd ~/talbs-whatsapp-bot && npm install --ignore-scripts --no-fund --no-audit && nohup node bot.js > /tmp/talbs-bot.log 2>&1 & disown 2>/dev/null; echo "✅ הבוט מתחיל - דפדפן ייפתח תוך 5 שניות..."`;

export function InstallScreen() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      alert("ההעתקה נכשלה — סמן ידנית את הטקסט");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="text-center mb-10"
      >
        <div className="text-6xl md:text-7xl mb-4 inline-block">💛</div>
        <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3 text-balance">
          הסוכן האישי שלך
        </h1>
        <p className="text-base text-smoke mb-2">
          סדנת טל בשור · בוט WhatsApp חכם מחובר ל-Claude שלך
        </p>
        <p className="text-sm text-smoke/70">
          התקנה בפקודה אחת. אפס עלות נוספת. אפס API keys.
        </p>
      </motion.div>

      {/* Step 1 — Install in one command */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-white border border-line rounded-2xl p-6 mb-4 shadow-sm"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-gradient-to-br from-gold-deep to-gold text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0">
            1
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink mb-1">
              העתיקו את הפקודה והדביקו בצ&apos;אט של Claude Code
            </h2>
            <p className="text-sm text-smoke">
              הפקודה הזו מורידה, מתקינה, ומפעילה את הבוט שלכם — אוטומטית.
            </p>
          </div>
        </div>

        {/* Copy button on top - prominent */}
        <button
          onClick={copy}
          className={`w-full mb-3 py-3 rounded-xl font-semibold text-base transition-all ${
            copied
              ? "bg-green-100 text-green-800 border-2 border-green-300"
              : "bg-gradient-to-br from-gold-deep to-gold text-white hover:shadow-lg active:scale-[0.98]"
          }`}
        >
          {copied ? "✓ הועתק ל-Clipboard" : "📋 העתיקו את הפקודה"}
        </button>

        {/* Command preview — scrollable, doesn't break layout */}
        <details className="text-xs">
          <summary className="cursor-pointer text-smoke hover:text-ink select-none">
            רוצים לראות את הפקודה? לחצו לפתיחה
          </summary>
          <pre
            dir="ltr"
            className="mt-2 bg-cream/80 border border-line rounded-xl p-3 text-[10px] md:text-xs font-mono text-ink overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-32"
          >
            <code>{INSTALL_COMMAND}</code>
          </pre>
        </details>
      </motion.div>

      {/* Step 2 — QR + scan */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-peach/30 border border-peach rounded-2xl p-6 mb-4"
      >
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-gold-deep to-gold text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0">
            2
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink mb-2">
              סרקו את ה-QR + שלחו לעצמכם הודעה
            </h2>
            <ul className="text-sm text-ink space-y-1.5 list-none">
              <li>📱 דפדפן ייפתח אוטומטית ב-127.0.0.1:7655</li>
              <li>⚙️ WhatsApp → הגדרות → מכשירים מקושרים → קישור מכשיר חדש</li>
              <li>💬 שלחו לעצמכם הודעה ראשונה (&quot;היי&quot;)</li>
              <li>🎉 הסוכן עונה תוך 3 שניות</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Help */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-center text-sm text-smoke/70 mt-8 px-4"
      >
        <p className="mb-1">
          ⚠️ צריך שיהיה לכם כבר Claude Code מותקן (מהסדנה הקודמת).
        </p>
        <p>✨ הסוכן רץ אצלכם במחשב, על החשבון שלכם, אפס עלות נוספת.</p>
      </motion.div>

      <footer className="text-center text-xs text-smoke/60 mt-12">
        💛 סדנת טל בשור · v1.7
      </footer>
    </div>
  );
}
