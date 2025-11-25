import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Filter, Eye, EyeOff, Search, X } from 'lucide-react';

const GenogramControls = ({ 
  zoom, 
  onZoomChange, 
  people, 
  relationships,
  onFilterChange,
  onHighlight,
  onSearch
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    showLiving: true,
    showDeceased: true,
    generation: 'all',
    hasRelationships: 'all',
    hasDetails: 'all'
  });

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 0.2, 2);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.2, 0.5);
    onZoomChange(newZoom);
  };

  const handleResetZoom = () => {
    onZoomChange(1);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v, i) => i > 1 && v !== 'all'
  ).length + (!filters.showLiving || !filters.showDeceased ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Main Controls Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Herauszoomen"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <div className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </div>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 2}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Hineinzoomen"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          
          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
            title="Zoom zurücksetzen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition font-semibold ${
            showFilters
              ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-700 dark:text-purple-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Search Button */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition font-semibold ${
            showSearch
              ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">Suchen</span>
        </button>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Person suchen (Name, Beruf, etc.)..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {people.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.profession?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.diagnoses?.toLowerCase().includes(searchQuery.toLowerCase())
              ).length} Ergebnisse gefunden
            </div>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showLiving}
                    onChange={(e) => handleFilterChange('showLiving', e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Lebende Personen</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showDeceased}
                    onChange={(e) => handleFilterChange('showDeceased', e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Verstorbene Personen</span>
                </label>
              </div>
            </div>

            {/* Generation Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Generation
              </label>
              <select
                value={filters.generation}
                onChange={(e) => handleFilterChange('generation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
              >
                <option value="all">Alle Generationen</option>
                <option value="0">Nur Generation 0 (Älteste)</option>
                <option value="1">Nur Generation 1</option>
                <option value="2">Nur Generation 2 (Jüngste)</option>
              </select>
            </div>

            {/* Has Relationships Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Beziehungen
              </label>
              <select
                value={filters.hasRelationships}
                onChange={(e) => handleFilterChange('hasRelationships', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
              >
                <option value="all">Alle Personen</option>
                <option value="yes">Nur mit Beziehungen</option>
                <option value="no">Ohne Beziehungen</option>
              </select>
            </div>

            {/* Details Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Details
              </label>
              <select
                value={filters.hasDetails}
                onChange={(e) => handleFilterChange('hasDetails', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
              >
                <option value="all">Alle Personen</option>
                <option value="complete">Vollständige Profile</option>
                <option value="incomplete">Unvollständige Profile</option>
              </select>
            </div>
          </div>

          {/* Reset Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  const resetFilters = {
                    showLiving: true,
                    showDeceased: true,
                    generation: 'all',
                    hasRelationships: 'all',
                    hasDetails: 'all'
                  };
                  setFilters(resetFilters);
                  onFilterChange(resetFilters);
                }}
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenogramControls;
