import React, { useState, useRef } from 'react';
import { Users, Plus, Trash2, Edit2, Save, X, Heart, AlertCircle, Download } from 'lucide-react';
import BugReportButton from './components/BugReportButton';
import StatsCard from './components/StatsCard';
import PeopleList from './components/PeopleList';
import TutorialModal from './components/TutorialModal';

const GenogramGenerator = () => {
  const [people, setPeople] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showRelForm, setShowRelForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const svgRef = useRef(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    birthYear: '',
    deathYear: '',
    causeOfDeath: '',
    status: 'alive',
    profession: '',
    education: '',
    maritalStatus: 'single',
    diagnoses: '',
    surgeries: '',
    addictions: '',
    mentalHealth: '',
    personality: '',
    notes: '',
    isPatient: false
  });

  const [relFormData, setRelFormData] = useState({
    person1: '',
    person2: '',
    type: 'parent-child',
    subtype: 'father',
    quality: 'normal',
    partnershipStatus: 'married'
  });

  const relationshipTypes = {
    'parent-child': {
      label: 'Eltern-Kind-Beziehung',
      subtypes: {
        'father': 'ist Vater von',
        'mother': 'ist Mutter von',
        'adoptive-father': 'ist Adoptivvater von',
        'adoptive-mother': 'ist Adoptivmutter von',
        'stepfather': 'ist Stiefvater von',
        'stepmother': 'ist Stiefmutter von'
      }
    },
    'grandparent': {
      label: 'Großeltern-Beziehung',
      subtypes: {
        'grandfather': 'ist Großvater/Opa von',
        'grandmother': 'ist Großmutter/Oma von'
      }
    },
    'great-grandparent': {
      label: 'Urgroßeltern-Beziehung',
      subtypes: {
        'great-grandfather': 'ist Urgroßvater von',
        'great-grandmother': 'ist Urgroßmutter von'
      }
    },
    'sibling': {
      label: 'Geschwister',
      subtypes: {
        'brother': 'ist Bruder von',
        'sister': 'ist Schwester von',
        'half-brother': 'ist Halbbruder von',
        'half-sister': 'ist Halbschwester von',
        'twin-brother': 'ist Zwillingsbruder von',
        'twin-sister': 'ist Zwillingsschwester von'
      }
    },
    'extended': {
      label: 'Erweiterte Familie',
      subtypes: {
        'aunt': 'ist Tante von',
        'uncle': 'ist Onkel von',
        'cousin-male': 'ist Cousin von',
        'cousin-female': 'ist Cousine von',
        'nephew': 'ist Neffe von',
        'niece': 'ist Nichte von',
        'great-aunt': 'ist Großtante von',
        'great-uncle': 'ist Großonkel von'
      }
    },
    'partnership': {
      label: 'Partnerschaft',
      subtypes: {
        'married': 'verheiratet mit',
        'partnership': 'in Beziehung mit',
        'open-relationship': 'offene Beziehung mit',
        'close-relationship': 'enges Verhältnis mit',
        'separated': 'getrennt lebend von',
        'divorced': 'geschieden von',
        'widowed': 'verwitwet von',
        'engaged': 'verlobt mit',
        'ex-partner': 'Ex-Partner von'
      }
    }
  };

  const relationshipQualities = {
    'normal': { 
      label: 'Normal', 
      color: '#666', 
      pattern: 'solid',
      description: 'Durchgezogene graue Linie'
    },
    'close': { 
      label: 'Eng/Nah', 
      color: '#27ae60', 
      pattern: 'solid',
      width: 3,
      description: 'Dicke grüne Linie'
    },
    'very-close': { 
      label: 'Sehr eng/Fusioniert', 
      color: '#27ae60', 
      pattern: 'double',
      width: 2,
      description: 'Doppelte grüne Linien'
    },
    'conflict': { 
      label: 'Konfliktreich', 
      color: '#e74c3c', 
      pattern: 'zigzag',
      description: 'Rote Zick-Zack-Linie'
    },
    'tense': { 
      label: 'Angespannt', 
      color: '#e67e22', 
      pattern: 'wavy',
      description: 'Orange Wellenlinie'
    },
    'distant': { 
      label: 'Distanziert', 
      color: '#95a5a6', 
      pattern: 'dashed',
      description: 'Gestrichelte graue Linie'
    },
    'broken': { 
      label: 'Abgebrochen', 
      color: '#c0392b', 
      pattern: 'crossed',
      description: 'Dunkelrote durchgestrichene Linie'
    },
    'cutoff': { 
      label: 'Kontaktabbruch', 
      color: '#34495e', 
      pattern: 'double-crossed',
      description: 'Doppelt durchgestrichene schwarze Linie'
    },
    'ambivalent': { 
      label: 'Ambivalent', 
      color: '#9b59b6', 
      pattern: 'dash-dot',
      description: 'Lila Strich-Punkt-Linie'
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      gender: 'male',
      birthYear: '',
      deathYear: '',
      causeOfDeath: '',
      status: 'alive',
      profession: '',
      education: '',
      maritalStatus: 'single',
      diagnoses: '',
      surgeries: '',
      addictions: '',
      mentalHealth: '',
      personality: '',
      notes: '',
      isPatient: false
    });
    setEditingId(null);
  };

  const resetRelForm = () => {
    setRelFormData({
      person1: '',
      person2: '',
      type: 'parent-child',
      subtype: 'father',
      quality: 'normal',
      partnershipStatus: 'married'
    });
  };

  const addPerson = () => {
    if (!formData.name) return;
    
    if (editingId) {
      setPeople(people.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      resetForm();
    } else {
      const newPerson = {
        id: Date.now(),
        ...formData
      };
      setPeople([...people, newPerson]);
      resetForm();
    }
    setShowForm(false);
  };

  const editPerson = (person) => {
    setFormData(person);
    setEditingId(person.id);
    setShowForm(true);
  };

  const deletePerson = (id) => {
    setPeople(people.filter(p => p.id !== id));
    setRelationships(relationships.filter(r => 
      r.person1 !== id && r.person2 !== id
    ));
  };

  const addRelationship = () => {
    const { person1, person2, type, subtype, quality } = relFormData;
    
    if (!person1 || !person2 || person1 === person2) return;

    const newRel = {
      id: Date.now(),
      person1: Number(person1),
      person2: Number(person2),
      type,
      subtype,
      quality
    };
    
    setRelationships([...relationships, newRel]);
    resetRelForm();
    setShowRelForm(false);
  };

  const deleteRelationship = (id) => {
    setRelationships(relationships.filter(r => r.id !== id));
  };

  const downloadAsPNG = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgWidth = svg.width.baseVal.value || 1200;
    const svgHeight = svg.height.baseVal.value || 800;
    canvas.width = svgWidth;
    canvas.height = svgHeight;

    img.onload = () => {
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `genogramm_${new Date().toISOString().split('T')[0]}.png`;
        link.click();
        URL.revokeObjectURL(url);
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const downloadAsSVG = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `genogramm_${new Date().toISOString().split('T')[0]}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getRelationshipLabel = (rel) => {
    const p1 = people.find(p => p.id === rel.person1);
    const p2 = people.find(p => p.id === rel.person2);
    if (!p1 || !p2) return '';
    
    const typeData = relationshipTypes[rel.type];
    const subtypeLabel = typeData?.subtypes[rel.subtype] || '';
    
    return `${p1.name} ${subtypeLabel} ${p2.name}`;
  };

  const renderGenogram = () => {
    if (people.length === 0) return null;

    const generations = {};
    const processedGenerations = new Set();
    
    const roots = people.filter(p => 
      !relationships.some(r => 
        (r.type === 'parent-child' || r.type === 'grandparent') && r.person2 === p.id
      )
    );

    roots.forEach(p => {
      generations[p.id] = 0;
      processedGenerations.add(p.id);
    });

    let changed = true;
    let iterations = 0;
    while (changed && iterations < 10) {
      changed = false;
      iterations++;
      
      relationships.forEach(rel => {
        if (rel.type === 'parent-child' && generations[rel.person1] !== undefined && generations[rel.person2] === undefined) {
          generations[rel.person2] = generations[rel.person1] + 1;
          processedGenerations.add(rel.person2);
          changed = true;
        } else if (rel.type === 'grandparent' && generations[rel.person1] !== undefined && generations[rel.person2] === undefined) {
          generations[rel.person2] = generations[rel.person1] + 2;
          processedGenerations.add(rel.person2);
          changed = true;
        } else if (rel.type === 'sibling' && generations[rel.person1] !== undefined && generations[rel.person2] === undefined) {
          generations[rel.person2] = generations[rel.person1];
          processedGenerations.add(rel.person2);
          changed = true;
        }
      });
    }

    people.forEach(p => {
      if (generations[p.id] === undefined) {
        generations[p.id] = 0;
      }
    });

    const genLevels = {};
    people.forEach(p => {
      const gen = generations[p.id];
      if (!genLevels[gen]) genLevels[gen] = [];
      genLevels[gen].push(p);
    });

    const maxGen = Math.max(...Object.keys(genLevels).map(Number));
    const spacing = 160;
    const verticalSpacing = 200;

    return (
      <svg ref={svgRef} width="100%" height={Math.max(500, (maxGen + 1) * 200)} style={{ border: '1px solid #ddd', background: '#fafafa' }}>
        {relationships.map(rel => {
          const p1 = people.find(p => p.id === rel.person1);
          const p2 = people.find(p => p.id === rel.person2);
          if (!p1 || !p2) return null;

          const gen1 = generations[p1.id];
          const gen2 = generations[p2.id];
          const idx1 = genLevels[gen1].indexOf(p1);
          const idx2 = genLevels[gen2].indexOf(p2);

          const x1 = 100 + idx1 * 160 + 30;
          const y1 = 80 + gen1 * 200 + 30;
          const x2 = 100 + idx2 * 160 + 30;
          const y2 = 80 + gen2 * 200 + 30;

          const qualityStyle = relationshipQualities[rel.quality] || relationshipQualities['normal'];

          return (
            <line 
              key={rel.id} 
              x1={x1} 
              y1={y1} 
              x2={x2} 
              y2={y2} 
              stroke={qualityStyle.color} 
              strokeWidth={qualityStyle.width || 2}
              strokeDasharray={qualityStyle.dash}
            />
          );
        })}

        {Object.keys(genLevels).map(gen => 
          genLevels[gen].map((person, idx) => {
            const x = 120 + idx * spacing;
            const y = 100 + Number(gen) * verticalSpacing;

            return (
              <g key={person.id}>
                {person.isPatient && (
                  <rect 
                    x={x - 5} 
                    y={y - 5} 
                    width="70" 
                    height="70" 
                    fill="none"
                    stroke="#f39c12" 
                    strokeWidth="3"
                  />
                )}
                
                {person.gender === 'male' ? (
                  <rect 
                    x={x} 
                    y={y} 
                    width="60" 
                    height="60" 
                    fill={person.status === 'deceased' ? '#bdc3c7' : '#3498db'} 
                    stroke="#2c3e50" 
                    strokeWidth="2"
                  />
                ) : (
                  <circle 
                    cx={x + 30} 
                    cy={y + 30} 
                    r="30" 
                    fill={person.status === 'deceased' ? '#bdc3c7' : '#e91e63'} 
                    stroke="#2c3e50" 
                    strokeWidth="2"
                  />
                )}
                
                {person.status === 'deceased' && (
                  <line x1={x} y1={y} x2={x + 60} y2={y + 60} stroke="#2c3e50" strokeWidth="2" />
                )}
                
                <text 
                  x={x + 30} 
                  y={y + 85} 
                  textAnchor="middle" 
                  fontSize="14" 
                  fontWeight="bold"
                >
                  {person.name}
                </text>
                
                {person.age && (
                  <text 
                    x={x + 30} 
                    y={y + 102} 
                    textAnchor="middle" 
                    fontSize="11"
                  >
                    {person.age} Jahre
                  </text>
                )}
                
                {person.profession && (
                  <text 
                    x={x + 30} 
                    y={y + 117} 
                    textAnchor="middle" 
                    fontSize="10"
                    fill="#555"
                  >
                    {person.profession}
                  </text>
                )}
                
                {person.diagnoses && (
                  <>
                    {person.diagnoses.length > 25 ? (
                      <>
                        <text 
                          x={x + 30} 
                          y={y + 132} 
                          textAnchor="middle" 
                          fontSize="9"
                          fill="#c0392b"
                        >
                          {person.diagnoses.substring(0, 25)}
                        </text>
                        <text 
                          x={x + 30} 
                          y={y + 143} 
                          textAnchor="middle" 
                          fontSize="9"
                          fill="#c0392b"
                        >
                          {person.diagnoses.substring(25, 50)}
                        </text>
                      </>
                    ) : (
                      <text 
                        x={x + 30} 
                        y={y + 132} 
                        textAnchor="middle" 
                        fontSize="9"
                        fill="#c0392b"
                      >
                        {person.diagnoses}
                      </text>
                    )}
                  </>
                )}

                {person.status === 'deceased' && person.causeOfDeath && (
                  <text 
                    x={x + 30} 
                    y={y + 155} 
                    textAnchor="middle" 
                    fontSize="8"
                    fill="#7f8c8d"
                  >
                    †{person.causeOfDeath}
                  </text>
                )}
              </g>
            );
          })
        )}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Therapeutisches Genogramm</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowTutorial(true)}
                className="flex items-center gap-2 bg-white text-purple-600 border-2 border-purple-600 btn-modern"
              >
                <span>📚</span>
                Tutorial
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(!showForm);
                  setShowRelForm(false);
                }}
                className="flex items-center gap-2 bg-gradient-primary text-white btn-modern"
              >
                {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm ? 'Abbrechen' : 'Person hinzufügen'}
              </button>
              {people.length >= 2 && (
                <button
                  onClick={() => {
                    resetRelForm();
                    setShowRelForm(!showRelForm);
                    setShowForm(false);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white btn-modern"
                >
                  {showRelForm ? <X className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                  {showRelForm ? 'Abbrechen' : 'Beziehung hinzufügen'}
                </button>
              )}
            </div>
          </div>

          {showForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Person bearbeiten' : 'Neue Person hinzufügen'}
              </h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Grunddaten</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Alter"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="male">Männlich</option>
                    <option value="female">Weiblich</option>
                    <option value="other">Divers</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Geburtsjahr"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="alive">Lebend</option>
                    <option value="deceased">Verstorben</option>
                  </select>
                  {formData.status === 'deceased' && (
                    <>
                      <input
                        type="number"
                        placeholder="Sterbejahr"
                        value={formData.deathYear}
                        onChange={(e) => setFormData({...formData, deathYear: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Todesursache"
                        value={formData.causeOfDeath}
                        onChange={(e) => setFormData({...formData, causeOfDeath: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 col-span-2"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Soziale Informationen</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Beruf"
                    value={formData.profession}
                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Schulabschluss</option>
                    <option value="Hauptschule">Hauptschule</option>
                    <option value="Realschule">Realschule</option>
                    <option value="Abitur">Abitur</option>
                    <option value="Studium">Studium</option>
                    <option value="Promotion">Promotion</option>
                  </select>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="single">Ledig</option>
                    <option value="married">Verheiratet</option>
                    <option value="divorced">Geschieden</option>
                    <option value="widowed">Verwitwet</option>
                    <option value="partnership">Partnerschaft</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Medizinische & Psychologische Informationen</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Diagnosen"
                    value={formData.diagnoses}
                    onChange={(e) => setFormData({...formData, diagnoses: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Operationen/med. Eingriffe"
                    value={formData.surgeries}
                    onChange={(e) => setFormData({...formData, surgeries: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Abhängigkeiten"
                    value={formData.addictions}
                    onChange={(e) => setFormData({...formData, addictions: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Psychische Gesundheit"
                    value={formData.mentalHealth}
                    onChange={(e) => setFormData({...formData, mentalHealth: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Persönlichkeit & Besonderheiten</h4>
                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    placeholder="Persönlichkeitsmerkmale"
                    value={formData.personality}
                    onChange={(e) => setFormData({...formData, personality: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <textarea
                    placeholder="Notizen & Signalstichpunkte"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="border border-gray-300 rounded px-3 py-2 h-20"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPatient}
                    onChange={(e) => setFormData({...formData, isPatient: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">Als Patient markieren</span>
                </label>
              </div>

              <button
                onClick={addPerson}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Änderungen speichern' : 'Person speichern'}
              </button>
            </div>
          )}

          {showRelForm && (
            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Neue Beziehung hinzufügen</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person 1</label>
                  <select
                    value={relFormData.person1}
                    onChange={(e) => setRelFormData({...relFormData, person1: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Wählen...</option>
                    {people.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person 2</label>
                  <select
                    value={relFormData.person2}
                    onChange={(e) => setRelFormData({...relFormData, person2: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Wählen...</option>
                    {people.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beziehungstyp</label>
                  <select
                    value={relFormData.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      const firstSubtype = Object.keys(relationshipTypes[newType].subtypes)[0];
                      setRelFormData({...relFormData, type: newType, subtype: firstSubtype});
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {Object.entries(relationshipTypes).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spezifische Beziehung</label>
                  <select
                    value={relFormData.subtype}
                    onChange={(e) => setRelFormData({...relFormData, subtype: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {Object.entries(relationshipTypes[relFormData.type].subtypes).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beziehungsqualität</label>
                  <select
                    value={relFormData.quality}
                    onChange={(e) => setRelFormData({...relFormData, quality: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {Object.entries(relationshipQualities).map(([key, data]) => (
                      <option key={key} value={key}>{data.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={addRelationship}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
                Beziehung hinzufügen
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <StatsCard people={people} relationships={relationships} />
              <PeopleList people={people} onEdit={editPerson} onDelete={deletePerson} />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {relationships.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Erfasste Beziehungen ({relationships.length})</h2>
                  <div className="space-y-2">
                    {relationships.map(rel => (
                      <div key={rel.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-all">
                        <div>
                          <span className="font-medium">{getRelationshipLabel(rel)}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            ({relationshipQualities[rel.quality]?.label})
                          </span>
                        </div>
                        <button
                          onClick={() => deleteRelationship(rel.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Genogramm-Visualisierung</h2>
                  {people.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={downloadAsPNG}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <Download className="w-5 h-5" />
                        Als PNG
                      </button>
                      <button
                        onClick={downloadAsSVG}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <Download className="w-5 h-5" />
                        Als SVG
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-4 p-3 bg-blue-50 rounded text-sm space-y-1">
                  <div><strong>Legende - Personen:</strong></div>
                  <div>• Quadrat = Männlich, Kreis = Weiblich</div>
                  <div>• Grau mit Kreuzlinie = Verstorben</div>
                  <div>• Orange Rahmen = Patient/in</div>
                  <div className="mt-2"><strong>Legende - Beziehungen:</strong></div>
                  <div>• <span style={{color: '#27ae60'}}>Dicke grüne Linie</span> = Enge/Nahe Beziehung</div>
                  <div>• <span style={{color: '#27ae60'}}>Doppelte grüne Linien</span> = Sehr eng/Fusioniert</div>
                  <div>• <span style={{color: '#e74c3c'}}>Rote Zick-Zack-Linie</span> = Konfliktreich</div>
                  <div>• <span style={{color: '#e67e22'}}>Orange Wellenlinie</span> = Angespannt</div>
                  <div>• <span style={{color: '#95a5a6'}}>Gestrichelte graue Linie</span> = Distanzierte Beziehung</div>
                  <div>• <span style={{color: '#c0392b'}}>Durchgestrichene Linie</span> = Abgebrochene Beziehung</div>
                  <div>• <span style={{color: '#34495e'}}>Doppelt durchgestrichen</span> = Kontaktabbruch</div>
                  <div>• <span style={{color: '#9b59b6'}}>Strich-Punkt lila</span> = Ambivalente Beziehung</div>
                </div>
                {people.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    Fügen Sie Personen und Beziehungen hinzu, um das Genogramm zu erstellen
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    {renderGenogram()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <TutorialModal 
            isOpen={showTutorial} 
            onClose={() => setShowTutorial(false)} 
          />
          
          <BugReportButton />
        </div>
      </div>
    </div>
  );
};

export default GenogramGenerator;
