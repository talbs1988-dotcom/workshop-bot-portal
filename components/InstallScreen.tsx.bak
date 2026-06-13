"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const INSTALL_COMMAND = `curl -sL https://github.com/talbs1988-dotcom/talbs-whatsapp-bot/archive/main.tar.gz | tar -xz -C /tmp && mkdir -p ~/.claude/skills && rm -rf ~/.claude/skills/talbs-whatsapp-bot && mv /tmp/talbs-whatsapp-bot-main ~/.claude/skills/talbs-whatsapp-bot && echo '✅ הותקן! עכשיו בקלוד-קוד: /talbs-whatsapp-bot'`;

const SKILL_COMMAND = `/talbs-whatsapp-bot`;

export function InstallScreen() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedSkill, setCopiedSkill] = useState(false);

  async function copy(text: string, setFlag: (v: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text);
      setFlag(true);
      setTimeout(() => setFlag(false), 2200);
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
          התקנה ב-3 דקות. אפס עלות נוספת. אפס API keys.
        </p>
      </motion.div>

      {/* Step 1 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-white border border-line rounded-2xl p-6 mb-4 shadow-sm"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-gradient-to-br from-gold-deep to-gold text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0">
            1
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink mb-1">
              העתיקו את הפקודה הזו
            </h2>
            <p className="text-sm text-smoke">
              והדביקו אותה בצ&apos;אט של <strong>Claude Code</strong> שלכם
            </p>
          </div>
        </div>

        <div className="relative">
          <pre
            dir="ltr"
            className="bg-cream/80 border border-line rounded-xl p-4 text-xs md:text-sm font-mono text-ink overflow-x-auto leading-relaxed"
          >
            <code>{INSTALL_COMMAND}</code>
          </pre>
          <button
            onClick={() => copy(INSTALL_COMMAND, setCopiedInstall)}
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copiedInstall
                ? "bg-green-100 text-green-800"
                : "bg-gradient-to-br from-gold-deep to-gold text-white hover:shadow-lg"
            }`}
          >
            {copiedInstall ? "✓ הועתק" : "📋 העתיקו"}
          </button>
        </div>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-line rounded-2xl p-6 mb-4 shadow-sm"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-gradient-to-br from-gold-deep to-gold text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0">
            2
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink mb-1">
              אחרי שהפקודה רצה — הקלידו זאת בצ&apos;אט של Claude Code
            </h2>
          </div>
        </div>

        <div className="relative">
          <pre
            dir="ltr"
            className="bg-cream/80 border border-line rounded-xl p-4 text-sm font-mono text-ink leading-relaxed"
          >
            <code>{SKILL_COMMAND}</code>
          </pre>
          <button
            onClick={() => copy(SKILL_COMMAND, setCopiedSkill)}
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              copiedSkill
                ? "bg-green-100 text-green-800"
                : "bg-gradient-to-br from-gold-deep to-gold text-white hover:shadow-lg"
            }`}
          >
            {copiedSkill ? "✓ הועתק" : "📋 העתיקו"}
          </button>
        </div>
      </motion.div>

      {/* Step 3 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="bg-peach/30 border border-peach rounded-2xl p-6 mb-4"
      >
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-gold-deep to-gold text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0">
            3
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-ink mb-2">
              סרקו את ה-QR + שלחו לעצמכם הודעה
            </h2>
            <ul className="text-sm text-ink space-y-1 list-none">
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
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-smoke/70 mt-8 px-4"
      >
        <p className="mb-1">
          ⚠️ צריך שיהיה לכם כבר Claude Code מותקן (מהסדנה הקודמת).
        </p>
        <p>✨ הסוכן רץ אצלכם במחשב, על החשבון שלכם, אפס עלות נוספת.</p>
      </motion.div>

      <footer className="text-center text-xs text-smoke/60 mt-12">
        💛 סדנת טל בשור · v1.6
      </footer>
    </div>
  );
}
