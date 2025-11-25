import React from 'react';
import { Mail, FileText, HelpCircle, Shield, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-purple-300">GenoFlow</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Professionelle digitale Lösung für therapeutische Genogramme. 
              Entwickelt für psychologische Psychotherapeut:innen und Familientherapeut:innen.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Shield className="w-4 h-4" />
              <span>DSGVO-konform • Datenschutz garantiert</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-purple-300">Support & Hilfe</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@genoflow.app" 
                  className="text-sm text-gray-300 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Support kontaktieren
                </a>
              </li>
              <li>
                <button 
                  onClick={() => window.alert('Tutorial wird geöffnet...')}
                  className="text-sm text-gray-300 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  Anleitung & Tutorial
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/koljaschumann/genogramm-vite" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Open Source auf GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-purple-300">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/impressum" 
                  className="text-sm text-gray-300 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Impressum
                </a>
              </li>
              <li>
                <a 
                  href="/datenschutz" 
                  className="text-sm text-gray-300 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a 
                  href="/nutzungsbedingungen" 
                  className="text-sm text-gray-300 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Nutzungsbedingungen
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} GenoFlow. Alle Rechte vorbehalten.
            </div>

            {/* Additional Info */}
            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>Version 1.0.0 • Entwickelt mit ❤️ für therapeutische Praxis</p>
              <p className="mt-1">
                Basierend auf den Standards von{' '}
                <span className="text-purple-300">McGoldrick & Gerson</span>
              </p>
            </div>
          </div>
        </div>

        {/* Beta Notice (optional) */}
        <div className="mt-6 p-3 bg-purple-900/30 rounded-lg border border-purple-700/50">
          <p className="text-xs text-center text-purple-200">
            🚀 <strong>Beta-Version:</strong> Diese Anwendung befindet sich in der Pilotphase. 
            Bitte melden Sie Fehler über den Bug-Report-Button.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
