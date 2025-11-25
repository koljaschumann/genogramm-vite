import { useState, useRef, useEffect } from 'react';

export default function BugReportModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportData, setReportData] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialisierung des Gesprächs
      setMessages([{
        role: 'assistant',
        content: 'Hallo! Ich helfe dir dabei, einen Bug-Report zu erstellen. Kannst du mir beschreiben, was passiert ist?'
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // User-Nachricht hinzufügen
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Claude API Call
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Du bist ein hilfreicher Assistent, der Nutzer durch das Erstellen eines Bug-Reports führt. 
          
Sammle folgende Informationen:
1. Was hat der Nutzer gemacht? (Schritte zur Reproduktion)
2. Was ist passiert? (Tatsächliches Verhalten)
3. Was wurde erwartet? (Erwartetes Verhalten)

Stelle eine Frage nach der anderen. Sei freundlich und präzise.

Wenn du alle Informationen hast, generiere einen strukturierten Bug-Report im folgenden JSON-Format (und NUR JSON, keine zusätzlichen Texte):

{
  "title": "Kurze prägnante Zusammenfassung des Bugs",
  "steps": "1. Schritt eins\\n2. Schritt zwei\\n3. ...",
  "expected": "Was erwartet wurde",
  "actual": "Was tatsächlich passiert ist",
  "ready": true
}

Antworte auf Deutsch.`,
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      const assistantMessage = data.content[0].text;

      // Prüfen, ob Report fertig ist
      try {
        // Versuche JSON aus der Antwort zu extrahieren
        const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const reportJson = JSON.parse(jsonMatch[0]);
          if (reportJson.ready) {
            setReportData(reportJson);
            setMessages([...newMessages, { 
              role: 'assistant', 
              content: 'Perfekt! Ich habe alle Informationen. Hier ist eine Vorschau deines Bug-Reports:\n\n**' + reportJson.title + '**\n\nMöchtest du diesen Report absenden?' 
            }]);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        // Kein JSON gefunden, normaler Dialog
      }

      // Normale Antwort
      setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error calling Claude:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Entschuldigung, es gab einen Fehler. Bitte versuche es erneut.' 
      }]);
    }

    setIsLoading(false);
  };

  const submitReport = async () => {
    if (!reportData) return;
    
    setIsSubmitting(true);

    // Browser- und Device-Informationen sammeln
    const browserInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString()
    };

    // Formatierter Issue-Body
    const issueBody = `## Bug-Beschreibung

${reportData.actual}

## Erwartetes Verhalten

${reportData.expected}

## Schritte zur Reproduktion

${reportData.steps}

## System-Informationen

- **Browser:** ${browserInfo.userAgent}
- **Platform:** ${browserInfo.platform}
- **Sprache:** ${browserInfo.language}
- **Bildschirmauflösung:** ${browserInfo.screenResolution}
- **Viewport:** ${browserInfo.viewport}
- **Zeitpunkt:** ${browserInfo.timestamp}

---
*Automatisch generiert durch Bug-Report-System*`;

    try {
      const response = await fetch('/api/create-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: reportData.title,
          body: issueBody
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessages([...messages, { 
          role: 'assistant', 
          content: `✅ Bug-Report erfolgreich erstellt!\n\nIssue #${result.issueNumber}\n\nDu kannst den Status hier verfolgen: ${result.issueUrl}\n\nVielen Dank für deine Hilfe!` 
        }]);
        
        // Modal nach 3 Sekunden schließen
        setTimeout(() => {
          onClose();
          resetModal();
        }, 3000);
      } else {
        throw new Error(result.error || 'Fehler beim Erstellen des Issues');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setMessages([...messages, { 
        role: 'assistant', 
        content: '❌ Fehler beim Absenden des Reports. Bitte versuche es später erneut.' 
      }]);
    }

    setIsSubmitting(false);
  };

  const resetModal = () => {
    setMessages([]);
    setInput('');
    setReportData(null);
    setIsLoading(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300); // Nach Animation zurücksetzen
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Bug melden</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-200">
          {reportData ? (
            <button
              onClick={submitReport}
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Report absenden'}
            </button>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Deine Antwort..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Senden
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
