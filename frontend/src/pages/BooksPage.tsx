import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookList } from '../components/BookList';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import type { BookFilterInput } from '../types/book';
import { AiOutlinePlus } from 'react-icons/ai';

export const BooksPage: React.FC = () => {
  const [filter, setFilter] = useState<BookFilterInput>({});

  const handleSearch = (query: string) => {
    setFilter((prev) => ({ ...prev, search: query || undefined }));
  };

  const handleFilterChange = (newFilter: BookFilterInput) => {
    setFilter(newFilter);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book Collection</h1>
            <p className="text-gray-600 mt-2">Manage and explore your book library</p>
          </div>
          <Link to="/books/new" className="btn-primary flex items-center gap-2">
            <AiOutlinePlus className="w-5 h-5" />
            Add New Book
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Book List */}
      <BookList filter={filter} />
    </div>
  );
};