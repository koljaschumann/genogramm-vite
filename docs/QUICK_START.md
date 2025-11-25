# ⚡ Quick Start - GenoFlow Update

## 🎯 In 3 Minuten deployen

### Schritt 1: Dateien ersetzen (2 Min)

```bash
cd genogramm-vite
```

**Ersetze diese 2 Dateien:**
1. `src/App.jsx` → [Lade neue App.jsx herunter]
2. `src/index.css` → [Lade neue index.css herunter]

**Füge diese 1 Datei hinzu:**
3. `src/components/Footer.jsx` → [Erstelle neue Datei]

### Schritt 2: Testen (30 Sek)

```bash
npm run dev
```

**Quick-Check:**
- ✅ Logo oben links?
- ✅ Dark Mode Button (Mond-Icon)?
- ✅ Footer ganz unten?

### Schritt 3: Deployen (30 Sek)

```bash
git add .
git commit -m "Add GenoFlow branding and Phase 1 features"
git push
```

**Fertig! 🎉**

---

## 🆕 Was ist neu?

### **Sichtbar für User:**
1. ✨ **GenoFlow Logo** (Variante 2: Professional Icon)
2. 🌙 **Dark Mode** Toggle (Mond/Sonne Icon)
3. 💾 **Auto-Save** Anzeige ("Gespeichert vor X Min")
4. ⌨️ **Keyboard Shortcuts** Info-Leiste
5. 📄 **Footer** mit Impressum, Datenschutz, Support

### **Unter der Haube:**
6. 💾 Auto-Save alle 30 Sekunden (LocalStorage)
7. ⌨️ Keyboard Shortcuts (Strg+P, Strg+R, Strg+S, Esc)
8. 🔔 Toast-Benachrichtigungen (Erfolg/Fehler)
9. 🌓 Dark Mode (systemweit, gespeichert)
10. 📱 Alles mobile-optimiert

---

## 🎨 Wichtigste Features

### **Auto-Save**
```
Automatisch alle 30 Sekunden
→ Keine Datenverluste mehr!
→ Zeigt "Gespeichert vor X Min"
```

### **Dark Mode**
```
Klick auf Mond-Icon
→ Gesamte App wird dunkel
→ Augenschonend bei langer Nutzung
```

### **Keyboard Shortcuts**
```
Strg+P → Person hinzufügen
Strg+R → Beziehung hinzufügen
Strg+S → Manuell speichern
Esc    → Schließen
```

---

## ⚠️ Wichtig: Nach dem Deployment

### **1. Support-Email ändern**
In `src/components/Footer.jsx`, Zeile 36:
```jsx
href="mailto:deine-email@example.com"
```

### **2. Rechtliche Seiten erstellen**
Erstelle Seiten für:
- `/impressum`
- `/datenschutz`
- `/nutzungsbedingungen`

Oder nutze temporär Modals (siehe DEPLOYMENT_GUIDE_COMPLETE.md)

---

## 🧪 Testing-Checkliste

Nach Deployment auf https://genogramm-vite.vercel.app:

- [ ] Logo erscheint oben links ✓
- [ ] Dark Mode Toggle funktioniert ✓
- [ ] Person hinzufügen (Strg+P) ✓
- [ ] Auto-Save nach 30 Sek ✓
- [ ] Toast-Benachrichtigungen ✓
- [ ] Footer erscheint unten ✓
- [ ] Mobile: Alles responsive ✓
- [ ] Dark Mode auf Mobile ✓

---

## 📚 Weitere Dokumentation

- **Vollständige Anleitung:** `DEPLOYMENT_GUIDE_COMPLETE.md`
- **UX/UI Verbesserungen:** `UX_UI_VERBESSERUNGEN.md`
- **Logo Mock-ups:** `mockup_logo_varianten.html`

---

## 🆘 Probleme?

### "npm run dev funktioniert nicht"
```bash
npm install
npm run dev
```

### "Footer erscheint nicht"
```bash
# Prüfe: src/components/Footer.jsx existiert?
ls src/components/Footer.jsx

# Falls nein: Erstelle die Datei mit dem Code aus den Downloads
```

### "Dark Mode funktioniert nicht"
```bash
# Prüfe: tailwind.config.js hat darkMode: 'class'?
cat tailwind.config.js | grep darkMode
```

---

## 💡 Pro-Tipps

1. **Auto-Save testen:** Person hinzufügen, 30 Sek warten, Browser neu laden
2. **Dark Mode testen:** Toggle klicken, Browser neu laden (bleibt dunkel)
3. **Shortcuts testen:** Drücke Strg+P, dann Esc
4. **Mobile testen:** Chrome DevTools → Device Toolbar (F12)

---

**Bereit? Los geht's! 🚀**

```bash
git add .
git commit -m "Add GenoFlow branding, Auto-Save, Dark Mode"
git push
```
