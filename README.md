# Workshop Bot Portal

מיני אפליקציה למשתתפות הסדנה של טל בשור — מקימות בוט אישי ב-3 דקות, מדברות איתו, ומורידות `config.json` להמשך הסדנה.

**Live:** https://workshop-bot-portal.vercel.app

## איך זה עובד

1. **משתתפת נכנסת לאתר** → רואה כפתור "בואו נתחיל"
2. **3 שאלות מהירות** — שם הבוט, שם הבעלים, אופי, התמקדות
3. **API key של Anthropic** — קרדיט חינם של $5 מספיק לסדנה
4. **צ'אט חי** — מדברת עם הבוט שלה, פועל על Claude Haiku 4.5
5. **הורידה `config.json`** — בסדנה זה החלק שמתחבר ל-WhatsApp

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 (`@theme` בקובץ CSS, בלי קונפיג ts)
- Rubik (Google Fonts)
- Framer Motion (אנימציות מעברים)
- @anthropic-ai/sdk (server-side ב-`/api/chat`)
- TypeScript

## ארכיטקטורה

- **אין DB, אין auth, אין login.**
- API key של המשתמשת נשמר רק ב-`sessionStorage` בדפדפן שלה.
- כל קריאה ל-Claude עוברת דרך `/api/chat` (Node runtime) — proxy פשוט שלא שומר כלום, רק מעביר.
- המודל: `claude-haiku-4-5-20251001` (זול, מהיר, מספיק חכם לעוזר אישי).

## עדכון תוכן

- **טקסטים בעמוד הראשי** — `components/Landing.tsx`
- **שלבי הוויזרד** — `components/PersonalityWizard.tsx` (קבועי `TONES` ו-`FOCUSES`)
- **System prompt של הבוט** — `lib/prompt-builder.ts`
- **מסך סיום** — `components/DoneScreen.tsx`
- **צבעים** — `app/globals.css` (תחת `@theme`)

## Dev

```bash
npm install
npm run dev
# פותחים http://localhost:3000
```

## Deploy

מתפרס אוטומטית ל-Vercel:

```bash
vercel --prod --yes --scope talbs1988-dotcoms-projects
```

## V2 רעיונות (אחרי הסדנה)

- חיבור ישיר ל-Green API מתוך האתר (QR scan חי)
- שמירה של חיבורים שונים פר משתמשת ב-localStorage
- ייצוא ל-Skill: לחיצה אחת → הסקריפט של תהליך ההתקנה ב-Claude Code
- שיתוף הבוט (URL ייחודי לכל בוט)
- היסטוריית שיחות (Indexed DB)
- Voice input/output
