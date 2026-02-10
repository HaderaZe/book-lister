import React, { useState } from 'react';
import type { BookInput } from '../types/book';

interface BookFormProps {
  initialData?: Partial<BookInput>;
  onSubmit: (data: BookInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Horror',
  'Biography',
  'History',
  'Science',
  'Self-Help',
  'Business',
  'Poetry',
  'Drama',
  'Other',
];

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Save Book',
}) => {
  const [formData, setFormData] = useState<BookInput>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    isbn: initialData?.isbn || '',
    publishedYear: initialData?.publishedYear || new Date().getFullYear(),
    genre: initialData?.genre || 'Fiction',
    description: initialData?.description || '',
    coverImage: initialData?.coverImage || '',
    rating: initialData?.rating || 0,
    totalPages: initialData?.totalPages || undefined,
    language: initialData?.language || 'English',
    publisher: initialData?.publisher || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookInput, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookInput, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Invalid year';
    }

    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? value === ''
            ? undefined
            : parseFloat(value)
          : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof BookInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="label">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Enter book title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="label">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`input-field ${errors.author ? 'border-red-500' : ''}`}
            placeholder="Enter author name"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="label">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="input-field"
            placeholder="978-3-16-148410-0"
          />
        </div>

        {/* Published Year */}
        <div>
          <label htmlFor="publishedYear" className="label">
            Published Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            className={`input-field ${errors.publishedYear ? 'border-red-500' : ''}`}
            min="1000"
            max={new Date().getFullYear()}
          />
          {errors.publishedYear && (
            <p className="text-red-500 text-sm mt-1">{errors.publishedYear}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="label">
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="input-field"
          >
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="label">
            Language
          </label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="input-field"
            placeholder="English"
          />
        </div>

        {/* Publisher */}
        <div>
          <label htmlFor="publisher" className="label">
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="input-field"
            placeholder="Publisher name"
          />
        </div>

        {/* Total Pages */}
        <div>
          <label htmlFor="totalPages" className="label">
            Total Pages
          </label>
          <input
            type="number"
            id="totalPages"
            name="totalPages"
            value={formData.totalPages || ''}
            onChange={handleChange}
            className="input-field"
            min="1"
            placeholder="350"
          />
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="label">
            Rating (0-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating || ''}
            onChange={handleChange}
            className={`input-field ${errors.rating ? 'border-red-500' : ''}`}
            min="0"
            max="5"
            step="0.1"
            placeholder="4.5"
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        {/* Cover Image URL */}
        <div className="md:col-span-2">
          <label htmlFor="coverImage" className="label">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com/book-cover.jpg"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            rows={4}
            placeholder="Enter book description..."
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};