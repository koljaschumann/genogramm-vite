# Bug-Report-System Integration - Anleitung

## Übersicht
Dieses System ermöglicht es Testern, über einen AI-Chatbot geführte Bug-Reports zu erstellen, die automatisch als GitHub Issues angelegt werden.

## Schritt-für-Schritt Integration

### 1. Dateien kopieren

Kopiere diese Dateien in dein lokales Projekt:

```
genogramm-vite/
├── api/
│   └── create-issue.js          [NEU]
└── src/
    └── components/
        ├── BugReportButton.jsx  [NEU]
        └── BugReportModal.jsx   [NEU]
```

### 2. BugReportButton in App.jsx einbinden

Öffne deine `src/App.jsx` und füge den Button hinzu:

```jsx
// Am Anfang der Datei importieren:
import BugReportButton from './components/BugReportButton';

// Im Return-Statement (ganz am Ende, vor dem schließenden </div>):
function App() {
  return (
    <div className="...">
      {/* Dein bestehender Code */}
      
      {/* Bug-Report Button - ganz am Ende hinzufügen */}
      <BugReportButton />
    </div>
  );
}

export default App;
```

### 3. Tailwind Config erweitern (falls nötig)

Falls die Animationen nicht funktionieren, erweitere deine `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
}
```

### 4. Lokal testen

```bash
# Im Terminal im genogramm-vite Ordner:
npm run dev
```

Öffne http://localhost:5173 und teste:
1. Klicke auf den roten Button unten rechts
2. Chatte mit dem AI-Bot
3. Sende einen Test-Bug-Report

### 5. Zu GitHub pushen

```bash
git add .
git commit -m "Add AI-powered bug reporting system"
git push
```

Vercel deployed automatisch in ~1-2 Minuten.

### 6. Live testen

Nach dem Deployment:
1. Öffne https://genogramm-vite.vercel.app
2. Teste den Bug-Report
3. Prüfe auf GitHub: https://github.com/koljaschumann/genogramm-vite/issues

---

## Funktionsweise

### User-Flow:
1. User klickt auf roten Button (unten rechts)
2. Modal öffnet sich mit AI-Chatbot
3. AI stellt Fragen:
   - Was hast du gemacht?
   - Was ist passiert?
   - Was wurde erwartet?
4. AI generiert strukturierten Report
5. User bestätigt → Issue wird auf GitHub erstellt
6. User erhält Link zum Issue

### Technischer Flow:
```
BugReportButton
  ↓ (onClick)
BugReportModal
  ↓ (User-Chat)
Claude API (AI führt durch Fragen)
  ↓ (Report fertig)
/api/create-issue (Vercel Serverless Function)
  ↓
GitHub API (Issue erstellen)
  ↓
✅ Issue #123 erstellt
```

---

## Anpassungen

### Issue-Labels ändern
In `api/create-issue.js`, Zeile 43:
```js
labels: ['bug', 'user-reported', 'dein-label'], 
```

### AI-Prompt anpassen
In `src/components/BugReportModal.jsx`, Zeile 39-52:
```js
system: `Dein angepasster Prompt hier...`
```

### Button-Position ändern
In `src/components/BugReportButton.jsx`, Zeile 12:
```jsx
className="fixed bottom-6 right-6 ..."  // Position ändern
```

### Button-Farbe ändern
```jsx
className="... bg-red-500 hover:bg-red-600 ..."  // Farbe anpassen
```

---

## Troubleshooting

### "GitHub token not configured"
→ Prüfe Vercel Environment Variables: `GITHUB_TOKEN` gesetzt?

### "Method not allowed"
→ API-Route ist `/api/create-issue` (nicht `/create-issue`)

### Issues werden nicht erstellt
→ Prüfe GitHub Token Permissions: `repo` Scope aktiv?

### Modal öffnet nicht
→ Prüfe Browser Console auf Fehler
→ Stelle sicher, dass TailwindCSS korrekt konfiguriert ist

### AI antwortet nicht
→ Claude API nutzt die Browser-basierte Authentifizierung
→ Funktioniert nur auf vercel.app (nicht localhost für AI)
→ Für lokale Tests: Mock-Daten verwenden

---

## Nächste Schritte

Nach erfolgreicher Integration kannst du:

1. **Custom Labels hinzufügen**
   - Feature-Requests
   - Verschiedene Prioritäten
   
2. **Screenshots ermöglichen**
   - File-Upload in Modal
   - Als Attachment zum Issue

3. **Issue-Templates**
   - Mehrere Report-Typen
   - Feature-Requests vs. Bugs

4. **Benachrichtigungen**
   - Discord/Slack-Integration
   - Email bei neuem Issue

---

## Support

Bei Fragen oder Problemen:
1. Prüfe GitHub Issues des Projekts
2. Erstelle ein neues Issue mit Fehlerbeschreibung
3. Teile Screenshots der Fehlermeldung

Viel Erfolg! 🚀
