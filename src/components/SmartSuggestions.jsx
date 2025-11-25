import React, { useState, useEffect } from 'react';
import { Lightbulb, X, Users, Heart, CheckCircle } from 'lucide-react';

const SmartSuggestions = ({ people, relationships, onAction }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState([]);

  useEffect(() => {
    const newSuggestions = generateSuggestions();
    setSuggestions(newSuggestions.filter(s => !dismissedSuggestions.includes(s.id)));
  }, [people, relationships, dismissedSuggestions]);

  const generateSuggestions = () => {
    const suggestions = [];

    // Suggestion 1: First person
    if (people.length === 0) {
      suggestions.push({
        id: 'first-person',
        icon: <Users className="w-5 h-5" />,
        title: 'Erste Person hinzufügen',
        message: 'Beginnen Sie mit dem Patienten oder einer zentralen Person der Familie.',
        action: 'Person hinzufügen',
        actionType: 'add-person',
        priority: 'high'
      });
    }

    // Suggestion 2: Add relationships
    if (people.length >= 2 && relationships.length === 0) {
      suggestions.push({
        id: 'first-relationship',
        icon: <Heart className="w-5 h-5" />,
        title: 'Beziehungen hinzufügen',
        message: `Sie haben ${people.length} Personen erfasst. Definieren Sie jetzt ihre Beziehungen zueinander.`,
        action: 'Beziehung hinzufügen',
        actionType: 'add-relationship',
        priority: 'high'
      });
    }

    // Suggestion 3: Incomplete profile
    const incompletePeople = people.filter(p => 
      !p.age || !p.profession || !p.birthYear
    );
    if (incompletePeople.length > 0) {
      suggestions.push({
        id: 'complete-profiles',
        icon: <CheckCircle className="w-5 h-5" />,
        title: 'Profile vervollständigen',
        message: `${incompletePeople.length} Person(en) haben unvollständige Informationen. Fügen Sie Details wie Alter, Beruf hinzu.`,
        action: 'Bearbeiten',
        actionType: 'edit-person',
        actionData: incompletePeople[0],
        priority: 'medium'
      });
    }

    // Suggestion 4: Missing parents
    const peopleWithoutParents = people.filter(p => {
      const hasParentRelation = relationships.some(r => 
        r.person2 === p.id && (r.type === 'parent-child' || r.type === 'grandparent')
      );
      return !hasParentRelation && p.age && p.age > 18;
    });

    if (peopleWithoutParents.length > 0) {
      const person = peopleWithoutParents[0];
      suggestions.push({
        id: `missing-parents-${person.id}`,
        icon: <Users className="w-5 h-5" />,
        title: 'Eltern ergänzen?',
        message: `${person.name} hat keine Eltern eingetragen. Möchten Sie diese hinzufügen?`,
        action: 'Eltern hinzufügen',
        actionType: 'add-parents',
        actionData: person,
        priority: 'medium'
      });
    }

    // Suggestion 5: Missing siblings
    const adultChildren = people.filter(p => {
      const hasParents = relationships.some(r => 
        r.person2 === p.id && r.type === 'parent-child'
      );
      const hasSiblings = relationships.some(r => 
        (r.person1 === p.id || r.person2 === p.id) && r.type === 'sibling'
      );
      return hasParents && !hasSiblings && p.age && p.age > 15;
    });

    if (adultChildren.length > 0) {
      const person = adultChildren[0];
      suggestions.push({
        id: `missing-siblings-${person.id}`,
        icon: <Users className="w-5 h-5" />,
        title: 'Geschwister ergänzen?',
        message: `${person.name} hat keine Geschwister eingetragen. Gibt es welche?`,
        action: 'Geschwister hinzufügen',
        actionType: 'add-sibling',
        actionData: person,
        priority: 'low'
      });
    }

    // Suggestion 6: Completeness score
    const totalFields = people.length * 10; // Assuming 10 important fields per person
    const filledFields = people.reduce((sum, p) => {
      let filled = 0;
      if (p.name) filled++;
      if (p.age) filled++;
      if (p.birthYear) filled++;
      if (p.profession) filled++;
      if (p.education) filled++;
      if (p.maritalStatus) filled++;
      if (p.diagnoses) filled++;
      if (p.personality) filled++;
      if (p.notes) filled++;
      filled++; // gender is always filled
      return sum + filled;
    }, 0);

    const completeness = people.length > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

    if (people.length > 0 && completeness < 70) {
      suggestions.push({
        id: 'completeness-score',
        icon: <CheckCircle className="w-5 h-5" />,
        title: `Genogramm zu ${completeness}% vollständig`,
        message: 'Fügen Sie weitere Details hinzu, um ein umfassenderes Bild zu erhalten.',
        action: 'Details ergänzen',
        actionType: 'show-incomplete',
        priority: 'low'
      });
    }

    // Suggestion 7: Mark patient
    if (people.length > 0 && !people.some(p => p.isPatient)) {
      suggestions.push({
        id: 'mark-patient',
        icon: <Users className="w-5 h-5" />,
        title: 'Patient markieren',
        message: 'Markieren Sie die zentrale Person (Patient/in) mit einem orangenen Rahmen.',
        action: 'Patient markieren',
        actionType: 'mark-patient',
        priority: 'medium'
      });
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const handleDismiss = (suggestionId) => {
    setDismissedSuggestions([...dismissedSuggestions, suggestionId]);
  };

  const handleAction = (suggestion) => {
    onAction(suggestion.actionType, suggestion.actionData);
    handleDismiss(suggestion.id);
  };

  if (suggestions.length === 0) return null;

  // Only show top 2 suggestions
  const topSuggestions = suggestions.slice(0, 2);

  return (
    <div className="space-y-3 mb-6">
      {topSuggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className={`flex items-start gap-4 p-4 rounded-xl border-l-4 transition-all hover:shadow-md ${
            suggestion.priority === 'high'
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              : suggestion.priority === 'medium'
              ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500'
              : 'bg-gray-50 dark:bg-gray-800/50 border-gray-400'
          }`}
        >
          <div className={`mt-0.5 ${
            suggestion.priority === 'high'
              ? 'text-blue-600 dark:text-blue-400'
              : suggestion.priority === 'medium'
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            <Lightbulb className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                {suggestion.title}
              </h4>
              <button
                onClick={() => handleDismiss(suggestion.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {suggestion.message}
            </p>
            <button
              onClick={() => handleAction(suggestion)}
              className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition ${
                suggestion.priority === 'high'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : suggestion.priority === 'medium'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
              }`}
            >
              {suggestion.action}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartSuggestions;
