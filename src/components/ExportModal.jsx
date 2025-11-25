import React, { useState } from 'react';
import { Download, FileText, Image, Code, X } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, onExport, people, relationships }) => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeLegend, setIncludeLegend] = useState(true);

  if (!isOpen) return null;

  const exportFormats = [
    {
      id: 'png',
      name: 'PNG Bild',
      description: 'Hohe Qualität, ideal für Präsentationen',
      icon: <Image className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'svg',
      name: 'SVG Vektor',
      description: 'Skalierbar ohne Qualitätsverlust',
      icon: <Code className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'pdf',
      name: 'PDF Dokument',
      description: 'Professionell mit Metadaten und Legende',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      badge: 'Neu'
    },
    {
      id: 'json',
      name: 'JSON Daten',
      description: 'Für Import/Export zwischen Systemen',
      icon: <Code className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleExport = () => {
    onExport(selectedFormat, { includeMetadata, includeLegend });
    onClose();
  };

  const getExportSize = () => {
    const peopleCount = people.length;
    const relCount = relationships.length;
    
    if (selectedFormat === 'json') {
      const estimatedSize = Math.ceil((peopleCount * 500 + relCount * 200) / 1024);
      return `~${estimatedSize} KB`;
    }
    
    if (selectedFormat === 'pdf') {
      return '~50-200 KB';
    }
    
    if (selectedFormat === 'svg') {
      return '~10-50 KB';
    }
    
    return '~100-500 KB';
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Download className="w-6 h-6" />
                Genogramm exportieren
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Wählen Sie ein Format für den Export
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Format Selection */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedFormat === format.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                {format.badge && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {format.badge}
                  </span>
                )}
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${format.color} text-white mb-3`}>
                  {format.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                  {format.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format.description}
                </p>
              </button>
            ))}
          </div>

          {/* Export Options */}
          {(selectedFormat === 'pdf' || selectedFormat === 'png') && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                Export-Optionen
              </h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLegend}
                    onChange={(e) => setIncludeLegend(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Legende einschließen
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Symbole und Beziehungstypen erklären
                    </div>
                  </div>
                </label>
                
                {selectedFormat === 'pdf' && (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMetadata}
                      onChange={(e) => setIncludeMetadata(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Metadaten einschließen
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Statistiken und Erstellungsdatum
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Export Info */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                <Download className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Export-Informationen
                </h4>
                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <div>• {people.length} Personen und {relationships.length} Beziehungen</div>
                  <div>• Geschätzte Dateigröße: {getExportSize()}</div>
                  {selectedFormat === 'json' && (
                    <div>• Kann in anderen GenoFlow-Instanzen importiert werden</div>
                  )}
                  {selectedFormat === 'pdf' && (
                    <div>• Professionelles Layout mit Kopf- und Fußzeile</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition font-semibold"
            >
              Abbrechen
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              <Download className="w-5 h-5" />
              Jetzt exportieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
