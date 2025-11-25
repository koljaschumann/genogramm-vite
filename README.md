# Bug-Report-System Dateien

## 📦 Inhalt dieses Pakets

Diese Dateien implementieren ein AI-gesteuertes Bug-Report-System für deine Genogramm-App.

### Dateien-Struktur:

```
📁 api/
  └── create-issue.js              # Vercel Serverless Function für GitHub API

📁 src/
  └── components/
      ├── BugReportButton.jsx      # Floating Button (unten rechts)
      └── BugReportModal.jsx       # AI-Chatbot Modal

📄 INTEGRATION_ANLEITUNG.md        # Detaillierte Schritt-für-Schritt Anleitung
📄 README.md                        # Diese Datei
```

## 🚀 Schnellstart

1. **Dateien kopieren:** Kopiere die Ordner `api` und `src` in dein lokales `genogramm-vite` Projekt
2. **Integration:** Folge der `INTEGRATION_ANLEITUNG.md`
3. **Testen:** Lokal mit `npm run dev` testen
4. **Deployen:** `git push` → automatisches Deployment auf Vercel

## ✨ Features

- 🤖 AI-geführter Bug-Report-Dialog (Claude API)
- 📝 Automatische Issue-Erstellung auf GitHub
- 🎨 Moderne UI mit Tailwind CSS
- 📱 Responsive Design
- 🔄 Automatische Browser/Device-Erkennung
- 🏷️ Automatisches Labeling (bug, user-reported)

## 📋 Voraussetzungen

✅ GitHub Personal Access Token erstellt
✅ Token in Vercel Environment Variables gespeichert
✅ Bestehendes Vite/React Projekt
✅ Tailwind CSS installiert

## 📖 Nächste Schritte

Öffne `INTEGRATION_ANLEITUNG.md` für die komplette Anleitung!

---

**Viel Erfolg! 🎉**
