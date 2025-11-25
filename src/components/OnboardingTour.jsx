import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const OnboardingTour = ({ isActive, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      target: '.logo-area',
      title: 'Willkommen bei GenoFlow! 👋',
      content: 'GenoFlow hilft Ihnen, professionelle therapeutische Genogramme zu erstellen. Lassen Sie uns einen kurzen Rundgang machen!',
      position: 'bottom',
      highlight: true
    },
    {
      target: '.add-person-button',
      title: 'Personen hinzufügen',
      content: 'Hier fügen Sie neue Familienmitglieder hinzu. Sie können alle relevanten Daten wie Alter, Beruf, Diagnosen und mehr erfassen.',
      position: 'bottom',
      highlight: true,
      action: 'Klicken Sie auf "Person" oder drücken Sie Strg+P'
    },
    {
      target: '.add-relationship-button',
      title: 'Beziehungen erstellen',
      content: 'Sobald Sie mindestens 2 Personen haben, können Sie hier ihre Beziehungen definieren - von Eltern-Kind bis zu komplexen Familienstrukturen.',
      position: 'bottom',
      highlight: true,
      action: 'Shortcut: Strg+R'
    },
    {
      target: '.stats-card',
      title: 'Übersicht & Statistiken',
      content: 'Hier sehen Sie auf einen Blick, wie viele Personen und Beziehungen Sie erfasst haben. Perfekt, um den Fortschritt zu verfolgen.',
      position: 'right',
      highlight: true
    },
    {
      target: '.people-list',
      title: 'Personenliste',
      content: 'Alle erfassten Personen werden hier aufgelistet. Sie können jeden Eintrag bearbeiten oder löschen.',
      position: 'right',
      highlight: true
    },
    {
      target: '.genogram-area',
      title: 'Genogramm-Visualisierung',
      content: 'Ihr Genogramm wird automatisch generiert und hier angezeigt. Sie können es als PNG oder SVG exportieren.',
      position: 'top',
      highlight: true
    },
    {
      target: '.tutorial-button',
      title: 'Ausführliches Tutorial',
      content: 'Für detaillierte Informationen zu psychologischen Grundlagen und allen Features öffnen Sie jederzeit das vollständige Tutorial.',
      position: 'bottom',
      highlight: true,
      action: 'Shortcut: Strg+Shift+?'
    },
    {
      target: null,
      title: 'Bereit loszulegen! 🎉',
      content: 'Sie können jetzt Ihr erstes Genogramm erstellen. Möchten Sie mit einer Vorlage beginnen oder von Grund auf starten?',
      position: 'center',
      highlight: false,
      showTemplates: true
    }
  ];

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setCompleted(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && currentStep < steps.length) {
      const step = steps[currentStep];
      if (step.target) {
        const element = document.querySelector(step.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [currentStep, isActive]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!isActive) return null;

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300" />

      {/* Spotlight Effect */}
      {currentStepData.highlight && currentStepData.target && (
        <div 
          className="fixed z-[101] pointer-events-none transition-all duration-500"
          style={{
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
            borderRadius: '12px'
          }}
          id="spotlight"
        />
      )}

      {/* Tour Card */}
      <div 
        className={`fixed z-[102] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full transition-all duration-300 ${
          currentStepData.position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''
        }`}
        style={getCardPosition(currentStepData)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {currentStepData.title}
            </h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Schritt {currentStep + 1} von {steps.length}
            </div>
          </div>
          <button 
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
            {currentStepData.content}
          </p>
          
          {currentStepData.action && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                💡 {currentStepData.action}
              </p>
            </div>
          )}

          {currentStepData.showTemplates && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button 
                onClick={() => {
                  onComplete('empty');
                }}
                className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 transition text-left"
              >
                <div className="text-2xl mb-2">📄</div>
                <div className="font-semibold text-sm text-gray-800 dark:text-white">Leer starten</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Von Grund auf</div>
              </button>
              
              <button 
                onClick={() => {
                  onComplete('template');
                }}
                className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 transition text-left"
              >
                <div className="text-2xl mb-2">📋</div>
                <div className="font-semibold text-sm text-gray-800 dark:text-white">Mit Vorlage</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Schnellstart</div>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium"
          >
            Tour überspringen
          </button>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-1 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Zurück
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="w-4 h-4" />
                  Fertig
                </>
              ) : (
                <>
                  Weiter
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Completion Animation */}
      {completed && (
        <div className="fixed inset-0 z-[103] flex items-center justify-center bg-black/80">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Tour abgeschlossen!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Viel Erfolg mit Ihrem ersten Genogramm!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to position the card based on target element
const getCardPosition = (step) => {
  if (step.position === 'center' || !step.target) {
    return {};
  }

  const element = document.querySelector(step.target);
  if (!element) return { top: '20px', left: '50%', transform: 'translateX(-50%)' }; // Fallback to top center

  const rect = element.getBoundingClientRect();
  const cardHeight = 400; // Approximate card height
  
  const positions = {
    top: { 
      bottom: `${window.innerHeight - rect.top + 20}px`, 
      left: `${Math.max(20, Math.min(rect.left, window.innerWidth - 450))}px` 
    },
    bottom: { 
      top: `${Math.min(rect.bottom + 20, window.innerHeight - cardHeight - 20)}px`, 
      left: `${Math.max(20, Math.min(rect.left, window.innerWidth - 450))}px` 
    },
    left: { 
      top: `${Math.max(20, Math.min(rect.top, window.innerHeight - cardHeight - 20))}px`, 
      right: `${window.innerWidth - rect.left + 20}px` 
    },
    right: { 
      top: `${Math.max(20, Math.min(rect.top, window.innerHeight - cardHeight - 20))}px`, 
      left: `${Math.min(rect.right + 20, window.innerWidth - 450)}px` 
    }
  };

  return positions[step.position] || { top: '20px', left: '50%', transform: 'translateX(-50%)' };
};

export default OnboardingTour;
