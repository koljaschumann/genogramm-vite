import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Lightbulb, HelpCircle } from 'lucide-react';

export default function TutorialModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const slides = [
    {
      id: 'welcome',
      icon: BookOpen,
      title: 'Willkommen zur Genogramm-Anwendung',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Diese Anwendung unterstützt Sie bei der professionellen Erstellung therapeutischer Genogramme 
            für die psychologische und systemische Arbeit mit Familien und Einzelpersonen.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-700">
              <strong>Hinweis:</strong> Diese Einführung kombiniert psychologisch-therapeutisches Fachwissen 
              mit einer technischen Bedienungsanleitung.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'psychological-foundation',
      icon: Lightbulb,
      title: 'Psychologische Grundlagen des Genogramms',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Historischer Hintergrund</h4>
          <p className="leading-relaxed">
            Das Genogramm wurde in den 1970er und 1980er Jahren von den Pionieren der systemischen 
            Familientherapie entwickelt. <strong>Murray Bowen</strong> (1913-1990) begann erstmals, 
            mehrgenerationale Familienmuster systematisch zu erfassen. <strong>Monica McGoldrick</strong> und 
            <strong>Randy Gerson</strong> standardisierten 1985 die Methode in ihrem wegweisenden Werk 
            "Genograms: Assessment and Intervention" und etablierten sie als zentrales diagnostisches 
            Instrument in der Familientherapie.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">Therapeutischer Nutzen</h4>
          <p className="leading-relaxed">
            Genogramme dienen der Visualisierung und Analyse von:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong>Mehrgenerationalen Mustern:</strong> Wiederkehrende Verhaltensweisen, 
            Beziehungskonstellationen und Konfliktdynamiken über Generationen hinweg</li>
            <li><strong>Unsichtbaren Bindungen:</strong> Emotionale "Schulden" und Loyalitäten, 
            die nach Ivan Boszorményi-Nagy über Generationen weitergegeben werden</li>
            <li><strong>Ablösungsprozessen:</strong> Entwicklung von Autonomie innerhalb des Familiensystems</li>
            <li><strong>Ressourcen und Belastungen:</strong> Identifikation von Stärken und 
            Risikofaktoren im familiären Kontext</li>
          </ul>
        </div>
      )
    },
    {
      id: 'therapeutic-application',
      icon: HelpCircle,
      title: 'Therapeutische Anwendung',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Wann wird ein Genogramm erstellt?</h4>
          <p className="leading-relaxed">
            In der therapeutischen Praxis wird das Genogramm typischerweise <strong>in den ersten 
            Sitzungen</strong> nach dem Erstkontakt erstellt, wenn eine vertrauensvolle Basis 
            geschaffen wurde. Es dient als "Landkarte" des familiären Systems und ermöglicht einen 
            strukturierten, ressourcenorientierten Zugang zur Familiengeschichte.
          </p>
          
          <h4 className="font-semibold text-gray-800 mt-4">Therapeutische Haltung</h4>
          <p className="leading-relaxed">
            Die Erstellung erfolgt <strong>kollaborativ</strong> mit den Klient:innen als Expert:innen 
            ihrer eigenen Familie. Die therapeutische Grundhaltung ist geprägt von:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Allparteilichkeit und Wertneutralität</li>
            <li>Neugierig-nichtwissender Haltung</li>
            <li>Ressourcenorientierung statt Defizitfokus</li>
            <li>Kontextualisierung statt Individualisierung von Problemen</li>
          </ul>

          <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-500 mt-4">
            <p className="text-sm">
              <strong>Wichtig:</strong> Das Genogramm ist eine <strong>subjektive Konstruktion</strong> 
              aus der Perspektive der Klient:innen – nicht "die Wahrheit" über die Familie. Es kann 
              zu verschiedenen Zeitpunkten unterschiedlich ausfallen und neue Erkenntnisse ermöglichen.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'what-to-document',
      icon: BookOpen,
      title: 'Was wird dokumentiert?',
      content: (
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            Ein therapeutisches Genogramm erfasst <strong>mindestens drei Generationen</strong> und 
            geht weit über einen einfachen Stammbaum hinaus:
          </p>

          <h4 className="font-semibold text-gray-800 mt-4">Strukturelle Informationen</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Verwandtschaftsbeziehungen (biologisch, adoptiert, Stief-, Pflege-)</li>
            <li>Geburtsdaten, Alter, ggf. Todesdaten und Todesursachen</li>
            <li>Geschwisterreihenfolge (älteste links, jüngste rechts)</li>
            <li>Geographische Informationen (Wohnorte, Migrationsgeschichte)</li>
          </ul>

          <h4 className="font-semibold text-gray-800 mt-4">Beziehungsqualitäten</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Eng/fusioniert, distanziert, konfliktreich, abgebrochen</li>
            <li>Koalitionen, Triangulierungen, Parentifizierung</li>
            <li>Loyalitätsbindungen und "unsichtbare" Verpflichtungen</li>
          </ul>

          <h4 className="font-semibold text-gray-800 mt-4">Funktionale Informationen</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Medizinische und psychiatrische Diagnosen</li>
            <li>Suchterkrankungen und Abhängigkeiten</li>
            <li>Berufliche Werdegänge und Bildungsstand</li>
            <li>Kritische Lebensereignisse (Traumata, Verluste, Erfolge)</li>
            <li>Persönlichkeitsmerkmale und Bewältigungsmuster</li>
          </ul>

          <h4 className="font-semibold text-gray-800 mt-4">Kontextfaktoren</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Gesellschaftliche und historische Ereignisse (Kriege, Migration, Wirtschaftskrisen)</li>
            <li>Kulturelle und religiöse Prägungen</li>
            <li>Sozioökonomischer Hintergrund</li>
          </ul>
        </div>
      )
    },
    {
      id: 'technical-overview',
      icon: Lightbulb,
      title: 'Bedienung der Anwendung',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Überblick der Benutzeroberfläche</h4>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <strong className="text-blue-900">Header-Bereich:</strong>
                <p className="text-sm text-blue-800">Hauptaktionen: "Person hinzufügen", "Beziehung hinzufügen", "Vorlagen", "Anleitung & Hilfe"</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <strong className="text-green-900">Smart Suggestions:</strong>
                <p className="text-sm text-green-800">Intelligente Vorschläge für nächste Schritte (erscheinen automatisch bei &lt; 10 Personen)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <strong className="text-purple-900">Linke Sidebar:</strong>
                <p className="text-sm text-purple-800">Statistik-Übersicht und Personenliste mit Schnellzugriff</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <strong className="text-orange-900">Genogramm-Controls:</strong>
                <p className="text-sm text-orange-800">Zoom (50-200%), Filter, Suche – für bessere Übersicht bei großen Familien</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <strong className="text-teal-900">Hauptbereich:</strong>
                <p className="text-sm text-teal-800">Genogramm-Visualisierung mit automatischer Generationen-Anordnung</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">6</div>
              <div>
                <strong className="text-amber-900">Automatische Speicherung:</strong>
                <p className="text-sm text-amber-800">Alle 30 Sekunden automatisch – zusätzlich manuell mit Strg+S</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'adding-people',
      icon: HelpCircle,
      title: 'Personen hinzufügen',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Schritt-für-Schritt Anleitung</h4>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <p><strong>Button "Person hinzufügen"</strong> im Header klicken</p>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <p><strong>Grunddaten eingeben:</strong></p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm space-y-1">
                  <li>Name (Pflichtfeld)</li>
                  <li>Alter, Geschlecht, Geburtsjahr</li>
                  <li>Status: Lebend/Verstorben (inkl. Sterbejahr und Todesursache)</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <p><strong>Soziale Informationen:</strong></p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm space-y-1">
                  <li>Beruf und Bildungsabschluss</li>
                  <li>Familienstand</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <p><strong>Medizinische & psychologische Informationen:</strong></p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm space-y-1">
                  <li>Diagnosen (körperlich/psychisch)</li>
                  <li>Operationen/medizinische Eingriffe</li>
                  <li>Abhängigkeiten</li>
                  <li>Psychische Gesundheit</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <p><strong>Persönlichkeit & Notizen:</strong></p>
                <p className="text-sm mt-1">Freies Textfeld für Persönlichkeitsmerkmale, Signalstichpunkte und Besonderheiten</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">6</div>
              <p><strong>Als Patient markieren:</strong> Optional für den Indexpatient:in</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500 mt-4">
            <p className="text-sm">
              <strong>Tipp:</strong> Beginnen Sie mit dem/der Patient:in und arbeiten Sie sich dann 
              Generation für Generation nach oben (Eltern, Großeltern).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'new-features',
      icon: Lightbulb,
      title: 'Neue Funktionen & Arbeitserleichterungen',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Schnelleinstieg mit Vorlagen</h4>
          <p className="leading-relaxed">
            Klicken Sie auf den <strong className="text-green-600">📋 Vorlagen</strong>-Button im Header, 
            um aus 5 vorgefertigten Familienstrukturen zu wählen:
          </p>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600">•</span>
              <span><strong>Kleinfamilie:</strong> 2 Eltern + 2 Kinder</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">•</span>
              <span><strong>3 Generationen:</strong> Großeltern, Eltern, Kind</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">•</span>
              <span><strong>Patchwork:</strong> Geschiedene Eltern mit neuen Partnern</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">•</span>
              <span><strong>Erweiterte Familie:</strong> Mit Tanten, Onkeln, Cousins</span>
            </div>
          </div>

          <h4 className="font-semibold text-gray-800 mt-4">Smart Suggestions (Intelligente Vorschläge)</h4>
          <p className="leading-relaxed text-sm">
            Die Anwendung analysiert Ihr Genogramm und macht automatisch Vorschläge für sinnvolle 
            nächste Schritte – z.B. "Eltern ergänzen", "Profile vervollständigen", "Patient markieren".
          </p>

          <h4 className="font-semibold text-gray-800 mt-4">Zoom & Filter für große Familien</h4>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="space-y-2 text-sm">
              <div><strong>🔍 Zoom:</strong> 50% - 200% stufenlos einstellbar</div>
              <div><strong>🎯 Filter:</strong> Nach Status (lebend/verstorben), Generation, Beziehungen</div>
              <div><strong>🔎 Suche:</strong> Personen nach Name, Beruf oder Diagnose finden</div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500 mt-4">
            <p className="text-sm">
              <strong>💡 Tipp:</strong> Bei großen Genogrammen (10+ Personen) nutzen Sie Zoom 
              und Filter für bessere Übersicht!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'adding-relationships',
      icon: HelpCircle,
      title: 'Beziehungen hinzufügen',
      content: (
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            Nachdem Sie mindestens <strong>zwei Personen</strong> hinzugefügt haben, können Sie deren 
            Beziehungen definieren.
          </p>

          <h4 className="font-semibold text-gray-800">Verfügbare Beziehungstypen</h4>
          
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <strong className="text-blue-900">Eltern-Kind-Beziehungen:</strong>
              <p className="text-sm text-blue-800 mt-1">
                Vater/Mutter, Adoptivvater/-mutter, Stiefvater/-mutter
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <strong className="text-purple-900">Großeltern-Beziehungen:</strong>
              <p className="text-sm text-purple-800 mt-1">
                Großvater/Großmutter, Urgroßvater/-großmutter
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <strong className="text-green-900">Geschwister:</strong>
              <p className="text-sm text-green-800 mt-1">
                Bruder/Schwester, Halbgeschwister, Zwillinge
              </p>
            </div>

            <div className="bg-pink-50 rounded-lg p-3">
              <strong className="text-pink-900">Partnerschaften:</strong>
              <p className="text-sm text-pink-800 mt-1">
                Verheiratet, Beziehung, getrennt, geschieden, verwitwet
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-3">
              <strong className="text-amber-900">Erweiterte Familie:</strong>
              <p className="text-sm text-amber-800 mt-1">
                Tante/Onkel, Cousin/Cousine, Neffe/Nichte
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-800 mt-4">Beziehungsqualitäten</h4>
          <p className="text-sm">
            Für jede Beziehung können Sie die emotionale Qualität festlegen:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
            <li><strong>Normal:</strong> Durchgezogene graue Linie</li>
            <li><strong>Eng/Nah:</strong> Dicke grüne Linie</li>
            <li><strong>Sehr eng/Fusioniert:</strong> Doppelte grüne Linien</li>
            <li><strong>Konfliktreich:</strong> Rote Zick-Zack-Linie</li>
            <li><strong>Angespannt:</strong> Orange Wellenlinie</li>
            <li><strong>Distanziert:</strong> Gestrichelte Linie</li>
            <li><strong>Abgebrochen:</strong> Durchgestrichene Linie</li>
            <li><strong>Kontaktabbruch:</strong> Doppelt durchgestrichen</li>
          </ul>
        </div>
      )
    },
    {
      id: 'symbols-legend',
      icon: BookOpen,
      title: 'Symbole & Legende',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Standardisierte Symbole</h4>
          <p className="text-sm leading-relaxed">
            Die Anwendung verwendet die international etablierten Genogramm-Symbole nach 
            <strong>McGoldrick und Gerson</strong>:
          </p>

          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-blue-500 bg-blue-100 flex-shrink-0"></div>
              <div>
                <strong>Quadrat = Männlich</strong>
                <p className="text-sm text-gray-600">Blaue Füllung für lebende Personen</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-pink-500 bg-pink-100 rounded-full flex-shrink-0"></div>
              <div>
                <strong>Kreis = Weiblich</strong>
                <p className="text-sm text-gray-600">Rosa Füllung für lebende Personen</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <polygon 
                    points="24,4 44,40 4,40" 
                    fill="#e1bee7" 
                    stroke="#9c27b0" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <strong>Dreieck = Divers</strong>
                <p className="text-sm text-gray-600">Lila Füllung für lebende Personen</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 border-2 border-gray-500 bg-gray-300 flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-700 rotate-45"></div>
                </div>
              </div>
              <div>
                <strong>Graue Füllung + Kreuzlinie = Verstorben</strong>
                <p className="text-sm text-gray-600">Unabhängig vom Geschlecht</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 border-4 border-orange-500 bg-blue-100 flex-shrink-0"></div>
              <div>
                <strong>Oranger Rahmen = Patient:in</strong>
                <p className="text-sm text-gray-600">Index-Person der Therapie</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500 mt-4">
            <p className="text-sm">
              <strong>Automatische Anordnung:</strong> Die Anwendung ordnet Personen automatisch 
              nach Generationen und Geschwisterreihenfolge an.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'export-save',
      icon: Lightbulb,
      title: 'Export & Speicherung',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Export-Funktionen</h4>
          <p className="leading-relaxed">
            Das fertige Genogramm können Sie in verschiedenen Formaten exportieren. Klicken Sie auf den 
            <strong className="text-purple-600"> "Mehr"-Button</strong> neben PNG/SVG für erweiterte Export-Optionen:
          </p>

          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
                  📥
                </div>
                <strong className="text-green-900">PNG (Pixelgrafik)</strong>
              </div>
              <p className="text-sm text-green-800">
                Ideal für Berichte, Dokumentation und Präsentationen. 
                Hohe Qualität (ca. 100-500 KB). Perfekt für Falldokumentation.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  📥
                </div>
                <strong className="text-blue-900">SVG (Vektorgrafik)</strong>
              </div>
              <p className="text-sm text-blue-800">
                Verlustfreie Skalierung für Druck und professionelle Verwendung. 
                Kann in Grafikprogrammen weiterbearbeitet werden (ca. 10-50 KB).
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white">
                  📄
                </div>
                <strong className="text-red-900">PDF (Dokument)</strong>
                <span className="ml-2 px-2 py-0.5 bg-red-200 text-red-800 text-xs rounded-full">Neu</span>
              </div>
              <p className="text-sm text-red-800">
                Professionelles Format mit Metadaten und Legende. Ideal für Archivierung 
                und Weitergabe an Kolleg:innen (ca. 50-200 KB).
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                  💾
                </div>
                <strong className="text-purple-900">JSON (Daten-Backup)</strong>
                <span className="ml-2 px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded-full">Neu</span>
              </div>
              <p className="text-sm text-purple-800">
                Vollständige Datensicherung für Import/Export zwischen Systemen. 
                Enthält alle Personen, Beziehungen und Metadaten. Perfekt für Backup!
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-500 mt-4">
            <strong className="text-amber-900">💡 Automatische Speicherung:</strong>
            <p className="text-sm text-amber-800 mt-2">
              Die Anwendung speichert Ihre Arbeit <strong>automatisch alle 30 Sekunden</strong> lokal im Browser. 
              Zusätzlich können Sie jederzeit mit <kbd className="px-2 py-1 bg-amber-200 rounded text-xs">Strg+S</kbd> manuell speichern.
            </p>
            <p className="text-sm text-amber-800 mt-2">
              <strong>Wichtig:</strong> Browser-Daten können gelöscht werden. Exportieren Sie wichtige 
              Genogramme regelmäßig als <strong>JSON-Backup</strong> zur Sicherung!
            </p>
          </div>

          <h4 className="font-semibold text-gray-800 mt-6">Datenschutz & Vertraulichkeit</h4>
          <ul className="list-disc list-inside space-y-2 text-sm ml-2">
            <li>Alle Daten verbleiben auf Ihrem Gerät (lokale Speicherung)</li>
            <li>Keine Übertragung an externe Server</li>
            <li>Exportierte Dateien sollten gemäß Datenschutzrichtlinien gesichert werden</li>
            <li>Beachten Sie bei Cloud-Speicherung die DSGVO-Anforderungen</li>
            <li>JSON-Exporte enthalten sensible Daten – sicher aufbewahren!</li>
          </ul>
        </div>
      )
    },
    {
      id: 'best-practices',
      icon: Lightbulb,
      title: 'Best Practices & Empfehlungen',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Therapeutische Empfehlungen</h4>
          
          <div className="space-y-3">
            <div className="bg-purple-50 rounded-lg p-4">
              <strong className="text-purple-900">✓ Gemeinsam erstellen</strong>
              <p className="text-sm text-purple-800 mt-1">
                Erstellen Sie das Genogramm <strong>mit</strong> den Klient:innen, nicht für sie. 
                Der Prozess ist therapeutisch wertvoll.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <strong className="text-blue-900">✓ Offene Fragen stellen</strong>
              <p className="text-sm text-blue-800 mt-1">
                Nutzen Sie zirkuläre und hypothetische Fragen: "Wer in der Familie würde sagen, 
                dass...?" / "Was würde Ihre Großmutter dazu sagen?"
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <strong className="text-green-900">✓ Ressourcen fokussieren</strong>
              <p className="text-sm text-green-800 mt-1">
                Fragen Sie nach Stärken, Talenten, Bewältigungsstrategien – nicht nur nach Problemen.
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4">
              <strong className="text-amber-900">✓ Kontextualisieren</strong>
              <p className="text-sm text-amber-800 mt-1">
                Berücksichtigen Sie historische Ereignisse, Migration, gesellschaftliche Umbrüche.
              </p>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <strong className="text-pink-900">✓ Hypothesen bilden</strong>
              <p className="text-sm text-pink-800 mt-1">
                Suchen Sie nach Mustern: Wiederholungen in Beziehungen, Berufen, Trennungen, 
                Krankheiten über Generationen hinweg.
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-800 mt-6">Was Sie vermeiden sollten</h4>
          <ul className="list-disc list-inside space-y-2 text-sm ml-2">
            <li>Deterministische Interpretationen ("Sie müssen depressiv werden, weil...")</li>
            <li>Überfüllung mit Details – weniger ist oft mehr</li>
            <li>Zu frühes Interpretieren – erst sammeln, dann analysieren</li>
            <li>Genogramm als "Wahrheit" darstellen – es ist eine subjektive Konstruktion</li>
          </ul>
        </div>
      )
    },
    {
      id: 'references',
      icon: BookOpen,
      title: 'Literatur & Quellen',
      content: (
        <div className="space-y-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Weiterführende Literatur</h4>
          
          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <strong className="text-gray-900">McGoldrick, M., Gerson, R., & Petry, S. (2022):</strong>
              <p className="mt-1">
                <em>Genogramme in der Familienberatung.</em> 5., überarbeitete Auflage. 
                Bern: Hogrefe. <span className="text-gray-600">[Standardwerk]</span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <strong className="text-gray-900">Hildenbrand, B. (2018):</strong>
              <p className="mt-1">
                <em>Genogrammarbeit für Fortgeschrittene: Vom Vorgegebenen zum Aufgegebenen.</em> 
                Heidelberg: Carl-Auer. <span className="text-gray-600">[Vertiefung]</span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <strong className="text-gray-900">McGoldrick, M. (2003):</strong>
              <p className="mt-1">
                <em>Wieder heimkommen. Spurensuche in Familiengeschichten.</em> 
                Heidelberg: Carl-Auer-Systeme. <span className="text-gray-600">[Mehrgenerationen-Perspektive]</span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <strong className="text-gray-900">Schwing, R. & Fryszer, A. (2006):</strong>
              <p className="mt-1">
                <em>Systemisches Handwerk. Werkzeug für die Praxis.</em> 
                Göttingen: Vandenhoeck & Ruprecht. <span className="text-gray-600">[Praktische Anwendung]</span>
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-800 mt-6">Theoretische Grundlagen</h4>
          <ul className="list-disc list-inside space-y-2 text-sm ml-2">
            <li><strong>Murray Bowen:</strong> Mehrgenerationale Familientherapie</li>
            <li><strong>Ivan Boszorményi-Nagy:</strong> Kontextuelle Therapie, unsichtbare Bindungen</li>
            <li><strong>Salvador Minuchin:</strong> Strukturelle Familientherapie</li>
            <li><strong>Virginia Satir:</strong> Kommunikation und Familienskulptur</li>
          </ul>

          <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500 mt-6">
            <p className="text-sm">
              Diese Anwendung basiert auf den etablierten Standards der systemischen 
              Familientherapie und folgt den Konventionen nach McGoldrick & Gerson.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('genogramm_tutorial_completed', 'true');
    }
    onClose();
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (!isOpen) return null;

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col my-8">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-primary text-white rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <CurrentIcon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
              <p className="text-sm text-white/80 mt-1">
                Schritt {currentSlide + 1} von {slides.length}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin">
          <div className="prose prose-sm max-w-none">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600">Nicht mehr automatisch anzeigen</span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                Zurück
              </button>
              
              {currentSlide === slides.length - 1 ? (
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 bg-gradient-primary text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Tutorial beenden
                </button>
              ) : (
                <button
                  onClick={nextSlide}
                  className="flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Weiter
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
