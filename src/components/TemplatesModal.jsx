import React from 'react';
import { X, Users, Home, TreeDeciduous, Sparkles } from 'lucide-react';

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  const templates = [
    {
      id: 'empty',
      name: 'Leer',
      description: 'Beginnen Sie von Grund auf',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
      borderColor: 'border-gray-300 dark:border-gray-600',
      data: { people: [], relationships: [] }
    },
    {
      id: 'nuclear-family',
      name: 'Kleinfamilie',
      description: '2 Eltern + 2 Kinder',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50',
      borderColor: 'border-blue-300 dark:border-blue-600',
      data: {
        people: [
          { id: 1, name: 'Vater', age: '45', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 2, name: 'Mutter', age: '43', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 3, name: 'Kind 1', age: '18', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'single', isPatient: false },
          { id: 4, name: 'Kind 2', age: '15', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'single', isPatient: false }
        ],
        relationships: [
          { id: 101, person1: 1, person2: 3, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 102, person1: 1, person2: 4, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 103, person1: 2, person2: 3, type: 'parent-child', subtype: 'mother', quality: 'normal' },
          { id: 104, person1: 2, person2: 4, type: 'parent-child', subtype: 'mother', quality: 'normal' },
          { id: 105, person1: 1, person2: 2, type: 'partnership', subtype: 'married', quality: 'normal' },
          { id: 106, person1: 3, person2: 4, type: 'sibling', subtype: 'brother', quality: 'normal' }
        ]
      }
    },
    {
      id: 'three-generations',
      name: '3 Generationen',
      description: 'Großeltern, Eltern, Kinder',
      icon: <TreeDeciduous className="w-8 h-8" />,
      color: 'from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50',
      borderColor: 'border-green-300 dark:border-green-600',
      data: {
        people: [
          { id: 1, name: 'Opa', age: '75', gender: 'male', status: 'alive', profession: 'Rentner', education: '', maritalStatus: 'married' },
          { id: 2, name: 'Oma', age: '73', gender: 'female', status: 'alive', profession: 'Rentnerin', education: '', maritalStatus: 'married' },
          { id: 3, name: 'Vater', age: '48', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 4, name: 'Mutter', age: '45', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 5, name: 'Kind', age: '20', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'single', isPatient: true }
        ],
        relationships: [
          { id: 101, person1: 1, person2: 2, type: 'partnership', subtype: 'married', quality: 'normal' },
          { id: 102, person1: 1, person2: 3, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 103, person1: 2, person2: 3, type: 'parent-child', subtype: 'mother', quality: 'normal' },
          { id: 104, person1: 3, person2: 4, type: 'partnership', subtype: 'married', quality: 'normal' },
          { id: 105, person1: 3, person2: 5, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 106, person1: 4, person2: 5, type: 'parent-child', subtype: 'mother', quality: 'normal' }
        ]
      }
    },
    {
      id: 'patchwork',
      name: 'Patchwork-Familie',
      description: 'Geschiedene Eltern, neue Partner',
      icon: <Home className="w-8 h-8" />,
      color: 'from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50',
      borderColor: 'border-purple-300 dark:border-purple-600',
      data: {
        people: [
          { id: 1, name: 'Vater', age: '50', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'divorced' },
          { id: 2, name: 'Mutter', age: '48', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'divorced' },
          { id: 3, name: 'Stiefvater', age: '52', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 4, name: 'Kind', age: '16', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'single', isPatient: true }
        ],
        relationships: [
          { id: 101, person1: 1, person2: 2, type: 'partnership', subtype: 'divorced', quality: 'distant' },
          { id: 102, person1: 2, person2: 3, type: 'partnership', subtype: 'married', quality: 'normal' },
          { id: 103, person1: 1, person2: 4, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 104, person1: 2, person2: 4, type: 'parent-child', subtype: 'mother', quality: 'normal' },
          { id: 105, person1: 3, person2: 4, type: 'parent-child', subtype: 'stepfather', quality: 'normal' }
        ]
      }
    },
    {
      id: 'extended-family',
      name: 'Erweiterte Familie',
      description: 'Mit Tanten, Onkeln, Cousins',
      icon: <Users className="w-8 h-8" />,
      color: 'from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50',
      borderColor: 'border-orange-300 dark:border-orange-600',
      data: {
        people: [
          { id: 1, name: 'Mutter', age: '45', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 2, name: 'Vater', age: '48', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 3, name: 'Tante', age: '42', gender: 'female', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 4, name: 'Onkel', age: '44', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'married' },
          { id: 5, name: 'Patient/in', age: '18', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'single', isPatient: true },
          { id: 6, name: 'Cousin', age: '20', gender: 'male', status: 'alive', profession: '', education: '', maritalStatus: 'single' }
        ],
        relationships: [
          { id: 101, person1: 1, person2: 2, type: 'partnership', subtype: 'married', quality: 'normal' },
          { id: 102, person1: 3, person2: 4, type: 'partnership', subtype: 'married', quality: 'normal' },
          { id: 103, person1: 1, person2: 5, type: 'parent-child', subtype: 'mother', quality: 'normal' },
          { id: 104, person1: 2, person2: 5, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 105, person1: 3, person2: 6, type: 'parent-child', subtype: 'mother', quality: 'normal' },
          { id: 106, person1: 4, person2: 6, type: 'parent-child', subtype: 'father', quality: 'normal' },
          { id: 107, person1: 1, person2: 3, type: 'sibling', subtype: 'sister', quality: 'close' },
          { id: 108, person1: 5, person2: 6, type: 'extended', subtype: 'cousin-male', quality: 'normal' }
        ]
      }
    }
  ];

  const handleSelect = (template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Vorlage auswählen
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Starten Sie mit einer vorgefertigten Familienstruktur
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

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelect(template)}
                className={`group p-6 rounded-xl border-2 ${template.borderColor} bg-gradient-to-br ${template.color} hover:shadow-lg transition-all text-left`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  {template.id !== 'empty' && (
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {template.data.people.length} Personen
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 Alle Vorlagen können nach dem Import bearbeitet werden
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition font-semibold"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesModal;
