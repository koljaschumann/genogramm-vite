import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function PeopleList({ people, onEdit, onDelete }) {
  if (people.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">👤 Personen (0)</h3>
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-sm">Noch keine Personen hinzugefügt</div>
        </div>
      </div>
    );
  }

  // Funktion um Initialen zu erstellen
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        👤 Personen ({people.length})
      </h3>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin pr-2">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 transition-all duration-300 hover:from-teal-50 hover:to-teal-100 hover:translate-x-1 hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                  person.gender === 'male'
                    ? 'bg-gradient-male'
                    : person.gender === 'female'
                    ? 'bg-gradient-female'
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}
              >
                {getInitials(person.name)}
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800 truncate">
                    {person.name}
                  </span>
                  {person.isPatient && (
                    <span className="px-2 py-0.5 bg-gradient-warning text-orange-900 text-xs font-bold rounded-full">
                      PATIENT
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <span>{person.gender === 'male' ? '♂' : person.gender === 'female' ? '♀' : '⚧'}</span>
                  {person.age && <span>• {person.age} Jahre</span>}
                  {person.profession && <span>• {person.profession}</span>}
                </div>
                {person.diagnoses && (
                  <div className="text-xs text-red-600 mt-1 font-medium">
                    🏥 {person.diagnoses}
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(person)}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  title="Bearbeiten"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(person.id)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                  title="Löschen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
