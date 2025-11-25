import React from 'react';
import { Users, Heart, Layers, CheckCircle } from 'lucide-react';

export default function StatsCard({ people, relationships }) {
  // Berechne Statistiken
  const totalPeople = people.length;
  const totalRelationships = relationships.length;
  
  // Berechne Generationen
  const generations = new Set();
  const calculateGenerations = () => {
    const genMap = {};
    const roots = people.filter(p => 
      !relationships.some(r => 
        (r.type === 'parent-child' || r.type === 'grandparent') && r.person2 === p.id
      )
    );
    
    roots.forEach(p => genMap[p.id] = 0);
    
    let changed = true;
    let iterations = 0;
    while (changed && iterations < 10) {
      changed = false;
      iterations++;
      
      relationships.forEach(rel => {
        if (rel.type === 'parent-child' && genMap[rel.person1] !== undefined && genMap[rel.person2] === undefined) {
          genMap[rel.person2] = genMap[rel.person1] + 1;
          changed = true;
        } else if (rel.type === 'grandparent' && genMap[rel.person1] !== undefined && genMap[rel.person2] === undefined) {
          genMap[rel.person2] = genMap[rel.person1] + 2;
          changed = true;
        }
      });
    }
    
    people.forEach(p => {
      if (genMap[p.id] === undefined) genMap[p.id] = 0;
      generations.add(genMap[p.id]);
    });
    
    return generations.size;
  };
  
  const numGenerations = people.length > 0 ? calculateGenerations() : 0;
  
  // Berechne Vollständigkeit
  const completeness = people.length === 0 ? 0 : Math.min(100, Math.round(
    (people.filter(p => p.profession || p.diagnoses || p.age).length / people.length) * 100
  ));

  const stats = [
    {
      icon: Users,
      label: 'Personen',
      value: totalPeople,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: Heart,
      label: 'Beziehungen',
      value: totalRelationships,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    },
    {
      icon: Layers,
      label: 'Generationen',
      value: numGenerations,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      icon: CheckCircle,
      label: 'Vollständig',
      value: `${completeness}%`,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        📊 Übersicht
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-4 transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      {people.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
            <span>Genogramm-Fortschritt</span>
            <span>{completeness}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
