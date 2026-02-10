import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK } from '../graphql/queries';
import { DELETE_BOOK, RATE_BOOK } from '../graphql/mutations';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { StarRating } from '../components/StartRating';
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineArrowLeft,
  AiOutlineBook,
  AiOutlineCalendar,
  AiOutlineGlobal,
  AiOutlineFileText,
} from 'react-icons/ai';

export const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_BOOK, {
    variables: { id },
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      alert('Book deleted successfully!');
      navigate('/');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const [rateBook] = useMutation(RATE_BOOK, {
    refetchQueries: [{ query: GET_BOOK, variables: { id } }],
  });

  const handleDelete = () => {
    if (window.confirm(`Delete "${data.book.title}"?`)) {
      deleteBook({ variables: { id } });
    }
  };

  const handleRate = (rating: number) => {
    rateBook({ variables: { id, rating } });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} onRetry={() => refetch()} />;
  if (!data?.book) return <ErrorMessage message="Book not found" />;

  const book = data.book;

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <AiOutlineArrowLeft />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                <AiOutlineBook className="w-32 h-32 text-primary-400" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Link to={`/books/${book.id}/edit`} className="btn-primary flex-1 text-center">
                <AiOutlineEdit className="inline mr-2" />
                Edit
              </Link>
              <button onClick={handleDelete} className="btn-danger flex-1">
                <AiOutlineDelete className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Title and Author */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600">by {book.author}</p>
            </div>

            {/* Rating */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <StarRating
                rating={book.rating || 0}
                onRate={handleRate}
                size="lg"
              />
            </div>

            {/* Genre and Year */}
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium">
                {book.genre}
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2">
                <AiOutlineCalendar />
                {book.publishedYear}
              </span>
              {book.language && (
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2">
                  <AiOutlineGlobal />
                  {book.language}
                </span>
              )}
              {book.totalPages && (
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2">
                  <AiOutlineFileText />
                  {book.totalPages} pages
                </span>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
              {book.isbn && (
                <div>
                  <span className="text-sm font-medium text-gray-600">ISBN:</span>
                  <p className="text-gray-900">{book.isbn}</p>
                </div>
              )}
              {book.publisher && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Publisher:</span>
                  <p className="text-gray-900">{book.publisher}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600">Added:</span>
                <p className="text-gray-900">
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Last Updated:</span>
                <p className="text-gray-900">
                  {new Date(book.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};