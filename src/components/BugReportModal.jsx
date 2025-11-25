import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function BugReportModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    expected: '',
    actual: '',
    severity: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [issueUrl, setIssueUrl] = useState('');

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      steps: '',
      expected: '',
      actual: '',
      severity: 'medium'
    });
    setSubmitStatus(null);
    setIssueUrl('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.actual) {
      alert('Bitte fülle mindestens Titel und "Was ist passiert" aus.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Browser- und Device-Informationen sammeln
    const browserInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString()
    };

    // Severity Labels
    const severityLabels = {
      low: '🟢 Niedrig',
      medium: '🟡 Mittel',
      high: '🔴 Hoch',
      critical: '🔴 Kritisch'
    };

    // Formatierter Issue-Body
    let issueBody = `## 🐛 Bug-Beschreibung\n\n${formData.actual}\n\n`;
    
    if (formData.description) {
      issueBody += `## 📝 Zusätzliche Details\n\n${formData.description}\n\n`;
    }
    
    if (formData.steps) {
      issueBody += `## 🔄 Schritte zur Reproduktion\n\n${formData.steps}\n\n`;
    }
    
    if (formData.expected) {
      issueBody += `## ✅ Erwartetes Verhalten\n\n${formData.expected}\n\n`;
    }

    issueBody += `## ⚠️ Schweregrad\n\n${severityLabels[formData.severity]}\n\n`;

    issueBody += `## 💻 System-Informationen\n\n`;
    issueBody += `- **Browser:** ${browserInfo.userAgent}\n`;
    issueBody += `- **Plattform:** ${browserInfo.platform}\n`;
    issueBody += `- **Sprache:** ${browserInfo.language}\n`;
    issueBody += `- **Bildschirmauflösung:** ${browserInfo.screenResolution}\n`;
    issueBody += `- **Viewport:** ${browserInfo.viewport}\n`;
    issueBody += `- **Zeitpunkt:** ${browserInfo.timestamp}\n\n`;
    issueBody += `---\n*Automatisch generiert durch Bug-Report-System*`;

    try {
      const response = await fetch('/api/create-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `[${severityLabels[formData.severity]}] ${formData.title}`,
          body: issueBody
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setIssueUrl(result.issueUrl);
        
        // Modal nach 5 Sekunden automatisch schließen
        setTimeout(() => {
          handleClose();
        }, 5000);
      } else {
        throw new Error(result.error || 'Fehler beim Erstellen des Issues');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Bug melden</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bug-Report erfolgreich gesendet!
              </h3>
              <p className="text-gray-600 mb-4">
                Vielen Dank für deine Hilfe bei der Verbesserung der App!
              </p>
              {issueUrl && (
                <a
                  href={issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Issue auf GitHub ansehen →
                </a>
              )}
              <p className="text-sm text-gray-500 mt-4">
                Dieses Fenster schließt sich automatisch in 5 Sekunden...
              </p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Fehler beim Senden
              </h3>
              <p className="text-gray-600 mb-4">
                Entschuldigung, es gab einen Fehler beim Erstellen des Bug-Reports.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Nochmal versuchen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Titel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titel / Kurze Zusammenfassung <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="z.B. App stürzt ab beim Speichern"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Schweregrad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schweregrad
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">🟢 Niedrig - Kleiner Schönheitsfehler</option>
                  <option value="medium">🟡 Mittel - Beeinträchtigt Nutzung</option>
                  <option value="high">🔴 Hoch - Wichtige Funktion funktioniert nicht</option>
                  <option value="critical">🔴 Kritisch - App nicht nutzbar</option>
                </select>
              </div>

              {/* Was ist passiert */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Was ist passiert? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.actual}
                  onChange={(e) => setFormData({...formData, actual: e.target.value})}
                  placeholder="Beschreibe das Problem..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  required
                />
              </div>

              {/* Schritte zur Reproduktion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schritte zur Reproduktion (optional)
                </label>
                <textarea
                  value={formData.steps}
                  onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  placeholder="1. Gehe zu...&#10;2. Klicke auf...&#10;3. Dann passiert..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>

              {/* Erwartetes Verhalten */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Was wurde erwartet? (optional)
                </label>
                <textarea
                  value={formData.expected}
                  onChange={(e) => setFormData({...formData, expected: e.target.value})}
                  placeholder="Was sollte eigentlich passieren?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>

              {/* Zusätzliche Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zusätzliche Details (optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Weitere Informationen, die helfen könnten..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                ℹ️ Browser- und Systeminformationen werden automatisch hinzugefügt.
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Bug-Report absenden'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
