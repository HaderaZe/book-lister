import React from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/book';
import { StarRating } from './StartRating';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineBook } from 'react-icons/ai';

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onDelete, onRate }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete && window.confirm(`Delete "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  return (
    <div className="card group hover:scale-[1.02] transition-transform">
      <Link to={`/books/${book.id}`} className="block">
        {/* Cover Image */}
        <div className="mb-4 overflow-hidden rounded-lg bg-gray-200 h-64">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
              <AiOutlineBook className="w-20 h-20 text-primary-400" />
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors">
            {book.title}
          </h3>

          <p className="text-sm text-gray-600">{book.author}</p>

          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
              {book.genre}
            </span>
            <span className="text-sm text-gray-500">{book.publishedYear}</span>
          </div>

          {/* Rating */}
          <div className="pt-2">
            <StarRating
              rating={book.rating || 0}
              onRate={onRate ? (rating) => onRate(book.id, rating) : undefined}
              readonly={!onRate}
              size="sm"
            />
          </div>

          {/* Description */}
          {book.description && (
            <p className="text-sm text-gray-600 line-clamp-2 pt-2">
              {book.description}
            </p>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <Link
          to={`/books/${book.id}/edit`}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg transition-colors text-sm font-medium"
        >
          <AiOutlineEdit className="w-4 h-4" />
          Edit
        </Link>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
          >
            <AiOutlineDelete className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};