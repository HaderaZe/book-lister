import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GENRES } from '../graphql/queries';
import type { BookFilterInput } from '../types/book';
import { AiOutlineFilter, AiOutlineClose } from 'react-icons/ai';

interface FilterPanelProps {
  onFilterChange: (filter: BookFilterInput) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<BookFilterInput>({});

  const { data: genresData } = useQuery(GET_GENRES);
  const genres = genresData?.genres || [];

  const handleChange = (key: keyof BookFilterInput, value: any) => {
    const newFilter = { ...filter, [key]: value || undefined };
    setFilter(newFilter);
  };

  const applyFilters = () => {
    onFilterChange(filter);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilter({});
    onFilterChange({});
  };

  const activeFilterCount = Object.values(filter).filter(Boolean).length;

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <AiOutlineFilter className="w-5 h-5" />
        Filters
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 text-xs bg-primary-600 text-white rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <AiOutlineClose className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Genre Filter */}
              <div>
                <label className="label">Genre</label>
                <select
                  value={filter.genre || ''}
                  onChange={(e) => handleChange('genre', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre: string) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Range */}
              <div>
                <label className="label">Published Year Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="From"
                    value={filter.minYear || ''}
                    onChange={(e) => handleChange('minYear', parseInt(e.target.value))}
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="To"
                    value={filter.maxYear || ''}
                    onChange={(e) => handleChange('maxYear', parseInt(e.target.value))}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Rating Range */}
              <div>
                <label className="label">Minimum Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  placeholder="0-5"
                  value={filter.minRating || ''}
                  onChange={(e) => handleChange('minRating', parseFloat(e.target.value))}
                  className="input-field"
                />
              </div>

              {/* Language Filter */}
              <div>
                <label className="label">Language</label>
                <input
                  type="text"
                  placeholder="e.g., English"
                  value={filter.language || ''}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button onClick={applyFilters} className="btn-primary flex-1">
                Apply Filters
              </button>
              <button onClick={clearFilters} className="btn-secondary">
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};